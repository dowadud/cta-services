import Link from "next/link";
import { Phone, Mail, MapPin, Wrench } from "lucide-react";
import { COMPANY } from "@/lib/company";
import { Separator } from "@/components/ui/separator";

const SERVICES = [
  { href: "/products", label: "Equipment Sales" },
  { href: "/service-repair", label: "Service & Repair" },
  { href: "/parts", label: "Parts" },
];

const COMPANY_LINKS = [
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
  { href: "/contact?type=quote", label: "Request Quote" },
];

const PRODUCT_CATS = [
  "Shot Blasters",
  "Floor Grinders",
  "Concrete Scarifiers",
  "Auto Scrubbers",
  "Floor Scrapers",
  "Power Trowels",
  "Floor Polishers",
];

export function SiteFooter() {
  return (
    <footer className="bg-secondary/40 border-t border-border mt-24">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-md bg-primary flex items-center justify-center">
                <Wrench className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-bold text-sm text-foreground">{COMPANY.legalName}</span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Floor Equipment</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Professional flooring equipment sales, parts, and certified service in Concord, NC and the greater Charlotte metro.
            </p>
            <div className="space-y-2 text-sm">
              <a
                href={COMPANY.telHref}
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-primary" />
                {COMPANY.phoneDisplay}
              </a>
              <a
                href={COMPANY.mailtoHref}
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-primary" />
                {COMPANY.email}
              </a>
              <span className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                <span>
                  {COMPANY.addressLine1}
                  <br />
                  {COMPANY.cityStateZip}
                </span>
              </span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-foreground mb-4">Services</h3>
            <ul className="space-y-2">
              {SERVICES.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Equipment */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-foreground mb-4">Equipment</h3>
            <ul className="space-y-2">
              {PRODUCT_CATS.map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/products?category=${encodeURIComponent(cat)}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-foreground mb-4">Company</h3>
            <ul className="space-y-2">
              {COMPANY_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Service Area</p>
              <p className="text-sm text-muted-foreground">
                Concord · Charlotte · Kannapolis · Salisbury · Monroe · Rock Hill, SC
              </p>
            </div>
          </div>
        </div>
      </div>

      <Separator />
      <div className="container mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} {COMPANY.legalName}. All rights reserved.
        </p>
        <p className="text-xs text-muted-foreground">
          Flooring equipment sales & service — Concord, NC 28025
        </p>
      </div>
    </footer>
  );
}
