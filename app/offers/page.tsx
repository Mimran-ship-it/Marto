import type { Metadata } from "next";
import { PRODUCTS } from "@/lib/data/products";
import { ProductCard } from "@/components/ui/ProductCard";
import { PageShell } from "@/components/ui/PageShell";

export const metadata: Metadata = {
  title: "Offers & Deals",
  description: "Exclusive discounts on fresh groceries at MARTO Sahiwal.",
};

export default function OffersPage() {
  const deals = PRODUCTS.filter((p) => p.compareAt || p.badges.some((b) => b.includes("OFF")));

  return (
    <PageShell
      title="Offers & Deals"
      subtitle="Save more on fresh picks — limited-time discounts for Sahiwal."
    >
      <div className="-mx-4 grid grid-cols-2 gap-4 sm:mx-0 md:grid-cols-3">
        {deals.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </PageShell>
  );
}
