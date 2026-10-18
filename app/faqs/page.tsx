import type { Metadata } from "next";
import { PageShell } from "@/components/ui/PageShell";

export const metadata: Metadata = {
  title: "FAQs",
  description: "Frequently asked questions about MARTO grocery delivery.",
};

const faqs = [
  {
    q: "Where do you deliver?",
    a: "We currently deliver across Sahiwal, Pakistan.",
  },
  {
    q: "How fast is delivery?",
    a: "Most orders arrive within 30–60 minutes. Fresh produce typically within 2–4 hours.",
  },
  {
    q: "Is there free delivery?",
    a: "Yes — free delivery on orders above Rs. 2,000. First-order free delivery promos may also apply.",
  },
  {
    q: "What payment methods do you accept?",
    a: "Cash on delivery and other secure payment options at checkout.",
  },
];

export default function FaqsPage() {
  return (
    <PageShell title="FAQs" subtitle="Quick answers about shopping with MARTO.">
      <ul className="space-y-4">
        {faqs.map((f) => (
          <li key={f.q} className="shadow-card rounded-2xl bg-white p-5">
            <h2 className="font-bold text-forest">{f.q}</h2>
            <p className="mt-2 text-sm text-gray-600">{f.a}</p>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
