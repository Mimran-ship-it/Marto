import Link from "next/link";
import {
  Headphones,
  Leaf,
  Link2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Smartphone,
  Truck,
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Newsletter } from "./Newsletter";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/shop", label: "Categories" },
  { href: "/offers", label: "Offers" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
  { href: "/faqs", label: "FAQs" },
];

function SocialIcon({ className, path }: { className?: string; path: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d={path} />
    </svg>
  );
}

const socials = [
  {
    label: "Facebook",
    path: "M14 8.5h2.5V5.5H14c-2.2 0-3.5 1.4-3.5 3.6V11H8v3h2.5v6.5H14V14h2.3l.7-3H14V9.1c0-.4.2-.6.5-.6z",
  },
  {
    label: "Instagram",
    path: "M7 3h10a4 4 0 014 4v10a4 4 0 01-4 4H7a4 4 0 01-4-4V7a4 4 0 014-4zm5 4.5A4.5 4.5 0 1016.5 12 4.5 4.5 0 0012 7.5zm5.25-.75a1.125 1.125 0 11-1.125 1.125A1.125 1.125 0 0117.25 6.75zM12 9.5A2.5 2.5 0 1114.5 12 2.5 2.5 0 0112 9.5z",
  },
  {
    label: "X",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.851L1.882 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z",
  },
  {
    label: "YouTube",
    path: "M23.5 7.2a3 3 0 00-2.1-2.1C19.5 4.5 12 4.5 12 4.5s-7.5 0-9.4.6A3 3 0 00.5 7.2 31.5 31.5 0 000 12a31.5 31.5 0 00.5 4.8 3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1A31.5 31.5 0 0024 12a31.5 31.5 0 00-.5-4.8zM9.75 15.02V8.98L15.5 12l-5.75 3.02z",
  },
  {
    label: "TikTok",
    path: "M19.6 8.3a6.4 6.4 0 01-3.7-1.2v6.4a5.9 5.9 0 11-5.9-5.9c.3 0 .6 0 .9.1v2.9a3 3 0 00-.9-.1 3 3 0 103 3V2.5h2.8a6.4 6.4 0 003.8 3.6v2.2z",
  },
];

function FooterLogo() {
  return <Logo variant="light" size="lg" />;
}

function AppBadge({
  store,
  label,
}: {
  store: "google" | "apple";
  label: string;
}) {
  return (
    <a
      href="#"
      className="inline-flex items-center gap-3 rounded-xl border border-white/25 bg-black px-4 py-2.5 transition hover:border-lime"
    >
      {store === "google" ? (
        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-white" aria-hidden>
          <path d="M3.6 2.2l10.2 10.2L3.6 22.6A2 2 0 013 21.1V3.9a2 2 0 01.6-1.7zM14.7 13.3l2.7 2.7-3.6 2.1-2.8-2.8 3.7-2zM17.9 10.3l2.5 1.4a1.5 1.5 0 010 2.6l-2.5 1.4-3-2.7 3-2.7zM13.8 5.9l3.6 2.1-2.7 2.7-3.7-2 2.8-2.8z" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-white" aria-hidden>
          <path d="M18.7 12.6c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.2-2.8.9-3.5.9s-1.8-.8-3-.8c-1.5 0-2.9.9-3.7 2.3-1.6 2.7-.4 6.8 1.1 9 .8 1.1 1.7 2.3 2.9 2.3 1.2 0 1.6-.7 3-.7s1.8.7 3 .7 2-.1 2.9-2.3c1.1-1.1 1.5-2.2 1.5-2.3-.1 0-2.8-1.1-2.8-3.8zM15.6 5.5c.6-.8 1.1-1.9.9-3-.9 0-2 .6-2.6 1.4-.6.7-1.1 1.8-.9 2.9 1 .1 2-.5 2.6-1.3z" />
        </svg>
      )}
      <span className="text-left text-[10px] leading-tight text-white">
        {store === "google" ? "GET IT ON" : "Download on the"}
        <br />
        <span className="text-sm font-bold">{label}</span>
      </span>
    </a>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden">
      <Newsletter />

      <div className="relative bg-[#032618] text-white shadow-[0_-12px_40px_rgba(0,0,0,0.25)]">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <FooterLogo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
              Your trusted online grocery store in Sahiwal. Fresh products, great
              prices, and fast delivery — all at your fingertips.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-lime/30 bg-[#0A3D24] px-3.5 py-2 text-xs font-medium">
              <MapPin className="h-3.5 w-3.5 text-lime" />
              <span>Delivering in Sahiwal</span>
              <Truck className="h-3.5 w-3.5 text-lime" />
            </div>
            <div className="mt-5 flex gap-2.5">
              {socials.map(({ label, path }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition hover:bg-lime hover:text-[#032618]"
                >
                  <SocialIcon className="h-4 w-4" path={path} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 flex items-center gap-2 text-sm font-bold">
              <Link2 className="h-4 w-4 text-lime" />
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/75 transition hover:text-lime"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 flex items-center gap-2 text-sm font-bold">
              <Headphones className="h-4 w-4 text-lime" />
              Customer Support
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-lime" />
                <div>
                  <a href="tel:+923001234567" className="font-semibold hover:text-lime">
                    +92 300 1234567
                  </a>
                  <p className="text-xs text-white/50">Mon - Sun, 8AM - 10PM</p>
                </div>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-lime" />
                <div>
                  <a
                    href="mailto:support@marto.pk"
                    className="font-semibold hover:text-lime"
                  >
                    support@marto.pk
                  </a>
                  <p className="text-xs text-white/50">We reply within 24 hours</p>
                </div>
              </li>
              <li className="flex gap-3">
                <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-lime" />
                <div>
                  <p className="font-semibold">Live Chat</p>
                  <p className="text-xs text-white/50">Chat with our support team</p>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 flex items-center gap-2 text-sm font-bold">
              <Smartphone className="h-4 w-4 text-lime" />
              Download Our App
            </h3>
            <p className="mb-4 text-sm text-white/70">
              Shop on the go with our mobile app. Available on both platforms.
            </p>
            <div className="flex flex-col gap-2.5">
              <AppBadge store="google" label="Google Play" />
              <AppBadge store="apple" label="App Store" />
            </div>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-4 text-xs text-white/55 sm:flex-row">
            <p>© 2025 MARTO. All rights reserved.</p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Link href="/privacy" className="hover:text-lime">
                Privacy Policy
              </Link>
              <span aria-hidden>|</span>
              <Link href="/terms" className="hover:text-lime">
                Terms & Conditions
              </Link>
              <span aria-hidden>|</span>
              <Link href="/returns" className="hover:text-lime">
                Return Policy
              </Link>
            </div>
            <p className="font-script flex flex-col items-center text-base leading-none text-lime sm:items-end">
              <span className="flex items-center gap-1">
                <Leaf className="h-3.5 w-3.5" fill="currentColor" />
                <Leaf className="h-3.5 w-3.5 -ml-1" fill="currentColor" />
                Good Food Good Mood
              </span>
              <span className="mt-0.5 block w-16 border-b-2 border-lime/80" style={{ borderRadius: "50%" }} aria-hidden />
            </p>
          </div>
        </div>

        {/* Layered organic waves at bottom */}
        <div className="relative h-10 overflow-hidden sm:h-14" aria-hidden>
          <svg viewBox="0 0 1440 80" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
            <path fill="#0B5D2A" d="M0,30 C360,70 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z" />
            <path fill="#14532D" d="M0,45 C300,70 600,20 900,50 C1100,65 1300,55 1440,48 L1440,80 L0,80 Z" opacity="0.9" />
            <path fill="#A3E635" d="M0,62 C400,80 800,50 1200,68 C1320,74 1400,70 1440,68 L1440,80 L0,80 Z" opacity="0.35" />
          </svg>
        </div>
      </div>
    </footer>
  );
}
