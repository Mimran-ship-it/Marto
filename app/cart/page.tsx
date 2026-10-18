import type { Metadata } from "next";
import { CartClient } from "@/components/cart/CartClient";

export const metadata: Metadata = {
  title: "My Cart",
  description: "Review your MARTO grocery cart and proceed to checkout.",
};

export default function CartPage() {
  return (
    <div className="min-h-[60vh] bg-surface">
      <CartClient />
    </div>
  );
}
