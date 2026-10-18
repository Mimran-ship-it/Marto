"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  ChevronDown,
  Heart,
  MapPin,
  Menu,
  ShoppingCart,
  X,
} from "lucide-react";
import { CATEGORIES } from "@/lib/data/categories";
import { useStore } from "@/lib/store-context";
import { Logo } from "@/components/ui/Logo";

const HOME_NAV: {
  href: string;
  label: string;
  hasDropdown?: boolean;
  key?: string;
}[] = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Categories", hasDropdown: true },
  { href: "/offers", label: "Deals" },
  { href: "/offers", label: "Offers", key: "offers-nav" },
];

export function Header() {
  const pathname = usePathname();
  const { cartCount, wishlistCount, hydrated } = useStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [catsOpen, setCatsOpen] = useState(false);
  const [bounce, setBounce] = useState(false);
  const [prevCount, setPrevCount] = useState(0);
  const [q, setQ] = useState("");

  useEffect(() => {
    if (!hydrated) return;
    if (cartCount !== prevCount && cartCount > prevCount) {
      setBounce(true);
      const t = setTimeout(() => setBounce(false), 450);
      return () => clearTimeout(t);
    }
    setPrevCount(cartCount);
  }, [cartCount, hydrated, prevCount]);

  function onSearch(e: React.FormEvent) {
    e.preventDefault();
    const query = q.trim();
    window.location.href = query
      ? `/shop?q=${encodeURIComponent(query)}`
      : "/shop";
  }

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100/80 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
      <div className="mx-auto flex max-w-7xl items-center gap-2.5 px-4 py-2.5 lg:gap-4">
        <button
          type="button"
          className="rounded-lg p-1.5 text-forest lg:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <Logo size="nav" className="shrink-0" />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {HOME_NAV.map((link) => {
            const key = link.key ?? link.href + link.label;
            const active =
              link.label === "Home"
                ? pathname === "/"
                : link.label === "Categories"
                  ? pathname.startsWith("/shop")
                  : link.href !== "/" && pathname.startsWith(link.href);

            if (link.hasDropdown) {
              return (
                <div key={key} className="relative">
                  <button
                    type="button"
                    className={`flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                      active
                        ? "bg-[#E8F5E9] text-forest"
                        : "text-gray-700 hover:bg-mint hover:text-forest"
                    }`}
                    onClick={() => setCatsOpen((v) => !v)}
                    aria-expanded={catsOpen}
                  >
                    {link.label}
                    <ChevronDown className="h-3.5 w-3.5" />
                  </button>
                  {catsOpen && (
                    <div className="absolute left-0 top-full z-50 mt-2 w-56 rounded-xl border border-gray-100 bg-white p-2 shadow-float">
                      {CATEGORIES.map((c) => (
                        <Link
                          key={c.slug}
                          href={c.href}
                          className="block rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-mint hover:text-forest"
                          onClick={() => setCatsOpen(false)}
                        >
                          {c.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={key}
                href={link.href}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                  active
                    ? "bg-[#E8F5E9] text-forest"
                    : "text-gray-700 hover:bg-mint hover:text-forest"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <form
          onSubmit={onSearch}
          className="hidden min-w-0 flex-1 items-center overflow-hidden rounded-full border border-gray-200 bg-white md:flex"
          role="search"
        >
          <label htmlFor="header-search" className="sr-only">
            Search products
          </label>
          <input
            id="header-search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search for fresh groceries in Sahiwal..."
            className="min-w-0 flex-1 bg-transparent px-4 py-1.5 text-sm outline-none placeholder:text-muted"
          />
          <button
            type="submit"
            aria-label="Search"
            className="m-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#4CAF50] text-white transition hover:bg-[#43A047]"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            className="hidden items-center gap-1.5 rounded-full bg-[#E8F5E9] px-2.5 py-1.5 text-sm font-medium text-forest sm:flex"
            aria-label="Delivery location Sahiwal, Pakistan"
          >
            <MapPin className="h-4 w-4 shrink-0" />
            <span>Sahiwal, Pakistan</span>
            <ChevronDown className="h-3.5 w-3.5 opacity-70" />
          </button>

          <Link
            href="/wishlist"
            className="relative hidden rounded-full p-2 text-gray-600 transition hover:bg-mint hover:text-forest sm:inline-flex"
            aria-label={`Wishlist, ${wishlistCount} items`}
          >
            <Heart className="h-5 w-5" />
            {hydrated && wishlistCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                {wishlistCount}
              </span>
            )}
          </Link>

          <Link
            href="/cart"
            className="relative rounded-full p-2 text-[#4CAF50] transition hover:bg-mint"
            aria-label={`Cart, ${cartCount} items`}
          >
            <ShoppingCart className="h-5 w-5" strokeWidth={2} />
            <span
              className={`absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#4CAF50] px-1 text-[10px] font-bold text-white ${bounce ? "animate-badge-bounce" : ""}`}
            >
              {hydrated ? cartCount : 0}
            </span>
          </Link>

          <Link
            href="/login"
            className="hidden rounded-full border border-gray-300 bg-white px-3.5 py-1.5 text-sm font-medium text-gray-900 transition hover:border-forest hover:text-forest sm:inline-flex"
          >
            Login / Sign Up
          </Link>
        </div>
      </div>

      <div className="border-t border-gray-50 px-4 py-1.5 md:hidden">
        <form
          onSubmit={onSearch}
          className="flex items-center overflow-hidden rounded-full border border-gray-200"
          role="search"
        >
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search for fresh groceries in Sahiwal..."
            className="min-w-0 flex-1 px-4 py-1.5 text-sm outline-none"
            aria-label="Search products"
          />
          <button
            type="submit"
            aria-label="Search"
            className="m-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-[#4CAF50] text-white"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>
      </div>

      {mobileOpen && (
        <div className="border-t border-gray-100 bg-white px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {HOME_NAV.map((link) => (
              <Link
                key={link.key ?? link.href + link.label}
                href={link.href}
                className="rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-mint"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/login"
              className="rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-mint"
              onClick={() => setMobileOpen(false)}
            >
              Login / Sign Up
            </Link>
            {CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                href={c.href}
                className="rounded-lg px-3 py-2 text-sm text-muted hover:bg-mint"
                onClick={() => setMobileOpen(false)}
              >
                {c.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
