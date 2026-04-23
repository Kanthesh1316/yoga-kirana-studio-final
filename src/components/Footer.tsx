import { Link } from "wouter";
import { Leaf, Instagram, Youtube, Facebook, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background pt-32 pb-16 relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -mr-64 -mt-64" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="space-y-8">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
                <Leaf size={20} />
              </div>
              <span className="font-heading text-3xl font-bold tracking-tighter">
                Yoga Kirana
              </span>
            </Link>
            <p className="text-background/60 text-lg font-light leading-relaxed">
              Illuminating paths towards somatic mastery and inner radiance. Experience the essence of <span className="text-white italic">authentic</span> Yoga.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Instagram, href: "https://www.instagram.com/yoga_kirana_studio/" },
                { icon: Youtube, href: "https://youtube.com/@yogakiranastudio9213?si=yZB8Oc_WtVqO4MFw" },
                { icon: Facebook, href: "https://www.facebook.com/share/1ChgdE7kot/" }
              ].map((social, i) => (
                <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl border border-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all hover:-translate-y-1">
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading text-xl font-bold mb-10 text-white">Discovery</h4>
            <ul className="space-y-5 text-background/60 font-light">
              <li><Link href="/" className="hover:text-primary transition-colors">The Studio</Link></li>
              <li><Link href="/programs" className="hover:text-primary transition-colors">Our Curriculum</Link></li>
              <li><Link href="/gallery" className="hover:text-primary transition-colors">Studio Life</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Getting in Touch</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-xl font-bold mb-10 text-white">Specializations</h4>
            <ul className="space-y-5 text-background/60 font-light">
              <li><Link href="/programs/beginner-yoga" className="hover:text-primary transition-colors">Foundational Flow</Link></li>
              <li><Link href="/programs/weight-loss" className="hover:text-primary transition-colors">Metabolic Mastery</Link></li>
              <li><Link href="/programs/face-yoga" className="hover:text-primary transition-colors">Facial Rejuvenation</Link></li>
              <li><Link href="/programs/meditation" className="hover:text-primary transition-colors">Mindful Stillness</Link></li>
            </ul>
          </div>

          <div className="space-y-8">
            <h4 className="font-heading text-xl font-bold mb-10 text-white">The Sanctuary</h4>
            <div className="space-y-6">
              <div className="flex gap-4 text-background/60 font-light">
                <MapPin size={20} className="text-primary shrink-0" />
                <span className="text-sm">1st Floor, Indradhanush, near Anand Apartment, Boloor, Kadri, Mangaluru, KA 575003</span>
              </div>
              <div className="flex gap-4 text-background/60 font-light">
                <Phone size={20} className="text-primary shrink-0" />
                <div className="flex flex-col text-sm">
                  <span className="text-white font-medium">+91 74838 42953</span>
                  <span>+91 98451 07346</span>
                </div>
              </div>
              <div className="flex gap-4 text-background/60 font-light">
                <Mail size={20} className="text-primary shrink-0" />
                <span className="text-sm">yogakiranastudio@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-[0.3em] font-bold text-background/40">
          <p>© {new Date().getFullYear()} Yoga Kirana. Crafted for Transformation.</p>
          <p className="flex gap-8">
            <span className="hover:text-white cursor-pointer transition-all">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-all">Terms of Service</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
