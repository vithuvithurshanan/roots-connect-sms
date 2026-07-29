import { cn } from "@/lib/utils";

type BattalionArrowProps = {
  className?: string;
  direction?: "right" | "up" | "down" | "left";
};

export function BattalionArrow({ className, direction = "right" }: BattalionArrowProps) {
  const rotationClass = {
    right: "rotate-0",
    down: "rotate-90",
    left: "rotate-180",
    up: "-rotate-90",
  }[direction];

  return (
    <div
      className={cn(
        "group relative inline-flex items-center overflow-hidden text-lime transition-transform duration-300",
        rotationClass,
        className
      )}
    >
      <div className="flex items-center transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-2">
        <svg
          viewBox="0 0 20 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-6 fill-current transition-transform duration-300"
        >
          <path d="M10 8L19.6603 0.5H0.339746L10 8Z" transform="rotate(-90 10 4)" />
        </svg>
        <span className="h-[2px] w-4 bg-current -ml-2 rounded-full transition-all duration-300 group-hover:w-6" />
      </div>
    </div>
  );
}
