import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, ArrowRight, Shield } from "lucide-react";
import { SITE } from "@/lib/site";

const highlights = [
  { label: "Free Estimates Starting at", value: "$0.00", badge: "Instant Quote" },
  { label: "Emergency Storm Cleanup", value: "24/7 Response", badge: "Dispatch Ready" },
  { label: "Average Customer Rating", value: "5.0 ★★★★★", badge: "Licensed & Insured" },
];

export function BattalionBottomTicker() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % highlights.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const current = highlights[currentIndex];

  return (
    <div className="fixed bottom-4 left-4 right-4 z-40 pointer-events-none flex justify-center sm:justify-between items-center max-w-7xl mx-auto">
      {/* Battalion Floating Pill */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-auto flex items-center gap-3 rounded-full border border-white/10 bg-[#0e1610]/90 px-4 py-2.5 shadow-2xl backdrop-blur-lg text-white"
      >
        <span className="flex size-2 rounded-full bg-lime animate-pulse" />
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="flex items-center gap-2 text-xs sm:text-sm font-medium"
          >
            <span className="text-white/60">{current.label}:</span>
            <span className="font-bold text-lime">{current.value}</span>
            <span className="hidden md:inline-block rounded-full bg-lime/20 px-2 py-0.5 text-[10px] uppercase font-semibold text-lime">
              {current.badge}
            </span>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Floating CTA Pill */}
      <motion.a
        href={SITE.phoneHref}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="pointer-events-auto hidden sm:flex items-center gap-2 rounded-full bg-lime px-5 py-2.5 font-display text-xs font-bold text-[#0c140d] shadow-lg transition-transform duration-300 hover:scale-105"
      >
        <Phone className="size-3.5" />
        <span>{SITE.phone}</span>
        <ArrowRight className="size-3.5" />
      </motion.a>
    </div>
  );
}
