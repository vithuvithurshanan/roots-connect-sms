import { cn } from "@/lib/utils";

type CoLabsInvertedCornerProps = {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  className?: string;
  fill?: string;
};

/**
 * Signature CoLabs inverted curved corner cutout SVG badge accent
 */
export function CoLabsInvertedCorner({
  position = "bottom-right",
  className,
  fill = "currentColor",
}: CoLabsInvertedCornerProps) {
  const rotationClasses = {
    "top-left": "rotate-180",
    "top-right": "-rotate-90",
    "bottom-left": "rotate-90",
    "bottom-right": "rotate-0",
  }[position];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={cn(
        "pointer-events-none absolute size-5 sm:size-7 transition-all duration-300",
        rotationClasses,
        className
      )}
      aria-hidden="true"
    >
      <path d="m100,0H0v100C0,44.77,44.77,0,100,0Z" fill={fill} />
    </svg>
  );
}
