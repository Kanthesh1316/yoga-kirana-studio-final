import { motion } from "motion/react";
import { MessageCircle } from "lucide-react";

export default function FloatingWhatsApp() {
  const phoneNumber = "+917483842953"; // Updated with user provided number
  const message = encodeURIComponent("Hi, I want to know more about Yoga Kirana Studio classes.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-8 right-8 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center justify-center group"
      id="whatsapp-floating-button"
    >
      <MessageCircle size={32} className="group-hover:rotate-12 transition-transform" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:ml-3 transition-all duration-500 font-bold text-sm">
        Connect via WhatsApp
      </span>
    </motion.a>
  );
}
