import type { Metadata } from "next";
import { PageShell } from "@/components/ui/PageShell";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <PageShell title="Privacy Policy">
      <div className="shadow-card prose prose-sm max-w-none rounded-2xl bg-white p-6 text-gray-700">
        <p>
          MARTO respects your privacy. We collect only the information needed to
          process orders, deliver groceries in Sahiwal, and improve our service.
          We do not sell your personal data.
        </p>
        <p className="mt-3">
          Contact{" "}
          <a href="mailto:support@marto.pk" className="text-forest underline">
            support@marto.pk
          </a>{" "}
          for privacy requests.
        </p>
      </div>
    </PageShell>
  );
}
