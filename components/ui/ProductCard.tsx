"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, Heart, ShoppingCart } from "lucide-react";
import { CATEGORIES } from "@/lib/data/categories";
import type { Product } from "@/lib/data/products";
import { discountPercent, formatRs } from "@/lib/format";
import { useStore } from "@/lib/store-context";
import { Badge } from "./Badge";
import { QuantityStepper } from "./QuantityStepper";
import { StarRating } from "./StarRating";

type ProductCardProps = {
  product: Product;
  view?: "grid" | "list";
};

export function ProductCard({ product, view = "grid" }: ProductCardProps) {
  const { addToCart, updateQuantity, getCartQty, toggleWishlist, isWishlisted } =
    useStore();
  const qty = getCartQty(product.id);
  const wish = isWishlisted(product.id);
  const discount = discountPercent(product.price, product.compareAt);
  const categoryLabel =
    CATEGORIES.find((c) => c.slug === product.categorySlug)?.name ??
    product.brand;

  const badgeTone = (b: string) => {
    if (b.includes("OFF")) return "green" as const;
    if (b === "Best Seller") return "gold" as const;
    return "mint" as const;
  };

  if (view === "list") {
    return (
      <article className="flex flex-col gap-4 rounded-2xl border border-gray-100/90 bg-white p-4 shadow-[0_2px_12px_rgba(15,23,42,0.06)] sm:flex-row sm:items-center">
        <Link
          href={`/product/${product.slug}`}
          className="relative h-28 w-full shrink-0 overflow-hidden rounded-xl bg-[#F3F6F3] sm:h-32 sm:w-36"
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="144px"
          />
        </Link>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-action">
            {product.brand}
          </p>
          <Link href={`/product/${product.slug}`}>
            <h3 className="text-lg font-bold text-[#0F172A]">{product.name}</h3>
          </Link>
          <p className="text-sm text-muted">{product.unit}</p>
          <StarRating rating={product.rating} reviewCount={product.reviewCount} />
        </div>
        <div className="flex shrink-0 flex-col items-end gap-2">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-action">
              {formatRs(product.price)}
            </span>
            {product.compareAt && (
              <span className="text-sm text-muted line-through">
                {formatRs(product.compareAt)}
              </span>
            )}
          </div>
          {qty === 0 ? (
            <button
              type="button"
              disabled={!product.inStock}
              onClick={() => addToCart(product)}
              className="flex cursor-pointer items-center gap-2 rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </button>
          ) : (
            <QuantityStepper
              value={qty}
              onChange={(v) => updateQuantity(product.id, v)}
              size="sm"
            />
          )}
        </div>
      </article>
    );
  }

  return (
    <article className="relative flex flex-col overflow-hidden rounded-[1.25rem] border border-black/[0.04] bg-white shadow-[0_4px_20px_rgba(15,23,42,0.07)] sm:rounded-2xl">
      <div className="relative aspect-[5/4] overflow-hidden bg-[#F3F6F3] sm:aspect-[4/3]">
        <div className="absolute left-2.5 top-2.5 z-10 flex max-w-[70%] flex-col gap-1 sm:left-3 sm:top-3 sm:gap-1.5">
          {product.badges.slice(0, 2).map((b) => (
            <Badge key={b} tone={badgeTone(b)} className="shadow-sm">
              {b}
            </Badge>
          ))}
        </div>
        <button
          type="button"
          aria-label={wish ? "Remove from wishlist" : "Add to wishlist"}
          onClick={() => toggleWishlist(product.id)}
          className="absolute right-2.5 top-2.5 z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white shadow-[0_2px_8px_rgba(15,23,42,0.12)] sm:right-3 sm:top-3 sm:h-9 sm:w-9"
        >
          <Heart
            className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${wish ? "fill-red-500 text-red-500" : "text-gray-400"}`}
          />
        </button>
        <Link href={`/product/${product.slug}`} className="absolute inset-0">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width:768px) 50vw, 25vw"
          />
        </Link>
      </div>

      <div className="flex flex-1 flex-col gap-1.5 px-3 pb-3 pt-2.5 sm:gap-2 sm:p-4">
        <div className="flex items-start justify-between gap-1.5">
          <p className="min-w-0 truncate text-[9px] font-bold uppercase tracking-[0.08em] text-action sm:text-[10px] sm:tracking-wider">
            {categoryLabel}
          </p>
          <StarRating
            rating={product.rating}
            reviewCount={product.reviewCount}
            className="shrink-0 [&_span]:text-[11px] sm:[&_span]:text-sm"
          />
        </div>

        <Link href={`/product/${product.slug}`} className="cursor-pointer">
          <h3 className="line-clamp-2 text-[15px] font-bold leading-snug tracking-tight text-[#0F172A] sm:text-base">
            {product.name}
          </h3>
        </Link>
        <p className="text-[11px] text-muted sm:text-xs">{product.unit}</p>

        <p className="flex items-center gap-1 text-[11px] text-muted sm:text-xs">
          <Clock className="h-3 w-3 shrink-0 text-action sm:h-3.5 sm:w-3.5" />
          <span className="truncate">
            Estimated Delivery: {product.deliveryMinutes} Mins
          </span>
        </p>

        <div className="mt-auto flex items-end justify-between gap-2 pt-1">
          <div className="min-w-0">
            <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
              <span className="text-base font-bold text-action sm:text-lg">
                {formatRs(product.price)}
              </span>
              {product.compareAt && (
                <span className="text-[11px] text-muted line-through sm:text-xs">
                  {formatRs(product.compareAt)}
                </span>
              )}
            </div>
            {discount && (
              <Badge tone="green" className="mt-1 text-[10px]">
                {discount}% OFF
              </Badge>
            )}
          </div>
          {product.sourcedLocally && (
            <span className="shrink-0 rounded-full bg-[#F1F5F4] px-2 py-0.5 text-[9px] font-medium text-[#64748B] sm:text-[10px]">
              Sourced Locally
            </span>
          )}
        </div>

        <div className="pt-1.5 sm:pt-2">
          {!product.inStock ? (
            <button
              type="button"
              disabled
              className="w-full cursor-not-allowed rounded-full bg-gray-200 py-2.5 text-sm font-semibold text-gray-500"
            >
              Out of Stock
            </button>
          ) : qty === 0 ? (
            <button
              type="button"
              onClick={() => addToCart(product)}
              className="flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-full bg-forest py-2.5 text-[12px] font-bold uppercase tracking-wide text-white shadow-[0_4px_14px_rgba(11,93,42,0.28)] sm:text-sm"
            >
              Add to Cart +
            </button>
          ) : (
            <div className="flex overflow-hidden rounded-full border border-forest/15">
              <span className="flex flex-1 items-center justify-center bg-forest text-[12px] font-bold uppercase tracking-wide text-white sm:text-sm">
                Add
              </span>
              <div className="flex flex-1 items-center justify-center bg-white">
                <QuantityStepper
                  value={qty}
                  onChange={(v) => updateQuantity(product.id, v)}
                  size="sm"
                  className="border-0 shadow-none"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
