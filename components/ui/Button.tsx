import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "lime" | "ghost";

const variants: Record<Variant, string> = {
  primary:
    "bg-forest text-white btn-3d hover:bg-forest-mid",
  secondary:
    "bg-action text-white btn-3d hover:bg-action-bright",
  outline:
    "border-2 border-forest text-forest bg-white hover:bg-mint",
  lime:
    "bg-lime text-forest-deep font-semibold btn-3d hover:brightness-105",
  ghost:
    "bg-transparent text-forest hover:bg-mint",
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  href?: string;
  children: ReactNode;
  className?: string;
};

export function Button({
  variant = "primary",
  href,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors disabled:opacity-50 disabled:pointer-events-none ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
