"use client";

import { Heart } from "lucide-react";
import { PRODUCTS } from "@/lib/data/products";
import { useStore } from "@/lib/store-context";
import { ProductCard } from "@/components/ui/ProductCard";
import { Button } from "@/components/ui/Button";

export default function WishlistPage() {
  const { wishlist, hydrated } = useStore();
  const items = PRODUCTS.filter((p) => wishlist.includes(p.id));

  if (!hydrated) {
    return <div className="p-16 text-center text-muted">Loading…</div>;
  }

  return (
    <div className="min-h-[60vh] bg-surface px-4 py-10">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-2 flex items-center gap-2 text-2xl font-extrabold">
          <Heart className="h-7 w-7 text-red-500" /> Wishlist
        </h1>
        <p className="mb-8 text-muted">
          {items.length} saved item{items.length === 1 ? "" : "s"}
        </p>
        {items.length === 0 ? (
          <div className="rounded-2xl bg-white p-12 text-center shadow-card">
            <p className="font-semibold">No favourites yet</p>
            <p className="mt-1 text-sm text-muted">
              Tap the heart on any product to save it here.
            </p>
            <Button href="/shop" className="mt-6">
              Browse Products
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {items.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
