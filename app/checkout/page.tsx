"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { CheckCircle2, Lock } from "lucide-react";
import { formatRs } from "@/lib/format";
import { useStore } from "@/lib/store-context";
import { Button } from "@/components/ui/Button";

export default function CheckoutPage() {
  const { orderTotal, cartCount, clearCart, hydrated, selectedSubtotal } =
    useStore();
  const [placed, setPlaced] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    clearCart();
    setPlaced(true);
  }

  if (!hydrated) {
    return <div className="p-16 text-center text-muted">Loading…</div>;
  }

  if (placed) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <CheckCircle2 className="mx-auto h-16 w-16 text-action" />
        <h1 className="mt-4 text-2xl font-extrabold">Order placed!</h1>
        <p className="mt-2 text-muted">
          Thank you for shopping with MARTO. Your groceries are on the way to
          Sahiwal.
        </p>
        <Button href="/shop" className="mt-6">
          Continue Shopping
        </Button>
      </div>
    );
  }

  if (cartCount === 0 || selectedSubtotal <= 0) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <h1 className="text-2xl font-extrabold">Nothing to checkout</h1>
        <p className="mt-2 text-muted">Add items to your cart first.</p>
        <Button href="/shop" className="mt-6">
          Browse Products
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] bg-surface px-4 py-10">
      <div className="mx-auto max-w-xl">
        <h1 className="mb-6 text-2xl font-extrabold text-gray-900">Checkout</h1>
        <form
          onSubmit={onSubmit}
          className="shadow-card space-y-4 rounded-2xl border border-gray-100 bg-white p-6"
        >
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium">
              Full name
            </label>
            <input
              id="name"
              required
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-forest"
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="phone" className="mb-1 block text-sm font-medium">
              Phone
            </label>
            <input
              id="phone"
              required
              type="tel"
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-forest"
              placeholder="+92 300 0000000"
            />
          </div>
          <div>
            <label htmlFor="address" className="mb-1 block text-sm font-medium">
              Delivery address (Sahiwal)
            </label>
            <textarea
              id="address"
              required
              rows={3}
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-forest"
              placeholder="House / street / area"
            />
          </div>
          <div className="flex items-center justify-between rounded-xl bg-mint px-4 py-3">
            <span className="font-semibold">Total to pay</span>
            <span className="text-xl font-extrabold text-forest">
              {formatRs(orderTotal)}
            </span>
          </div>
          <button
            type="submit"
            className="btn-3d flex w-full items-center justify-center gap-2 rounded-full bg-forest py-3.5 text-sm font-bold text-white"
          >
            <Lock className="h-4 w-4" /> Place Order (Cash on Delivery)
          </button>
          <p className="text-center text-xs text-muted">
            Or{" "}
            <Link href="/cart" className="text-forest underline">
              return to cart
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
