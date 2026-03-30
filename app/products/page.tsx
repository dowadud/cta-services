import type { Metadata } from "next";
import Link from "next/link";
import { Search, SlidersHorizontal } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FadeIn, FadeInGroup, FadeInItem } from "@/components/motion";
import { getAllProducts, getCategories } from "@/lib/products";

export const metadata: Metadata = {
  title: "Floor Equipment Catalog — Sales & Parts | Concord, NC",
  description:
    "Browse CTA Services' full catalog of floor scrubbers, concrete grinders, shot blasters, scarifiers, power trowels, auto scrubbers, and more. Sales and parts in Concord, NC.",
  alternates: { canonical: "https://ctaservicesnc.com/products" },
  openGraph: {
    title: "Floor Equipment Catalog | CTA Services LLC — Concord, NC",
    description: "500+ floor equipment models available for sale in Concord, NC. Scrubbers, grinders, shot blasters, trowels, scarifiers, and replacement parts.",
    url: "https://ctaservicesnc.com/products",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://ctaservicesnc.com" },
    { "@type": "ListItem", position: 2, name: "Equipment Catalog", item: "https://ctaservicesnc.com/products" },
  ],
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const sp = await searchParams;
  const activeCategory = sp.category?.trim() || "";
  const query = sp.q?.toLowerCase().trim() || "";

  const all = getAllProducts();
  const categories = getCategories();

  // Split: products with images go in the main grid; placeholders go in misc list
  const withImages = all.filter((p) => p.imageStatus === "matched");
  const noImages   = all.filter((p) => p.imageStatus === "placeholder");

  const filtered = withImages.filter((p) => {
    const matchCat = activeCategory
      ? p.category.toLowerCase().includes(activeCategory.toLowerCase())
      : true;
    const matchQ = query
      ? p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.shortDescription.toLowerCase().includes(query)
      : true;
    return matchCat && matchQ;
  });

  // Also filter the misc list when a search query is active
  const filteredMisc = noImages.filter((p) => {
    const matchCat = activeCategory
      ? p.category.toLowerCase().includes(activeCategory.toLowerCase())
      : true;
    const matchQ = query
      ? p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      : true;
    return matchCat && matchQ;
  });

  return (
    <div className="pt-28 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="container mx-auto px-4">
        {/* Header */}
        <FadeIn>
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Equipment Catalog</h1>
            <p className="mt-2 text-muted-foreground">
              {withImages.length.toLocaleString()} featured items · {noImages.length.toLocaleString()} additional parts &amp; accessories — available for sale or service.
            </p>
          </div>
        </FadeIn>

        {/* Search + filters */}
        <FadeIn delay={0.05}>
          <form method="GET" className="mb-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                <Input
                  type="text"
                  name="q"
                  defaultValue={query}
                  placeholder="Search equipment by name or type…"
                  className="pl-9"
                />
              </div>
              {activeCategory && (
                <input type="hidden" name="category" value={activeCategory} />
              )}
              <Button type="submit" className="sm:w-auto">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
              {(query || activeCategory) && (
                <Button asChild variant="outline" className="sm:w-auto">
                  <Link href="/products">Clear filters</Link>
                </Button>
              )}
            </div>
          </form>
        </FadeIn>

        {/* Category filter */}
        <FadeIn delay={0.1}>
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <SlidersHorizontal className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Filter by category</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link href="/products">
                <Badge
                  variant={!activeCategory ? "default" : "secondary"}
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                >
                  All Equipment
                </Badge>
              </Link>
              {categories.slice(0, 20).map((cat) => (
                <Link key={cat} href={`/products?category=${encodeURIComponent(cat)}${query ? `&q=${encodeURIComponent(query)}` : ""}`}>
                  <Badge
                    variant={activeCategory === cat ? "default" : "secondary"}
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                  >
                    {cat}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Main product grid — with images only */}
        {filtered.length === 0 && filteredMisc.length === 0 ? (
          <FadeIn>
            <div className="py-24 text-center text-muted-foreground">
              No products found for those filters.{" "}
              <Link href="/products" className="text-primary underline">Clear filters</Link>
            </div>
          </FadeIn>
        ) : filtered.length > 0 ? (
          <FadeInGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.slice(0, 120).map((p) => (
              <FadeInItem key={p.slug}>
                <ProductCard product={p} className="h-full" />
              </FadeInItem>
            ))}
          </FadeInGroup>
        ) : null}

        {filtered.length > 120 && (
          <FadeIn delay={0.2}>
            <div className="mt-10 text-center space-y-3">
              <p className="text-sm text-muted-foreground">
                Showing <span className="font-medium text-foreground">120</span> of{" "}
                <span className="font-medium text-foreground">{filtered.length.toLocaleString()}</span> results.
              </p>
              <p className="text-xs text-muted-foreground">
                Use the search bar or category filter to narrow your results, or call us to find a specific model.
              </p>
            </div>
          </FadeIn>
        )}

        {/* ── Miscellaneous Parts & Accessories ─────────────────── */}
        {filteredMisc.length > 0 && (
          <FadeIn delay={0.15}>
            <div className="mt-16 border-t border-border pt-12">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground">Miscellaneous Parts &amp; Accessories</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {filteredMisc.length.toLocaleString()} additional items — contact us for availability and pricing details.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-0">
                {filteredMisc.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/products/${p.slug}`}
                    className="group flex items-center justify-between py-3 border-b border-border/50 hover:border-primary/40 transition-colors gap-4"
                  >
                    <span className="text-sm text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-2">
                      {p.name}
                    </span>
                    <span className="text-sm font-semibold text-primary whitespace-nowrap shrink-0">
                      {p.price ? p.price.display : "Call for price"}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </FadeIn>
        )}
      </div>
    </div>
  );
}
