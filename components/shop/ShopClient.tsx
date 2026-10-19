"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Filter, LayoutGrid, List, Leaf, Shield, Sprout } from "lucide-react";
import { PRICE_FILTERS } from "@/lib/data/categories";
import type { Product } from "@/lib/data/products";
import { ProductCard } from "@/components/ui/ProductCard";
import {
  SidebarFilters,
  type ShopFiltersState,
} from "./SidebarFilters";

type SortKey = "popular" | "price-asc" | "price-desc" | "rating";

type ShopClientProps = {
  products: Product[];
  categorySlug: string;
  categoryName: string;
  searchQuery?: string;
};

const initialFilters: ShopFiltersState = {
  subcategory: null,
  prices: [],
  brands: [],
  minRating: null,
  availability: "all",
};

export function ShopClient({
  products,
  categorySlug,
  categoryName,
  searchQuery = "",
}: ShopClientProps) {
  const [filters, setFilters] = useState<ShopFiltersState>(initialFilters);
  const [sort, setSort] = useState<SortKey>("popular");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);

  useEffect(() => {
    setVisibleCount(12);
  }, [filters, sort, searchQuery, categorySlug]);

  const filtered = useMemo(() => {
    let list = [...products];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q),
      );
    }

    if (filters.subcategory) {
      list = list.filter((p) => p.subcategorySlug === filters.subcategory);
    }

    if (filters.prices.length) {
      list = list.filter((p) =>
        filters.prices.some((id) => {
          const range = PRICE_FILTERS.find((r) => r.id === id);
          if (!range) return false;
          return p.price >= range.min && p.price <= range.max;
        }),
      );
    }

    if (filters.brands.length) {
      list = list.filter((p) => filters.brands.includes(p.brand));
    }

    if (filters.minRating) {
      list = list.filter((p) => p.rating >= filters.minRating!);
    }

    if (filters.availability === "in") {
      list = list.filter((p) => p.inStock);
    } else if (filters.availability === "out") {
      list = list.filter((p) => !p.inStock);
    }

    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      default:
        list.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    return list;
  }, [products, filters, sort, searchQuery]);

  const visible = useMemo(
    () => filtered.slice(0, visibleCount),
    [filtered, visibleCount],
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="flex gap-6">
        <div className="hidden w-72 shrink-0 lg:block">
          <SidebarFilters
            categorySlug={categorySlug}
            categoryName={categoryName}
            filters={filters}
            onChange={setFilters}
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="relative mb-6 overflow-hidden rounded-2xl bg-forest shadow-card">
            <div className="grid items-center gap-4 p-6 sm:grid-cols-2 lg:p-8">
              <div className="text-white">
                <h1 className="text-2xl font-extrabold leading-snug sm:text-3xl">
                  {categoryName} — Nature&apos;s goodness, delivered to your door.
                </h1>
                <ul className="mt-4 flex flex-wrap gap-4 text-xs text-white/90">
                  <li className="flex items-center gap-1.5">
                    <Leaf className="h-4 w-4 text-lime" /> 100% Fresh & Organic
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Sprout className="h-4 w-4 text-lime" /> Locally Sourced
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Shield className="h-4 w-4 text-lime" /> No Harmful Chemicals
                  </li>
                </ul>
              </div>
              <div className="relative hidden h-40 sm:block">
                <Image
                  src="/images/shop-marketplace.jpg"
                  alt=""
                  fill
                  className="object-cover object-right opacity-90"
                  sizes="400px"
                />
              </div>
            </div>
          </div>

          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium lg:hidden"
                onClick={() => setDrawerOpen(true)}
              >
                <Filter className="h-4 w-4" /> Filters
              </button>
              <p className="text-sm text-muted">
                Showing{" "}
                <span className="font-semibold text-gray-800">
                  {filtered.length}
                </span>{" "}
                of {products.length} products
                {searchQuery ? ` for “${searchQuery}”` : ""}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <label className="flex items-center gap-2 text-sm">
                <span className="text-muted">Sort by:</span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortKey)}
                  className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium outline-none focus:border-forest"
                >
                  <option value="popular">Most Popular</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </label>
              <div className="flex rounded-lg border border-gray-200 bg-white p-0.5">
                <button
                  type="button"
                  aria-label="Grid view"
                  aria-pressed={view === "grid"}
                  onClick={() => setView("grid")}
                  className={`rounded-md p-2 ${view === "grid" ? "bg-mint text-forest" : "text-muted"}`}
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  aria-label="List view"
                  aria-pressed={view === "list"}
                  onClick={() => setView("list")}
                  className={`rounded-md p-2 ${view === "list" ? "bg-mint text-forest" : "text-muted"}`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-12 text-center">
              <p className="font-semibold text-gray-800">No products found</p>
              <p className="mt-1 text-sm text-muted">
                Try adjusting filters or search terms.
              </p>
              <button
                type="button"
                className="mt-4 text-sm font-semibold text-forest underline"
                onClick={() => {
                  setFilters(initialFilters);
                  setVisibleCount(12);
                }}
              >
                Clear filters
              </button>
            </div>
          ) : (
            <>
              {view === "grid" ? (
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 xl:grid-cols-4">
                  {visible.map((p, i) => (
                    <ProductCard
                      key={p.id}
                      product={p}
                      view="grid"
                      priority={i < 2}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {visible.map((p) => (
                    <ProductCard key={p.id} product={p} view="list" />
                  ))}
                </div>
              )}
              {visibleCount < filtered.length && (
                <div className="mt-6 flex justify-center">
                  <button
                    type="button"
                    className="rounded-full border border-forest/20 bg-white px-5 py-2.5 text-sm font-semibold text-forest"
                    onClick={() => setVisibleCount((n) => n + 12)}
                  >
                    Load more ({filtered.length - visibleCount} left)
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            aria-label="Close filters overlay"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="absolute bottom-0 left-0 top-0 w-[min(100%,20rem)] overflow-y-auto bg-surface p-3 shadow-float">
            <SidebarFilters
              categorySlug={categorySlug}
              categoryName={categoryName}
              filters={filters}
              onChange={setFilters}
              onClose={() => setDrawerOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
