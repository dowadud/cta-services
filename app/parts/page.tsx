import type { Metadata } from "next";
import Link from "next/link";
import { Phone, ArrowRight, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn, FadeInGroup, FadeInItem } from "@/components/motion";
import { COMPANY } from "@/lib/company";

export const metadata: Metadata = {
  title: "Floor Equipment Parts & Consumables — Concord NC | CTA Services LLC",
  description:
    "OEM and compatible replacement parts for floor scrubbers, concrete grinders, scarifiers, and shot blasters. Brushes, squeegee blades, batteries, filters, and drive parts. Concord, NC.",
  alternates: { canonical: "https://ctaservicesnc.com/parts" },
  openGraph: {
    title: "Floor Equipment Parts & Consumables — Concord NC | CTA Services LLC",
    description: "OEM and compatible parts for floor scrubbers, grinders, scarifiers, and shot blasters. Brushes, blades, batteries, and more. Serving Concord and Charlotte metro.",
    url: "https://ctaservicesnc.com/parts",
  },
};

const PART_CATEGORIES = [
  { name: "Brushes & Pads", items: ["Side brushes", "Main scrub brushes", "Floor pads (black, white, red, tan)", "Nylon disk brushes", "Cylindrical brushes"] },
  { name: "Squeegees & Blades", items: ["Front and rear squeegee blades", "Side squeegee straps", "Scarifier drum flails", "Shot blaster wear parts", "Scraper blades"] },
  { name: "Batteries & Electrical", items: ["Wet cell traction batteries", "Lithium-ion battery packs", "Battery chargers (standard & opportunity)", "Solenoid and contactor replacements", "Wiring harnesses"] },
  { name: "Filters & Fluids", items: ["Solution and recovery filters", "Vacuum fan motor filters", "Engine oil and hydraulic fluid", "Dust collector bags and cartridges", "Descaler solution"] },
  { name: "Drive & Mechanical", items: ["Drive belts and chains", "Wheel and drive hub assemblies", "Gearbox components", "Hydraulic hoses and fittings", "Motor couplings"] },
  { name: "Diamond Tooling", items: ["Grinding segments and plugs", "Floor pads (metal bond, resin bond)", "Shot blaster abrasive media", "Scarifier drum carbide cutters", "Polishing pads (wet/dry)"] },
];

export default function PartsPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <FadeIn>
          <div className="max-w-2xl mb-16">
            <Badge variant="secondary" className="mb-3 text-xs uppercase tracking-widest">Parts & Consumables</Badge>
            <h1 className="text-4xl font-bold text-foreground">Parts & Consumables</h1>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              We supply OEM and high-quality compatible replacement parts for the floor equipment we sell and service. Call or email with your machine model and serial number for fast identification.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/contact?type=parts">Request Parts Quote <ArrowRight className="ml-2 w-4 h-4" /></Link>
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

        {/* Parts grid */}
        <FadeInGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {PART_CATEGORIES.map((cat) => (
            <FadeInItem key={cat.name}>
              <div className="h-full rounded-lg border border-border bg-card p-6">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
                    <Package className="w-4 h-4 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">{cat.name}</h3>
                </div>
                <ul className="space-y-1.5">
                  {cat.items.map((item) => (
                    <li key={item} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeInItem>
          ))}
        </FadeInGroup>

        {/* How to order */}
        <FadeIn>
          <div className="rounded-xl border border-border bg-secondary/20 p-8 md:p-10">
            <h2 className="text-xl font-bold text-foreground mb-5">How to Order Parts</h2>
            <ol className="space-y-3 text-sm text-muted-foreground">
              {[
                "Locate your machine's make, model, and serial number (typically on a label on the machine frame).",
                "Call us at " + COMPANY.phoneDisplay + " or email " + COMPANY.email + " with the model number and the part you need.",
                "We'll confirm fitment, check stock, and provide pricing. Common parts are available same-day or next-day.",
                "We offer local pickup in Concord or delivery for larger orders.",
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Button asChild>
                <Link href="/contact?type=parts">Contact for Parts</Link>
              </Button>
              <Button asChild variant="outline">
                <a href={COMPANY.telHref}>
                  <Phone className="mr-2 w-4 h-4" />
                  {COMPANY.phoneDisplay}
                </a>
              </Button>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
