import { motion } from "motion/react";
import { useState } from "react";
import { X } from "lucide-react";

const images = [
  { url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800", title: "Morning Flow" },
  { url: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800", title: "Meditation Space" },
  { url: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=800", title: "Studio Interior" },
  { url: "https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&q=80&w=800", title: "Advanced Practice" },
  { url: "https://images.unsplash.com/photo-1528319725582-ddc096101511?auto=format&fit=crop&q=80&w=800", title: "Zen Garden" },
  { url: "https://images.unsplash.com/photo-1518611012118-2969c6360227?auto=format&fit=crop&q=80&w=800", title: "Group Session" },
  { url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=800", title: "Strength Training" },
  { url: "https://images.unsplash.com/photo-1510894347713-fc3ed6fdf539?auto=format&fit=crop&q=80&w=800", title: "Sunset Yoga" },
  { url: "https://images.unsplash.com/photo-1591343395582-99bf4ebc0464?auto=format&fit=crop&q=80&w=800", title: "Pranayama" },
];

export default function Gallery() {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center space-y-6 mb-24">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-none"
          >
            Studio <span className="text-primary italic font-heading">Life</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground max-w-2xl mx-auto text-xl font-light leading-relaxed italic"
          >
            A glimpse into the sanctuary where somatic excellence and inner radiance converge.
          </motion.p>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="relative group cursor-pointer overflow-hidden rounded-[2rem] shadow-lg"
              onClick={() => setSelectedImg(img.url)}
            >
              <img
                src={img.url}
                alt={img.title}
                className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <p className="text-white font-heading text-2xl font-bold">{img.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImg && (
        <div 
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-6"
          onClick={() => setSelectedImg(null)}
        >
          <button className="absolute top-10 right-10 text-white hover:text-primary transition-colors">
            <X size={40} />
          </button>
          <motion.img
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            src={selectedImg}
            className="max-w-full max-h-full rounded-3xl object-contain"
          />
        </div>
      )}
    </div>
  );
}
