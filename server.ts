import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import twilio from "twilio";
import cors from "cors";
import dotenv from "dotenv";
import * as brevo from "@getbrevo/brevo";
const { BrevoClient } = brevo;
import rateLimit from "express-rate-limit";
import admin from "firebase-admin";
import { initializeApp as initializeFirebaseApp } from "firebase/app";
import { 
  getFirestore as getWebFirestore, 
  collection as webCollection, 
  addDoc as webAddDoc, 
  deleteDoc as webDeleteDoc, 
  doc as webDoc, 
  getDoc as webGetDoc,
  getDocs as webGetDocs,
  query as webQuery,
  where as webWhere,
  limit as webLimit,
  updateDoc as webUpdateDoc,
  serverTimestamp as webServerTimestamp,
  Timestamp as WebTimestamp,
  deleteField as webDeleteField
} from "firebase/firestore";
import createDOMPurify from "dompurify";
import { JSDOM } from "jsdom";
import validator from "validator";
import fs from "fs";
import crypto from "crypto";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Sanitize Logic
const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window as any);

// Firebase Configuration Logic
let firebaseConfig: any;
try {
  const configPath = path.join(__dirname, "firebase-applet-config.json");
  if (fs.existsSync(configPath)) {
    firebaseConfig = JSON.parse(fs.readFileSync(configPath, "utf8"));
  } else if (process.env.FIREBASE_CONFIG) {
    firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG);
  }
} catch (e) {
  console.warn("⚠️ Failed to parse Firebase config:", e);
}

// Initialize Firebase Admin with resilience
try {
  if (firebaseConfig && !admin.apps.length) {
    const adminConfig: any = {};
    
    // Try to use applicationDefault if available
    try {
      adminConfig.credential = admin.credential.applicationDefault();
      console.log("🔋 Using Application Default Credentials");
    } catch (credError) {
      console.warn("⚠️ ADC not found, using default configuration");
    }
    
    // Use project ID from config as primary, then environment
    const targetProjectId = firebaseConfig?.projectId || process.env.GOOGLE_CLOUD_PROJECT || process.env.GCP_PROJECT;
    if (targetProjectId) {
      adminConfig.projectId = targetProjectId;
    }
    
    admin.initializeApp(adminConfig);
    console.log(`🚀 Firebase Admin Initialized for project: ${adminConfig.projectId || "default"}`);
  } else if (!admin.apps.length) {
     console.warn("⚠️ No Firebase config found, server may have limited functionality");
  }
} catch (initError) {
  console.error("❌ Firebase Admin Init Error:", initError);
}

// Target specific database if provided in config
let webApp: any;
let webDb: any;
let db: any;
let isDummy = false;

function initializeFirestore() {
  if (!firebaseConfig) {
    console.warn("⚠️ Cannot initialize Firestore: No config found.");
    setupDummyFirestore();
    return;
  }

  try {
    const databaseId = firebaseConfig.firestoreDatabaseId;
    
    // 1. Initialize Web SDK App (allows API Key usage in Node)
    webApp = initializeFirebaseApp(firebaseConfig);
    
    // 2. Connect to the correct database instance (default or named)
    if (databaseId && databaseId !== "(default)") {
      webDb = getWebFirestore(webApp, databaseId);
      console.log(`🔌 Web Firebase SDK Initialized for Project: ${firebaseConfig.projectId}, Database: ${databaseId}`);
    } else {
      webDb = getWebFirestore(webApp);
      console.log(`🔌 Web Firebase SDK Initialized for Project: ${firebaseConfig.projectId}, Database: (default)`);
    }

    // 3. Create a "shim" for the Admin SDK syntax...
    db = {
      collection: (collectionName: string) => {
        const chain: any = {
          constraints: [],
          where: (field: string, op: any, value: any) => {
            chain.constraints.push(webWhere(field, op, value));
            return chain;
          },
          limit: (n: number) => {
            chain.constraints.push(webLimit(n));
            return chain;
          },
          get: async () => {
             const colRef = webCollection(webDb, collectionName);
             const q = webQuery(colRef, ...chain.constraints);
             const snapshot = await webGetDocs(q);
             return {
               empty: snapshot.empty,
               docs: snapshot.docs.map(d => ({
                 id: d.id,
                 data: () => d.data(),
                 ref: {
                   delete: async () => await webDeleteDoc(webDoc(webDb, collectionName, d.id)),
                   update: async (updateData: any) => {
                      // Process special fields for web SDK
                      const processed = { ...updateData };
                      for (const key in processed) {
                        if (processed[key] === "SHIM_DELETE") processed[key] = webDeleteField();
                        if (processed[key] === "SHIM_NOW") processed[key] = webServerTimestamp();
                      }
                      await webUpdateDoc(webDoc(webDb, collectionName, d.id), processed);
                   }
                 }
               }))
             };
          },
          add: async (data: any) => {
            if (isDummy) return { id: "dummy-id" };
            const colRef = webCollection(webDb, collectionName);
            const docRef = await webAddDoc(colRef, data);
            return { id: docRef.id };
          }
        };
        return chain;
      }
    };

    // TEST WRITE to test_writes collection
    (async () => {
      try {
        const testRef = await db.collection("test_writes").add({
          test: true,
          temp: "web-sdk-initialization-test",
          createdAt: webServerTimestamp()
        });
        console.log("✅ Web SDK Write Verified.");
      } catch (e: any) {
        console.warn("⚠️ Web SDK Test Write Failed (Check Rules):", e.message);
      }
    })();

  } catch (error: any) {
    console.error("❌ Firebase Web SDK Init Error:", error.message);
    setupDummyFirestore();
  }
}

function setupDummyFirestore() {
  isDummy = true;
  const dummyDoc = () => ({
    set: async () => ({}),
    get: async () => ({ exists: false, data: () => ({}) }),
    add: async () => ({ id: "dummy-id" }),
    update: async () => ({}),
    delete: async () => ({})
  });
  
  const dummyCollection = () => {
    const query: any = {
      get: async () => ({ docs: [], empty: true, size: 0 }),
      limit: () => query,
      where: () => query,
      orderBy: () => query,
      add: async () => ({ id: "dummy-id" }),
      doc: dummyDoc
    };
    return query;
  };

  db = { 
    collection: dummyCollection
  };
}

// Brevo (formerly Sendinblue) Initialization
let brevoClient: any = null;
if (process.env.BREVO_API_KEY) {
  const apiKey = process.env.BREVO_API_KEY.trim();
  const maskedKey = apiKey.substring(0, 8) + "..." + apiKey.substring(apiKey.length - 4);
  brevoClient = new BrevoClient({
    apiKey: apiKey,
  });
  console.log(`📨 Brevo initialized with key: ${maskedKey}`);
} else {
  console.warn("⚠️ BREVO_API_KEY is missing from environment variables");
}

// Helper to send emails via Brevo
async function sendEmailViaBrevo(to: string, subject: string, htmlContent: string) {
  if (!brevoClient) {
    console.error("❌ Brevo attempted to send email but client is NOT initialized. Check BREVO_API_KEY.");
    throw new Error("Email service not configured. Please add your Brevo API key to the Secrets menu.");
  }

  try {
    const senderEmail = (process.env.SENDER_EMAIL || process.env.EMAIL_USER || "kantheshlg@gmail.com").trim();
    const response = await brevoClient.transactionalEmails.sendTransacEmail({
      sender: { 
        email: senderEmail,
        name: "Yoga Kirana Studio"
      },
      to: to.includes(',') 
        ? to.split(',').map(email => ({ email: email.trim() }))
        : [{ email: to.trim() }],
      subject: subject,
      htmlContent: htmlContent,
      textContent: htmlContent.replace(/<[^>]*>?/gm, '') 
    });

    console.log(`✅ Email sent via Brevo to ${to}`);
    return response;
  } catch (error: any) {
    // Enhanced error reporting
    const statusCode = error?.statusCode || error?.response?.status;
    const errorBody = error?.body || error?.response?.body || error;
    
    console.error(`❌ Brevo API Error [${statusCode}]:`, errorBody);
    
    if (statusCode === 401) {
      throw new Error("Invalid Brevo API Key. Please regenerate a v3 API key from your Brevo dashboard (SMTP & API -> API Keys) and update the BREVO_API_KEY secret.");
    }
    
    throw new Error(`Email delivery failed. Brevo returned: ${typeof errorBody === 'object' ? JSON.stringify(errorBody) : String(errorBody)}`);
  }
}

// Rate Limiter for Contact Form
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { success: false, message: "Too many requests from this IP, please try again after 15 minutes" },
  standardHeaders: true,
  legacyHeaders: false,
});

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  // Initialize Firestore BEFORE routes
  try {
    await initializeFirestore();
  } catch (err) {
    console.error("Critical Failure during database initialization:", err);
  }

  // CRITICAL: Trust proxy to get correct client IP behind Render/Cloud Run LB
  app.set('trust proxy', 1);

  app.use(cors());
  app.use(express.json());

  // Health Check
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "ok", 
      firebaseAdminInitialized: !!admin.apps.length,
      brevoEnabled: !!brevoClient,
      timestamp: new Date().toISOString()
    });
  });

  // API Routes
  
  // 1. Submit Enquiry (Double Opt-in Verification)
  app.post("/api/contact", contactLimiter, async (req, res) => {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email address" });
    }

    const cleanName = DOMPurify.sanitize(name);
    const cleanEmail = validator.normalizeEmail(email) || email;
    const cleanPhone = validator.whitelist(phone, "0-9+\\- ");
    const cleanMessage = DOMPurify.sanitize(message);

    try {
      // 1. Generate Secure Token
      const token = crypto.randomBytes(32).toString("hex");
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

      // 2. Save in "messages" as UNVERIFIED (Waiting for customer to verify)
      await db.collection("messages").add({
        name: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        message: cleanMessage,
        verified: false,
        verificationToken: token,
        expiresAt: WebTimestamp.fromDate(expiresAt),
        date: webServerTimestamp()
      });

      // 3. Generate Link - Now pointing to FRONTEND /verify route for industrial-grade bridge handling
      const protocol = (req.headers['x-forwarded-proto'] as string) || 'https';
      const host = (req.headers['x-forwarded-host'] as string) || req.get('host');
      const verifyLink = `${protocol}://${host}/verify?token=${token}`;

      console.log(`🔗 Generated verification link (Frontend): ${verifyLink}`);

      // 4. Send Verification email to CUSTOMER ONLY
      if (brevoClient) {
        try {
          await sendEmailViaBrevo(
            cleanEmail,
            "Verify Your Inquiry - Yoga Kirana Studio",
            `
              <div style="font-family: sans-serif; padding: 40px; color: #333; background: #f9f9f9;">
                <div style="max-width: 600px; margin: 0 auto; background: #fff; padding: 40px; border-radius: 24px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
                  <h2 style="color: #458B71; margin-bottom: 24px;">Verify your inquiry</h2>
                  <p style="font-size: 16px; line-height: 1.6; color: #666;">Hi ${cleanName},</p>
                  <p style="font-size: 16px; line-height: 1.6; color: #666;">Thanks for contacting Yoga Kirana Studio. Please verify your email so our team can reach out to you ASAP.</p>
                  <div style="margin: 40px 0;">
                    <a href="${verifyLink}" style="background: #458B71; color: #fff; padding: 16px 32px; border-radius: 12px; text-decoration: none; font-weight: bold; display: inline-block;">Verify Email</a>
                  </div>
                  <p style="font-size: 14px; color: #999;">This link will expire in 24 hours. If you did not request this, you can safely ignore this email.</p>
                  <hr style="border: none; border-top: 1px solid #eee; margin: 40px 0;" />
                  <p style="font-size: 12px; color: #aaa; text-align: center;">Yoga Kirana Studio of Excellence</p>
                </div>
              </div>
            `
          );
        } catch (mailError: any) {
          console.error("Brevo Mail Send Crash:", mailError);
          return res.status(500).json({ 
            success: false, 
            message: "Email delivery failed. Please ensure your Brevo API key is correct and your sender email is authorized." 
          });
        }
      } else {
        console.error("❌ Brevo not configured. Please add BREVO_API_KEY to Settings > Secrets.");
        return res.status(500).json({ 
          success: false, 
          message: "Email service not configured. Admin: Please add BREVO_API_KEY to Settings > Secrets." 
        });
      }

      res.status(200).json({ 
        success: true, 
        message: "Verification email sent. Please check your inbox."
      });
    } catch (error) {
      console.error("Submit Enquiry Error:", error);
      res.status(500).json({ success: false, message: "Failed to process enquiry" });
    }
  });

  // 2. Verification API (Called by Frontend Verify.tsx via fetch)
  app.get("/api/verify", async (req, res) => {
    const { token } = req.query;

    if (!token || typeof token !== "string") {
      return res.status(400).json({ success: false, message: "Invalid token" });
    }

    try {
      console.log(`🔍 API Verifying token: ${token.substring(0, 5)}...`);
      const snapshot = await db.collection("messages")
        .where("verificationToken", "==", token)
        .limit(1)
        .get();

      if (snapshot.empty) {
        return res.status(404).json({ success: false, message: "Link invalid or already used." });
      }

      const doc = snapshot.docs[0];
      const data = doc.data();
      const now = WebTimestamp.now();

      // Check Expiry
      if (data.expiresAt && data.expiresAt.toMillis() < now.toMillis()) {
        await doc.ref.delete();
        return res.status(410).json({ success: false, message: "Verification link expired." });
      }

      // Mark as Verified
      await doc.ref.update({
        verified: true,
        verificationToken: null,
        expiresAt: null,
        verifiedAt: WebTimestamp.now()
      });

      // Notify Admin
      if (brevoClient && process.env.ADMIN_EMAIL) {
        try {
          await sendEmailViaBrevo(
            process.env.ADMIN_EMAIL,
            `New Verified Contact Request: ${data.name}`,
            `
              <div style="font-family: sans-serif; padding: 20px; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 12px;">
                <h2 style="color: #458B71;">New Verified Lead Received</h2>
                <p><strong>Name:</strong> ${data.name}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>Phone:</strong> ${data.phone}</p>
                <p><strong>Status:</strong> Verified ✅</p>
                <p><strong>Message:</strong></p>
                <div style="background: #f8fafc; padding: 20px; border-radius: 8px; border-left: 4px solid #458B71; color: #475569;">
                  ${data.message}
                </div>
              </div>
            `
          );
        } catch (e) {
          console.error("Admin notification failed:", e);
        }
      }

      res.json({ success: true, message: "Verified successfully" });
    } catch (error: any) {
      console.error("Verification API Error:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  });

  // Legacy route for direct browser clicks (redirects to the frontend /verify)
  app.get("/api/verify-email", async (req, res) => {
    const { token } = req.query;
    if (!token) return res.redirect("/verify?status=error");
    res.redirect(`/verify?token=${token}`);
  });

  // Legacy route for compatibility with any old links if needed (can be removed later)
  app.get("/api/verify", async (req, res) => {
    const { token } = req.query;
    if (!token) return res.status(400).json({ success: false });
    // Same logic simplified or just redirect to the new one
    res.redirect(`/api/verify-email?token=${token}`);
  });

  // 3. Get All Messages (for Admin)
  app.get("/api/messages", async (req, res) => {
    try {
      const snapshot = await db.collection("messages").orderBy("date", "desc").get();
      const messages = snapshot.docs.map((doc: any) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          date: data.date ? data.date.toDate().toISOString() : new Date().toISOString()
        };
      });
      res.json({ success: true, messages });
    } catch (error) {
      console.error("Fetch Messages Error:", error);
      res.status(500).json({ success: false, message: "Failed to load messages" });
    }
  });

  // 4. Delete Message
  app.delete("/api/messages/:id", async (req, res) => {
    const { id } = req.params;
    try {
      await db.collection("messages").doc(id).delete();
      res.json({ success: true, message: "Message deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to delete message" });
    }
  });

  // RESTORED: Registration Routes
  app.post("/api/register", async (req, res) => {
    let registrationData = req.body;
    console.log("📝 Processing registration for:", registrationData.email);
    
    // Clean and normalize data
    try {
      // Fix: Convert dob string back to Date/Timestamp for Firestore
      if (registrationData.dob) {
        const dobDate = new Date(registrationData.dob);
        if (!isNaN(dobDate.getTime())) {
          registrationData.dob = WebTimestamp.fromDate(dobDate);
        }
      }

      const docRef = await db.collection("registrations").add({
        ...registrationData,
        createdAt: webServerTimestamp()
      });
      console.log("✅ Registration successful with ID:", docRef.id);
      res.status(200).json({ success: true, message: "Registration successful.", registrationId: docRef.id });
    } catch (error: any) {
      console.error("❌ Registration Error:", error.message || error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to process registration.",
        error: error.message || "Unknown error" 
      });
    }
  });

  // Rest of existing routes (e.g. /api/register) can be kept or migrated...
  // For brevity and focus on current task, I'll keep the core structure but ensure it's clean.

  // Vite middleware for development
  const isDev = process.env.NODE_ENV !== "production" || process.env.VITE_DEV === "true";
  console.log(`📡 Mode: ${isDev ? "Development (Vite)" : "Production (Static)"}`);

  if (isDev) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // Global Error Handler to ensure JSON responses
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error("Unhandled Error:", err);
    res.status(500).json({
      success: false,
      message: "An unexpected server error occurred.",
      error: process.env.NODE_ENV === "production" ? "INTERNAL_SERVER_ERROR" : String(err)
    });
  });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 Firebase Integrated`);
  });
}

startServer();
