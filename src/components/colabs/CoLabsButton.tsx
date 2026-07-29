import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { CoLabsInvertedCorner } from "./CoLabsInvertedCorner";

type CoLabsButtonProps = {
  children?: ReactNode;
  href?: string;
  className?: string;
  onClick?: () => void;
  variant?: "dark" | "lime" | "outline";
  showArrow?: boolean;
};

export function CoLabsButton({
  children,
  href,
  className,
  onClick,
  variant = "dark",
  showArrow = true,
}: CoLabsButtonProps) {
  const variantStyles = {
    dark: "bg-[#0c140d] text-white hover:bg-black",
    lime: "bg-lime text-[#0c140d] hover:bg-lime/90 font-bold",
    outline: "border border-foreground/20 bg-background text-foreground hover:bg-muted",
  }[variant];

  const Component = href ? "a" : "button";

  return (
    <Component
      href={href}
      onClick={onClick}
      className={cn(
        "group relative inline-flex items-center gap-3 rounded-full px-6 py-3.5 text-sm font-semibold transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]",
        variantStyles,
        className
      )}
    >
      <span>{children}</span>

      {showArrow && (
        <span className="relative flex size-8 items-center justify-center rounded-full bg-lime text-[#0c140d] transition-transform duration-500 group-hover:rotate-45">
          <ArrowUpRight className="size-4" />
          {/* Signature CoLabs corner cutout on button */}
          <CoLabsInvertedCorner
            position="top-left"
            fill="currentColor"
            className="size-3 text-lime/40"
          />
        </span>
      )}
    </Component>
  );
}
