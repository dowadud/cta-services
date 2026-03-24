/**
 * Research-only scraper: WooCommerce Store API (public).
 * Does not persist competitor image URLs in output.
 */
import * as fs from "fs";
import * as path from "path";

const BASE = "https://www.thesweeper.com";
const USER_AGENT = "CTAServicesResearch/1.0 (+internal; contact@ctaservices.local)";
const DELAY_MS = Number(process.env.SCRAPE_DELAY_MS ?? 450);
const MAX_PAGES = Number(process.env.SCRAPE_MAX_PAGES ?? 200);
const PER_PAGE = Number(process.env.SCRAPE_PER_PAGE ?? 100);

type StoreProduct = {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  sku?: string;
  short_description: string;
  description: string;
  prices: {
    price: string;
    currency_code: string;
    currency_prefix: string;
    currency_minor_unit: number;
  };
  categories: { id: number; name: string; slug: string }[];
  attributes?: { name: string; taxonomy?: string; terms?: { name: string }[] }[];
};

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function fetchText(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: { "User-Agent": USER_AGENT, Accept: "text/plain,*/*" },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.text();
}

async function assertRobotsAllow(): Promise<void> {
  const robots = await fetchText(`${BASE}/robots.txt`);
  if (robots.toLowerCase().includes("disallow: /wp-json") && !robots.includes("Allow: /wp-json")) {
    console.warn("robots.txt may restrict API; proceeding cautiously.");
  }
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeProduct(p: StoreProduct) {
  const minor = p.prices?.currency_minor_unit ?? 2;
  const amount = Number(p.prices?.price ?? "0") / 10 ** minor;
  const display = amount > 0 ? `${p.prices.currency_prefix}${amount.toFixed(minor)}` : "";
  const category =
    p.categories?.map((c) => c.name).filter(Boolean).join(" · ") || "Equipment";

  const specs: Record<string, string> = {};
  if (p.sku) specs.SKU = p.sku;
  for (const attr of p.attributes ?? []) {
    const label = attr.name?.trim();
    const val = attr.terms?.map((t) => t.name).join(", ");
    if (label && val) specs[label] = val;
  }

  return {
    id: p.id,
    slug: p.slug,
    name: stripHtml(p.name),
    category,
    shortDescription: stripHtml(p.short_description),
    longDescription: stripHtml(p.description),
    specs,
    price:
      amount > 0
        ? {
            amount,
            currency: p.prices.currency_code,
            display: display || `${amount.toFixed(2)} ${p.prices.currency_code}`,
          }
        : null,
    sourceUrl: p.permalink,
  };
}

async function main() {
  await assertRobotsAllow();
  const out: ReturnType<typeof normalizeProduct>[] = [];
  for (let page = 1; page <= MAX_PAGES; page++) {
    const url = `${BASE}/wp-json/wc/store/v1/products?per_page=${PER_PAGE}&page=${page}`;
    const res = await fetch(url, {
      headers: { "User-Agent": USER_AGENT, Accept: "application/json" },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
    const batch = (await res.json()) as StoreProduct[];
    if (!Array.isArray(batch) || batch.length === 0) break;
    for (const raw of batch) {
      if (!raw.slug || raw.slug === "shop") continue;
      out.push(normalizeProduct(raw));
    }
    if (batch.length < PER_PAGE) break;
    await sleep(DELAY_MS);
  }

  const root = path.join(process.cwd(), "data");
  fs.mkdirSync(root, { recursive: true });
  fs.writeFileSync(path.join(root, "products.json"), JSON.stringify(out, null, 2), "utf8");
  console.log(`Wrote ${out.length} products to data/products.json`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
