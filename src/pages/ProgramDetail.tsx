import { useRoute, Link } from "wouter";
import { motion } from "motion/react";
import { programs } from "@/data/programs";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  MapPin, 
  IndianRupee, 
  Sparkles,
  Zap,
  ShieldCheck
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function ProgramDetail() {
  const [match, params] = useRoute<{ id: string }>("/programs/:id");
  const program = match && params ? programs.find((p) => p.id === params.id) : undefined;

  if (!program) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <h1 className="text-2xl font-bold">Program not found</h1>
        <Link href="/programs">
          <Button variant="outline">Back to Programs</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <Link href="/programs" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-12 group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Programs</span>
        </Link>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <span className="px-4 py-1.5 bg-primary/10 text-primary text-xs font-bold rounded-full uppercase tracking-widest">
                {program.category} Program
              </span>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight">
                {program.title}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {program.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="glass p-6 rounded-3xl space-y-2">
                <div className="flex items-center gap-2 text-primary">
                  <Calendar size={20} />
                  <span className="font-bold">Duration</span>
                </div>
                <p className="text-muted-foreground font-medium">{program.duration}</p>
              </div>
              <div className="glass p-6 rounded-3xl space-y-2">
                <div className="flex items-center gap-2 text-primary">
                  <Clock size={20} />
                  <span className="font-bold">Schedule</span>
                </div>
                <p className="text-muted-foreground font-medium text-sm">{program.schedule}</p>
              </div>
              <div className="glass p-6 rounded-3xl space-y-2">
                <div className="flex items-center gap-2 text-primary">
                  <MapPin size={20} />
                  <span className="font-bold">Mode</span>
                </div>
                <p className="text-muted-foreground font-medium">{program.mode}</p>
              </div>
              <div className="glass p-6 rounded-3xl space-y-2">
                <div className="flex items-center gap-2 text-primary">
                  <IndianRupee size={20} />
                  <span className="font-bold">Pricing</span>
                </div>
                <p className="text-muted-foreground font-medium">Starts ₹{program.price}</p>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold flex items-center gap-2">
                <Sparkles className="text-primary" /> Key Features
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {program.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-secondary/30 border border-border/50">
                    <Zap size={18} className="text-primary shrink-0" />
                    <span className="font-medium text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link href="/register">
              <Button size="lg" className="w-full md:w-auto rounded-full px-12 h-14 text-lg shadow-xl shadow-primary/20">
                Enroll Now
              </Button>
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-12"
          >
            <div className="rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
              <img
                src={program.image}
                alt={program.title}
                className="w-full aspect-[4/3] object-cover"
              />
            </div>

            <Card className="border-none shadow-xl rounded-[3rem] bg-primary text-white p-10">
              <CardContent className="p-0 space-y-8">
                <h3 className="text-3xl font-bold flex items-center gap-2">
                  <ShieldCheck size={28} /> Program Benefits
                </h3>
                <div className="space-y-4">
                  {program.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-1">
                        <CheckCircle2 size={14} />
                      </div>
                      <p className="text-lg font-medium text-primary-foreground/90">{benefit}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Pricing Tiers Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 space-y-12"
        >
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Choose Your <span className="text-primary italic">Plan</span></h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Select the tier that best fits your goals and commitment level.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {program.tiers.map((tier, i) => (
              <Card key={i} className={`relative overflow-hidden border-none shadow-xl rounded-[3rem] flex flex-col h-full transition-all hover:scale-[1.02] ${i === 1 ? 'bg-primary text-white ring-8 ring-primary/10' : 'bg-white'}`}>
                {i === 1 && (
                  <div className="absolute top-6 right-6 px-4 py-1 bg-white/20 backdrop-blur-md text-xs font-bold rounded-full uppercase tracking-widest">
                    Most Popular
                  </div>
                )}
                <CardContent className="p-10 flex flex-col flex-1 space-y-8">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">{tier.name}</h3>
                    <p className={i === 1 ? 'text-primary-foreground/80' : 'text-muted-foreground'}>{tier.description}</p>
                  </div>

                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold">₹{tier.price}</span>
                    <span className={`text-sm font-medium ${i === 1 ? 'text-primary-foreground/60' : 'text-muted-foreground'}`}>/program</span>
                  </div>

                  <div className="space-y-4 flex-1">
                    <p className={`text-sm font-bold uppercase tracking-widest ${i === 1 ? 'text-primary-foreground/60' : 'text-muted-foreground'}`}>What's Included</p>
                    <div className="space-y-3">
                      {tier.features.map((feature, j) => (
                        <div key={j} className="flex items-center gap-3">
                          <CheckCircle2 size={18} className={i === 1 ? 'text-white' : 'text-primary'} />
                          <span className="text-sm font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link href="/register">
                    <Button className={`w-full rounded-full h-12 font-bold ${i === 1 ? 'bg-white text-primary hover:bg-white/90' : ''}`}>
                      Select {tier.name}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
