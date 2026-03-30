import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight, Phone, Mail, MapPin, Star, Wrench,
  Truck, Settings, Package, ArrowRight, ShieldCheck,
  Clock, Users, Zap, TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/product-card";
import { FadeIn, FadeInGroup, FadeInItem } from "@/components/motion";
import { AnimatedText } from "@/components/ui/animated-underline-text";
import { COMPANY } from "@/lib/company";
import { getFeaturedProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "CTA Services LLC — Floor Equipment Sales & Service | Concord, NC",
  description:
    "Buy or service professional floor equipment in Concord, NC. Shot blasters, concrete grinders, scarifiers, auto scrubbers, power trowels, and parts. Serving the Charlotte metro.",
  alternates: { canonical: "https://ctaservicesnc.com" },
  openGraph: {
    title: "CTA Services LLC — Floor Equipment Sales & Service | Concord, NC",
    description: "Buy or service professional floor equipment in Concord, NC. Shot blasters, concrete grinders, scarifiers, auto scrubbers, power trowels, and parts.",
    url: "https://ctaservicesnc.com",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "CTA Services LLC — Floor Equipment Concord NC" }],
  },
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
    body: "We understand that downtime costs money. Our team responds quickly to service calls so your production schedule stays on track.",
  },
  {
    icon: Users,
    title: "B2B Relationships",
    body: "We work directly with contractors, facility managers, and floor prep crews — with account pricing, fleet planning, and dedicated service support.",
  },
  {
    icon: Package,
    title: "Parts & Consumables",
    body: "Brushes, pads, blades, belts, batteries, and wear parts for the equipment we service and sell. One source for the complete floor program.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Where is CTA Services LLC located?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "CTA Services LLC is located at 1480 Concord Pkwy North, Concord, NC 28025. We serve the greater Charlotte metro area including Kannapolis, Harrisburg, Huntersville, Mooresville, and surrounding communities.",
      },
    },
    {
      "@type": "Question",
      name: "What types of floor equipment does CTA Services sell?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "CTA Services sells a wide range of professional floor equipment including shot blasters, concrete grinders, floor scarifiers, auto scrubbers, ride-on floor scrapers, and power trowels from leading brands.",
      },
    },
    {
      "@type": "Question",
      name: "Does CTA Services repair floor equipment?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. CTA Services offers certified repair and preventive maintenance for floor scrubbers, concrete grinders, shot blasters, scarifiers, and power trowels. Our technicians are factory-trained and we stock OEM parts for fast turnaround.",
      },
    },
    {
      "@type": "Question",
      name: "Does CTA Services sell floor equipment parts?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We supply OEM and compatible replacement parts including brushes, squeegee blades, batteries, filters, drive belts, and wear parts for floor scrubbers, grinders, and shot blasters.",
      },
    },
    {
      "@type": "Question",
      name: "What areas does CTA Services serve?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "CTA Services serves Concord, NC and the surrounding Charlotte metro area, including Charlotte, Kannapolis, Harrisburg, Huntersville, Mooresville, Salisbury, Monroe, Albemarle, and Rock Hill, SC.",
      },
    },
    {
      "@type": "Question",
      name: "How do I get a quote from CTA Services?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can request a quote by calling 704-458-7691, emailing support@thectaservices.com, or submitting the online form on our Contact page. We typically respond the same business day.",
      },
    },
  ],
};

export default function HomePage() {
  const featured = getFeaturedProducts(6);

  return (
    <div className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* ── Hero (FloorEquipmentHero) ─────────────────────────── */}
      <section className="relative w-full min-h-screen overflow-hidden bg-[#0a1628] pt-24 flex items-center">
        {/* Dot grid background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }} />
        </div>
        {/* Orange gradient accents */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-orange-600/10 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-orange-500/5 to-transparent pointer-events-none" />

        <div className="relative z-10 container mx-auto px-4 py-20 min-h-screen flex items-center w-full">
          <div className="w-full max-w-3xl">

            {/* Hero content */}
            <FadeInGroup className="flex flex-col space-y-8">
              <FadeInItem>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 backdrop-blur-sm">
                  <Wrench className="h-4 w-4 text-orange-400" />
                  <span className="text-sm font-medium text-orange-300">Concord, NC · Charlotte Metro</span>
                </div>
              </FadeInItem>

              <FadeInItem>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight">
                  Professional<br />Floor Equipment
                  <span className="block text-orange-400 mt-2">Sales · Service · Parts</span>
                </h1>
              </FadeInItem>

              <FadeInItem>
                <p className="text-lg sm:text-xl text-white/70 max-w-xl leading-relaxed">
                  CTA Services LLC supplies, rents, and maintains industrial floor equipment
                  for contractors and facility crews across the Carolinas.
                </p>
              </FadeInItem>

              <FadeInItem>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 text-base shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-105 transition-all">
                    <Link href="/products">
                      Browse Equipment
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-2 border-orange-400/30 bg-transparent hover:bg-orange-500/10 text-white font-semibold px-8 text-base hover:border-orange-400/50">
                    <a href={COMPANY.telHref}>
                      <Phone className="mr-2 h-5 w-5" />
                      {COMPANY.phoneDisplay}
                    </a>
                  </Button>
                </div>
              </FadeInItem>

              <FadeInItem>
                <div className="flex flex-wrap items-center gap-6 text-white/60 text-sm">
                  {["Same-Day Service", "Charlotte Metro Delivery", "Certified Technicians"].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-orange-500/20 flex items-center justify-center">
                        <span className="text-orange-400 font-bold text-xs">✓</span>
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </FadeInItem>
            </FadeInGroup>

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
            <div className="mb-14 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <AnimatedText
                  text="Featured Equipment"
                  textClassName="text-3xl font-bold text-foreground text-left"
                  underlineClassName="text-primary"
                  className="items-start pb-6"
                />
                <p className="mt-6 text-muted-foreground">Current inventory available for sale or service.</p>
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


      {/* ── Service & Repair ──────────────────────────────────── */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <FadeIn>
              <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-secondary/40">
                <Image
                  src="/site-images/equipment-2.jpg"
                  alt="Floor equipment service and repair"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-background/40 to-transparent" />
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
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
                <div className="mt-8 grid grid-cols-2 gap-3">
                  {[
                    { label: "Floor Scrubbers", sub: "Walk-behind & ride-on" },
                    { label: "Floor Grinders", sub: "Single & planetary head" },
                    { label: "Shot Blasters", sub: "Walk-behind & ride-on" },
                    { label: "Concrete Scarifiers", sub: "Electric & gas models" },
                    { label: "Power Trowels", sub: "Walk-behind & ride-on" },
                    { label: "Floor Scrapers", sub: "Electric & battery" },
                  ].map((item) => (
                    <div key={item.label} className="rounded-lg border border-border bg-card p-3">
                      <p className="text-sm font-medium text-foreground">{item.label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.sub}</p>
                    </div>
                  ))}
                </div>
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
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.body}</p>
                </div>
              </FadeInItem>
            ))}
          </FadeInGroup>
        </div>
      </section>

      {/* ── Contact CTA ───────────────────────────────────────── */}
      <section className="py-24 bg-primary/5 border-t border-primary/10">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center">
              <Badge variant="secondary" className="mb-4 text-xs uppercase tracking-widest">
                Get in Touch
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Ready to Get Started?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
                Call us, email, or submit a quote request. We respond same-day to all equipment inquiries — sales, parts, and service.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-3">
                <Button asChild size="lg" className="text-base px-8">
                  <Link href="/contact">Request a Quote</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-base px-8">
                  <a href={COMPANY.telHref}>
                    <Phone className="mr-2 w-4 h-4" />
                    {COMPANY.phoneDisplay}
                  </a>
                </Button>
                <Button asChild size="lg" variant="ghost" className="text-base">
                  <a href={COMPANY.mailtoHref}>
                    <Mail className="mr-2 w-4 h-4" />
                    Email Us
                  </a>
                </Button>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="mt-16 grid sm:grid-cols-3 gap-6 max-w-2xl mx-auto text-center">
              <div>
                <p className="text-sm font-medium text-foreground">Mon–Fri 8am–5pm</p>
                <p className="text-xs text-muted-foreground mt-0.5">Business Hours</p>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{COMPANY.phoneDisplay}</p>
                <p className="text-xs text-muted-foreground mt-0.5">Direct Line</p>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground flex items-center justify-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                  Concord, NC
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">Charlotte Metro</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
