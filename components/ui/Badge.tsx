import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  tone?: "green" | "mint" | "red" | "gold" | "outline";
  className?: string;
};

const tones = {
  green: "bg-action text-white",
  mint: "bg-mint text-forest",
  red: "bg-red-500 text-white",
  gold: "bg-amber-100 text-amber-800 border border-amber-300",
  outline: "border border-action text-forest bg-white",
};

export function Badge({ children, tone = "mint", className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
