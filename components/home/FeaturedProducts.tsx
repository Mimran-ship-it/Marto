import Link from "next/link";
import { PRODUCTS } from "@/lib/data/products";
import { ProductCard } from "@/components/ui/ProductCard";
import { Button } from "@/components/ui/Button";

export function FeaturedProducts() {
  const featured = PRODUCTS.filter((p) => p.inStock).slice(0, 6);

  return (
    <section className="section-defer bg-surface py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-action">
              Best Sellers
            </p>
            <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
              Fresh picks for Sahiwal
            </h2>
          </div>
          <Button href="/shop" variant="outline">
            View All Products
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:gap-5">
          {featured.map((p, i) => (
            <ProductCard key={p.id} product={p} priority={i < 2} />
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-muted">
          Looking for deals?{" "}
          <Link href="/offers" className="font-semibold text-forest underline">
            Browse offers
          </Link>
        </p>
      </div>
    </section>
  );
}
