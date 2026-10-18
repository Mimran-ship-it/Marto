import type { Metadata } from "next";
import { PageShell } from "@/components/ui/PageShell";

export const metadata: Metadata = { title: "Terms & Conditions" };

export default function TermsPage() {
  return (
    <PageShell title="Terms & Conditions">
      <div className="shadow-card rounded-2xl bg-white p-6 text-sm leading-relaxed text-gray-700">
        <p>
          By using MARTO you agree to our delivery areas, pricing at time of
          order, and substitution policies when an item is unavailable. Prices
          are listed in Pakistani Rupees (Rs.).
        </p>
      </div>
    </PageShell>
  );
}
