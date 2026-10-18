"use client";

import Link from "next/link";
import { ArrowLeft, Leaf, Star, X } from "lucide-react";
import {
  BRANDS,
  PRICE_FILTERS,
  SUBCATEGORIES,
} from "@/lib/data/categories";

export type ShopFiltersState = {
  subcategory: string | null;
  prices: string[];
  brands: string[];
  minRating: number | null;
  availability: "all" | "in" | "out";
};

type SidebarFiltersProps = {
  categorySlug: string;
  categoryName: string;
  filters: ShopFiltersState;
  onChange: (next: ShopFiltersState) => void;
  onClose?: () => void;
  className?: string;
};

export function SidebarFilters({
  categorySlug,
  categoryName,
  filters,
  onChange,
  onClose,
  className = "",
}: SidebarFiltersProps) {
  const subs = SUBCATEGORIES.filter((s) => s.categorySlug === categorySlug);

  function togglePrice(id: string) {
    const prices = filters.prices.includes(id)
      ? filters.prices.filter((p) => p !== id)
      : [...filters.prices, id];
    onChange({ ...filters, prices });
  }

  function toggleBrand(brand: string) {
    const brands = filters.brands.includes(brand)
      ? filters.brands.filter((b) => b !== brand)
      : [...filters.brands, brand];
    onChange({ ...filters, brands });
  }

  return (
    <aside
      className={`rounded-2xl border border-gray-100 bg-white p-4 shadow-card ${className}`}
      aria-label="Filters"
    >
      <div className="mb-4 flex items-center justify-between">
        <Link
          href="/shop"
          className="flex items-center gap-1 text-sm text-muted hover:text-forest"
        >
          <ArrowLeft className="h-4 w-4" /> All Categories
        </Link>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 lg:hidden"
            aria-label="Close filters"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <div className="mb-5 flex items-start gap-2 border-b border-gray-100 pb-4">
        <Leaf className="mt-0.5 h-5 w-5 text-action" />
        <div>
          <h2 className="font-bold text-forest">{categoryName}</h2>
          <p className="text-xs text-muted">Fresh. Organic. Healthy.</p>
        </div>
      </div>

      {subs.length > 0 && (
        <div className="mb-6">
          <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-muted">
            Subcategories
          </h3>
          <ul className="space-y-1">
            {subs.map((s) => {
              const active = filters.subcategory === s.slug;
              return (
                <li key={s.slug}>
                  <button
                    type="button"
                    onClick={() =>
                      onChange({
                        ...filters,
                        subcategory: active ? null : s.slug,
                      })
                    }
                    className={`flex w-full items-center gap-2 rounded-full px-3 py-2 text-left text-sm transition ${
                      active
                        ? "bg-mint font-semibold text-forest"
                        : "text-gray-700 hover:bg-surface"
                    }`}
                  >
                    <Leaf
                      className={`h-3.5 w-3.5 ${active ? "text-forest" : "text-gray-300"}`}
                    />
                    {s.name}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <fieldset className="mb-6">
        <legend className="mb-2 text-xs font-bold uppercase tracking-wide text-muted">
          Price Range
        </legend>
        <ul className="space-y-2">
          {PRICE_FILTERS.map((p) => (
            <li key={p.id}>
              <label className="flex cursor-pointer items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={filters.prices.includes(p.id)}
                  onChange={() => togglePrice(p.id)}
                  className="h-4 w-4 rounded border-gray-300 text-forest accent-forest"
                />
                {p.label}
              </label>
            </li>
          ))}
        </ul>
      </fieldset>

      <fieldset className="mb-6">
        <legend className="mb-2 text-xs font-bold uppercase tracking-wide text-muted">
          Brand
        </legend>
        <ul className="space-y-2">
          {BRANDS.map((b) => (
            <li key={b}>
              <label className="flex cursor-pointer items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={filters.brands.includes(b)}
                  onChange={() => toggleBrand(b)}
                  className="h-4 w-4 rounded border-gray-300 accent-forest"
                />
                {b}
              </label>
            </li>
          ))}
        </ul>
      </fieldset>

      <fieldset className="mb-6">
        <legend className="mb-2 text-xs font-bold uppercase tracking-wide text-muted">
          Rating
        </legend>
        <ul className="space-y-2">
          {[4, 3, 2].map((r) => (
            <li key={r}>
              <label className="flex cursor-pointer items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="rating"
                  checked={filters.minRating === r}
                  onChange={() => onChange({ ...filters, minRating: r })}
                  className="accent-forest"
                />
                <span className="flex items-center gap-1">
                  {r} <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />{" "}
                  & above
                </span>
              </label>
            </li>
          ))}
          <li>
            <button
              type="button"
              className="text-xs text-action underline"
              onClick={() => onChange({ ...filters, minRating: null })}
            >
              Clear rating
            </button>
          </li>
        </ul>
      </fieldset>

      <fieldset className="mb-4">
        <legend className="mb-2 text-xs font-bold uppercase tracking-wide text-muted">
          Availability
        </legend>
        <ul className="space-y-2">
          {(
            [
              ["all", "All"],
              ["in", "In Stock"],
              ["out", "Out of Stock"],
            ] as const
          ).map(([val, label]) => (
            <li key={val}>
              <label className="flex cursor-pointer items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="availability"
                  checked={filters.availability === val}
                  onChange={() => onChange({ ...filters, availability: val })}
                  className="accent-forest"
                />
                {label}
              </label>
            </li>
          ))}
        </ul>
      </fieldset>

      <div className="mt-6 overflow-hidden rounded-xl bg-gradient-to-br from-forest to-forest-mid p-4 text-white">
        <p className="text-sm font-bold">Freshness You Can Trust</p>
        <p className="mt-1 text-xs text-white/80">
          From local farms to your table.
        </p>
      </div>
    </aside>
  );
}
