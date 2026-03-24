import type { ClientProduct, ScrapedProduct } from "@/lib/product-types";

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Derive lightweight specs from Woo-style attributes or fallback to description hints. */
export function deriveSpecsFromScraped(p: ScrapedProduct): Record<string, string> {
  if (Object.keys(p.specs).length > 0) return p.specs;
  const lines = stripHtml(p.longDescription)
    .split(/[.;]/)
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 6);
  const out: Record<string, string> = {};
  lines.forEach((line, i) => {
    out[`Note ${i + 1}`] = line;
  });
  return out;
}

function openingForCategory(category: string): string {
  const c = category.toLowerCase();
  if (c.includes("part") || c.includes("access") || c.includes("replacement"))
    return "Dependable wear component engineered to restore uptime and predictable performance across compatible equipment.";
  if (c.includes("brush") || c.includes("pad"))
    return "Surface-prep accessory sized for professional concrete schedules, maintenance passes, and predictable finish quality.";
  if (c.includes("scrubber") || c.includes("machine") || c.includes("sweeper"))
    return "Built for demanding floor programs, this unit supports consistent daily production through modern scrub and recovery components.";
  return "Industrial flooring component supplied by CTA Services for crews that prioritize reliable fitment, support, and fast turnaround.";
}

/**
 * Original B2B copy for CTA Services — does not echo competitor prose.
 */
export function rewriteProductForCTA(p: ScrapedProduct): Omit<ClientProduct, "images" | "imageStatus"> {
  const skuHint = p.specs.SKU || p.specs.sku || "";
  const specBlock = deriveSpecsFromScraped(p);
  const short = `${p.name}: ${openingForCategory(p.category).split(".")[0]}.`;
  const long = [
    `${openingForCategory(p.category)}`,
    `CTA Services LLC helps Concord–Charlotte teams spec, source, and sustain floor equipment with responsive service, parts support, and rental options when schedules demand flexibility.`,
    skuHint ? `Reference: ${skuHint}.` : "",
    "Request a quote for delivered pricing, availability, and recommended consumables.",
  ]
    .filter(Boolean)
    .join(" ");

  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    category: p.category,
    shortDescription: short,
    longDescription: long,
    specs: specBlock,
    price: p.price,
  };
}
