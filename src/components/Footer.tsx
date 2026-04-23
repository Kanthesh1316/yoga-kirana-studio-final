import { Link } from "wouter";
import { Leaf, Instagram, Youtube, Facebook, Mail, Phone, MapPin } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter, 
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

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
          <div className="flex gap-8">
            <Dialog>
              <DialogTrigger render={<button className="hover:text-white cursor-pointer transition-all bg-transparent border-none p-0 uppercase tracking-[0.3em] font-bold text-[10px]" />}>
                Privacy Policy
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-heading mb-4">Privacy Policy</DialogTitle>
                  <DialogDescription render={<div className="text-sm space-y-4 text-muted-foreground" />}>
                    <p>At Yoga Kirana Studio, your privacy is paramount. This policy outlines how we handle your data.</p>
                    <h5 className="font-bold text-foreground mt-4">1. Information Collection</h5>
                    <p>We collect information you provide during registration, such as name, email, and health data for therapeutic sessions.</p>
                    <h5 className="font-bold text-foreground mt-4">2. Data Usage</h5>
                    <p>Your data is used solely for session management, communication, and providing personalized yoga therapy. We do not sell your data.</p>
                    <h5 className="font-bold text-foreground mt-4">3. Security</h5>
                    <p>We implement industry-standard security to protect your sensitive health information.</p>
                    <h5 className="font-bold text-foreground mt-4">4. Verification</h5>
                    <p>Our double opt-in system ensures that only valid requests are processed, protecting you from spam.</p>
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mt-6">
                  <DialogClose render={<Button variant="outline" className="rounded-full" />}>
                    Understood
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger render={<button className="hover:text-white cursor-pointer transition-all bg-transparent border-none p-0 uppercase tracking-[0.3em] font-bold text-[10px]" />}>
                Terms of Service
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-heading mb-4">Terms of Service</DialogTitle>
                  <DialogDescription render={<div className="text-sm space-y-4 text-muted-foreground" />}>
                    <p>By using Yoga Kirana Studio's platform, you agree to these terms.</p>
                    <h5 className="font-bold text-foreground mt-4">1. Studio Access</h5>
                    <p>Registration grants access to specific programs. Attendance is subject to studio availability and health clearance.</p>
                    <h5 className="font-bold text-foreground mt-4">2. Health Responsibility</h5>
                    <p>Yoga involves physical activity. You are responsible for consulting a physician before starting any therapeutic program.</p>
                    <h5 className="font-bold text-foreground mt-4">3. Cancellation</h5>
                    <p>Cancellations must be communicated at least 24 hours in advance for therapy sessions.</p>
                    <h5 className="font-bold text-foreground mt-4">4. Conduct</h5>
                    <p>We maintain a sanctuary of peace; respectful conduct is mandatory within the studio premises.</p>
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mt-6">
                  <DialogClose render={<Button variant="outline" className="rounded-full" />}>
                    I Agree
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </footer>
  );
}
