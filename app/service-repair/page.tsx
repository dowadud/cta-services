import type { Metadata } from "next";
import Link from "next/link";
import { Phone, ArrowRight, Wrench, Clock, Package, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn, FadeInGroup, FadeInItem } from "@/components/motion";
import { COMPANY } from "@/lib/company";

export const metadata: Metadata = {
  title: "Floor Equipment Service & Repair — Concord NC",
  description:
    "CTA Services provides certified repair and preventive maintenance for floor scrubbers, grinders, shot blasters, scarifiers, and concrete finishing equipment in Concord, NC.",
};

const CAPABILITIES = [
  { icon: Settings, title: "Diagnostic & Repair", body: "We diagnose mechanical, electrical, and hydraulic issues across major floor equipment brands. Clear estimate before we begin any work." },
  { icon: Wrench, title: "Preventive Maintenance", body: "Scheduled PM programs extend machine life and reduce unplanned downtime. We document each service with a written record for your fleet." },
  { icon: Package, title: "OEM Parts", body: "We stock common wear parts for the brands we service — brushes, squeegees, blades, batteries, motors, and more." },
  { icon: Clock, title: "Fast Turnaround", body: "We understand production schedules. We prioritize repair timing and offer loaner or rental equipment when a longer service is needed." },
];

const BRANDS_SERVICED = [
  "Tennant", "Nilfisk", "Karcher", "NSS", "Bulldog", "Taski",
  "Husqvarna", "HTC", "Blastpro", "Smith Manufacturing", "National Flooring Equipment",
  "Multiquip / Whiteman", "Allen Engineering", "Diamond Products",
];

const SERVICE_TYPES = [
  "Auto scrubbers — walk-behind and ride-on",
  "Floor grinders — single-head and planetary",
  "Concrete scarifiers and shavers",
  "Shot blasters — portable and ride-on",
  "Floor scrapers — electric and battery",
  "Power trowels — walk-behind and ride-on",
  "Floor sweepers",
  "Battery and charging system service",
  "Hydraulic system repair",
  "Control board and electronics diagnostics",
];

export default function ServiceRepairPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <FadeIn>
          <div className="max-w-2xl mb-16">
            <Badge variant="secondary" className="mb-3 text-xs uppercase tracking-widest">Certified Service</Badge>
            <h1 className="text-4xl font-bold text-foreground">Service & Repair</h1>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              CTA Services technicians diagnose, repair, and perform preventive maintenance on professional floor equipment. We work on the brands we sell and rent, keeping your fleet productive.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/contact?type=service">Schedule Service <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={COMPANY.telHref}>
                  <Phone className="mr-2 w-4 h-4" />
                  {COMPANY.phoneDisplay}
                </a>
              </Button>
            </div>
          </div>
        </FadeIn>

        {/* Capabilities */}
        <FadeInGroup className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
          {CAPABILITIES.map((c) => (
            <FadeInItem key={c.title}>
              <div className="h-full p-6 rounded-lg border border-border bg-card">
                <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center mb-4">
                  <c.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-sm text-foreground">{c.title}</h3>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{c.body}</p>
              </div>
            </FadeInItem>
          ))}
        </FadeInGroup>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Equipment we service */}
          <FadeIn>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Equipment We Service</h2>
              <ul className="space-y-2">
                {SERVICE_TYPES.map((s) => (
                  <li key={s} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          {/* Brands */}
          <FadeIn delay={0.1}>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Brands Serviced</h2>
              <div className="grid grid-cols-2 gap-2">
                {BRANDS_SERVICED.map((b) => (
                  <div key={b} className="flex items-center gap-2.5 py-2.5 px-3 rounded-lg border border-border bg-card text-sm text-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    {b}
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Don&apos;t see your brand? Call us — we work on most major floor equipment and can source parts for many additional brands.
              </p>
            </div>
          </FadeIn>
        </div>

        {/* CTA */}
        <FadeIn>
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-8 md:p-12">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Schedule Service</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Contact us to schedule a diagnostic, on-site visit, or drop-off repair. We respond same-day to service requests and provide a written estimate before any work begins.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild size="lg" className="px-8">
                  <Link href="/contact?type=service">Request Service</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="px-8">
                  <a href={COMPANY.telHref}>
                    <Phone className="mr-2 w-4 h-4" />
                    {COMPANY.phoneDisplay}
                  </a>
                </Button>
              </div>
            </div>
            <div className="mt-10 pt-8 border-t border-border grid sm:grid-cols-3 gap-6 text-center max-w-2xl mx-auto">
              <div>
                <p className="text-sm font-semibold text-foreground">Written Estimate</p>
                <p className="text-xs text-muted-foreground mt-1">Before any work begins</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">OEM Parts Stocked</p>
                <p className="text-xs text-muted-foreground mt-1">Common brands ready</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">On-Site Available</p>
                <p className="text-xs text-muted-foreground mt-1">Charlotte metro area</p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
