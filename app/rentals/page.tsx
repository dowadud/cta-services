import type { Metadata } from "next";
import Link from "next/link";
import { Phone, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn, FadeInGroup, FadeInItem } from "@/components/motion";
import { COMPANY } from "@/lib/company";

export const metadata: Metadata = {
  title: "Equipment Rentals — Daily, Weekly & Monthly | Concord NC",
  description:
    "Rent flooring equipment from CTA Services in Concord, NC. Floor scrubbers, grinders, scarifiers, shot blasters, and power trowels. Daily, weekly, and monthly rates. Charlotte metro delivery.",
};

const RENTAL_CATEGORIES = [
  {
    name: "Floor Scrubbers",
    sub: "Walk-behind and ride-on auto scrubbers",
    terms: ["Day", "Week", "Month"],
    features: ["Pre-delivery inspection", "Pad and brush kit", "On-call support"],
  },
  {
    name: "Floor Grinders",
    sub: "Planetary and single-head concrete grinders",
    terms: ["Day", "Week", "Month"],
    features: ["Diamond tooling options", "Wet/dry vacuum pairing", "Operator orientation"],
  },
  {
    name: "Shot Blasters",
    sub: "Walk-behind portable and ride-on units",
    terms: ["Day", "Week"],
    features: ["Steel shot media available", "Blast hose and recovery system", "Safety training"],
  },
  {
    name: "Concrete Scarifiers",
    sub: "Electric, gas, and self-propelled models",
    terms: ["Day", "Week", "Month"],
    features: ["Drum and flail options", "DCS depth control models", "Collection bag included"],
  },
  {
    name: "Power Trowels",
    sub: "Walk-behind (36 in) and ride-on models",
    terms: ["Day", "Week"],
    features: ["Blade and pan kits", "Operator walkthrough", "On-site delivery available"],
  },
  {
    name: "Floor Scrapers",
    sub: "Walk-behind and ride-on scrapers",
    terms: ["Day", "Week", "Month"],
    features: ["Multiple blade options", "Battery and electric models", "Pre-delivery check"],
  },
];

const TERMS = [
  {
    title: "Flexible Terms",
    body: "We offer day, week, and month rentals. Multi-week and project-rate agreements available for contractors on extended schedules.",
  },
  {
    title: "Charlotte Metro Delivery",
    body: "We deliver to job sites across Cabarrus, Mecklenburg, Rowan, Stanly, and Union counties. Call for rates and scheduling.",
  },
  {
    title: "Operator Orientation",
    body: "Every rental includes a pre-use walkthrough — controls, safety, daily maintenance checks, and what to call us for mid-project.",
  },
  {
    title: "On-Call During Rental",
    body: "We stay available during your rental period. If the equipment has an issue, call us and we'll respond same-day where possible.",
  },
];

export default function RentalsPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <FadeIn>
          <div className="max-w-2xl mb-16">
            <Badge variant="secondary" className="mb-3 text-xs uppercase tracking-widest">Rental Programs</Badge>
            <h1 className="text-4xl font-bold text-foreground">Rent Floor Equipment</h1>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              CTA Services offers flexible equipment rentals for contractors, facility managers, and floor prep crews. Daily, weekly, and monthly terms available.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/contact?type=rental">Get a Rental Quote <ArrowRight className="ml-2 w-4 h-4" /></Link>
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

        {/* Rental categories */}
        <FadeIn>
          <h2 className="text-2xl font-bold text-foreground mb-8">Available Equipment</h2>
        </FadeIn>
        <FadeInGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {RENTAL_CATEGORIES.map((cat) => (
            <FadeInItem key={cat.name}>
              <div className="h-full rounded-lg border border-border bg-card p-6 flex flex-col gap-4">
                <div>
                  <h3 className="font-semibold text-foreground">{cat.name}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{cat.sub}</p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {cat.terms.map((t) => (
                    <Badge key={t} variant="secondary" className="text-[10px]">{t}</Badge>
                  ))}
                </div>
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  {cat.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-2">
                  <Button asChild size="sm" variant="outline" className="w-full">
                    <Link href={`/products?category=${encodeURIComponent(cat.name)}`}>
                      Browse {cat.name}
                    </Link>
                  </Button>
                </div>
              </div>
            </FadeInItem>
          ))}
        </FadeInGroup>

        {/* Rental terms */}
        <FadeIn>
          <div className="rounded-xl border border-border bg-secondary/20 p-8 md:p-12">
            <h2 className="text-2xl font-bold text-foreground mb-8">Rental Program Details</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {TERMS.map((t) => (
                <div key={t.title}>
                  <h3 className="font-semibold text-foreground text-sm mb-1.5">{t.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t.body}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="font-medium text-foreground">{COMPANY.legalName}</p>
                <p className="text-sm text-muted-foreground">{COMPANY.fullAddress} · {COMPANY.phoneDisplay}</p>
              </div>
              <Button asChild>
                <Link href="/contact?type=rental">Request Rental Quote</Link>
              </Button>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
