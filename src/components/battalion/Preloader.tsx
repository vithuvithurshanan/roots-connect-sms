import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress counter simulation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 300);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 70);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.95, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col justify-between bg-[#0e1610] p-8 text-[#e8f5e9]"
        >
          {/* Top Brand Mark */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 font-display text-xl font-bold tracking-tight text-lime"
            >
              <span>WOODCREST</span>
              <span className="size-2 rounded-full bg-lime" />
            </motion.div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              className="text-xs uppercase tracking-widest text-white/60"
            >
              Buffalo · NY
            </motion.span>
          </div>

          {/* Center Staggered Text */}
          <div className="my-auto flex flex-col items-center justify-center text-center">
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                className="font-display text-4xl font-extrabold sm:text-6xl md:text-7xl"
              >
                Careful. Precise. Certain.
              </motion.h1>
            </div>
            <div className="mt-3 overflow-hidden">
              <motion.p
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
                className="text-sm font-medium text-lime/90 sm:text-lg"
              >
                Professional Tree Care Services in Western New York
              </motion.p>
            </div>
          </div>

          {/* Bottom Progress Bar & Counter */}
          <div className="flex items-end justify-between border-t border-white/10 pt-4">
            <div className="w-48 sm:w-64">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full bg-lime"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut", duration: 0.1 }}
                />
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-display text-3xl font-bold tracking-tight text-lime sm:text-4xl"
            >
              {Math.min(progress, 100)}%
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
