"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, Menu, X, Wrench } from "lucide-react";
import { COMPANY } from "@/lib/company";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const NAV_LINKS = [
  { href: "/products", label: "Products" },
  { href: "/rentals", label: "Rentals" },
  { href: "/service-repair", label: "Service & Repair" },
  { href: "/parts", label: "Parts" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/95 backdrop-blur-sm border-b border-border shadow-md"
          : "bg-transparent",
      )}
    >
      {/* Top bar */}
      <div className="bg-primary/10 border-b border-primary/20 py-1.5 hidden md:block">
        <div className="container mx-auto px-4 flex items-center justify-end gap-6 text-xs text-muted-foreground">
          <a href={COMPANY.telHref} className="flex items-center gap-1.5 hover:text-primary transition-colors">
            <Phone className="w-3 h-3" />
            {COMPANY.phoneDisplay}
          </a>
          <span>{COMPANY.fullAddress}</span>
          <a href={COMPANY.mailtoHref} className="hover:text-primary transition-colors">
            {COMPANY.email}
          </a>
        </div>
      </div>

      {/* Main nav */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-md bg-primary flex items-center justify-center shadow-sm group-hover:bg-primary/90 transition-colors">
              <Wrench className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-sm tracking-wide text-foreground">CTA Services</span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Floor Equipment</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/60 rounded-md transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Button asChild size="sm" variant="outline" className="border-primary/40 hover:border-primary">
              <a href={COMPANY.telHref}>
                <Phone className="w-3.5 h-3.5 mr-1" />
                Call Us
              </a>
            </Button>
            <Button asChild size="sm">
              <Link href="/contact">Request Quote</Link>
            </Button>
          </div>

          {/* Mobile hamburger */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle className="text-left">Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 mt-6">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="px-3 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/60 rounded-md transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="border-t border-border mt-4 pt-4 flex flex-col gap-2">
                  <Button asChild size="sm" variant="outline">
                    <a href={COMPANY.telHref}>
                      <Phone className="w-3.5 h-3.5 mr-1" />
                      {COMPANY.phoneDisplay}
                    </a>
                  </Button>
                  <Button asChild size="sm">
                    <Link href="/contact" onClick={() => setOpen(false)}>Request Quote</Link>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
