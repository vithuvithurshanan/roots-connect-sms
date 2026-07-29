import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type BattalionHeroParallaxProps = {
  bgImage: string;
  heroText: ReactNode;
  subText: ReactNode;
  rightCards: ReactNode;
};

export function BattalionHeroParallax({
  bgImage,
  heroText,
  subText,
  rightCards,
}: BattalionHeroParallaxProps) {
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Layer 1: Background moves slower down
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  // Layer 2: Text moves slightly up with opacity fade
  const textY = useTransform(scrollYProgress, [0, 1], ["0px", "-45px"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

  // Layer 3: Right side cards float up faster
  const rightY = useTransform(scrollYProgress, [0, 1], ["0px", "-80px"]);

  return (
    <div ref={heroRef} className="container-page grid gap-4 lg:grid-cols-[1.55fr_1fr]">
      {/* Hero Main Card with Parallax Image */}
      <div className="relative overflow-hidden rounded-[2.5rem]">
        <motion.div style={{ y: bgY, scale: bgScale }} className="h-full w-full">
          <img
            src={bgImage}
            alt="Sunlight through green tree canopy"
            width={1408}
            height={1200}
            className="h-[520px] w-full object-cover sm:h-[640px] lg:h-[760px]"
          />
        </motion.div>

        {/* Text Overlay Layer */}
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent p-6 sm:p-10"
        >
          {heroText}
          {subText}
        </motion.div>
      </div>

      {/* Layer 3: Floating Right Cards */}
      <motion.div style={{ y: rightY }} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
        {rightCards}
      </motion.div>
    </div>
  );
}
