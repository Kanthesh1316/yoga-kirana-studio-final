import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { format } from "date-fns";
import { Calendar as CalendarIcon, CheckCircle2, Send, User, Phone, Mail, MapPin, Activity, Ruler, Weight, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  dob: z.date({
    message: "Date of birth is required",
  }),
  ageRange: z.enum(["7-15", "15-25", "25-40", "40-60", "60 above"], {
    message: "Please select an age range",
  }),
  gender: z.enum(["Male", "Female"], {
    message: "Please select your gender",
  }),
  address: z.string().min(10, "Address must be at least 10 characters"),
  mobileNumber: z.string().min(10, "Mobile number must be at least 10 digits"),
  email: z.string().email("Invalid email address"),
  healthCondition: z.string().min(5, "Please describe your health condition"),
  height: z.string().min(1, "Height is required"),
  weight: z.string().min(1, "Weight is required"),
  occupation: z.string().min(2, "Occupation is required"),
});

export default function Register() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [registrationId, setRegistrationId] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      address: "",
      mobileNumber: "",
      email: "",
      healthCondition: "",
      height: "",
      weight: "",
      occupation: "",
      gender: "Female",
      ageRange: "25-40",
      dob: new Date(),
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const contentType = response.headers.get("content-type");
      
      // Check if server is returning HTML (warmup page)
      if (contentType && contentType.includes("text/html")) {
        console.warn("⚠️ Server is still warming up. Retrying in 3 seconds...");
        toast.info("Server is starting up. Please wait a moment...");
        await new Promise(resolve => setTimeout(resolve, 3000));
        return onSubmit(values); // Retry once
      }

      let result;
      if (contentType && contentType.includes("application/json")) {
        try {
          result = await response.json();
        } catch (e) {
          console.error("Failed to parse JSON response");
          throw new Error("Server error: Invalid JSON response.");
        }
      } else {
        throw new Error("Server error: Received HTML instead of JSON. This usually happens when the server crashes or the database is unreachable.");
      }

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Registration failed.");
      }

      setRegistrationId(result.registrationId);
      setIsSubmitted(true);
      form.reset();
    } catch (error) {
      console.error("Error submitting registration:", error);
      alert(error instanceof Error ? error.message : "Registration failed. Please try again later.");
    }
  }

  return (
    <div className="pt-32 pb-20 bg-secondary/10">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center space-y-6 mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold tracking-tight"
          >
            Program <span className="text-primary italic">Registration</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground max-w-2xl mx-auto text-lg"
          >
            Join the Yoga Kirana family. Please fill out the details below to register for our programs.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-none shadow-2xl rounded-[3rem] overflow-hidden bg-white">
            <CardContent className="p-8 md:p-16">
              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center space-y-8 py-12"
                >
                  <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto">
                    <CheckCircle2 size={56} />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-4xl font-bold">Registration Successful!</h3>
                    <p className="text-muted-foreground text-lg max-w-md mx-auto">
                      Thank you for registering. We have received your details and will contact you shortly via WhatsApp and Email.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      variant="outline" 
                      className="rounded-full px-8 h-12"
                      onClick={() => setIsSubmitted(false)}
                    >
                      Register another person
                    </Button>
                    {registrationId && (
                      <Link href={`/profile/${registrationId}`}>
                        <Button className="rounded-full px-8 h-12">
                          View Your Profile
                        </Button>
                      </Link>
                    )}
                  </div>
                </motion.div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
                    <div className="grid md:grid-cols-2 gap-8">
                      {/* Full Name */}
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <User size={16} className="text-primary" /> FULL NAME *
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your full name" {...field} className="rounded-xl h-12 bg-secondary/20 border-none" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Date of Birth */}
                      <FormField
                        control={form.control}
                        name="dob"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel className="flex items-center gap-2 mb-2">
                              <CalendarIcon size={16} className="text-primary" /> DATE OF BIRTH *
                            </FormLabel>
                            <Popover>
                              <PopoverTrigger render={(props) => (
                                <Button
                                  {...props}
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal rounded-xl h-12 bg-secondary/20 border-none",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              )} />
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date > new Date() || date < new Date("1900-01-01")
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      {/* Age Range */}
                      <FormField
                        control={form.control}
                        name="ageRange"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Age *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="rounded-xl h-12 bg-secondary/20 border-none">
                                  <SelectValue placeholder="Select age range" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="7-15">7 - 15</SelectItem>
                                <SelectItem value="15-25">15 - 25</SelectItem>
                                <SelectItem value="25-40">25 - 40</SelectItem>
                                <SelectItem value="40-60">40 - 60</SelectItem>
                                <SelectItem value="60 above">60 above</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Gender */}
                      <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>Gender *</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                value={field.value}
                                className="flex gap-6"
                              >
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="Male" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Male
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="Female" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Female
                                  </FormLabel>
                                </FormItem>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Address */}
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <MapPin size={16} className="text-primary" /> Address *
                          </FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Enter your full address" 
                              {...field} 
                              className="rounded-xl min-h-[100px] bg-secondary/20 border-none"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid md:grid-cols-2 gap-8">
                      {/* Mobile Number */}
                      <FormField
                        control={form.control}
                        name="mobileNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <Phone size={16} className="text-primary" /> Mobile Number *
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="+91 00000 00000" {...field} className="rounded-xl h-12 bg-secondary/20 border-none" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Email ID */}
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <Mail size={16} className="text-primary" /> Email ID *
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="example@email.com" {...field} className="rounded-xl h-12 bg-secondary/20 border-none" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Health Condition */}
                    <FormField
                      control={form.control}
                      name="healthCondition"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Activity size={16} className="text-primary" /> Present Health condition *
                          </FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Describe any existing health issues or concerns" 
                              {...field} 
                              className="rounded-xl min-h-[100px] bg-secondary/20 border-none"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid md:grid-cols-3 gap-8">
                      {/* Height */}
                      <FormField
                        control={form.control}
                        name="height"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <Ruler size={16} className="text-primary" /> Height *
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. 170 cm" {...field} className="rounded-xl h-12 bg-secondary/20 border-none" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Weight */}
                      <FormField
                        control={form.control}
                        name="weight"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <Weight size={16} className="text-primary" /> Weight *
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. 65 kg" {...field} className="rounded-xl h-12 bg-secondary/20 border-none" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Occupation */}
                      <FormField
                        control={form.control}
                        name="occupation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <Briefcase size={16} className="text-primary" /> Occupation *
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="Your profession" {...field} className="rounded-xl h-12 bg-secondary/20 border-none" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Button type="submit" className="w-full rounded-full h-16 text-xl font-bold shadow-2xl shadow-primary/30 hover:scale-[1.02] transition-transform">
                      Complete Registration <Send className="ml-2" size={20} />
                    </Button>
                  </form>
                </Form>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
