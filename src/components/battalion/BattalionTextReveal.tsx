import { useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

type BattalionTextRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
};

export function BattalionTextReveal({
  children,
  className,
  delay = 0,
  as: Component = "div",
}: BattalionTextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });

  return (
    <div ref={ref} className="overflow-hidden inline-block w-full">
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={isInView ? { y: "0%", opacity: 1 } : { y: "100%", opacity: 0 }}
        transition={{
          duration: 0.85,
          ease: [0.215, 0.61, 0.355, 1],
          delay,
        }}
      >
        <Component className={cn(className)}>{children}</Component>
      </motion.div>
    </div>
  );
}
