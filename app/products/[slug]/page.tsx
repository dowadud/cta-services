import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, ArrowLeft, FileText, ChevronRight, ShieldCheck, Clock, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FadeIn } from "@/components/motion";
import { getProductBySlug, getAllProducts } from "@/lib/products";
import { COMPANY } from "@/lib/company";

export async function generateStaticParams() {
  return getAllProducts()
    .slice(0, 500)
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };

  const priceStr = product.price ? ` — ${product.price.display}` : "";
  const title = `${product.name}${priceStr} | CTA Services LLC`;
  const description = `${product.shortDescription} Available from CTA Services LLC in Concord, NC. Call 704-458-7691 for pricing and availability.`;
  const canonicalUrl = `https://thectaservices.com/products/${slug}`;
  const imageUrl = product.images[0]?.src
    ? `https://thectaservices.com${product.images[0].src}`
    : "https://thectaservices.com/og-image.png";

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "website",
      images: [{ url: imageUrl, width: 800, height: 600, alt: product.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

const ASSURANCES = [
  { icon: ShieldCheck, label: "Certified service team" },
  { icon: Clock, label: "Same-day response" },
  { icon: Truck, label: "Charlotte metro delivery" },
];

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const categoryShort = product.category.split(" · ")[0];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://thectaservices.com" },
      { "@type": "ListItem", position: 2, name: "Equipment Catalog", item: "https://thectaservices.com/products" },
      { "@type": "ListItem", position: 3, name: product.name, item: `https://thectaservices.com/products/${slug}` },
    ],
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    category: product.category,
    image: product.images.map((img) => `https://thectaservices.com${img.src}`),
    brand: {
      "@type": "Brand",
      name: product.name.split(" ")[0],
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: product.price?.amount ?? undefined,
      priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split("T")[0],
      availability: "https://schema.org/InStock",
      url: `https://thectaservices.com/products/${slug}`,
      seller: {
        "@type": "LocalBusiness",
        name: "CTA Services LLC",
        telephone: "704-458-7691",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Concord",
          addressRegion: "NC",
          postalCode: "28025",
          addressCountry: "US",
        },
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    <div className="pt-28 pb-20">
      <div className="container mx-auto px-4">

        {/* Breadcrumb */}
        <FadeIn>
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <Link href="/products" className="hover:text-foreground transition-colors">Products</Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <span className="text-foreground line-clamp-1">{product.name}</span>
          </nav>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Image gallery */}
          <FadeIn>
            <div className="space-y-3">
              {product.images.length > 0 ? (
                <>
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-secondary">
                    <Image
                      src={product.images[0].src}
                      alt={product.images[0].alt}
                      fill
                      className="object-cover"
                      sizes="(max-width:1024px) 100vw, 50vw"
                      priority
                    />
                  </div>
                  {product.images.length > 1 && (
                    <div className="grid grid-cols-4 gap-2">
                      {product.images.slice(1).map((img, i) => (
                        <div key={i} className="relative aspect-square rounded-lg overflow-hidden bg-secondary">
                          <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="120px" />
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="aspect-[4/3] rounded-xl bg-secondary flex flex-col items-center justify-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                    <FileText className="w-8 h-8 text-muted-foreground/40" />
                  </div>
                  <p className="text-sm text-muted-foreground text-center max-w-48">
                    Contact us for photos and full specifications on this unit.
                  </p>
                  <Button asChild size="sm" variant="outline">
                    <a href={COMPANY.telHref}>
                      <Phone className="w-3.5 h-3.5 mr-1.5" />
                      {COMPANY.phoneDisplay}
                    </a>
                  </Button>
                </div>
              )}
            </div>
          </FadeIn>

          {/* Details */}
          <FadeIn delay={0.1}>
            <div className="space-y-6">
              <div>
                <Badge variant="secondary" className="text-[10px] uppercase tracking-wider mb-3">
                  {categoryShort}
                </Badge>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">{product.name}</h1>
                {product.price && (
                  <p className="mt-3 text-2xl font-bold text-primary">{product.price.display}</p>
                )}
              </div>

              <div className="space-y-4 text-muted-foreground leading-relaxed">
                {product.longDescription.split("\n\n").map((block, idx) => {
                  const lines = block.split("\n");
                  const firstLine = lines[0];
                  const isHeader = /^[A-Z &/–-]{4,}$/.test(firstLine.trim());
                  if (isHeader) {
                    return (
                      <div key={idx}>
                        <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-1">
                          {firstLine}
                        </p>
                        {lines.slice(1).join(" ") && (
                          <p>{lines.slice(1).join(" ")}</p>
                        )}
                      </div>
                    );
                  }
                  return <p key={idx}>{block}</p>;
                })}
              </div>

              {/* Specs accordion */}
              {Object.keys(product.specs).length > 0 && (
                <Accordion type="single" collapsible defaultValue="specs">
                  <AccordionItem value="specs">
                    <AccordionTrigger className="text-sm font-semibold">Specifications</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-0">
                        {Object.entries(product.specs).map(([key, val]) => (
                          <div
                            key={key}
                            className="flex items-start justify-between gap-4 py-2.5 border-b border-border last:border-0 text-sm"
                          >
                            <span className="text-muted-foreground shrink-0">{key}</span>
                            <span className="text-foreground text-right">{val}</span>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              )}

              <Separator />

              {/* CTAs */}
              <div className="space-y-3">
                <Button asChild size="lg" className="w-full">
                  <Link href={`/contact?product=${encodeURIComponent(product.name)}&type=quote`}>
                    <FileText className="mr-2 w-4 h-4" />
                    Request a Quote
                  </Link>
                </Button>
                <div className="grid grid-cols-2 gap-3">
                  <Button asChild size="lg" variant="outline">
                    <a href={COMPANY.telHref}>
                      <Phone className="mr-2 w-4 h-4" />
                      Call Now
                    </a>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <a href={`${COMPANY.mailtoHref}?subject=${encodeURIComponent("Inquiry: " + product.name)}`}>
                      <Mail className="mr-2 w-4 h-4" />
                      Email Us
                    </a>
                  </Button>
                </div>
              </div>

              {/* Assurance bar */}
              <div className="rounded-xl border border-border bg-card p-5">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                  {COMPANY.legalName}
                </p>
                <div className="space-y-3">
                  {ASSURANCES.map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-3 text-sm text-foreground">
                      <div className="w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                        <Icon className="w-3.5 h-3.5 text-primary" />
                      </div>
                      {label}
                    </div>
                  ))}
                </div>
                <Separator className="my-4" />
                <p className="text-xs text-muted-foreground">{COMPANY.fullAddress}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{COMPANY.phoneDisplay} · {COMPANY.email}</p>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Back link */}
        <FadeIn delay={0.15}>
          <div className="mt-16 pt-8 border-t border-border">
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Products
            </Link>
          </div>
        </FadeIn>
      </div>
    </div>
    </>
  );
}
