"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Menu, Phone, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { COMPANY } from "@/lib/company";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  hasDropdown?: boolean;
  onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, hasDropdown = false, onClick }) => (
  <motion.div className="relative group" whileHover="hover">
    <Link
      href={href}
      onClick={onClick}
      className="relative flex items-center gap-0.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 py-1"
    >
      {children}
      {hasDropdown && (
        <ChevronDown className="w-3 h-3 transition-transform duration-200 group-hover:rotate-180" />
      )}
    </Link>
    {!hasDropdown && (
      <motion.div
        className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-primary"
        variants={{ initial: { scaleX: 0, originX: "50%" }, hover: { scaleX: 1, originX: "50%" } }}
        initial="initial"
        transition={{ duration: 0.25, ease: "easeOut" }}
      />
    )}
  </motion.div>
);

const SERVICE_DROPDOWN = [
  { href: "/service-repair", label: "Service & Repair Overview" },
  { href: "/service-repair#maintenance", label: "Preventive Maintenance" },
  { href: "/service-repair#diagnostic", label: "Diagnostic & Repair" },
  { href: "/service-repair#on-site", label: "On-Site Service" },
];

export function SiteHeader() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 10);
  });

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isMobileOpen]);

  const headerVariants = {
    top: {
      backgroundColor: "rgba(7,13,22,0)",
      borderBottomColor: "rgba(255,255,255,0)",
      boxShadow: "none",
    },
    scrolled: {
      backgroundColor: "rgba(7,13,22,0.97)",
      borderBottomColor: "rgba(255,255,255,0.08)",
      boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
    },
  };

  return (
    <motion.header
      variants={headerVariants}
      initial="top"
      animate={isScrolled ? "scrolled" : "top"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-0 inset-x-0 z-50 backdrop-blur-md border-b"
    >
      {/* Top utility bar */}
      <div className="bg-primary/10 border-b border-primary/20 py-1.5 hidden lg:block">
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
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-9 h-9 rounded-md bg-primary flex items-center justify-center shadow-sm group-hover:bg-primary/80 transition-colors">
              <svg className="w-5 h-5 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-sm tracking-wide text-foreground">CTA Services</span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Floor Equipment</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <NavLink href="/products">Products</NavLink>

            {/* Service dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServiceOpen(true)}
              onMouseLeave={() => setServiceOpen(false)}
            >
              <NavLink href="/service-repair" hasDropdown>Service & Repair</NavLink>
              <AnimatePresence>
                {serviceOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96, transition: { duration: 0.12 } }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-56 z-50"
                  >
                    <div className="bg-card border border-border rounded-lg shadow-xl p-1.5">
                      {SERVICE_DROPDOWN.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/60 rounded-md transition-colors"
                          onClick={() => setServiceOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <NavLink href="/parts">Parts</NavLink>
            <NavLink href="/about">About</NavLink>
          </div>

          {/* Right CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={COMPANY.telHref}
              className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              {COMPANY.phoneDisplay}
            </a>
            <motion.div whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 15 }}>
              <Button asChild size="sm">
                <Link href="/contact">Request Quote</Link>
              </Button>
            </motion.div>
          </div>

          {/* Mobile */}
          <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle className="text-left">
                  <span className="font-bold text-foreground">CTA Services</span>
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 mt-6">
                {[
                  { href: "/products", label: "Products" },
                  { href: "/service-repair", label: "Service & Repair" },
                  { href: "/parts", label: "Parts" },
                  { href: "/about", label: "About" },
                  { href: "/contact", label: "Contact" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileOpen(false)}
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
                    <Link href="/contact" onClick={() => setIsMobileOpen(false)}>Request Quote</Link>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </motion.header>
  );
}
