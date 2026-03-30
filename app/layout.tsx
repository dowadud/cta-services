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
    default: `${COMPANY.legalName} — Floor Equipment Sales & Service | Concord, NC`,
    template: `%s | CTA Services LLC — Concord, NC`,
  },
  description:
    "CTA Services LLC sells and services professional floor equipment in Concord, NC. Floor scrubbers, concrete grinders, shot blasters, power trowels, scarifiers, and parts. Serving Charlotte metro.",
  keywords: [
    "floor equipment Concord NC",
    "floor scrubber Concord NC",
    "concrete grinder Charlotte NC",
    "shot blaster North Carolina",
    "power trowel Charlotte NC",
    "floor grinder service Concord",
    "industrial floor equipment NC",
    "floor equipment sales Concord",
    "concrete surface prep equipment NC",
    "floor equipment repair Charlotte metro",
    "scarifier Concord NC",
    "auto scrubber Charlotte NC",
    "floor polisher North Carolina",
    "floor equipment parts Concord NC",
    "CTA Services LLC Concord",
    "floor equipment dealer North Carolina",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE.name,
    url: "https://ctaservicesnc.com",
    title: `${COMPANY.legalName} — Floor Equipment Sales & Service | Concord, NC`,
    description:
      "Professional floor equipment sales, parts, and certified service in Concord, NC. Serving the Charlotte metro — scrubbers, grinders, shot blasters, trowels, and more.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CTA Services LLC — Floor Equipment Concord NC",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${COMPANY.legalName} — Floor Equipment Sales & Service`,
    description: "Professional floor equipment sales, parts, and certified service in Concord, NC.",
    images: ["/og-image.png"],
  },
  alternates: { canonical: "https://ctaservicesnc.com" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  verification: {
    google: "REPLACE_WITH_GOOGLE_SEARCH_CONSOLE_CODE",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "AutoPartsStore"],
  "@id": "https://ctaservicesnc.com/#business",
  name: COMPANY.legalName,
  legalName: COMPANY.legalName,
  telephone: COMPANY.phoneDisplay,
  email: COMPANY.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: COMPANY.addressLine1,
    addressLocality: "Concord",
    addressRegion: "NC",
    postalCode: "28025",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 35.4087,
    longitude: -80.5795,
  },
  url: "https://ctaservicesnc.com",
  logo: "https://ctaservicesnc.com/logo.png",
  image: "https://ctaservicesnc.com/og-image.png",
  description:
    "CTA Services LLC sells and services professional floor equipment in Concord, NC. We supply floor scrubbers, concrete grinders, shot blasters, power trowels, scarifiers, and replacement parts to contractors and facility managers across the Charlotte metro.",
  priceRange: "$$",
  currenciesAccepted: "USD",
  paymentAccepted: "Cash, Check, Credit Card",
  areaServed: [
    { "@type": "City", name: "Concord", "@id": "https://www.wikidata.org/wiki/Q503233" },
    { "@type": "City", name: "Charlotte", "@id": "https://www.wikidata.org/wiki/Q49111" },
    { "@type": "City", name: "Kannapolis" },
    { "@type": "City", name: "Mooresville" },
    { "@type": "City", name: "Salisbury" },
    { "@type": "City", name: "Gastonia" },
    { "@type": "AdministrativeArea", name: "Cabarrus County" },
    { "@type": "AdministrativeArea", name: "Mecklenburg County" },
    { "@type": "AdministrativeArea", name: "Rowan County" },
    { "@type": "State", name: "North Carolina" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Floor Equipment Catalog",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Floor Scrubbers" } },
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Concrete Grinders" } },
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Shot Blasters" } },
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Power Trowels" } },
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Concrete Scarifiers" } },
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Floor Equipment Parts" } },
    ],
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    },
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: COMPANY.phoneDisplay,
    contactType: "sales",
    areaServed: "US-NC",
    availableLanguage: "English",
  },
  sameAs: [],
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
