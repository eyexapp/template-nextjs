import { cn } from "@/lib/utils";
import { type ButtonHTMLAttributes } from "react";

const variants = {
  default: "bg-foreground text-background hover:bg-foreground/90",
  outline:
    "border border-foreground/20 bg-transparent hover:bg-foreground/5 text-foreground",
  ghost: "bg-transparent hover:bg-foreground/5 text-foreground",
} as const;

const sizes = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
} as const;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
}

export function Button({
  className,
  variant = "default",
  size = "md",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20 disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}
