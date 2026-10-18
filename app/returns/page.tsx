import type { Metadata } from "next";
import { PageShell } from "@/components/ui/PageShell";

export const metadata: Metadata = { title: "Return Policy" };

export default function ReturnsPage() {
  return (
    <PageShell title="Return Policy">
      <div className="shadow-card rounded-2xl bg-white p-6 text-sm leading-relaxed text-gray-700">
        <p>
          If an item arrives damaged or incorrect, contact us within 24 hours at{" "}
          <a href="mailto:support@marto.pk" className="text-forest underline">
            support@marto.pk
          </a>{" "}
          or +92 300 1234567. We&apos;ll arrange a replacement or refund for
          eligible items.
        </p>
      </div>
    </PageShell>
  );
}
