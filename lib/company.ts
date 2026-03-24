export const COMPANY = {
  legalName: "CTA Services LLC",
  phoneRaw: "7044587691",
  get phoneDisplay() {
    return "704-458-7691";
  },
  email: "ctaservices@outlook.com",
  addressLine1: "1480 Concord Pkwy North",
  cityStateZip: "Concord, NC 28025",
  fullAddress: "1480 Concord Pkwy North, Concord, NC 28025",
  telHref: "tel:+17044587691",
  mailtoHref: "mailto:ctaservices@outlook.com",
} as const;

export const SITE = {
  name: "CTA Services",
  tagline: "Flooring equipment sales, rentals, and certified service",
  url: "https://cta-services.example.com",
} as const;
