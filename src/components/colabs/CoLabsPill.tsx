import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type CoLabsPillProps = {
  children: ReactNode;
  className?: string;
  variant?: "outline" | "dark" | "lime";
};

export function CoLabsPill({ children, className, variant = "outline" }: CoLabsPillProps) {
  const variantClasses = {
    outline: "border border-foreground/20 bg-background/80 text-foreground backdrop-blur-md",
    dark: "border border-white/15 bg-[#0c140d]/90 text-white backdrop-blur-md",
    lime: "border border-lime/40 bg-lime/15 text-lime backdrop-blur-md",
  }[variant];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all duration-300 hover:border-lime/60",
        variantClasses,
        className
      )}
    >
      <span className="size-1.5 rounded-full bg-lime animate-pulse" />
      {children}
    </span>
  );
}
