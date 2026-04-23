import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { motion } from "motion/react";
import { CheckCircle2, XCircle, Clock, Loader2, Home, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Verify() {
  const [location, setLocation] = useLocation();
  const [status, setStatus] = useState<"loading" | "success" | "expired" | "error">("loading");
  const [message, setMessage] = useState("");
  const [tokenInput, setTokenInput] = useState("");
  const verifying = useRef(false);

  const verifyToken = async (overrideToken?: string) => {
    const params = new URLSearchParams(window.location.search);
    const statusParam = params.get("status");
    const messageParam = params.get("message");
    const token = overrideToken || params.get("token");

    // If redirected from backend with a status
    if (statusParam) {
      if (statusParam === "success") setStatus("success");
      else if (statusParam === "expired") setStatus("expired");
      else setStatus("error");
      
      if (messageParam) setMessage(messageParam);
      return;
    }

    if (!token) {
      setStatus("error");
      setMessage("Invalid verification link.");
      return;
    }

    try {
      setStatus("loading");
      setMessage(""); // Reset message
      
      // Add a tiny synthetic delay for smoother UI transition
      await new Promise(r => setTimeout(r, 2000));
      
      const response = await fetch(`/api/verify?token=${token}`);
      const data = await response.json();

      if (response.ok && data.success) {
        setStatus("success");
        setMessage(data.message);
      } else if (response.status === 410) {
        setStatus("expired");
      } else {
        // If it was already successful, don't revert to error on refresh/double-click
        if (status === "success") return;
        
        setStatus("error");
        setMessage(data.message || "Verification failed");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  const handleManualVerify = () => {
    if (!tokenInput.trim()) return;
    verifying.current = true; // Block the useEffect if it hasn't run
    verifyToken(tokenInput.trim());
  };

  useEffect(() => {
    if (verifying.current) return;
    verifying.current = true;
    verifyToken();
  }, []);

  const renderContent = () => {
    switch (status) {
      case "loading":
        return (
          <div className="flex flex-col items-center gap-6">
            <Loader2 className="w-16 h-16 text-primary animate-spin" />
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Verifying your enquiry...</h2>
            <p className="text-muted-foreground text-lg">Please wait while we validate your email address.</p>
          </div>
        );
      case "success":
        return (
          <div className="flex flex-col items-center gap-8">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="w-28 h-28 bg-primary/10 rounded-full flex items-center justify-center text-primary shadow-inner"
            >
              <CheckCircle2 size={64} />
            </motion.div>
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#458B71]">Successfully Verified!</h2>
              <div className="max-w-md mx-auto space-y-2">
                <p className="text-xl md:text-2xl text-muted-foreground font-medium italic">
                  "Thanks for the time, our team will get back to you."
                </p>
                <p className="text-muted-foreground">
                  Your inquiry has been authenticated and sent to our team.
                </p>
              </div>
            </div>
            <Button 
              onClick={() => setLocation("/")}
              className="rounded-full px-10 h-14 font-bold text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform"
            >
              <Home className="mr-2" size={20} /> Return to Home
            </Button>
          </div>
        );
      case "expired":
        return (
          <div className="flex flex-col items-center gap-6">
            <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center text-orange-500">
              <Clock size={48} />
            </div>
            <h2 className="text-4xl font-bold tracking-tight">Email Link Expired</h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              This verification link has expired for your security. <br />
              Please return to the contact page to submit your enquiry again.
            </p>
            <Button 
              onClick={() => setLocation("/contact")}
              className="rounded-full px-8 h-12 font-bold mt-4"
            >
              <Mail className="mr-2" size={18} /> Back to Contact Us
            </Button>
          </div>
        );
      case "error":
      default:
        return (
          <div className="flex flex-col items-center gap-6">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center text-red-500">
              <XCircle size={48} />
            </div>
            <h2 className="text-4xl font-bold tracking-tight">Verification Failed</h2>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-md mx-auto">
              {message || "The link might be invalid, or Google is blocking the preview access (403)."}
            </p>
            
            <div className="w-full max-w-sm p-6 bg-secondary/10 rounded-2xl space-y-4 border border-dashed border-primary/20">
              <p className="text-sm font-semibold text-primary uppercase tracking-wider">Manual Verification</p>
              <p className="text-xs text-muted-foreground text-left">If the email link gave you a 403 error, copy the token from the end of that email link and paste it here:</p>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={tokenInput}
                  onChange={(e) => setTokenInput(e.target.value)}
                  placeholder="Paste token here..." 
                  className="flex-1 px-4 h-12 rounded-xl bg-white border-none text-sm shadow-inner"
                />
                <Button onClick={handleManualVerify} className="rounded-xl px-4 h-12">
                  Verify
                </Button>
              </div>
            </div>

            <Button 
              variant="ghost"
              onClick={() => setLocation("/contact")}
              className="rounded-full px-8 h-12 font-bold"
            >
              Back to Contact
            </Button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen pt-40 pb-20 flex items-center justify-center bg-secondary/5">
      <div className="max-w-3xl w-full px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-[3rem] p-12 md:p-20 shadow-2xl text-center border-none"
        >
          {renderContent()}
        </motion.div>
      </div>
    </div>
  );
}
