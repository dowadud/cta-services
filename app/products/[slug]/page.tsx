import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, ArrowLeft, FileText, ImageOff } from "lucide-react";
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
  return {
    title: `${product.name} — ${product.category}`,
    description: product.shortDescription,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const categoryShort = product.category.split(" · ")[0];

  return (
    <div className="pt-28 pb-20">
      <div className="container mx-auto px-4">
        {/* Back */}
        <FadeIn>
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Link>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Image gallery */}
          <FadeIn>
            <div className="space-y-3">
              {product.images.length > 0 ? (
                <>
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-secondary">
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
                        <div key={i} className="relative aspect-square rounded-md overflow-hidden bg-secondary">
                          <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="120px" />
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="aspect-[4/3] rounded-lg bg-secondary flex flex-col items-center justify-center gap-3">
                  <ImageOff className="w-12 h-12 text-muted-foreground/40" />
                  <Badge variant="warning">Image needed</Badge>
                  <p className="text-xs text-muted-foreground text-center max-w-48">
                    Add a photo to{" "}
                    <code className="font-mono text-[10px]">public/product-images/{product.slug}-1.png</code>
                  </p>
                </div>
              )}
            </div>
          </FadeIn>

          {/* Details */}
          <FadeIn delay={0.1}>
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary" className="text-[10px] uppercase tracking-wider">
                    {categoryShort}
                  </Badge>
                  <Badge
                    variant={product.imageStatus === "matched" ? "secondary" : "warning"}
                    className="text-[10px]"
                  >
                    {product.imageStatus === "matched" ? "Photo available" : "Image needed"}
                  </Badge>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">{product.name}</h1>
                {product.price && (
                  <p className="mt-2 text-2xl font-bold text-primary">{product.price.display}</p>
                )}
              </div>

              <p className="text-muted-foreground leading-relaxed">{product.longDescription}</p>

              {/* Specs accordion */}
              {Object.keys(product.specs).length > 0 && (
                <Accordion type="single" collapsible defaultValue="specs">
                  <AccordionItem value="specs">
                    <AccordionTrigger className="text-sm font-semibold">Specifications</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        {Object.entries(product.specs).map(([key, val]) => (
                          <div
                            key={key}
                            className="flex items-start justify-between gap-4 py-2 border-b border-border last:border-0 text-sm"
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
                    Request Quote
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

              {/* Company assurance */}
              <div className="rounded-lg bg-secondary/40 p-4 text-xs text-muted-foreground space-y-1">
                <p className="font-medium text-foreground text-sm">{COMPANY.legalName}</p>
                <p>{COMPANY.fullAddress}</p>
                <p>{COMPANY.phoneDisplay} · {COMPANY.email}</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
