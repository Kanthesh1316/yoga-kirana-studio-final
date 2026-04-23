import { motion } from "motion/react";
import { Star, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function GoogleReviews() {
  const reviews = [
    { name: "Anita K.", rating: 5, text: "The therapy sessions for my back pain were miraculous. Professional and clean studio.", date: "2 weeks ago" },
    { name: "Suresh P.", rating: 5, text: "Excellent weight loss yoga program. Lost 5kg and feeling more energetic than ever.", date: "1 month ago" },
    { name: "Megha S.", rating: 5, text: "Best boutique yoga studio in the city. The instructors are world-class experts.", date: "3 weeks ago" },
  ];

  return (
    <section className="py-24 bg-secondary/5 overflow-hidden" id="google-reviews">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-20">
          <div className="space-y-4 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-border text-[10px] font-bold uppercase tracking-widest text-primary">
              <CheckCircle2 size={12} />
              Trusted by Hundreds
            </div>
            <h2 className="text-5xl md:text-6xl font-heading leading-tight">
              Shared <span className="italic">Experiences</span>
            </h2>
          </div>

          <div className="flex flex-col items-center md:items-end gap-2">
            <div className="flex items-center gap-4">
              <span className="text-5xl font-heading font-bold text-foreground">4.9</span>
              <div className="space-y-1">
                <div className="flex text-primary">
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-tighter">Google Rating</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground font-medium italic">Based on 250+ genuine customer reviews</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-10 rounded-[3rem] shadow-[0_20px_40px_-5px_rgba(0,0,0,0.05)] border border-border/50 relative group hover:shadow-2xl transition-all duration-500"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center font-heading text-xl font-bold text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  {review.name.charAt(0)}
                </div>
                <div className="flex text-primary">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
              </div>
              <p className="text-lg font-heading italic text-foreground leading-relaxed mb-6">
                "{review.text}"
              </p>
              <div className="flex justify-between items-center pt-6 border-t border-secondary/10">
                <p className="font-bold text-sm">{review.name}</p>
                <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">{review.date}</p>
              </div>
              
              {/* Trust Badge */}
              <div className="absolute -top-3 -right-3 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center border border-border">
                <ShieldCheck size={18} className="text-[#4285F4]" />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 flex flex-wrap justify-center gap-12 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
           {/* Placeholder for Trust Badges */}
           <div className="flex items-center gap-2 font-bold uppercase tracking-[0.3em] text-[10px]">
             <ShieldCheck size={16} /> Certified AYUSH
           </div>
           <div className="flex items-center gap-2 font-bold uppercase tracking-[0.3em] text-[10px]">
             <ShieldCheck size={16} /> Record Holders
           </div>
           <div className="flex items-center gap-2 font-bold uppercase tracking-[0.3em] text-[10px]">
             <ShieldCheck size={16} /> 100% Authentic
           </div>
        </div>
      </div>
    </section>
  );
}
