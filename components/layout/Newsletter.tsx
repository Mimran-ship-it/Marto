"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import { Bell, Gift, Leaf, Mail, Tag } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setDone(true);
    setEmail("");
  }

  return (
    <section className="relative overflow-hidden bg-[#042F1A] text-white">
      {/* Organic wave top edge */}
      <div className="absolute inset-x-0 top-0 h-10 bg-surface sm:h-14" aria-hidden>
        <svg
          viewBox="0 0 1440 80"
          className="absolute bottom-0 h-full w-full text-[#042F1A]"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            d="M0,48 C240,80 480,0 720,32 C960,64 1200,16 1440,40 L1440,80 L0,80 Z"
          />
        </svg>
      </div>

      <div
        className="pointer-events-none absolute -left-20 top-24 h-64 w-64 rounded-full bg-[#0B5D2A]/40 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 pb-14 pt-16 sm:pt-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8 lg:pb-16">
        <div>
          <div className="mb-3 flex items-center gap-2 text-lime">
            <Leaf className="h-4 w-4" fill="currentColor" />
            <span className="text-sm font-semibold tracking-wide">Stay Updated</span>
          </div>
          <h2 className="max-w-lg text-3xl font-extrabold leading-tight sm:text-4xl">
            Get the Latest Deals & Fresh Offers!
          </h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-white/75 sm:text-[15px]">
            Subscribe to our newsletter and be the first to know about new
            arrivals, exclusive discounts and more.
          </p>

          <form
            onSubmit={onSubmit}
            className="mt-7 flex max-w-xl items-center overflow-hidden rounded-full border border-white/20 bg-[#0A3D24] p-1 shadow-[inset_0_2px_8px_rgba(0,0,0,0.25)]"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <div className="flex min-w-0 flex-1 items-center gap-2 px-4">
              <Mail className="h-4 w-4 shrink-0 text-white/45" />
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-white/40"
              />
            </div>
            <button
              type="submit"
              className="btn-3d shrink-0 rounded-full bg-lime px-5 py-2.5 text-sm font-bold text-[#042F1A] transition hover:brightness-105"
            >
              Subscribe →
            </button>
          </form>
          {done && (
            <p className="mt-2 text-sm text-lime" role="status">
              Thanks for subscribing!
            </p>
          )}

          <ul className="mt-7 flex flex-wrap items-center gap-x-0 gap-y-3 text-sm text-white/90">
            <li className="flex items-center gap-2 pr-5 sm:border-r sm:border-white/20 sm:pr-6">
              <Tag className="h-4 w-4 text-lime" />
              Exclusive Discounts
            </li>
            <li className="flex items-center gap-2 px-0 sm:px-6 sm:border-r sm:border-white/20">
              <Bell className="h-4 w-4 text-lime" />
              New Product Alerts
            </li>
            <li className="flex items-center gap-2 sm:pl-6">
              <Gift className="h-4 w-4 text-lime" />
              Special Offers
            </li>
          </ul>
        </div>

        {/* Visual: bag crop only — not the full footer mockup */}
        <div className="relative mx-auto hidden w-full max-w-md lg:block">
          <Leaf
            className="animate-float absolute -left-2 top-6 h-8 w-8 text-lime opacity-80"
            aria-hidden
          />
          <Leaf
            className="animate-float-delayed absolute right-4 top-0 h-7 w-7 rotate-45 text-[#8BC34A] opacity-70"
            aria-hidden
          />
          <div className="relative w-full overflow-visible">
            <Image
              src="/images/newsletter-produce.jpg"
              alt="MARTO grocery bag with fresh vegetables"
              width={400}
              height={328}
              className="h-auto w-full object-contain"
              sizes="420px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
