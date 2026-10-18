import type { Metadata } from "next";
import { PageShell } from "@/components/ui/PageShell";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about MARTO — Sahiwal's trusted online grocery store.",
};

export default function AboutPage() {
  return (
    <PageShell
      title="About MARTO"
      subtitle="Fresh. Fast. Trusted — online grocery for Sahiwal."
    >
      <div className="shadow-card space-y-4 rounded-2xl bg-white p-6 text-sm leading-relaxed text-gray-700">
        <p>
          MARTO is Sahiwal&apos;s trusted online grocery store. We bring fresh
          fruits, vegetables, dairy, bakery, and daily essentials from local
          farms and trusted brands straight to your door.
        </p>
        <p>
          Our promise is simple: 100% freshness, fair prices, secure payment,
          and fast delivery — so you can spend less time shopping and more time
          enjoying good food.
        </p>
        <ul className="list-inside list-disc space-y-1 text-forest">
          <li>Locally sourced produce</li>
          <li>Fast delivery across Sahiwal</li>
          <li>Friendly 24/7 support</li>
        </ul>
      </div>
    </PageShell>
  );
}
