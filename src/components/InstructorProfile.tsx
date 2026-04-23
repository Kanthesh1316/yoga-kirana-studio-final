import { motion } from "motion/react";
import { Star, ShieldCheck, Trophy, BadgeCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function InstructorProfile() {
  const achievements = [
    { icon: Trophy, title: "International Record Holder", desc: "Guinness World Record attempt participant & National Yoga Champion." },
    { icon: BadgeCheck, title: "Karnataka State Referee", desc: "Official state-level referee with deep technical judging expertise." },
    { icon: ShieldCheck, title: "Therapy Specialist", desc: "Certified in advanced therapeutic yoga for chronic recovery." },
    { icon: Star, title: "15+ Years Excellence", desc: "A decade and a half of dedicated practice and teaching lineage." },
  ];

  return (
    <section className="py-24 bg-background overflow-hidden" id="instructor-profile">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Image & Main Profile */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&q=80&w=800"
                alt="Lead Instructor"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[3s]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-12 left-12 right-12 space-y-2">
                <p className="text-primary font-bold uppercase tracking-[0.4em] text-xs">Master Teacher</p>
                <h3 className="text-4xl font-heading text-white">Shri Kirana Kumar</h3>
                <p className="text-white/70 italic text-lg font-light">"Yoga is not a destination, but a luminous way of being."</p>
              </div>
            </div>
            
            {/* Experience Floating Badge */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 glass p-8 rounded-[2rem] shadow-2xl border-white/20 z-20"
            >
              <div className="text-center">
                <p className="text-5xl font-heading font-bold text-primary">15+</p>
                <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground mt-1">Years Experience</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Details & Accolades */}
          <div className="space-y-12">
            <div className="space-y-6">
              <span className="text-primary font-bold uppercase tracking-[0.4em] text-[10px]">The Lineage</span>
              <h2 className="text-5xl md:text-6xl font-heading leading-tight leading-none">
                Guided by <br />
                <span className="italic">Profound Mastery</span>
              </h2>
              <p className="text-xl text-muted-foreground font-light leading-relaxed">
                Our approach blends traditional rigor with modern scientific understanding. Every session is an opportunity to touch the infinite through precise alignment and breath work.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-8">
              {achievements.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="border-none shadow-xl rounded-[2.5rem] bg-secondary/5 group hover:bg-primary transition-colors duration-500">
                    <CardContent className="p-8 space-y-4">
                      <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-white/20 group-hover:text-white transition-colors">
                        <item.icon size={24} />
                      </div>
                      <h4 className="font-bold text-lg group-hover:text-white transition-colors">{item.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-white/80 transition-colors">
                        {item.desc}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            
            <div className="flex gap-4 items-center p-6 border border-primary/10 rounded-[2rem] bg-primary/5">
              <div className="flex -space-x-2">
                {[1, 2, 3].map(n => (
                  <div key={n} className="w-10 h-10 rounded-full border-2 border-background overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${n + 10}`} alt="Certification Logo" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <p className="text-sm font-medium">AYUSH Certified & World Records Affiliated</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
