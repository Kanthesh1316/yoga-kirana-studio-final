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
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center space-y-6 mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold tracking-tight"
          >
            Our <span className="text-primary italic">Programs</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground max-w-2xl mx-auto text-lg"
          >
            Explore our wide range of yoga and therapy programs designed to cater to every individual's wellness journey.
          </motion.p>
        </div>

        <div className="flex flex-col items-center gap-12">
          <Tabs defaultValue="All" className="w-full max-w-md mx-auto" onValueChange={(v) => setFilter(v as any)}>
            <TabsList className="grid w-full grid-cols-3 rounded-full h-12 p-1 bg-secondary/30">
              <TabsTrigger value="All" className="rounded-full">All</TabsTrigger>
              <TabsTrigger value="General" className="rounded-full">General</TabsTrigger>
              <TabsTrigger value="Therapy" className="rounded-full">Therapy</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {filteredPrograms.map((program, index) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.5, 
                  delay: (index % 3) * 0.1,
                  ease: [0.21, 0.47, 0.32, 0.98] 
                }}
                className="group"
              >
                <Card className="overflow-hidden border-none shadow-xl rounded-[2.5rem] bg-white h-full flex flex-col">
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img
                      src={program.image}
                      alt={program.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 right-4 px-4 py-1.5 bg-white/90 backdrop-blur-sm text-primary text-xs font-bold rounded-full shadow-sm">
                      {program.category}
                    </div>
                  </div>
                  <CardContent className="p-8 flex flex-col flex-1 space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">{program.title}</h3>
                      <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
                        {program.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                      <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                        <Clock size={14} className="text-primary" />
                        <span>{program.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                        <MapPin size={14} className="text-primary" />
                        <span>{program.mode}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                        <IndianRupee size={14} className="text-primary" />
                        <span>From ₹{program.price}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                        <Filter size={14} className="text-primary" />
                        <span>{program.tiers.length} Tiers</span>
                      </div>
                    </div>

                    <div className="pt-4 mt-auto">
                      <Link href={`/programs/${program.id}`}>
                        <Button className="w-full rounded-full group-hover:bg-primary/90 transition-all">
                          View Details <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
