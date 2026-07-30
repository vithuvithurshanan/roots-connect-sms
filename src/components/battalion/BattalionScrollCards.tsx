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

type Feature = (typeof features)[number];

function FeatureCard({ item, className }: { item: Feature; className?: string }) {
  const Icon = item.icon;
  return (
    <div
      className={`group relative flex shrink-0 flex-col justify-between rounded-[2.5rem] border border-white/10 bg-white/5 p-7 backdrop-blur-md transition-all duration-500 hover:border-lime/40 hover:bg-white/10 sm:p-8 ${className ?? ""}`}
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
}

export function BattalionScrollCards() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]);

  return (
    <>
      {/* Mobile: native side-scroll — the desktop scroll-jack technique below
          doesn't translate to small screens, so this is a plain swipeable row. */}
      <section className="relative bg-[#0c140d] px-4 py-16 text-[#e8f5e9] md:hidden">
        <div className="container-page">
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-lime">
              The Woodcrest Edge
            </span>
            <h2 className="font-display text-3xl font-bold text-white mt-2">
              Why Buffalo Trusts Woodcrest
            </h2>
          </div>
        </div>
        <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {features.map((item, idx) => (
            <FeatureCard
              key={idx}
              item={item}
              className="h-[360px] w-[82vw] max-w-[320px] snap-center"
            />
          ))}
        </div>
      </section>

      {/* Desktop: scroll-jacked horizontal parallax */}
      <section
        ref={targetRef}
        className="relative hidden h-[250vh] bg-[#0c140d] text-[#e8f5e9] md:block"
      >
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
              {features.map((item, idx) => (
                <FeatureCard key={idx} item={item} className="h-[380px] w-[300px] sm:w-[360px]" />
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
