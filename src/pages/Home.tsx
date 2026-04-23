import { motion } from "motion/react";
import { ArrowRight, CheckCircle2, Star, Users, Heart, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { programs } from "@/data/programs";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0">
          <motion.div 
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.15 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="w-full h-full"
          >
            <img
              src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1920"
              alt="Yoga Practice"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/60 to-background" />
        </div>

        {/* Content Container */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full glass border border-primary/10 text-primary text-xs font-bold uppercase tracking-widest">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  Experience Inner Radiance
                </div>
                <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.85] tracking-tighter text-balance">
                  Master the Art of <span className="text-primary font-heading italic block mt-2">Conscious Living</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed font-light">
                  Join South India&apos;s premier boutique yoga studio. Led by <span className="text-foreground font-medium">International record holders</span>, we blend traditional wisdom with luxury wellness.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex flex-wrap gap-6 items-center"
              >
                <Link href="/register">
                  <Button size="lg" className="rounded-full px-10 h-16 text-lg shadow-2xl shadow-primary/20 hover:scale-105 transition-transform">
                    Start Your Path <ArrowRight className="ml-2" size={20} />
                  </Button>
                </Link>
                <Link href="/programs">
                  <Button size="lg" variant="ghost" className="rounded-full px-8 h-16 text-lg hover:bg-primary/5">
                    Explore Programs
                  </Button>
                </Link>
              </motion.div>

              {/* Social Proof */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="flex items-center gap-8 pt-8 border-t border-primary/10 max-w-sm"
              >
                <div className="flex -space-x-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-14 h-14 rounded-full border-4 border-background overflow-hidden shadow-lg">
                      <img src={`https://i.pravatar.cc/150?u=yoga${i}`} alt="Practitioner" className="w-full h-full object-cover" />
                    </div>
                  ))}
                  <div className="w-14 h-14 rounded-full border-4 border-background bg-accent flex items-center justify-center text-xs font-bold shadow-lg">
                    +500
                  </div>
                </div>
                <div>
                  <p className="text-sm font-bold">Trusted by 500+ Seekers</p>
                  <div className="flex gap-0.5 text-primary">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={12} fill="currentColor" />)}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Visual Column */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative hidden lg:block"
            >
              <div className="relative z-10 glass p-4 rounded-[4rem] shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1200"
                  alt="Yoga Pose"
                  className="w-full aspect-[4/5] object-cover rounded-[3rem]"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              {/* Floating Cards */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-12 -right-8 glass p-6 rounded-[2rem] z-20 shadow-2xl backdrop-blur-xl border-white/40"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg">
                    <Heart size={28} />
                  </div>
                  <div>
                    <p className="text-xs text-primary font-bold uppercase tracking-tighter">Holistic Care</p>
                    <p className="text-xl font-heading font-bold">Therapeutic Yoga</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity, delay: 1, ease: "easeInOut" }}
                className="absolute -bottom-12 -left-8 glass p-6 rounded-[2rem] z-20 shadow-2xl backdrop-blur-xl border-white/40"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-accent rounded-2xl flex items-center justify-center text-primary shadow-lg">
                    <ShieldCheck size={28} />
                  </div>
                  <div>
                    <p className="text-xs text-primary font-bold uppercase tracking-tighter">Certification</p>
                    <p className="text-xl font-heading font-bold">AYUSH Standard</p>
                  </div>
                </div>
              </motion.div>

              {/* Decorative Elements */}
              <div className="absolute top-1/2 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-[80px] -z-10" />
              <div className="absolute bottom-1/4 -left-20 w-40 h-40 bg-accent/30 rounded-full blur-[80px] -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats/Logo Rail */}
      <div className="py-12 border-y border-primary/10 bg-secondary/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-center justify-items-center">
            {[
              { label: "Experience", value: "15+ Years" },
              { label: "Certifications", value: "International" },
              { label: "Students", value: "5000+" },
              { label: "Awards", value: "50+ Gold" }
            ].map((stat, i) => (
              <div key={i} className="text-center group">
                <p className="text-4xl font-heading font-medium text-primary mb-1 group-hover:scale-110 transition-transform">{stat.value}</p>
                <p className="text-xs uppercase tracking-[0.2em] font-bold text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* About Section - Profile Focus */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
          <div className="relative group">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl"
            >
              <img
                src="https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&q=80&w=800"
                alt="Studio Practice"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-primary/20 mix-blend-overlay" />
            </motion.div>
            
            {/* Achievement Ribbon */}
            <motion.div 
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
              className="absolute -right-8 bottom-12 glass-dark p-8 rounded-[2rem] text-white max-w-[280px] shadow-2xl border-white/5"
            >
              <Star className="text-accent mb-4" size={32} fill="currentColor" />
              <p className="text-sm font-bold uppercase tracking-widest text-accent mb-2">Record Holder</p>
              <p className="text-xl font-heading leading-tight italic">Guinness World Record attempt & National Participant</p>
            </motion.div>
          </div>

          <div className="space-y-10">
            <div className="space-y-4">
              <span className="text-primary font-bold uppercase tracking-[0.3em] text-xs">The Lineage</span>
              <h2 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight">
                Crafted by <span className="italic font-heading">Masters</span> of the Craft
              </h2>
            </div>
            
            <p className="text-xl text-muted-foreground leading-relaxed font-light">
              Founded on the principles of <span className="text-foreground italic">Kirana</span> (Ray of Light), our studio represents the pinnacle of yogic education in the region. Our lead instructor holds prestigious titles including <span className="text-primary font-medium">Karnataka State Yoga Referee</span> and international recognition.
            </p>

            <div className="grid sm:grid-cols-2 gap-8 pt-4">
              <div className="space-y-4 p-6 glass rounded-3xl">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary">
                  <Star size={20} />
                </div>
                <h4 className="font-bold text-lg">Accolades</h4>
                <p className="text-sm text-muted-foreground leading-relaxed italic">National Winner & multi-time Yoga Champion (2024-25), recognizing supreme technical mastery.</p>
              </div>
              <div className="space-y-4 p-6 glass rounded-3xl">
                <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center text-primary">
                  <ShieldCheck size={20} />
                </div>
                <h4 className="font-bold text-lg">Honors</h4>
                <p className="text-sm text-muted-foreground leading-relaxed italic">Recipient of "Aadi Yogi Yoga Bhushan" & "Yoga Jyothi" for exceptional service and teaching excellence.</p>
              </div>
            </div>

            <div className="pt-6">
              <Link href="/contact">
                <Button className="rounded-full px-10 h-14 bg-foreground text-background hover:bg-foreground/90 transition-all font-bold">
                  Consult an Expert
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Our Offerings / Bento Programs Preview */}
      <section className="section-padding bg-secondary/20 relative overflow-hidden">
        {/* Subtle decorative background element */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-20">
            <div className="space-y-4 max-w-2xl">
              <span className="text-primary font-bold uppercase tracking-[0.4em] text-[10px]">The Curriculum</span>
              <h2 className="text-5xl md:text-7xl font-heading leading-[0.9] tracking-tight">
                Our <span className="italic font-light">Offerings</span>
              </h2>
              <p className="text-muted-foreground text-xl font-light leading-relaxed max-w-lg pt-2">
                We bridge ancient discipline with contemporary needs through meticulously crafted protocols.
              </p>
            </div>
            <Link href="/programs">
              <Button variant="outline" className="rounded-full border-primary/20 hover:border-primary hover:bg-transparent px-10 h-14 group transition-all">
                Explore Full Curriculum <ArrowRight size={16} className="ml-2 group-hover:translate-x-2 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
            {programs.slice(0, 3).map((program, idx) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className={`${idx === 0 ? 'md:col-span-12 lg:col-span-7' : idx === 1 ? 'md:col-span-6 lg:col-span-5' : 'md:col-span-6 lg:col-span-12'} group`}
              >
                <Link href={`/programs/${program.id}`}>
                  <Card className="h-full overflow-hidden border-none shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] rounded-[2.5rem] bg-card hover:shadow-[0_48px_80px_-16px_rgba(0,0,0,0.12)] transition-all duration-500 cursor-pointer">
                    <div className={`flex flex-col ${idx === 0 ? 'lg:flex-row h-full' : ''}`}>
                      {/* Image Container with specific proportions for bento feel */}
                      <div className={`relative overflow-hidden ${idx === 0 ? 'lg:w-1/2 aspect-[16/10] lg:aspect-auto' : 'aspect-[16/10]'}`}>
                        <img
                          src={program.image}
                          alt={program.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute top-6 left-6">
                          <span className="px-5 py-2 glass-dark text-white text-[9px] font-bold rounded-full uppercase tracking-[0.2em] border-white/10">
                            {program.category}
                          </span>
                        </div>
                      </div>

                      {/* Content Area */}
                      <CardContent className={`p-8 md:p-12 flex flex-col justify-center ${idx === 0 ? 'lg:w-1/2' : ''}`}>
                        <div className="space-y-6">
                          <h3 className="text-3xl md:text-4xl font-heading leading-tight group-hover:text-primary transition-colors duration-300">
                            {program.title}
                          </h3>
                          <p className="text-muted-foreground text-lg font-light leading-relaxed line-clamp-3">
                            {program.description}
                          </p>
                          <div className="pt-4">
                            <div className="inline-flex items-center gap-3 text-primary font-bold text-xs uppercase tracking-[0.3em] group/btn">
                              View Details 
                              <span className="w-8 h-[1px] bg-primary/30 group-hover/btn:w-12 transition-all duration-300" />
                              <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophical Hook Section */}
      <section className="py-32 bg-foreground text-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 blur-3xl pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent rounded-full" />
        </div>
        
        <div className="max-w-[1000px] mx-auto text-center px-6 relative z-10 space-y-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="space-y-8"
          >
            <h2 className="text-5xl md:text-7xl font-heading font-medium tracking-tight leading-tight italic">
              "Yoga is the journey of the self, through the self, to the self."
            </h2>
            <div className="w-20 h-0.5 bg-primary mx-auto" />
            <p className="text-background/50 font-bold uppercase tracking-[0.4em] text-xs">Bhagavad Gita</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 text-left">
            {[
              { icon: Heart, title: "Cardio Vitality", desc: "Scientific sequencing that optimizes respiratory and heart health." },
              { icon: ShieldCheck, title: "Somatic Healing", desc: "Targeted therapy for chronic pain and structural alignment." },
              { icon: Users, title: "Sacred Space", desc: "A supportive sanctuary for personal and spiritual growth." },
              { icon: Star, title: "Cognitive Focus", desc: "Mindfulness techniques that sharpen focus and reduce anxiety." }
            ].map((benefit, i) => (
              <div key={i} className="space-y-4">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6 border border-white/10 group-hover:bg-primary transition-colors">
                  <benefit.icon size={24} className="text-primary" />
                </div>
                <h3 className="text-lg font-bold">{benefit.title}</h3>
                <p className="text-background/60 text-sm leading-relaxed font-light italic">
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Highlight / Studio Life Auto-Slider */}
      <section className="py-24 bg-card/50 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 mb-16 flex flex-col md:flex-row justify-between items-baseline gap-6 relative z-10 text-center md:text-left">
          <div className="space-y-2">
            <span className="text-primary font-bold uppercase tracking-[0.4em] text-[10px]">On The Floor</span>
            <h2 className="text-5xl md:text-6xl font-heading leading-none">Studio <span className="italic font-light">Life</span></h2>
          </div>
          <Link href="/gallery">
            <Button variant="link" className="text-primary font-bold uppercase tracking-[0.3em] text-[10px] group">
              View Collection <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="relative flex overflow-hidden">
          {/* First Marquee Row */}
          <motion.div 
            className="flex gap-8 whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {[
              "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b",
              "https://images.unsplash.com/photo-1599447421416-3414500d18a5",
              "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c",
              "https://images.unsplash.com/photo-1506126613408-eca07ce68773",
              "https://images.unsplash.com/photo-1510894347713-fc3ed6fdf539"
            ].map((url, i) => (
              <div 
                key={i} 
                className="w-[80vw] sm:w-[450px] aspect-[4/3] rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-secondary/10 shadow-2xl shrink-0 group grow-0"
              >
                <img 
                  src={`${url}?auto=format&fit=crop&q=80&w=800`} 
                  alt="Studio Life" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s] ease-out" 
                  referrerPolicy="no-referrer" 
                />
              </div>
            ))}
            {/* Duplicate for seamless loop */}
            {[
              "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b",
              "https://images.unsplash.com/photo-1599447421416-3414500d18a5",
              "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c",
              "https://images.unsplash.com/photo-1506126613408-eca07ce68773",
              "https://images.unsplash.com/photo-1510894347713-fc3ed6fdf539"
            ].map((url, i) => (
              <div 
                key={`dup-${i}`} 
                className="w-[80vw] sm:w-[450px] aspect-[4/3] rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-secondary/10 shadow-2xl shrink-0 group grow-0"
              >
                <img 
                  src={`${url}?auto=format&fit=crop&q=80&w=800`} 
                  alt="Studio Life" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s] ease-out" 
                  referrerPolicy="no-referrer" 
                />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ or Membership? Let's do a "Pathways" section */}
      
      {/* Testimonials - Immersive Grid */}
      <section className="section-padding bg-secondary/20 relative">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-5xl md:text-6xl font-bold italic font-heading">Transformed Lives</h2>
            <p className="text-muted-foreground text-lg font-light">Join the ranks of those who found their light.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { name: "Ananya Sharma", role: "Weight Loss Program", text: "I lost 8kg in 2 months with the help of Yoga Kirana. The diet plan and yoga sessions were perfectly balanced." },
              { name: "Rahul Verma", role: "Beginner Yoga", text: "The instructors are so patient. I never thought I could be flexible, but now I can touch my toes!" },
              { name: "Priya Das", role: "Face Yoga", text: "Face yoga has changed my skin texture. I feel more confident and my skin glows naturally now." }
            ].map((t, i) => (
              <motion.div key={i} whileHover={{ y: -10 }}>
                <Card className="p-10 rounded-[3rem] border-none bg-background shadow-xl hover:shadow-2xl transition-all h-full flex flex-col justify-between">
                  <div className="space-y-8">
                    <div className="flex gap-1 text-primary">
                      {[1, 2, 3, 4, 5].map(s => <Star key={s} size={14} fill="currentColor" />)}
                    </div>
                    <p className="text-xl font-heading italic text-foreground leading-relaxed">"{t.text}"</p>
                  </div>
                  <div className="flex items-center gap-5 pt-10">
                    <div className="w-14 h-14 rounded-full bg-primary/20 bg-[url('https://i.pravatar.cc/150')] bg-cover shadow-inner" />
                    <div>
                      <p className="font-bold text-lg">{t.name}</p>
                      <p className="text-xs text-primary font-bold uppercase tracking-widest">{t.role}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Final Hook */}
      <section className="py-32 px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto rounded-[4rem] bg-primary text-white p-12 md:p-24 text-center space-y-12 relative overflow-hidden"
        >
          {/* Decorative Blooms */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -mr-48 -mt-48 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/20 rounded-full blur-[100px] -ml-48 -mb-48 pointer-events-none" />
          
          <div className="space-y-6 relative z-10">
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.85]">
              Begin Your <span className="text-accent italic font-heading">Illumination</span> <br/> 
              <span className="text-4xl md:text-6xl text-white/80">With the Masters</span>
            </h2>
            <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto font-light leading-relaxed">
              Experience the transformative power of authentic Yoga. Limited slots available for personal consultations this month.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 relative z-10">
            <Link href="/register">
              <Button size="lg" className="rounded-full px-12 h-16 text-xl bg-white text-primary hover:bg-white/90 shadow-2xl transition-all">
                Enroll Today
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="rounded-full px-12 h-16 text-xl border-white text-white hover:bg-white hover:text-primary transition-all">
                Chat with Us
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
