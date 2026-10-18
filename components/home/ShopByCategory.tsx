import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight, Leaf } from "lucide-react";
import { CATEGORIES } from "@/lib/data/categories";

const CATEGORY_IMAGES: Record<string, string> = {
  "fruits-vegetables": "/images/products/tomatoes.jpg",
  "dairy-eggs": "/images/products/milk.jpg",
  bakery: "/images/products/bread.jpg",
  "snacks-beverages": "/images/products/chips.jpg",
  household: "/images/products/detergent.jpg",
  "personal-care": "/images/products/soap.jpg",
};

export function ShopByCategory() {
  return (
    <section className="bg-white px-4 py-8 lg:mx-auto lg:max-w-7xl lg:py-12">
      <div className="mb-4 flex items-end justify-between gap-3">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-extrabold text-[#1B5E20] sm:text-xl">
            <Leaf className="h-5 w-5 text-[#4CAF50]" fill="currentColor" />
            Shop by Category
          </h2>
          <p className="mt-0.5 text-xs text-muted sm:text-sm">
            Everything you need, in one place.
          </p>
        </div>
        <Link
          href="/shop"
          className="inline-flex shrink-0 items-center gap-1 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-700 transition hover:bg-mint hover:text-forest"
        >
          View All
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <ul className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2 scrollbar-none sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 md:grid-cols-4 lg:grid-cols-6">
        {CATEGORIES.map((c) => (
          <li key={c.slug} className="w-[42%] shrink-0 sm:w-auto">
            <Link
              href={c.href}
              className="card-lift flex h-full flex-col overflow-hidden rounded-2xl bg-[#F5F7F5] shadow-sm transition hover:shadow-md"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-white">
                <Image
                  src={CATEGORY_IMAGES[c.slug] ?? "/images/products/tomatoes.jpg"}
                  alt={c.name}
                  fill
                  className="object-cover"
                  sizes="160px"
                />
              </div>
              <span className="flex items-center justify-between gap-1 px-3 py-2.5 text-sm font-semibold text-[#1B5E20]">
                <span className="line-clamp-2 leading-snug">{c.name}</span>
                <ChevronRight className="h-4 w-4 shrink-0 text-[#4CAF50]" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
