import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Leaf } from "lucide-react";

type BattalionFloatingLeavesProps = {
  /** Pass the hero section's ref so scroll tracking works correctly */
  sectionRef: React.RefObject<HTMLElement | null>;
};

export function BattalionFloatingLeaves({ sectionRef }: BattalionFloatingLeavesProps) {
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Leaf 1 — drifts down-right with rotation
  const leaf1Y = useTransform(scrollYProgress, [0, 1], ["0px", "160px"]);
  const leaf1X = useTransform(scrollYProgress, [0, 1], ["0px", "30px"]);
  const leaf1Rotate = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const leaf1Opacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.6, 0]);

  // Leaf 2 — rises up-left (counter-parallax) with rotation
  const leaf2Y = useTransform(scrollYProgress, [0, 1], ["0px", "-120px"]);
  const leaf2X = useTransform(scrollYProgress, [0, 1], ["0px", "-20px"]);
  const leaf2Rotate = useTransform(scrollYProgress, [0, 1], [30, -120]);
  const leaf2Opacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.5, 0]);

  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
      <motion.div
        style={{ y: leaf1Y, x: leaf1X, rotate: leaf1Rotate, opacity: leaf1Opacity }}
        className="absolute left-8 top-1/4 text-primary/25"
      >
        <Leaf className="size-16 sm:size-24" />
      </motion.div>

      <motion.div
        style={{ y: leaf2Y, x: leaf2X, rotate: leaf2Rotate, opacity: leaf2Opacity }}
        className="absolute right-10 top-1/2 text-lime/35"
      >
        <Leaf className="size-20 sm:size-28" />
      </motion.div>
    </div>
  );
}
