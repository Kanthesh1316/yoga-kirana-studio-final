import { motion } from "motion/react";
import { programs } from "@/data/programs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Clock, MapPin, IndianRupee, Filter } from "lucide-react";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Programs() {
  const [filter, setFilter] = useState<'All' | 'General' | 'Therapy'>('All');

  const filteredPrograms = filter === 'All' 
    ? programs 
    : programs.filter(p => p.category === filter);

  return (
    <div className="pt-32 pb-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative">
        {/* Abstract Background Shapes */}
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -z-10" />
        <div className="absolute top-1/2 -left-20 w-80 h-80 bg-accent/20 rounded-full blur-[100px] -z-10" />

        <div className="flex flex-col lg:flex-row justify-between items-end gap-12 mb-24">
          <div className="space-y-6 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full text-primary text-[10px] uppercase font-bold tracking-[0.2em]"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Somatic Excellence
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.8] mb-4"
            >
              The <span className="text-primary italic font-heading">Curriculum</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-muted-foreground font-light leading-relaxed max-w-2xl"
            >
              Architecting your transformation through specialized protocols that bridge ancient discipline with contemporary somatic science.
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full lg:w-auto"
          >
            <Tabs defaultValue="All" className="w-full" onValueChange={(v) => setFilter(v as any)}>
              <TabsList className="inline-flex h-14 p-1 bg-secondary/20 rounded-2xl items-center">
                {(["All", "General", "Therapy"] as const).map(tab => (
                  <TabsTrigger 
                    key={tab} 
                    value={tab} 
                    className="rounded-xl h-full px-8 text-xs uppercase tracking-widest font-bold data-[state=active]:bg-white data-[state=active]:shadow-xl active:scale-95 transition-all"
                  >
                    {tab}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-x-20 gap-y-32">
          {filteredPrograms.map((program, index) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.1,
                ease: [0.21, 0.47, 0.32, 0.98]
              }}
              className="relative group"
            >
              <Link href={`/programs/${program.id}`}>
                <div className="cursor-pointer space-y-10">
                  {/* High-End Card Design */}
                  <div className="relative aspect-[16/10] overflow-hidden rounded-[4rem] group-hover:rounded-[2rem] transition-all duration-1000 ease-in-out shadow-2xl">
                    <img
                      src={program.image}
                      alt={program.title}
                      className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-[2000ms] ease-out"
                    />
                    {/* Minimalist Overlay */}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700" />
                    
                    <div className="absolute top-10 left-10 flex flex-col gap-2">
                       <span className="text-[10px] text-white/80 font-bold uppercase tracking-[0.4em] opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700">
                        Curated Series
                      </span>
                    </div>

                    <div className="absolute bottom-10 right-10">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-primary translate-y-20 group-hover:translate-y-0 transition-transform duration-700 rotate-45 group-hover:rotate-0">
                        <ArrowRight size={28} />
                      </div>
                    </div>
                  </div>

                  <div className="px-4 space-y-6">
                    <div className="flex justify-between items-end">
                      <div className="space-y-3">
                        <div className="flex items-center gap-4">
                          <span className="text-[11px] font-bold text-primary uppercase tracking-widest">{program.category}</span>
                          <div className="w-1.5 h-1.5 rounded-full bg-primary/20" />
                          <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-widest">{program.duration}</span>
                        </div>
                        <h3 className="text-5xl md:text-6xl font-heading font-medium tracking-tighter leading-none">
                          {program.title}
                        </h3>
                      </div>
                      <div className="text-right pb-1">
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1">Investment</p>
                        <p className="text-2xl font-light">₹{program.price}</p>
                      </div>
                    </div>
                    
                    <div className="h-px w-full bg-primary/5" />
                    
                    <p className="text-xl text-muted-foreground/80 font-light leading-relaxed max-w-2xl line-clamp-3 italic">
                      "{program.description}"
                    </p>

                    <div className="flex gap-12 pt-2">
                      <div className="flex flex-col gap-1">
                        <span className="text-[9px] uppercase tracking-widest font-bold text-primary/60">Module Types</span>
                        <span className="text-sm font-medium">{program.tiers.length} Discrete Levels</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[9px] uppercase tracking-widest font-bold text-primary/60">Delivery Mode</span>
                        <span className="text-sm font-medium">{program.mode} Sessions</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
