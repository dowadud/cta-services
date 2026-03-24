import type { Metadata } from "next";
import { Suspense } from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/motion";
import { COMPANY } from "@/lib/company";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact & Quote Request — CTA Services LLC",
  description:
    "Contact CTA Services LLC in Concord, NC for floor equipment sales, rentals, service, and parts. Request a quote online or call 704-458-7691.",
};

export default function ContactPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="max-w-2xl mb-12">
            <Badge variant="secondary" className="mb-3 text-xs uppercase tracking-widest">Contact & Quote</Badge>
            <h1 className="text-4xl font-bold text-foreground">Get in Touch</h1>
            <p className="mt-3 text-muted-foreground">
              Use the form for equipment quotes, rental requests, service scheduling, or general inquiries. We respond same-day to all messages.
            </p>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            <FadeIn delay={0.05}>
              <div className="rounded-xl border border-border bg-card p-6 md:p-8">
                <Suspense>
                  <ContactForm />
                </Suspense>
              </div>
            </FadeIn>
          </div>

          {/* Contact info sidebar */}
          <FadeIn delay={0.1}>
            <div className="space-y-6">
              <div className="rounded-xl border border-border bg-card p-6 space-y-5">
                <h2 className="font-semibold text-foreground">Contact Information</h2>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">Phone</p>
                    <a href={COMPANY.telHref} className="font-medium text-foreground hover:text-primary transition-colors">
                      {COMPANY.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">Email</p>
                    <a href={COMPANY.mailtoHref} className="font-medium text-foreground hover:text-primary transition-colors break-all">
                      {COMPANY.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">Address</p>
                    <address className="not-italic font-medium text-foreground text-sm">
                      {COMPANY.addressLine1}<br />
                      {COMPANY.cityStateZip}
                    </address>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">Hours</p>
                    <p className="text-sm text-foreground">Mon–Fri 8am–5pm</p>
                    <p className="text-xs text-muted-foreground">Emergency service inquiries welcome</p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-primary/20 bg-primary/5 p-6 space-y-3">
                <h3 className="font-semibold text-sm text-foreground">Need it fast?</h3>
                <p className="text-xs text-muted-foreground">
                  For urgent equipment needs, rental pickups, or same-day service — call us directly.
                </p>
                <a
                  href={COMPANY.telHref}
                  className="flex items-center gap-2 text-sm font-semibold text-primary hover:opacity-80 transition-opacity"
                >
                  <Phone className="w-4 h-4" />
                  {COMPANY.phoneDisplay}
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
