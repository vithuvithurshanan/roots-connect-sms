import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

type BattalionParallaxImageProps = {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  width?: number;
  height?: number;
};

export function BattalionParallaxImage({
  src,
  alt,
  className,
  imgClassName,
  width = 1200,
  height = 800,
}: BattalionParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Scale within the clipped container so edges never show
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1.05, 1.15]);
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    // overflow-hidden stays on the outer wrapper so the rounded corners clip correctly
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
    >
      <motion.img
        src={src}
        alt={alt}
        width={width}
        height={height}
        style={{ scale, y }}
        className={cn(
          "h-full w-full object-cover",
          imgClassName
        )}
      />
    </div>
  );
}
