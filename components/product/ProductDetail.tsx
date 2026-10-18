"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Heart,
  Leaf,
  Lock,
  ShoppingCart,
  Truck,
  Zap,
} from "lucide-react";
import type { Product } from "@/lib/data/products";
import { FREE_DELIVERY_THRESHOLD, getRelatedProducts } from "@/lib/data/products";
import { discountPercent, formatRs, formatReviewCount } from "@/lib/format";
import { useStore } from "@/lib/store-context";
import { Badge } from "@/components/ui/Badge";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { StarRating } from "@/components/ui/StarRating";

export function ProductDetail({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const [unitIdx, setUnitIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [thumb, setThumb] = useState(0);
  const related = getRelatedProducts(product, 3);
  const wish = isWishlisted(product.id);
  const unit = product.unitOptions[unitIdx] ?? product.unitOptions[0];
  const unitPrice = Math.round(product.price * (unit?.multiplier ?? 1));
  const discount = discountPercent(product.price, product.compareAt);
  const gallery =
    product.gallery.length > 0 ? product.gallery : [product.image];
  const multi = gallery.length > 1;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="shadow-card rounded-3xl border border-gray-100 bg-white p-4 sm:p-6">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-[#F3F6F3]">
                <Badge tone="mint" className="absolute left-3 top-3 z-10">
                  <Leaf className="h-3 w-3" /> Fresh & Organic
                </Badge>
                <button
                  type="button"
                  aria-label="Wishlist"
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md"
                >
                  <Heart
                    className={`h-5 w-5 ${wish ? "fill-red-500 text-red-500" : "text-gray-400"}`}
                  />
                </button>
                {multi && (
                  <>
                    <button
                      type="button"
                      aria-label="Previous image"
                      className="absolute left-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 shadow"
                      onClick={() =>
                        setThumb((t) => (t - 1 + gallery.length) % gallery.length)
                      }
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      aria-label="Next image"
                      className="absolute right-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 shadow"
                      onClick={() => setThumb((t) => (t + 1) % gallery.length)}
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}
                <Image
                  src={gallery[thumb] ?? product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width:768px) 100vw, 40vw"
                  priority
                />
              </div>
              {multi && (
                <div className="mt-3 flex gap-2 overflow-x-auto">
                  {gallery.map((src, i) => (
                    <button
                      key={`${src}-${i}`}
                      type="button"
                      onClick={() => setThumb(i)}
                      className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 ${
                        thumb === i ? "border-forest" : "border-transparent"
                      }`}
                    >
                      <Image src={src} alt="" fill className="object-cover" sizes="64px" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div>
              <div className="mb-3 flex flex-wrap gap-2">
                {product.badges.includes("Best Seller") && (
                  <Badge tone="gold">👑 Best Seller</Badge>
                )}
                {(product.badges.includes("Organic") || true) && (
                  <Badge tone="outline">
                    <Leaf className="h-3 w-3" /> 100% Organic
                  </Badge>
                )}
              </div>

              <h1 className="text-3xl font-extrabold text-forest">{product.name}</h1>
              {product.subtitle && (
                <p className="mt-1 text-sm text-muted">{product.subtitle}</p>
              )}
              <div className="mt-2">
                <StarRating
                  rating={product.rating}
                  reviewCount={product.reviewCount}
                  size="md"
                />
                <span className="sr-only">
                  {formatReviewCount(product.reviewCount)} reviews
                </span>
              </div>

              <div className="mt-4 flex flex-wrap items-baseline gap-3">
                <span className="text-3xl font-extrabold text-gray-900">
                  {formatRs(unitPrice)}
                </span>
                {product.compareAt && (
                  <span className="text-lg text-muted line-through">
                    {formatRs(
                      Math.round(product.compareAt * (unit?.multiplier ?? 1)),
                    )}
                  </span>
                )}
                {discount && <Badge tone="green">{discount}% OFF</Badge>}
              </div>
              <p className="text-sm text-muted">per {unit?.label ?? product.unit}</p>

              <p className="mt-4 text-sm leading-relaxed text-gray-600">
                {product.description}
              </p>

              <div className="mt-5">
                <p className="mb-2 text-sm font-semibold">Select weight</p>
                <div className="flex flex-wrap gap-2">
                  {product.unitOptions.map((u, i) => (
                    <button
                      key={u.label}
                      type="button"
                      onClick={() => setUnitIdx(i)}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                        unitIdx === i
                          ? "border-2 border-forest bg-mint text-forest"
                          : "border border-gray-200 bg-white text-gray-700 hover:border-forest/40"
                      }`}
                    >
                      {u.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-4">
                <QuantityStepper value={qty} onChange={setQty} />
                {product.inStock ? (
                  <p className="flex items-center gap-1.5 text-sm font-medium text-action">
                    <CheckCircle2 className="h-4 w-4" />
                    In Stock – Ready for delivery
                  </p>
                ) : (
                  <p className="text-sm font-medium text-red-500">Out of Stock</p>
                )}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  disabled={!product.inStock}
                  onClick={() =>
                    addToCart(product, qty, unit?.label)
                  }
                  className="btn-3d flex flex-1 items-center justify-center gap-2 rounded-full bg-forest px-6 py-3.5 text-sm font-bold text-white disabled:opacity-50 sm:flex-none sm:min-w-[200px]"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </button>
                <button
                  type="button"
                  aria-label="Wishlist"
                  onClick={() => toggleWishlist(product.id)}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white"
                >
                  <Heart
                    className={`h-5 w-5 ${wish ? "fill-red-500 text-red-500" : "text-gray-400"}`}
                  />
                </button>
              </div>
              <Link
                href="/checkout"
                onClick={() => {
                  if (product.inStock) addToCart(product, qty, unit?.label);
                }}
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-forest bg-white px-5 py-2.5 text-sm font-semibold text-forest transition hover:bg-mint sm:w-auto"
              >
                <Zap className="h-4 w-4" /> Buy Now
              </Link>

              <ul className="mt-8 grid grid-cols-2 gap-3 border-t border-gray-100 pt-6 sm:grid-cols-4">
                {[
                  { icon: Leaf, label: "Fresh Guarantee" },
                  { icon: Truck, label: "Fast Delivery", sub: "Within 2–4 Hours" },
                  { icon: Lock, label: "Secure Payment" },
                  { icon: CheckCircle2, label: "24/7 Support" },
                ].map(({ icon: Icon, label, sub }) => (
                  <li key={label} className="text-center">
                    <Icon className="mx-auto h-6 w-6 text-action" />
                    <p className="mt-1 text-xs font-semibold">{label}</p>
                    {sub && <p className="text-[10px] text-muted">{sub}</p>}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <aside className="flex flex-col gap-4">
          <div className="shadow-card overflow-hidden rounded-2xl border border-gray-100 bg-white p-4">
            <h2 className="font-bold text-forest">Freshness You Can Trust</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {["Locally Sourced", "No Harmful Chemicals", "Premium Quality"].map(
                (t) => (
                  <li key={t} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-action" />
                    {t}
                  </li>
                ),
              )}
            </ul>
          </div>

          <div className="shadow-card rounded-2xl border border-gray-100 bg-white p-4">
            <h2 className="mb-3 font-bold text-gray-900">People Also Bought</h2>
            <ul className="space-y-3">
              {related.map((r) => (
                <li
                  key={r.id}
                  className="flex items-center gap-3 rounded-xl bg-surface p-2"
                >
                  <Link
                    href={`/product/${r.slug}`}
                    className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-white"
                  >
                    <Image src={r.image} alt={r.name} fill className="object-cover" sizes="56px" />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/product/${r.slug}`}
                      className="block truncate text-sm font-semibold hover:text-forest"
                    >
                      {r.name}
                    </Link>
                    <p className="text-xs text-muted">
                      {r.unit} · {formatRs(r.price)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => addToCart(r)}
                    className="btn-3d shrink-0 rounded-full bg-forest px-3 py-1.5 text-xs font-bold text-white"
                  >
                    + Add
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="overflow-hidden rounded-2xl bg-forest p-4 text-white shadow-card">
            <div className="flex items-center gap-3">
              <Truck className="h-10 w-10 text-lime" />
              <div>
                <p className="font-bold">Free Delivery</p>
                <p className="text-xs text-white/80">
                  On orders above {formatRs(FREE_DELIVERY_THRESHOLD)} · Sahiwal
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-gray-100 pt-6">
        <ul className="flex flex-wrap gap-6 text-sm font-medium text-gray-700">
          <li className="flex items-center gap-2">
            <Leaf className="h-4 w-4 text-action" /> 100% Fresh & Natural
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-action" /> Trusted by Thousands
          </li>
          <li className="flex items-center gap-2">
            <Heart className="h-4 w-4 text-action" /> Better Food Healthier Life
          </li>
        </ul>
        <p className="font-script text-2xl text-forest">
          Fresh Food Happy You 💚
        </p>
      </div>
    </div>
  );
}
