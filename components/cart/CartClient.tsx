"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Headphones,
  Leaf,
  Lock,
  Trash2,
  Truck,
} from "lucide-react";
import { getProductBySlug } from "@/lib/data/products";
import { formatRs } from "@/lib/format";
import { useStore } from "@/lib/store-context";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { Button } from "@/components/ui/Button";

export function CartClient() {
  const {
    cart,
    hydrated,
    removeFromCart,
    updateQuantity,
    setUnit,
    toggleSelect,
    toggleSelectAll,
    selectedSubtotal,
    deliveryFee,
    orderTotal,
    promoCode,
    promoDiscount,
    applyPromo,
    cartCount,
  } = useStore();

  const [code, setCode] = useState("");
  const [promoMsg, setPromoMsg] = useState("");

  const allSelected = cart.length > 0 && cart.every((i) => i.selected);

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center text-muted">
        Loading cart…
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <div className="shadow-card mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-mint">
          <Leaf className="h-10 w-10 text-forest" />
        </div>
        <h1 className="text-2xl font-extrabold text-gray-900">Your cart is empty</h1>
        <p className="mt-2 text-muted">
          Fresh products, better choices, healthier you!
        </p>
        <Button href="/shop" className="mt-6">
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link
            href="/shop"
            className="mb-2 inline-flex items-center gap-1 text-sm text-muted hover:text-forest"
          >
            <ArrowLeft className="h-4 w-4" /> Continue Shopping
          </Link>
          <h1 className="flex items-center gap-3 text-2xl font-extrabold text-gray-900">
            My Cart
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-forest text-sm text-white">
              {cartCount}
            </span>
          </h1>
          <p className="mt-1 flex items-center gap-1 text-sm text-muted">
            <Leaf className="h-3.5 w-3.5 text-action" />
            Fresh products, better choices, healthier you!
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="shadow-card overflow-hidden rounded-2xl border border-gray-100 bg-white">
          <div className="hidden grid-cols-[auto_1fr_100px_120px_100px_40px] gap-2 border-b border-gray-100 bg-gray-50 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted md:grid">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={(e) => toggleSelectAll(e.target.checked)}
                className="accent-forest"
                aria-label="Select all"
              />
            </label>
            <span>Product</span>
            <span>Price</span>
            <span>Quantity</span>
            <span>Total</span>
            <span />
          </div>

          <ul>
            {cart.map((item) => {
              const product = getProductBySlug(item.slug);
              if (!product) return null;
              const line =
                product.price * item.unitMultiplier * item.quantity;
              return (
                <li
                  key={`${item.productId}-${item.unitLabel}`}
                  className="grid grid-cols-1 gap-3 border-b border-gray-50 px-4 py-4 md:grid-cols-[auto_1fr_100px_120px_100px_40px] md:items-center md:gap-2"
                >
                  <input
                    type="checkbox"
                    checked={item.selected}
                    onChange={() => toggleSelect(item.productId, item.unitLabel)}
                    className="accent-forest"
                    aria-label={`Select ${product.name}`}
                  />
                  <div className="flex items-center gap-3">
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-mint">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div>
                      <Link
                        href={`/product/${product.slug}`}
                        className="font-semibold hover:text-forest"
                      >
                        {product.name}
                      </Link>
                      {product.tags?.[0] && (
                        <p className="text-xs text-action">{product.tags[0]}</p>
                      )}
                      <select
                        value={item.unitLabel}
                        onChange={(e) => {
                          const opt = product.unitOptions.find(
                            (u) => u.label === e.target.value,
                          );
                          if (opt) setUnit(item.productId, opt.label, opt.multiplier);
                        }}
                        className="mt-1 rounded border border-gray-200 bg-white px-2 py-1 text-xs"
                      >
                        {product.unitOptions.map((u) => (
                          <option key={u.label} value={u.label}>
                            {u.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <p className="text-sm font-medium">
                    {formatRs(Math.round(product.price * item.unitMultiplier))}
                    <span className="block text-xs font-normal text-muted">
                      per {item.unitLabel}
                    </span>
                  </p>
                  <QuantityStepper
                    value={item.quantity}
                    onChange={(v) =>
                      updateQuantity(item.productId, v, item.unitLabel)
                    }
                    size="sm"
                  />
                  <p className="font-bold text-forest">{formatRs(Math.round(line))}</p>
                  <button
                    type="button"
                    aria-label={`Remove ${product.name}`}
                    onClick={() => removeFromCart(item.productId, item.unitLabel)}
                    className="text-gray-400 transition hover:text-red-500"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="flex flex-wrap items-center justify-between gap-3 bg-mint/60 px-4 py-4">
            <p className="text-sm text-gray-700">
              Need anything else? Explore more fresh products and add them to your
              cart.
            </p>
            <Button href="/shop" variant="outline" className="bg-white">
              Continue Shopping <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <aside className="flex flex-col gap-4">
          <div className="overflow-hidden rounded-2xl bg-forest p-4 text-white shadow-card">
            <p className="font-bold">Freshness at Your Door.</p>
            <p className="text-sm text-white/80">
              Quality groceries. Delivered with care.
            </p>
          </div>

          <div className="shadow-card rounded-2xl border border-gray-100 bg-white p-5">
            <h2 className="text-lg font-bold">Order Summary</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted">
                  Subtotal ({cart.filter((i) => i.selected).length} items)
                </dt>
                <dd className="font-semibold">{formatRs(selectedSubtotal)}</dd>
              </div>
              {promoDiscount > 0 && (
                <div className="flex justify-between text-action">
                  <dt>Promo ({promoCode})</dt>
                  <dd>-{formatRs(promoDiscount)}</dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt className="text-muted">Delivery Fee</dt>
                <dd className="font-semibold">
                  {deliveryFee === 0 ? "FREE" : formatRs(deliveryFee)}
                </dd>
              </div>
              <div className="flex justify-between border-t border-gray-100 pt-3 text-base">
                <dt className="font-bold">Total Amount</dt>
                <dd className="text-xl font-extrabold text-forest">
                  {formatRs(orderTotal)}
                </dd>
              </div>
            </dl>

            <div className="mt-5">
              <p className="mb-2 text-sm font-semibold">Have a Promo Code?</p>
              <div className="flex gap-2">
                <input
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="FRESH10"
                  className="min-w-0 flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-forest"
                />
                <button
                  type="button"
                  className="btn-3d rounded-lg bg-forest px-4 py-2 text-sm font-bold text-white"
                  onClick={() => {
                    const res = applyPromo(code);
                    setPromoMsg(res.message);
                  }}
                >
                  Apply
                </button>
              </div>
              {promoMsg && (
                <p className="mt-1 text-xs text-muted" role="status">
                  {promoMsg}
                </p>
              )}
            </div>

            <Button href="/checkout" className="mt-5 w-full py-3.5">
              <Lock className="h-4 w-4" /> Proceed to Checkout →
            </Button>

            <ul className="mt-4 flex justify-between text-[10px] text-muted">
              <li className="flex flex-col items-center gap-1">
                <Lock className="h-4 w-4 text-action" /> Secure Payment
              </li>
              <li className="flex flex-col items-center gap-1">
                <Truck className="h-4 w-4 text-action" /> Fast Delivery
              </li>
              <li className="flex flex-col items-center gap-1">
                <Headphones className="h-4 w-4 text-action" /> 24/7 Support
              </li>
            </ul>
          </div>

          <div className="relative overflow-hidden rounded-2xl">
            <Image
              src="/images/cart-lifestyle.jpg"
              alt="MARTO grocery bag"
              width={400}
              height={280}
              className="h-48 w-full object-cover"
            />
            <p className="font-script absolute bottom-3 left-3 text-xl text-white drop-shadow-lg">
              Good Food Good Mood
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
