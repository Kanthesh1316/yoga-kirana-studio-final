import { Link, useLocation } from "wouter";
import { motion } from "motion/react";
import { Menu, X, Leaf } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Programs", href: "/programs" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-dark py-4 shadow-2xl" : "bg-transparent py-4 md:py-8"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white group-hover:rotate-[30deg] transition-all duration-500 shadow-lg shadow-primary/20">
            <Leaf size={24} />
          </div>
          <div className="flex flex-col">
            <span className={`font-heading text-2xl font-bold tracking-tighter leading-none transition-colors ${scrolled ? 'text-white' : 'text-foreground'}`}>
              Yoga Kirana
            </span>
            <span className={`text-[10px] uppercase tracking-[0.3em] font-bold opacity-60 transition-colors ${scrolled ? 'text-white' : 'text-foreground'}`}>
              Studio of Excellence
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-xs uppercase tracking-widest font-bold transition-all hover:text-primary relative group/link ${
                location === link.href 
                  ? (scrolled ? "text-white" : "text-primary") 
                  : (scrolled ? "text-white/60" : "text-foreground/60")
              }`}
            >
              {link.name}
              <span className={`absolute -bottom-2 left-0 w-0 h-0.5 bg-primary transition-all group-hover/link:w-full ${location === link.href ? 'w-full' : ''}`} />
            </Link>
          ))}
          <Link href="/register">
            <Button className={`rounded-full px-8 h-12 font-bold transition-all hover:scale-105 active:scale-95 ${scrolled ? 'bg-white text-primary hover:bg-white/90' : 'shadow-xl shadow-primary/20'}`}>
              Enroll Now
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className={`md:hidden transition-colors ${scrolled ? 'text-white' : 'text-foreground'}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-full left-0 right-0 glass border-t border-white/10 p-6 flex flex-col gap-4"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`text-lg font-medium ${
                location === link.href ? "text-primary" : "text-foreground/80"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link href="/register" onClick={() => setIsOpen(false)}>
            <Button className="w-full rounded-full">Enroll Now</Button>
          </Link>
        </motion.div>
      )}
    </nav>
  );
}
