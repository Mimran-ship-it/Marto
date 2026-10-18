import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  variant?: "default" | "light" | "compact";
  /** nav = header mark; brand sizes stay full for footer/marketing */
  size?: "nav" | "sm" | "md" | "lg" | "xl";
  className?: string;
};

/**
 * Height is controlled per context so a compact navbar does not shrink the footer brand.
 * Navbar height should come from header padding + `nav` size — never by scaling every size down.
 */
const sizeClass = {
  nav: "h-12 w-auto sm:h-14",
  sm: "h-10 w-auto",
  md: "h-12 w-auto sm:h-14",
  lg: "h-14 w-auto sm:h-16",
  xl: "h-16 w-auto sm:h-20",
} as const;

const maxWidthClass = {
  nav: "max-w-[min(100%,220px)]",
  sm: "max-w-[min(100%,200px)]",
  md: "max-w-[min(100%,240px)]",
  lg: "max-w-[min(100%,280px)]",
  xl: "max-w-[min(100%,320px)]",
} as const;

export function Logo({
  variant = "default",
  size = "md",
  className = "",
}: LogoProps) {
  const light = variant === "light";

  if (variant === "compact") {
    return (
      <Link
        href="/"
        className={`inline-flex items-center gap-2.5 ${className}`}
        aria-label="MARTO home"
      >
        <Image
          src="/favicon.png"
          alt=""
          width={48}
          height={48}
          className="h-12 w-12 object-contain"
        />
        <span className="text-2xl font-extrabold tracking-tight text-forest">
          MARTO
        </span>
      </Link>
    );
  }

  return (
    <Link
      href="/"
      className={`inline-flex shrink-0 flex-col justify-center ${className}`}
      aria-label="MARTO home"
    >
      <Image
        src="/logo.png"
        alt="MARTO Online Grocery"
        width={480}
        height={189}
        className={`${sizeClass[size]} ${maxWidthClass[size]} object-contain object-left ${light ? "brightness-0 invert" : ""}`}
        priority
      />
      {light ? (
        <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-lime">
          Fresh Groceries • Better Living
        </span>
      ) : (
        <span className="sr-only">Online Grocery — Fresh. Fast. Trusted</span>
      )}
    </Link>
  );
}
