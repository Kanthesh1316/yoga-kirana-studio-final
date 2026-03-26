import { Link } from "wouter";
import { Leaf, Instagram, Youtube, Facebook, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-secondary/30 border-t border-border pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="space-y-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white">
              <Leaf size={16} />
            </div>
            <span className="font-heading text-xl font-bold tracking-tight">
              Yoga Kirana
            </span>
          </Link>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Transforming lives through the ancient wisdom of yoga. Join our community to find balance, strength, and inner peace.
          </p>
          <div className="flex gap-4">
            <a href="https://www.instagram.com/yoga_kirana_studio/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-white transition-all">
              <Instagram size={18} />
            </a>
            <a href="https://youtube.com/@yogakiranastudio9213?si=yZB8Oc_WtVqO4MFw" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-white transition-all">
              <Youtube size={18} />
            </a>
            <a href="https://www.facebook.com/share/1ChgdE7kot/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-white transition-all">
              <Facebook size={18} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-heading font-bold mb-6">Quick Links</h4>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
            <li><Link href="/programs" className="hover:text-primary transition-colors">Programs</Link></li>
            <li><Link href="/gallery" className="hover:text-primary transition-colors">Gallery</Link></li>
            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            <li><Link href="/register" className="hover:text-primary transition-colors">Register</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading font-bold mb-6">Programs</h4>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li><Link href="/programs/beginner-yoga" className="hover:text-primary transition-colors">Beginner Yoga</Link></li>
            <li><Link href="/programs/weight-loss" className="hover:text-primary transition-colors">Weight Loss</Link></li>
            <li><Link href="/programs/face-yoga" className="hover:text-primary transition-colors">Face Yoga</Link></li>
            <li><Link href="/programs/meditation" className="hover:text-primary transition-colors">Meditation</Link></li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="font-heading font-bold mb-6">Contact Us</h4>
          <div className="flex gap-3 text-sm text-muted-foreground">
            <MapPin size={18} className="text-primary shrink-0" />
            <span>1st Floor, Indradhanush, near Anand Apartment, Boloor, Kadri, Mangaluru, Karnataka 575003</span>
          </div>
          <div className="flex gap-3 text-sm text-muted-foreground">
            <Phone size={18} className="text-primary shrink-0" />
            <div className="flex flex-col">
              <span>+91 74838 42953</span>
              <span>+91 98451 07346</span>
            </div>
          </div>
          <div className="flex gap-3 text-sm text-muted-foreground">
            <Mail size={18} className="text-primary shrink-0" />
            <span>yogakiranastudio@gmail.com</span>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-20 pt-8 border-t border-border text-center text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} Yoga Kirana Studio. All rights reserved.</p>
      </div>
    </footer>
  );
}
