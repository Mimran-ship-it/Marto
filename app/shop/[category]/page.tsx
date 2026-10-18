import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CATEGORIES } from "@/lib/data/categories";
import { getProductsByCategory } from "@/lib/data/products";
import { ShopClient } from "@/components/shop/ShopClient";

type Props = {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ q?: string }>;
};

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = CATEGORIES.find((c) => c.slug === category);
  return {
    title: cat?.name ?? "Shop",
    description: `Shop ${cat?.name ?? "groceries"} online at MARTO Sahiwal.`,
  };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { category } = await params;
  const { q } = await searchParams;
  const cat = CATEGORIES.find((c) => c.slug === category);
  if (!cat) notFound();

  const products = getProductsByCategory(category);

  return (
    <div className="min-h-[60vh] bg-surface">
      <ShopClient
        products={products}
        categorySlug={cat.slug}
        categoryName={cat.name}
        searchQuery={q ?? ""}
      />
    </div>
  );
}
