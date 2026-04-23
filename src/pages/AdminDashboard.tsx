import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, 
  Trash2, 
  CheckCircle, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  MessageSquare,
  Filter,
  RefreshCcw,
  Loader2,
  ChevronDown,
  ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { format } from "date-fns";

interface Message {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  date: string;
  verified: boolean;
}

export default function AdminDashboard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all"| "verified" | "pending">("all");

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/messages");
      const data = await res.json();
      if (data.success) {
        setMessages(data.messages);
      }
    } catch (err) {
      toast.error("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    try {
      const res = await fetch(`/api/messages/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setMessages(prev => prev.filter(m => m.id !== id));
        toast.success("Message deleted");
      }
    } catch (err) {
      toast.error("Failed to delete message");
    }
  };

  const filteredMessages = messages.filter(m => {
    const matchesSearch = 
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      m.message.toLowerCase().includes(search.toLowerCase());
    
    const matchesFilter = 
      filter === "all" || 
      (filter === "verified" && m.verified) || 
      (filter === "pending" && !m.verified);

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="pt-32 pb-20 bg-secondary/5 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-xs">
              <ShieldCheck size={14} />
              Admin Portal
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Enquiry Management</h1>
          </div>
          <Button onClick={fetchMessages} variant="outline" className="rounded-full gap-2">
            <RefreshCcw size={16} className={loading ? "animate-spin" : ""} />
            Refresh
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="rounded-[2rem] border-none shadow-sm bg-white">
            <CardContent className="pt-6">
              <p className="text-muted-foreground text-sm font-medium">Total Enquiries</p>
              <p className="text-4xl font-bold mt-2">{messages.length}</p>
            </CardContent>
          </Card>
          <Card className="rounded-[2rem] border-none shadow-sm bg-white">
            <CardContent className="pt-6">
              <p className="text-muted-foreground text-sm font-medium">Pending Verification</p>
              <p className="text-4xl font-bold mt-2 text-orange-500">{messages.filter(m => !m.verified).length}</p>
            </CardContent>
          </Card>
          <Card className="rounded-[2rem] border-none shadow-sm bg-white">
            <CardContent className="pt-6">
              <p className="text-muted-foreground text-sm font-medium">Verified Enquiries</p>
              <p className="text-4xl font-bold mt-2 text-primary">{messages.filter(m => m.verified).length}</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <div className="bg-white p-6 rounded-[2.5rem] shadow-sm mb-8 flex flex-col md:flex-row gap-6 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <Input 
              placeholder="Search by name, email or content..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 h-12 rounded-2xl bg-secondary/5 border-none w-full"
            />
          </div>
          <div className="flex gap-2 p-1 bg-secondary/10 rounded-2xl w-full md:w-auto">
            {(["all", "pending", "verified"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`flex-1 md:flex-none px-6 py-2.5 rounded-xl text-sm font-bold capitalize transition-all ${
                  filter === f ? "bg-white shadow-sm text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Messages List */}
        <div className="space-y-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 text-muted-foreground">
              <Loader2 size={48} className="animate-spin mb-4" />
              <p>Fetching messages...</p>
            </div>
          ) : filteredMessages.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-[3rem] border border-dashed text-muted-foreground">
              <MessageSquare size={48} className="mx-auto mb-4 opacity-20" />
              <p className="text-xl">No enquiries found</p>
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {filteredMessages.map((msg) => (
                <motion.div
                  key={msg.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <Card className="rounded-[2.5rem] border-none shadow-sm hover:shadow-md transition-all bg-white group overflow-hidden">
                    <CardContent className="p-8">
                      <div className="flex flex-col lg:flex-row justify-between gap-8">
                        <div className="space-y-6 flex-1">
                          <div className="flex flex-wrap items-center gap-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                              <User size={20} />
                            </div>
                            <div>
                               <h3 className="text-xl font-bold flex items-center gap-3">
                                {msg.name}
                                {msg.verified && <CheckCircle size={18} className="text-primary" />}
                              </h3>
                              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-1">
                                <span className="flex items-center gap-1.5 hover:text-primary transition-colors cursor-pointer capitalize">
                                  <Mail size={14} /> {msg.email}
                                </span>
                                <span className="flex items-center gap-1.5 hover:text-primary transition-colors cursor-pointer">
                                  <Phone size={14} /> {msg.phone}
                                </span>
                                <span className="flex items-center gap-1.5">
                                  <Clock size={14} /> {msg.date ? format(new Date(msg.date), "MMM d, h:mm a") : "N/A"}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="p-6 bg-secondary/5 rounded-3xl relative">
                            <MessageSquare className="absolute -top-3 -left-3 text-secondary/20" size={32} />
                            <p className="text-foreground/80 leading-relaxed font-light">{msg.message}</p>
                          </div>
                        </div>

                        <div className="flex flex-row lg:flex-col gap-3 justify-end lg:border-l lg:pl-8 border-primary/5 min-w-[200px]">
                           <Badge variant={msg.verified ? "default" : "outline"} className="justify-center py-1 rounded-lg min-w-[140px]">
                             {msg.verified ? "Verified ✅" : "Pending Verification"}
                           </Badge>
                          <Button 
                            variant="destructive" 
                            onClick={() => handleDelete(msg.id)}
                            className="rounded-xl gap-2 flex-1 lg:flex-none bg-red-50 text-red-500 hover:bg-red-500 hover:text-white border-none shadow-none"
                          >
                            <Trash2 size={16} /> Delete Enquiry
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
}
