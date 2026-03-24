import catalogJson from "@/data/products.enriched.json";
import { clientCatalogSchema, type ClientProduct } from "@/lib/product-types";

const catalog = clientCatalogSchema.parse(catalogJson) as ClientProduct[];

export function getAllProducts(): ClientProduct[] {
  return catalog;
}

export function getProductBySlug(slug: string): ClientProduct | undefined {
  return catalog.find((p) => p.slug === slug);
}

export function getCategories(): string[] {
  const s = new Set<string>();
  for (const p of catalog) s.add(p.category);
  return Array.from(s).sort((a, b) => a.localeCompare(b));
}

export function getFeaturedProducts(limit = 6): ClientProduct[] {
  return catalog.slice(0, limit);
}
