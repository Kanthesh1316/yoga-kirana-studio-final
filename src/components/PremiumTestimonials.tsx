import { motion } from "motion/react";
import { Star, Play, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function PremiumTestimonials() {
  const testimonials = [
    {
      name: "Meera Iyer",
      role: "Yoga Therapy Student",
      improvement: "Reduced chronic lower back pain by 90%",
      text: "The personalized attention at Yoga Kirana is unlike any other studio. Shri Kirana Kumar's understanding of anatomy and therapy is profound.",
      image: "https://i.pravatar.cc/150?img=32"
    },
    {
      name: "Vikram Seth",
      role: "Advanced Practitioner",
      improvement: "Mastered Sirsasana in 3 months",
      text: "I've practiced globally, but the discipline here is authentic. It's a sanctuary for those who are serious about their yogic journey.",
      image: "https://i.pravatar.cc/150?img=12"
    },
    {
      name: "Sanya Chopra",
      role: "Weight Loss Program",
      improvement: "Lost 12kg & Stabilized PCOS",
      text: "The combination of specific asanas and the provided diet plan worked wonders for my health. It's life-changing.",
      image: "https://i.pravatar.cc/150?img=44"
    }
  ];

  return (
    <section className="py-32 bg-foreground text-background overflow-hidden relative" id="testimonials">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] -ml-64 -mb-64" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-20 items-center">
          {/* Left Column: Context & Stats */}
          <div className="lg:col-span-4 space-y-12">
            <div className="space-y-6">
              <span className="text-primary font-bold uppercase tracking-[0.5em] text-[10px]">Voices of Transformation</span>
              <h2 className="text-5xl md:text-6xl font-heading leading-tight leading-none text-white">
                Real Stories, <br />
                <span className="italic font-light">Profound Changes</span>
              </h2>
              <p className="text-background/60 text-xl font-light leading-relaxed">
                Witness the measurable impact of authentic yoga through the experiences of our dedicated students.
              </p>
            </div>

            <div className="space-y-8">
              <div className="p-8 border border-white/10 rounded-[2.5rem] bg-white/5 backdrop-blur-sm group hover:border-primary/50 transition-colors">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-heading font-bold text-primary">500+</span>
                  <span className="text-xs font-bold uppercase tracking-widest text-background/40">Success Stories</span>
                </div>
                <p className="text-sm text-background/60 italic font-light">Documented health improvements across diverse age groups.</p>
              </div>

              <div className="p-8 border border-white/10 rounded-[2.5rem] bg-opacity-5 backdrop-blur-sm group hover:border-primary/50 transition-colors">
                <div className="flex text-primary mb-4">
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-xl font-heading text-white">"Most trusted therapeutic studio in Mysore."</p>
              </div>
            </div>
          </div>

          {/* Right Column: Cards Grid */}
          <div className="lg:col-span-8 flex flex-col gap-8">
             {/* Large Video Placeholder Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-video rounded-[3.5rem] overflow-hidden group shadow-2xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1200" 
                alt="Student Testimonial" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[4s]" 
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-white cursor-pointer shadow-2xl relative"
                >
                  <Play fill="white" size={32} className="ml-1" />
                  <div className="absolute inset-0 rounded-full border border-white/30 animate-ping" />
                </motion.div>
              </div>
              <div className="absolute bottom-10 left-10 right-10">
                <p className="text-white text-2xl font-heading italic leading-relaxed">"The environment here isn't just about fitness; it's a profound sanctuary for the soul."</p>
                <p className="text-primary font-bold uppercase tracking-widest text-xs mt-4">— Dr. Sunidhi R., General Practitioner</p>
              </div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {testimonials.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="border-none bg-white/5 backdrop-blur-xl h-full p-10 rounded-[3rem] relative overflow-hidden group hover:bg-white/10 transition-colors duration-500">
                    <Quote className="absolute top-10 right-10 text-white/5 w-20 h-20 -rotate-12 group-hover:text-primary/10 transition-colors" />
                    
                    <div className="space-y-8 relative z-10">
                      <div className="space-y-2">
                        <div className="px-4 py-1 rounded-full bg-primary/20 text-primary text-[9px] font-bold uppercase tracking-[0.2em] inline-block">
                          {t.improvement}
                        </div>
                        <p className="text-lg font-heading italic text-white/90 leading-relaxed">
                          "{t.text}"
                        </p>
                      </div>

                      <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                        <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                        <div>
                          <p className="font-bold text-white text-base">{t.name}</p>
                          <p className="text-[10px] text-primary font-bold uppercase tracking-widest">{t.role}</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
