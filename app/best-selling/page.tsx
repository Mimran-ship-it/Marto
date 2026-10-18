import type { Metadata } from "next";
import { PRODUCTS } from "@/lib/data/products";
import { ProductCard } from "@/components/ui/ProductCard";
import { PageShell } from "@/components/ui/PageShell";

export const metadata: Metadata = {
  title: "Best Selling",
  description: "MARTO's most popular groceries in Sahiwal.",
};

export default function BestSellingPage() {
  const best = [...PRODUCTS]
    .filter((p) => p.inStock)
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 12);

  return (
    <PageShell
      title="Best Selling"
      subtitle="Loved by 10K+ happy customers across Sahiwal."
    >
      <div className="-mx-4 grid grid-cols-2 gap-4 sm:mx-0 md:grid-cols-3">
        {best.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </PageShell>
  );
}
