import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";
import { COMPANY, SITE } from "@/lib/company";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://ctaservicesnc.com"),
  title: {
    default: `${COMPANY.legalName} — Flooring Equipment Sales, Rentals & Service in Concord, NC`,
    template: `%s | ${COMPANY.legalName}`,
  },
  description:
    "CTA Services LLC sells, rents, and services professional flooring equipment in Concord, NC and the greater Charlotte metro. Floor scrubbers, grinders, shot blasters, power trowels, and more.",
  keywords: [
    "flooring equipment Concord NC",
    "floor scrubber rental Concord",
    "concrete grinder rental Charlotte NC",
    "shot blaster rental NC",
    "floor equipment service Concord NC",
    "power trowel rental Charlotte",
    "industrial cleaning equipment NC",
    "floor polisher rental Concord",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE.name,
    title: `${COMPANY.legalName} — Flooring Equipment Sales, Rentals & Service`,
    description:
      "Professional flooring equipment sales, rentals, parts, and certified service in Concord, NC. Serving the Charlotte metro.",
  },
  robots: { index: true, follow: true },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: COMPANY.legalName,
  telephone: COMPANY.phoneRaw,
  email: COMPANY.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: COMPANY.addressLine1,
    addressLocality: "Concord",
    addressRegion: "NC",
    postalCode: "28025",
    addressCountry: "US",
  },
  url: "https://ctaservicesnc.com",
  description:
    "CTA Services LLC — flooring equipment sales, rentals, parts, and certified service in Concord, NC.",
  areaServed: [
    { "@type": "City", name: "Concord" },
    { "@type": "City", name: "Charlotte" },
    { "@type": "AdministrativeArea", name: "Cabarrus County" },
    { "@type": "AdministrativeArea", name: "Mecklenburg County" },
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
