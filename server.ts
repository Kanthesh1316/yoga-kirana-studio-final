import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import twilio from "twilio";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://kantheshlg_db_user:4zJrlCPnsg8JOowL@cluster0.wp0nvjn.mongodb.net/yoga_kirana?retryWrites=true&w=majority";

// Handle process-level errors to prevent silent crashes
process.on('uncaughtException', (err) => {
  console.error('🔥 Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('🔥 Unhandled Rejection at:', promise, 'reason:', reason);
});

const connectDB = async () => {
  try {
    console.log("⏳ Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("✅ Connected to MongoDB Atlas");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    console.log("💡 TIP: Ensure you have whitelisted '0.0.0.0/0' in your MongoDB Atlas Network Access settings.");
  }
};

// Registration Schema
const registrationSchema = new mongoose.Schema({
  fullName: String,
  dob: Date,
  ageRange: String,
  gender: String,
  address: String,
  mobileNumber: String,
  email: String,
  healthCondition: String,
  height: String,
  weight: String,
  occupation: String,
  createdAt: { type: Date, default: Date.now }
});

const Registration = mongoose.model("Registration", registrationSchema);

// Contact Schema
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});

const Contact = mongoose.model("Contact", contactSchema);

async function startServer() {
  // Connect to DB before starting the server
  await connectDB();

  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // Health Check
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "ok", 
      dbConnected: mongoose.connection.readyState === 1,
      timestamp: new Date().toISOString()
    });
  });

  // Email Transporter (using Gmail as requested)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER || 'yogakiranastudio@gmail.com',
      pass: process.env.EMAIL_PASS, // App Password
    },
  });

  // Twilio Client (for WhatsApp)
  const twilioClient = process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN 
    ? twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
    : null;

  // API Routes
  app.post("/api/register", async (req, res) => {
    const registrationData = req.body;
    console.log("New Registration Request:", registrationData.fullName);

    // Check if DB is connected
    if (mongoose.connection.readyState !== 1) {
      console.error("❌ Database not connected. ReadyState:", mongoose.connection.readyState);
      return res.status(503).json({ 
        success: false, 
        message: "Database is currently unreachable. Please ensure you have whitelisted '0.0.0.0/0' in your MongoDB Atlas Network Access settings.",
        error: "DB_CONNECTION_ERROR"
      });
    }

    try {
      // 1. Save to MongoDB (Critical Step)
      const newRegistration = new Registration(registrationData);
      await newRegistration.save();
      console.log("✅ Saved to MongoDB");
      
      let emailSent = false;
      let whatsappSent = false;
      let notificationError = null;

      // 2. Try sending notifications (Non-critical, don't block registration)
      try {
        if (process.env.EMAIL_PASS) {
          const userMailOptions = {
            from: '"Yoga Kirana Studio" <yogakiranastudio@gmail.com>',
            to: registrationData.email,
            subject: 'Registration Successful - Yoga Kirana Studio',
            text: `Namaste ${registrationData.fullName},\n\nThank you for registering with Yoga Kirana Studio. We have received your details and our team will contact you shortly.\n\nWarm regards,\nYoga Kirana Studio`,
          };
          await transporter.sendMail(userMailOptions);
          
          const adminMailOptions = {
            from: '"Yoga Kirana Studio" <yogakiranastudio@gmail.com>',
            to: 'yogakiranastudio@gmail.com',
            subject: 'New Registration Received',
            text: `New registration from ${registrationData.fullName} (${registrationData.email}). Check DB for details.`,
          };
          await transporter.sendMail(adminMailOptions);
          emailSent = true;
          console.log("📧 Emails sent");
        }

        if (twilioClient && process.env.TWILIO_WHATSAPP_NUMBER) {
          await twilioClient.messages.create({
            from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
            to: `whatsapp:${registrationData.mobileNumber.startsWith('+') ? registrationData.mobileNumber : '+91' + registrationData.mobileNumber}`,
            body: `Namaste ${registrationData.fullName}, welcome to Yoga Kirana Studio! Your registration is successful.`,
          });
          whatsappSent = true;
          console.log("📱 WhatsApp sent");
        }
      } catch (notifyErr) {
        console.warn("⚠️ Notification warning:", notifyErr);
        notificationError = String(notifyErr);
      }

      res.status(200).json({ 
        success: true, 
        message: "Registration successful.", 
        registrationId: newRegistration._id,
        notifications: { emailSent, whatsappSent, error: notificationError }
      });
    } catch (error) {
      console.error("❌ Registration error:", error);
      res.status(500).json({ 
        success: false, 
        message: "Database error. Please ensure your MongoDB IP whitelist is set to 'Allow access from anywhere'.", 
        error: String(error) 
      });
    }
  });

  app.get("/api/registration/:id", async (req, res) => {
    try {
      const registration = await Registration.findById(req.params.id);
      if (!registration) {
        return res.status(404).json({ success: false, message: "Registration not found." });
      }
      res.status(200).json({ success: true, registration });
    } catch (error) {
      console.error("Error fetching registration:", error);
      res.status(500).json({ success: false, message: "Failed to fetch registration." });
    }
  });

  app.post("/api/contact", async (req, res) => {
    const contactData = req.body;
    console.log("New Enquiry:", contactData);

    try {
      // 1. Save to MongoDB
      const newContact = new Contact(contactData);
      await newContact.save();

      // 2. Send Email Notification to Admin
      const adminMailOptions = {
        from: '"Yoga Kirana Studio" <yogakiranastudio@gmail.com>',
        to: 'yogakiranastudio@gmail.com',
        subject: `New Enquiry from ${contactData.name}`,
        text: `New enquiry received:\n\nName: ${contactData.name}\nEmail: ${contactData.email}\nPhone: ${contactData.phone}\nMessage: ${contactData.message}`,
      };
      await transporter.sendMail(adminMailOptions);

      res.status(200).json({ success: true, message: "Enquiry sent successfully and saved to DB." });
    } catch (error) {
      console.error("Error in contact process:", error);
      res.status(500).json({ success: false, message: "Failed to send enquiry.", error: String(error) });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
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
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
