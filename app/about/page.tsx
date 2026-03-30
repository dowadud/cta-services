import type { Metadata } from "next";
import Link from "next/link";
import { Phone, MapPin, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { FadeIn, FadeInGroup, FadeInItem } from "@/components/motion";
import { COMPANY } from "@/lib/company";

export const metadata: Metadata = {
  title: "About CTA Services LLC — Floor Equipment Specialists, Concord NC",
  description:
    "CTA Services LLC is a floor equipment company based in Concord, NC. We sell and service industrial floor scrubbers, grinders, shot blasters, and power trowels for contractors and facility teams across the Charlotte metro.",
  alternates: { canonical: "https://thectaservices.com/about" },
  openGraph: {
    title: "About CTA Services LLC — Floor Equipment Specialists, Concord NC",
    description: "CTA Services LLC sells and services industrial floor equipment in Concord, NC. Serving contractors and facility managers across the Charlotte metro.",
    url: "https://thectaservices.com/about",
  },
};

const SERVICE_AREA = [
  "Concord", "Kannapolis", "Harrisburg", "Huntersville",
  "Charlotte", "Mint Hill", "Matthews", "Salisbury",
  "Monroe", "Albemarle", "Mooresville", "Rock Hill, SC",
];

export default function AboutPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="container mx-auto px-4">
        {/* Hero */}
        <FadeIn>
          <div className="max-w-2xl mb-16">
            <Badge variant="secondary" className="mb-3 text-xs uppercase tracking-widest">About Us</Badge>
            <h1 className="text-4xl font-bold text-foreground">CTA Services LLC</h1>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              Based in Concord, NC, CTA Services LLC supplies, rents, and maintains professional flooring equipment for floor prep crews, contractors, and facility managers across the greater Charlotte metro.
            </p>
          </div>
        </FadeIn>

        {/* Stats */}
        <FadeInGroup className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-16">
          {[
            { value: "500+", label: "Equipment Models" },
            { value: "6", label: "Categories" },
            { value: "12+", label: "Cities Served" },
            { value: "Same Day", label: "Response Time" },
          ].map((s) => (
            <FadeInItem key={s.label}>
              <div className="rounded-lg border border-border bg-card p-5 text-center">
                <p className="text-2xl font-bold text-primary">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">{s.label}</p>
              </div>
            </FadeInItem>
          ))}
        </FadeInGroup>

        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          {/* Story */}
          <FadeIn>
            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <h2 className="text-2xl font-bold text-foreground">Our Approach</h2>
              <p>
                CTA Services was built around a straightforward idea: floor equipment professionals deserve a supplier who understands the work, responds quickly, and stands behind the machines they provide.
              </p>
              <p>
                We work directly with flooring subcontractors, facility maintenance crews, concrete preparation companies, and general contractors who need equipment that shows up ready and performs through the job. When something goes wrong mid-project, we&apos;re the team you can call.
              </p>
              <p>
                Our inventory covers the full range of commercial and industrial floor equipment — from daily-maintenance auto scrubbers to large-format shot blasters, ride-on scrapers, planetary grinders, and concrete power trowels. For every product we sell, we offer the parts and service to back it up.
              </p>
              <p>
                We serve the Concord–Charlotte corridor and surrounding counties, and we offer delivery and on-site service throughout the region.
              </p>
            </div>
          </FadeIn>

          {/* What we do */}
          <FadeIn delay={0.1}>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">What We Do</h2>
              <div className="space-y-4">
                {[
                  { title: "Equipment Sales", body: "We sell a wide range of new and professionally sourced floor equipment — from entry-level walk-behind machines to production-scale ride-on units." },
                  { title: "Service & Repair", body: "Certified technicians diagnose and repair floor scrubbers, grinders, scarifiers, shot blasters, and concrete finishing equipment." },
                  { title: "Parts & Consumables", body: "We stock and source brushes, pads, blades, batteries, and wear parts for the major brands we support." },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4 p-4 rounded-lg border border-border bg-card">
                    <span className="w-2 shrink-0 bg-primary rounded-full self-stretch" />
                    <div>
                      <p className="font-semibold text-sm text-foreground">{item.title}</p>
                      <p className="text-sm text-muted-foreground mt-0.5">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>

        <Separator className="mb-16" />

        {/* Service area */}
        <FadeIn>
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-4">Service Area</h2>
            <p className="text-muted-foreground mb-6 max-w-xl">
              We&apos;re located in Concord, NC and regularly serve the following communities:
            </p>
            <div className="flex flex-wrap gap-2">
              {SERVICE_AREA.map((city) => (
                <Badge key={city} variant="secondary" className="text-xs">{city}</Badge>
              ))}
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Working outside these areas? Call us — we can often accommodate deliveries beyond our standard service zone for the right project.
            </p>
          </div>
        </FadeIn>

        {/* Contact card */}
        <FadeIn>
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-8">
            <h2 className="text-xl font-bold text-foreground mb-5">Contact Us</h2>
            <div className="grid sm:grid-cols-3 gap-6 mb-6">
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">Phone</p>
                  <a href={COMPANY.telHref} className="text-sm font-medium text-foreground hover:text-primary transition-colors">{COMPANY.phoneDisplay}</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">Email</p>
                  <a href={COMPANY.mailtoHref} className="text-sm font-medium text-foreground hover:text-primary transition-colors">{COMPANY.email}</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">Address</p>
                  <p className="text-sm text-foreground">{COMPANY.addressLine1}<br />{COMPANY.cityStateZip}</p>
                </div>
              </div>
            </div>
            <Button asChild>
              <Link href="/contact">Contact Us <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
