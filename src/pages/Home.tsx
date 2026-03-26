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
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1920"
            alt="Yoga Practice"
            className="w-full h-full object-cover opacity-20"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/50 to-background" />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
              <Star size={14} />
              <span>Premium Yoga Experience</span>
            </div>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tighter text-balance">
              Transform Your Life with <span className="text-primary italic">Yoga</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
              Discover inner peace and physical strength at Yoga Kirana Studio. Our expert-led programs are designed to heal your body and calm your mind.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/programs">
                <Button size="lg" className="rounded-full px-8 h-14 text-lg">
                  Join Now <ArrowRight className="ml-2" size={18} />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-lg">
                  Book a Trial
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-6 pt-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-background overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?u=${i}`} alt="User" />
                  </div>
                ))}
              </div>
              <p className="text-sm font-medium">
                <span className="text-primary">500+</span> Happy Students
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
              <img
                src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800"
                alt="Yoga Pose"
                className="w-full aspect-[4/5] object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-10 -right-10 glass p-6 rounded-3xl z-20"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center text-primary">
                  <Heart />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Daily Wellness</p>
                  <p className="font-bold">100% Natural</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-10 -left-10 glass p-6 rounded-3xl z-20"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent/20 rounded-2xl flex items-center justify-center text-primary">
                  <ShieldCheck />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Certified</p>
                  <p className="font-bold">Expert Trainers</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="section-padding bg-secondary/20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&q=80&w=400"
                alt="Studio"
                className="rounded-3xl aspect-square object-cover shadow-xl"
              />
              <img
                src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=400"
                alt="Studio"
                className="rounded-3xl aspect-square object-cover mt-8 shadow-xl"
              />
            </div>
            {/* Achievement Badge */}
            <div className="absolute -bottom-6 -right-6 bg-primary text-white p-6 rounded-2xl shadow-2xl max-w-[200px]">
              <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1">Record Holder</p>
              <p className="text-sm font-bold">Nataraj Asana & Nauka Asana</p>
            </div>
          </div>
          <div className="order-1 lg:order-2 space-y-8">
            <div className="space-y-2">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                Meet Your Instructor
              </h2>
              <p className="text-primary font-bold tracking-widest text-sm uppercase">International Gold Medalist & Therapist</p>
            </div>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Led by a world-class expert, Yoga Kirana Studio offers a unique blend of traditional wisdom and therapeutic techniques. Our instructor is a recognized leader in the yoga community with numerous national and international accolades.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-bold text-lg flex items-center gap-2">
                  <Star className="text-primary" size={18} />
                  Championships
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• National Winner (Govt. of Puducherry)</li>
                  <li>• Yoga Champion 2024 & 2025</li>
                  <li>• Karnataka State Yoga Referee</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-bold text-lg flex items-center gap-2">
                  <ShieldCheck className="text-primary" size={18} />
                  Awards
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Aadi Yogi Yoga Bhushan Award</li>
                  <li>• Shourya Award & Seva Rathina</li>
                  <li>• Guru Jyothi & Yoga Jyothi</li>
                </ul>
              </div>
            </div>

            <div className="pt-4">
              <Link href="/contact">
                <Button className="rounded-full px-8">Book a Session with Expert</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Preview */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Our Programs</h2>
              <p className="text-muted-foreground max-w-xl">
                From beginner basics to advanced therapy, we have a program tailored for your specific needs.
              </p>
            </div>
            <Link href="/programs">
              <Button variant="outline" className="rounded-full">View All Programs</Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.slice(0, 3).map((program) => (
              <motion.div
                key={program.id}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Card className="overflow-hidden border-none shadow-lg rounded-[2rem] bg-secondary/10">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={program.image}
                      alt={program.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="p-8 space-y-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-2xl font-bold">{program.title}</h3>
                      <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full uppercase tracking-wider">
                        {program.category}
                      </span>
                    </div>
                    <p className="text-muted-foreground line-clamp-2 text-sm">
                      {program.description}
                    </p>
                    <Link href={`/programs/${program.id}`}>
                      <Button variant="link" className="p-0 h-auto font-bold group">
                        View Details <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding bg-primary text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -ml-48 -mb-48" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center space-y-4 mb-20">
            <h2 className="text-4xl md:text-5xl font-bold">Why Choose Yoga?</h2>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto">
              Yoga is not just about flexibility; it's a path to complete physical and mental well-being.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { icon: Heart, title: "Heart Health", desc: "Improve circulation and reduce cardiovascular risks." },
              { icon: Users, title: "Community", desc: "Join a supportive group of like-minded individuals." },
              { icon: ShieldCheck, title: "Immunity", desc: "Strengthen your body's natural defense systems." },
              { icon: Star, title: "Mental Clarity", desc: "Reduce stress and improve focus through mindfulness." }
            ].map((benefit, i) => (
              <div key={i} className="text-center space-y-4">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <benefit.icon size={32} />
                </div>
                <h3 className="text-xl font-bold">{benefit.title}</h3>
                <p className="text-primary-foreground/70 text-sm leading-relaxed">
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">What Our Students Say</h2>
            <p className="text-muted-foreground">Real stories from our yoga community.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Ananya Sharma", role: "Weight Loss Program", text: "I lost 8kg in 2 months with the help of Yoga Kirana. The diet plan and yoga sessions were perfectly balanced." },
              { name: "Rahul Verma", role: "Beginner Yoga", text: "The instructors are so patient. I never thought I could be flexible, but now I can touch my toes!" },
              { name: "Priya Das", role: "Face Yoga", text: "Face yoga has changed my skin texture. I feel more confident and my skin glows naturally now." }
            ].map((t, i) => (
              <Card key={i} className="p-8 rounded-[2rem] border-none bg-secondary/10 shadow-sm">
                <div className="flex gap-1 text-primary mb-6">
                  {[1, 2, 3, 4, 5].map(s => <Star key={s} size={16} fill="currentColor" />)}
                </div>
                <p className="italic text-muted-foreground mb-8">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20" />
                  <div>
                    <p className="font-bold">{t.name}</p>
                    <p className="text-xs text-primary font-medium">{t.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding px-6">
        <div className="max-w-5xl mx-auto rounded-[3rem] bg-foreground text-background p-12 md:p-20 text-center space-y-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -ml-32 -mt-32" />
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight relative z-10">
            Ready to Start Your <span className="text-primary italic">Transformation?</span>
          </h2>
          <p className="text-lg text-background/70 max-w-2xl mx-auto relative z-10">
            Join Yoga Kirana Studio today and take the first step towards a healthier, happier you.
          </p>
          <div className="flex flex-wrap justify-center gap-4 relative z-10">
            <Link href="/programs">
              <Button size="lg" className="rounded-full px-10 h-14 text-lg bg-primary hover:bg-primary/90">
                Join Now
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="rounded-full px-10 h-14 text-lg border-white/20 hover:bg-white/10">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
