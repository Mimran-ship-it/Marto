import type { Metadata } from "next";
import { CATEGORIES } from "@/lib/data/categories";
import { PRODUCTS } from "@/lib/data/products";
import { ShopClient } from "@/components/shop/ShopClient";

export const metadata: Metadata = {
  title: "Shop Fresh Groceries",
  description: "Browse fresh fruits, vegetables, dairy and more at MARTO Sahiwal.",
};

type Props = {
  searchParams: Promise<{ q?: string }>;
};

export default async function ShopPage({ searchParams }: Props) {
  const { q } = await searchParams;
  return (
    <div className="bg-surface min-h-[60vh]">
      <ShopClient
        products={PRODUCTS}
        categorySlug="fruits-vegetables"
        categoryName="All Products"
        searchQuery={q ?? ""}
      />
      <div className="mx-auto max-w-7xl px-4 pb-10">
        <h2 className="mb-4 text-lg font-bold">Shop by Category</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {CATEGORIES.map((c) => (
            <a
              key={c.slug}
              href={c.href}
              className="card-lift shadow-card rounded-xl bg-white p-4 text-center text-sm font-semibold text-forest"
            >
              {c.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
