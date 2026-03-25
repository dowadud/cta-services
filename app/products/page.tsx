import type { Metadata } from "next";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { Badge } from "@/components/ui/badge";
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

        {/* Search + Category filters */}
        <FadeIn delay={0.05}>
          <form method="GET" className="mb-8 flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="Search equipment…"
              className="flex-1 h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            {activeCategory && (
              <input type="hidden" name="category" value={activeCategory} />
            )}
            <button
              type="submit"
              className="px-4 py-1.5 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Search
            </button>
            {(query || activeCategory) && (
              <Link
                href="/products"
                className="px-4 py-1.5 rounded-md border border-border text-sm text-muted-foreground hover:text-foreground transition-colors text-center"
              >
                Clear
              </Link>
            )}
          </form>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="flex flex-wrap gap-2 mb-8">
            <Link href="/products">
              <Badge
                variant={!activeCategory ? "default" : "secondary"}
                className="cursor-pointer hover:opacity-80 transition-opacity"
              >
                All
              </Badge>
            </Link>
            {categories.slice(0, 20).map((cat) => (
              <Link key={cat} href={`/products?category=${encodeURIComponent(cat)}`}>
                <Badge
                  variant={activeCategory === cat ? "default" : "secondary"}
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                >
                  {cat}
                </Badge>
              </Link>
            ))}
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
            <p className="mt-8 text-center text-sm text-muted-foreground">
              Showing 120 of {filtered.length} results. Use the search or category filters to narrow down.
            </p>
          </FadeIn>
        )}
      </div>
    </div>
  );
}
