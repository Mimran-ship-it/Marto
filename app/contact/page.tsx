import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { PageShell } from "@/components/ui/PageShell";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with MARTO customer support in Sahiwal.",
};

export default function ContactPage() {
  return (
    <PageShell title="Contact Us" subtitle="We're here Mon–Sun, 8AM–10PM.">
      <div className="shadow-card space-y-6 rounded-2xl bg-white p-6">
        <div className="flex gap-3">
          <Phone className="h-5 w-5 text-action" />
          <div>
            <p className="font-semibold">+92 300 1234567</p>
            <p className="text-sm text-muted">Mon - Sun, 8AM - 10PM</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Mail className="h-5 w-5 text-action" />
          <div>
            <a href="mailto:support@marto.pk" className="font-semibold hover:text-forest">
              support@marto.pk
            </a>
            <p className="text-sm text-muted">We reply within 24 hours</p>
          </div>
        </div>
        <div className="flex gap-3">
          <MapPin className="h-5 w-5 text-action" />
          <div>
            <p className="font-semibold">Delivering in Sahiwal, Pakistan</p>
            <p className="text-sm text-muted">City-wide grocery delivery</p>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
