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
  title: "Flooring Equipment Catalog — Sales, Rentals & Parts",
  description:
    "Browse CTA Services' full catalog of floor scrubbers, grinders, shot blasters, scarifiers, power trowels, and more. Sales, rentals, and parts available in Concord, NC.",
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

  const filtered = all.filter((p) => {
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

  return (
    <div className="pt-28 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <FadeIn>
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Equipment Catalog</h1>
            <p className="mt-2 text-muted-foreground">
              {filtered.length.toLocaleString()} items across {categories.length} categories — available for sale, rental, or service.
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

        {/* Grid */}
        {filtered.length === 0 ? (
          <FadeIn>
            <div className="py-24 text-center text-muted-foreground">
              No products found for those filters.{" "}
              <Link href="/products" className="text-primary underline">Clear filters</Link>
            </div>
          </FadeIn>
        ) : (
          <FadeInGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.slice(0, 120).map((p) => (
              <FadeInItem key={p.slug}>
                <ProductCard product={p} className="h-full" />
              </FadeInItem>
            ))}
          </FadeInGroup>
        )}

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
      </div>
    </div>
  );
}
