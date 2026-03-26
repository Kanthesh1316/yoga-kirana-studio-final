import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useRoute } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, Phone, MapPin, Activity, Ruler, Weight, Briefcase, Calendar as CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";

interface RegistrationData {
  fullName: string;
  dob: string;
  ageRange: string;
  gender: string;
  address: string;
  mobileNumber: string;
  email: string;
  healthCondition: string;
  height: string;
  weight: string;
  occupation: string;
  createdAt: string;
}

export default function Profile() {
  const [, params] = useRoute<{ id: string }>("/profile/:id");
  const [data, setData] = useState<RegistrationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      const id = params?.id;
      if (!id) return;
      try {
        const response = await fetch(`/api/registration/${id}`);
        const result = await response.json();
        if (result.success) {
          setData(result.registration);
        } else {
          setError(result.message || "Failed to load profile.");
        }
      } catch (err) {
        setError("An error occurred while fetching the profile.");
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, [params?.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center p-6">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-destructive">Error</h1>
          <p className="text-muted-foreground">{error || "Profile not found."}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 bg-secondary/10 min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="text-center space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">User <span className="text-primary italic">Profile</span></h1>
            <p className="text-muted-foreground">Your registered information at Yoga Kirana Studio</p>
          </div>

          <Card className="border-none shadow-2xl rounded-[3rem] overflow-hidden bg-white">
            <CardHeader className="bg-primary text-white p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-white border-4 border-white/30">
                  <User size={48} />
                </div>
                <div className="text-center md:text-left space-y-1">
                  <CardTitle className="text-3xl md:text-4xl font-bold">{data.fullName}</CardTitle>
                  <p className="text-primary-foreground/80 font-medium uppercase tracking-widest text-sm">{data.occupation}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-12">
                {/* Personal Details */}
                <div className="space-y-8">
                  <h3 className="text-xl font-bold border-b pb-2">Personal Details</h3>
                  <div className="space-y-4">
                    <ProfileItem icon={CalendarIcon} label="Date of Birth" value={format(new Date(data.dob), "PPP")} />
                    <ProfileItem icon={User} label="Age Range" value={data.ageRange} />
                    <ProfileItem icon={User} label="Gender" value={data.gender} />
                    <ProfileItem icon={Briefcase} label="Occupation" value={data.occupation} />
                  </div>
                </div>

                {/* Contact Details */}
                <div className="space-y-8">
                  <h3 className="text-xl font-bold border-b pb-2">Contact Details</h3>
                  <div className="space-y-4">
                    <ProfileItem icon={Mail} label="Email Address" value={data.email} />
                    <ProfileItem icon={Phone} label="Mobile Number" value={data.mobileNumber} />
                    <ProfileItem icon={MapPin} label="Address" value={data.address} />
                  </div>
                </div>

                {/* Health & Physical */}
                <div className="space-y-8 md:col-span-2">
                  <h3 className="text-xl font-bold border-b pb-2">Health & Physical Information</h3>
                  <div className="grid md:grid-cols-3 gap-8">
                    <ProfileItem icon={Ruler} label="Height" value={data.height} />
                    <ProfileItem icon={Weight} label="Weight" value={data.weight} />
                    <div className="md:col-span-1">
                      <ProfileItem icon={Activity} label="Health Condition" value={data.healthCondition} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t text-center">
                <p className="text-xs text-muted-foreground uppercase tracking-widest">
                  Registered on {format(new Date(data.createdAt), "PPP p")}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

function ProfileItem({ icon: Icon, label, value }: { icon: any, label: string, value: string }) {
  return (
    <div className="flex gap-4 items-start">
      <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
        <Icon size={20} />
      </div>
      <div>
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">{label}</p>
        <p className="font-medium text-foreground leading-relaxed">{value}</p>
      </div>
    </div>
  );
}
