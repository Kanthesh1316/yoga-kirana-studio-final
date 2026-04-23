import { motion } from "motion/react";
import { ArrowRight, MessageCircle, Play, Star, ChevronDown, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { programs } from "@/data/programs";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import InstructorProfile from "@/components/InstructorProfile";
import GoogleReviews from "@/components/GoogleReviews";
import PremiumTestimonials from "@/components/PremiumTestimonials";

export default function Home() {
  const whatsappNumber = "+917483842953";
  const whatsappMsg = encodeURIComponent("Hi, I want to know more about Yoga Kirana Studio classes.");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMsg}`;

  return (
    <div className="flex flex-col bg-background">
      {/* LUXURY HERO SECTION */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#050505]">
        {/* Background Visual Layer */}
        <div className="absolute inset-0 z-0">
          <motion.div 
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.4 }}
            transition={{ duration: 3, ease: "easeOut" }}
            className="w-full h-full"
          >
            <img
              src="https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&q=90&w=1920"
              alt="Yoga Mastery"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          
          {/* Layered Overlays for depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#050505]" />
          <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-[#050505] to-transparent" />
          
          {/* Atmospheric Blurs */}
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[120px] mix-blend-screen" />
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="space-y-8"
          >
            <div className="flex flex-col items-center gap-4">
              <motion.span 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                className="text-primary font-bold uppercase tracking-[0.6em] text-[10px] md:text-xs"
              >
                A Sanctuary of Profound Healing
              </motion.span>
              <div className="w-12 h-[1px] bg-primary/40" />
            </div>

            <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] font-heading font-medium tracking-tighter leading-[0.82] text-white flex flex-col items-center">
              <span className="block">Illuminate</span>
              <span className="italic font-light lowercase opacity-90 -mt-2">Your Path</span>
            </h1>

            <p className="text-lg md:text-2xl text-white/60 max-w-2xl mx-auto font-light leading-relaxed tracking-wide">
              Boutique Yoga Therapy & Advanced Wellness. <br className="hidden md:block"/>
              Led by international champions in the heart of Heritage Mysore.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10">
              <Link href="/register">
                <Button size="lg" className="rounded-full px-12 h-16 text-lg bg-primary text-white hover:bg-white hover:text-primary shadow-2xl transition-all duration-500 group">
                  Book Free Trial <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
                </Button>
              </Link>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="rounded-full px-12 h-16 text-lg border-white/20 text-white hover:bg-white/10 backdrop-blur-md transition-all duration-500">
                  <MessageCircle className="mr-2" size={20} /> WhatsApp consultation
                </Button>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30 cursor-pointer"
        >
          <ChevronDown size={32} />
        </motion.div>
      </section>

      {/* STATS STRIP */}
      <div className="py-20 bg-[#050505] border-b border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            {[
              { label: "Elite Lineage", value: "15+ Years" },
              { label: "Success Stories", value: "5000+" },
              { label: "Medal Count", value: "50+ Gold" },
              { label: "AYUSH Norms", value: "Certified" }
            ].map((stat, i) => (
              <div key={i} className="space-y-2 border-l border-white/10 first:border-none pl-4 md:pl-0">
                <p className="text-3xl md:text-4xl font-heading font-medium text-white">{stat.value}</p>
                <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-primary">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PHILOSOPHY GRID */}
      <section className="py-32 bg-background relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-12 text-center lg:text-left">
              <div className="space-y-6">
                <span className="text-primary font-bold uppercase tracking-[0.4em] text-[10px]">The Ethos</span>
                <h2 className="text-5xl md:text-7xl font-heading leading-tight leading-none tracking-tighter">
                  Ancient Discipline <br/>
                  <span className="italic font-light">Modern Precision</span>
                </h2>
                <p className="text-xl text-muted-foreground font-light leading-relaxed max-w-lg mx-auto lg:mx-0">
                  We believe yoga is not just a practice, but a clinical science of the self. Our therapy protocols are designed to reverse modern lifestyle ailments through traditional somatics.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-10">
                {[
                  { title: "Somatic Healing", desc: "Scientific sequencing focused on chronic pain recovery and structural integrity." },
                  { title: "Mental Lucidity", desc: "Mindfulness protocols that recalibrate the nervous system for peak cognitive clarity." }
                ].map((item, i) => (
                  <div key={i} className="space-y-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto lg:mx-0">
                      <Star size={18} />
                    </div>
                    <h4 className="font-bold text-lg">{item.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed italic">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl relative z-10"
              >
                <img 
                  src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1000" 
                  alt="Atmospheric Yoga" 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
              </motion.div>
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-primary/20 blur-[80px] rounded-full" />
              <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-accent/20 blur-[80px] rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* CURRICULUM BENTO */}
      <section className="py-32 bg-secondary/10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20 text-center md:text-left">
            <div className="space-y-4">
              <span className="text-primary font-bold uppercase tracking-[0.4em] text-[10px]">Curated Programs</span>
              <h2 className="text-5xl md:text-7xl font-heading leading-tight leading-none tracking-tighter">
                Explore The <span className="italic font-light">Curriculum</span>
              </h2>
            </div>
            <Link href="/programs">
              <Button variant="link" className="text-primary font-bold uppercase tracking-[0.3em] text-[10px] group">
                View All Programs <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={14} />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-12 gap-8">
            {programs.slice(0, 3).map((program, idx) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className={`${idx === 0 ? 'md:col-span-12 lg:col-span-8' : 'md:col-span-6 lg:col-span-4'}`}
              >
                <Link href={`/programs/${program.id}`}>
                  <div className="group h-[400px] md:h-[500px] bg-white rounded-[3rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-700 relative cursor-pointer">
                    <img 
                      src={program.image} 
                      alt={program.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3s]" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-10 left-10 right-10 space-y-4">
                      <span className="px-3 py-1 rounded-full bg-primary/20 backdrop-blur-md text-primary text-[9px] font-bold uppercase tracking-widest border border-white/5">
                        {program.category}
                      </span>
                      <h3 className="text-3xl md:text-4xl font-heading text-white">{program.title}</h3>
                      <p className="text-white/60 text-sm font-light line-clamp-2">{program.description}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW INTEGRATED SECTIONS */}
      <InstructorProfile />
      <GoogleReviews />
      <PremiumTestimonials />

      {/* FINAL CALL TO RADIANCE */}
      <section className="py-40 bg-foreground text-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary rounded-full blur-[150px] -mr-96 -mt-96" />
          <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-accent rounded-full blur-[150px] -ml-96 -mb-96" />
        </div>

        <div className="container mx-auto px-6 text-center space-y-16 relative z-10">
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full border border-white/20 flex items-center justify-center text-primary opacity-50">
              <ArrowRight className="rotate-[-45deg]" size={32} />
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <h2 className="text-5xl md:text-8xl font-heading text-white max-w-5xl mx-auto leading-[0.9] tracking-tighter">
              Begin Your Journey to <br/>
              <span className="italic font-light opacity-80">Absolute Radiance</span>
            </h2>
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="/register">
                <Button size="lg" className="rounded-full px-12 h-16 text-xl bg-primary text-white hover:bg-white hover:text-primary transition-all duration-500 shadow-2xl">
                  Enroll Today
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="rounded-full px-12 h-16 text-xl border-white/20 text-white hover:bg-white/10 transition-all duration-500">
                  Contact Studio
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
