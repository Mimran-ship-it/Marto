import Image from "next/image";
import Link from "next/link";
import { Leaf, ShieldCheck, Timer, Truck } from "lucide-react";

function AppStoreBadges() {
  return (
    <div className="flex flex-wrap gap-3">
      <a
        href="#"
        className="inline-flex items-center gap-2.5 rounded-lg bg-black px-3.5 py-2 text-white shadow-md transition hover:scale-[1.02]"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden>
          <path d="M3.6 2.2l10.2 10.2L3.6 22.6A2 2 0 013 21.1V3.9a2 2 0 01.6-1.7zM14.7 13.3l2.7 2.7-3.6 2.1-2.8-2.8 3.7-2zM17.9 10.3l2.5 1.4a1.5 1.5 0 010 2.6l-2.5 1.4-3-2.7 3-2.7zM13.8 5.9l3.6 2.1-2.7 2.7-3.7-2 2.8-2.8z" />
        </svg>
        <span className="text-left leading-tight">
          <span className="block text-[9px] uppercase opacity-80">Get it on</span>
          <span className="text-sm font-semibold">Google Play</span>
        </span>
      </a>
      <a
        href="#"
        className="inline-flex items-center gap-2.5 rounded-lg bg-black px-3.5 py-2 text-white shadow-md transition hover:scale-[1.02]"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden>
          <path d="M18.7 12.6c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.2-2.8.9-3.5.9s-1.8-.8-3-.8c-1.5 0-2.9.9-3.7 2.3-1.6 2.7-.4 6.8 1.1 9 .8 1.1 1.7 2.3 2.9 2.3 1.2 0 1.6-.7 3-.7s1.8.7 3 .7 2-.1 2.9-2.3c1.1-1.1 1.5-2.2 1.5-2.3-.1 0-2.8-1.1-2.8-3.8zM15.6 5.5c.6-.8 1.1-1.9.9-3-.9 0-2 .6-2.6 1.4-.6.7-1.1 1.8-.9 2.9 1 .1 2-.5 2.6-1.3z" />
        </svg>
        <span className="text-left leading-tight">
          <span className="block text-[9px] opacity-80">Download on the</span>
          <span className="text-sm font-semibold">App Store</span>
        </span>
      </a>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-[#F7FBF7] to-white">
      {/* Soft atmosphere only — no mockup photo (avoids baked-in text ghosts) */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-full bg-[radial-gradient(ellipse_at_20%_40%,rgba(76,175,80,0.08),transparent_55%)] lg:w-[55%]"
        aria-hidden
      />

      {/* Organic green shape on the right */}
    

      <Leaf
        className="animate-float pointer-events-none absolute right-[50%] top-[18%] hidden h-10 w-10 text-[#4CAF50] opacity-80 lg:block"
        aria-hidden
      />
      <Leaf
        className="animate-float-delayed pointer-events-none absolute right-[12%] top-[12%] hidden h-8 w-8 rotate-45 text-lime opacity-90 lg:block"
        aria-hidden
      />
      <Leaf
        className="animate-float pointer-events-none absolute bottom-[22%] right-[42%] hidden h-7 w-7 -rotate-12 text-[#66BB6A] opacity-70 lg:block"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 sm:py-14 lg:grid-cols-2 lg:gap-6 lg:py-16">
        <div className="animate-fade-up relative z-10 max-w-xl">
          <h1 className="text-[2rem] font-extrabold leading-[1.15] tracking-tight text-[#2D2D2D] sm:text-4xl lg:text-[2.75rem]">
            Fresh Groceries, Delivered to Your Doorstep in Sahiwal!
          </h1>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[#6B7280] sm:text-base">
            Get the best quality fruits, vegetables, & daily essentials delivered
            in minutes. Always fresh, always on time.
          </p>

          <div className="mt-7 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-5">
            <Link
              href="/shop"
              className="btn-3d inline-flex rounded-full bg-[#4CAF50] px-9 py-3.5 text-base font-bold text-white shadow-lg shadow-green-600/25 transition hover:bg-[#43A047]"
            >
              Shop Now
            </Link>
            <AppStoreBadges />
          </div>

          <ul className="mt-9 flex flex-col gap-3.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-7 sm:gap-y-3">
            <li className="flex items-center gap-2 text-sm font-medium text-[#374151]">
              <Truck className="h-5 w-5 shrink-0 text-[#4CAF50]" strokeWidth={2.2} />
              Free Delivery on first order
            </li>
            <li className="flex items-center gap-2 text-sm font-medium text-[#374151]">
              <ShieldCheck className="h-5 w-5 shrink-0 text-[#4CAF50]" strokeWidth={2.2} />
              100% Fresh Guaranteed
            </li>
            <li className="flex items-center gap-2 text-sm font-medium text-[#374151]">
              <Timer className="h-5 w-5 shrink-0 text-[#4CAF50]" strokeWidth={2.2} />
              Fast 30-Min Delivery
            </li>
          </ul>
        </div>

        {/* Cropped delivery visual only — no frame/border */}
        <div className="relative z-10 mx-auto w-full max-w-xl lg:max-w-none">
          <div className="relative w-full overflow-visible">
            <Image
              src="/images/hero-delivery.jpg"
              alt="MARTO delivery rider and fresh grocery basket"
              width={1239}
              height={1321}
              priority
              className="h-auto w-full object-contain"
              sizes="(max-width:1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
