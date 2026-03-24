import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronRight, Phone, Mail, MapPin, Star, Wrench,
  Truck, Settings, Package, ArrowRight, ShieldCheck,
  Clock, Users, Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/product-card";
import { FadeIn, FadeInGroup, FadeInItem } from "@/components/motion";
import { COMPANY } from "@/lib/company";
import { getFeaturedProducts, getCategories } from "@/lib/products";

export const metadata: Metadata = {
  title: "CTA Services LLC — Flooring Equipment Sales, Rentals & Service | Concord, NC",
  description:
    "Buy, rent, or service professional flooring equipment in Concord, NC. Shot blasters, floor grinders, scarifiers, auto scrubbers, power trowels and more. Serving Charlotte metro.",
  alternates: { canonical: "/" },
};

const EQUIPMENT_CATEGORIES = [
  { name: "Shot Blasters", icon: Zap, desc: "Surface prep for concrete and steel. Wide-path walk-behind and ride-on models." },
  { name: "Floor Grinders", icon: Settings, desc: "Planetary and single-head grinders for coatings, leveling, and polished concrete." },
  { name: "Concrete Scarifiers", icon: Wrench, desc: "Controlled depth milling and surface profiling for adhesive and coating removal." },
  { name: "Auto Scrubbers", icon: Truck, desc: "Walk-behind and ride-on scrubbers for daily facility maintenance programs." },
  { name: "Floor Scrapers", icon: ChevronRight, desc: "Walk-behind and ride-on scrapers for vinyl, tile, rubber, and adhesive removal." },
  { name: "Power Trowels", icon: Star, desc: "Walk-behind and ride-on trowels for slab floating and high-gloss burnishing." },
];

const WHY_CTA = [
  {
    icon: ShieldCheck,
    title: "Certified Service Team",
    body: "Our technicians are factory-trained on major brands. We keep OEM parts stocked for fast turnaround on repairs and scheduled maintenance.",
  },
  {
    icon: Clock,
    title: "Responsive Support",
    body: "We understand that downtime costs money. Our team responds quickly to service calls and keeps rentals moving so your production schedule stays on track.",
  },
  {
    icon: Users,
    title: "B2B Relationships",
    body: "We work directly with contractors, facility managers, and floor prep crews — with account pricing, fleet planning, and flexible rental terms.",
  },
  {
    icon: Package,
    title: "Parts & Consumables",
    body: "Brushes, pads, blades, belts, batteries, and wear parts for the equipment we service and sell. One source for the complete floor program.",
  },
];

export default function HomePage() {
  const featured = getFeaturedProducts(6);
  const allCategories = getCategories().slice(0, 8);

  return (
    <div className="flex flex-col">
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center pt-24 pb-20 overflow-hidden">
        {/* Background grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        {/* Radial glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-primary/8 blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <FadeIn delay={0}>
              <Badge variant="secondary" className="mb-6 px-3 py-1 text-xs uppercase tracking-widest">
                Concord, NC · Charlotte Metro
              </Badge>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-foreground">
                Professional Floor Equipment
                <span className="block text-primary mt-2">Sales · Rentals · Service</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
                CTA Services LLC supplies, rents, and maintains industrial floor equipment for contractors, facility managers, and floor prep crews across the Carolinas.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg" className="text-base px-6">
                  <Link href="/products">
                    Browse Equipment
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-base px-6 border-primary/40">
                  <a href={COMPANY.telHref}>
                    <Phone className="mr-2 w-4 h-4" />
                    {COMPANY.phoneDisplay}
                  </a>
                </Button>
                <Button asChild size="lg" variant="ghost" className="text-base px-6">
                  <Link href="/contact">Request Quote</Link>
                </Button>
              </div>
            </FadeIn>

            {/* Trust badges */}
            <FadeIn delay={0.45}>
              <div className="mt-12 flex flex-wrap gap-6 text-sm text-muted-foreground">
                {[
                  "Shot Blasters",
                  "Floor Grinders",
                  "Auto Scrubbers",
                  "Power Trowels",
                  "Scarifiers",
                  "Parts & Service",
                ].map((cat) => (
                  <span key={cat} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {cat}
                  </span>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Equipment Categories ───────────────────────────────── */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-foreground">Equipment Categories</h2>
              <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
                From surface prep to final polish, CTA Services carries the machines that keep production floors moving.
              </p>
            </div>
          </FadeIn>
          <FadeInGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {EQUIPMENT_CATEGORIES.map((cat) => (
              <FadeInItem key={cat.name}>
                <Link
                  href={`/products?category=${encodeURIComponent(cat.name)}`}
                  className="group flex gap-4 p-5 rounded-lg border border-border bg-card hover:border-primary/40 hover:bg-card/80 transition-all"
                >
                  <div className="shrink-0 w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <cat.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">{cat.name}</p>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{cat.desc}</p>
                  </div>
                </Link>
              </FadeInItem>
            ))}
          </FadeInGroup>
          <FadeIn delay={0.3}>
            <div className="mt-8 text-center">
              <Button asChild variant="outline">
                <Link href="/products">
                  View All Equipment
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Featured Products ──────────────────────────────────── */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h2 className="text-3xl font-bold text-foreground">Featured Equipment</h2>
                <p className="mt-2 text-muted-foreground">Current inventory available for sale, rental, or service.</p>
              </div>
              <Button asChild variant="outline" size="sm">
                <Link href="/products">
                  All Products <ChevronRight className="ml-1 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </FadeIn>
          <FadeInGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((p) => (
              <FadeInItem key={p.slug}>
                <ProductCard product={p} className="h-full" />
              </FadeInItem>
            ))}
          </FadeInGroup>
        </div>
      </section>

      {/* ── Rentals CTA ───────────────────────────────────────── */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="rounded-xl border border-primary/30 bg-card p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <FadeIn>
                <Badge variant="secondary" className="mb-3 text-xs uppercase tracking-widest">Flexible Rental Terms</Badge>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Rent Instead of Buy
                </h2>
                <p className="mt-3 text-muted-foreground leading-relaxed max-w-lg">
                  Daily, weekly, and monthly rental programs available for most equipment in our catalog. Includes pre-delivery inspection, operator orientation, and on-call support.
                </p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button asChild>
                    <Link href="/rentals">Rental Programs <ArrowRight className="ml-2 w-4 h-4" /></Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/contact?type=quote">Get Rental Quote</Link>
                  </Button>
                </div>
              </FadeIn>
            </div>
            <div className="shrink-0 w-full md:w-64">
              <div className="rounded-lg bg-secondary/60 p-6 space-y-3 text-sm">
                {["Day", "Week", "Month"].map((term) => (
                  <div key={term} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <span className="text-muted-foreground">{term} Rental</span>
                    <Badge variant="outline">Available</Badge>
                  </div>
                ))}
                <div className="pt-1 text-xs text-muted-foreground">
                  Delivery available across the Charlotte metro. Operator orientation included.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Service & Repair ──────────────────────────────────── */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <div>
                <Badge variant="secondary" className="mb-3 text-xs uppercase tracking-widest">Certified Service</Badge>
                <h2 className="text-3xl font-bold text-foreground">Service & Repair</h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  CTA Services technicians diagnose, repair, and perform preventive maintenance on floor scrubbers, grinders, scarifiers, shot blasters, and concrete finishing equipment. We keep OEM parts on hand for common brands and offer on-site service to minimize downtime.
                </p>
                <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
                  {[
                    "Preventive maintenance programs",
                    "Electrical, hydraulic, and mechanical repair",
                    "Blade, brush, and squeegee replacement",
                    "Battery and charging system service",
                    "On-site service available",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex gap-3">
                  <Button asChild>
                    <Link href="/service-repair">Service Details <ArrowRight className="ml-2 w-4 h-4" /></Link>
                  </Button>
                  <Button asChild variant="outline">
                    <a href={COMPANY.telHref}>
                      <Phone className="mr-2 w-3.5 h-3.5" />
                      {COMPANY.phoneDisplay}
                    </a>
                  </Button>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Floor Scrubbers", sub: "Walk-behind & ride-on" },
                  { label: "Floor Grinders", sub: "Single & planetary head" },
                  { label: "Shot Blasters", sub: "Walk-behind & ride-on" },
                  { label: "Concrete Scarifiers", sub: "Electric & gas models" },
                  { label: "Power Trowels", sub: "Walk-behind & ride-on" },
                  { label: "Floor Scrapers", sub: "Electric & battery" },
                ].map((item) => (
                  <div key={item.label} className="rounded-lg border border-border bg-card p-4">
                    <p className="text-sm font-medium text-foreground">{item.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.sub}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Why CTA ───────────────────────────────────────────── */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-foreground">Why Choose CTA Services</h2>
              <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
                We work with contractors and facility teams who need a reliable equipment partner — not just a vendor.
              </p>
            </div>
          </FadeIn>
          <FadeInGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_CTA.map((item) => (
              <FadeInItem key={item.title}>
                <div className="h-full p-6 rounded-lg border border-border bg-card">
                  <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center mb-4">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-sm text-foreground">{item.title}</h3>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{item.body}</p>
                </div>
              </FadeInItem>
            ))}
          </FadeInGroup>
        </div>
      </section>

      {/* ── Contact CTA ───────────────────────────────────────── */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="rounded-xl bg-primary/5 border border-primary/20 p-8 md:p-12 text-center max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Ready to Get Started?</h2>
              <p className="mt-3 text-muted-foreground">
                Call us, email, or submit a quote request. We respond same-day to all equipment inquiries.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button asChild size="lg">
                  <Link href="/contact">Request a Quote</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a href={COMPANY.telHref}>
                    <Phone className="mr-2 w-4 h-4" />
                    {COMPANY.phoneDisplay}
                  </a>
                </Button>
                <Button asChild size="lg" variant="ghost">
                  <a href={COMPANY.mailtoHref}>
                    <Mail className="mr-2 w-4 h-4" />
                    Email Us
                  </a>
                </Button>
              </div>
              <Separator className="my-8 opacity-30" />
              <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                {COMPANY.fullAddress}
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
