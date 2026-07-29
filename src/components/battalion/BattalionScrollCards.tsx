import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { BattalionArrow } from "./BattalionArrow";
import { ShieldCheck, Clock, Star, Award, Zap } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Licensed & Insured",
    subtitle: "Full Protection Guaranteed",
    description: "Complete liability and workers' compensation coverage — insurance certificates provided prior to work.",
    highlight: "100% Covered",
  },
  {
    icon: Clock,
    title: "On Time, Every Time",
    subtitle: "Punctual & Dependable",
    description: "Scheduled service windows we strictly honor, backed by live text updates as your tree project progresses.",
    highlight: "24/7 Response",
  },
  {
    icon: Star,
    title: "Spotless Clean Finish",
    subtitle: "Raked & Cleared",
    description: "Chips hauled, wood neatly stacked per your request, and your property left cleaner than we found it.",
    highlight: "5.0 Rated Crew",
  },
  {
    icon: Award,
    title: "18+ Years WNY Experience",
    subtitle: "Buffalo's Trusted Arborists",
    description: "Over 4,200 trees safely pruned and removed across Erie & Niagara counties with precision equipment.",
    highlight: "4,200+ Serviced",
  },
  {
    icon: Zap,
    title: "Emergency Storm Response",
    subtitle: "Rapid Dispatch",
    description: "Immediate response for storm-damaged trees leaning over roofs, power lines, or driveways.",
    highlight: "Fast Relief",
  },
];

export function BattalionScrollCards() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]);

  return (
    <section ref={targetRef} className="relative h-[250vh] bg-[#0c140d] text-[#e8f5e9]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden px-4">
        <div className="container-page w-full">
          {/* Header */}
          <div className="mb-10 flex flex-col justify-between md:flex-row md:items-end">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-lime">
                The Woodcrest Edge
              </span>
              <h2 className="font-display text-3xl font-bold sm:text-5xl text-white mt-2">
                Why Buffalo Trusts Woodcrest
              </h2>
            </div>
            <p className="mt-4 text-sm text-lime/80 md:mt-0">
              Scroll down to explore our benefits →
            </p>
          </div>

          {/* Horizontal Sliding Cards Container */}
          <motion.div style={{ x }} className="flex gap-6 pt-4">
            {features.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="group relative flex h-[380px] w-[300px] shrink-0 flex-col justify-between rounded-[2.5rem] border border-white/10 bg-white/5 p-8 backdrop-blur-md transition-all duration-500 hover:border-lime/40 hover:bg-white/10 sm:w-[360px]"
                >
                  {/* Top row: Badge & Icon */}
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-lime/20 px-3 py-1 text-xs font-semibold text-lime">
                      {item.highlight}
                    </span>
                    <div className="flex size-12 items-center justify-center rounded-2xl bg-lime/10 text-lime transition-transform duration-500 group-hover:scale-110 group-hover:bg-lime group-hover:text-[#0c140d]">
                      <Icon className="size-6" />
                    </div>
                  </div>

                  {/* Body Text */}
                  <div className="mt-6">
                    <span className="text-xs uppercase tracking-wider text-white/50">
                      {item.subtitle}
                    </span>
                    <h3 className="font-display text-2xl font-bold text-white mt-1">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm text-white/70 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom Arrow Indicator */}
                  <div className="flex items-center justify-between border-t border-white/10 pt-4">
                    <span className="text-xs font-medium text-lime/80 group-hover:text-lime">
                      Woodcrest Standard
                    </span>
                    <BattalionArrow direction="right" />
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
