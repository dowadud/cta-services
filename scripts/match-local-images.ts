/**
 * Match local images by filename similarity + optional overrides; copy to public/product-images.
 */
import * as fs from "fs";
import * as path from "path";

const WORKSPACE = process.cwd();
const DEFAULT_DIR = process.env.CTA_LOCAL_IMAGE_DIR ?? WORKSPACE;
const PUBLIC_DIR = path.join(WORKSPACE, "public", "product-images");
const THRESHOLD = Number(process.env.CTA_IMAGE_MATCH_THRESHOLD ?? 0.22);

type Enriched = {
  id: number;
  slug: string;
  name: string;
  category: string;
  shortDescription: string;
  longDescription: string;
  specs: Record<string, string>;
  price: { amount: number; currency: string; display: string } | null;
  images: { src: string; alt: string }[];
  imageStatus: "matched" | "placeholder";
};

function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function tokens(s: string): Set<string> {
  return new Set(normalize(s).split(" ").filter((w) => w.length > 1));
}

function score(filename: string, product: Enriched): number {
  const stem = path.parse(filename).name.toLowerCase();
  const hay = new Set([
    ...tokens(product.slug.replace(/-/g, " ")),
    ...tokens(product.name),
    ...tokens(product.category),
    ...tokens(stem),
  ]);
  let hit = 0;
  let total = 0;
  for (const t of tokens(stem)) {
    total++;
    if (hay.has(t)) hit++;
  }
  for (const t of tokens(product.slug.replace(/-/g, " "))) {
    total++;
    if (stem.includes(t)) hit += 0.5;
  }
  if (total === 0) return 0;
  return hit / total;
}

function copyFile(src: string, dest: string) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}

function loadOverrides(): Record<string, string[]> {
  const p = path.join(WORKSPACE, "data", "image-overrides.json");
  if (!fs.existsSync(p)) return {};
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

function imageExtensions(dir: string): string[] {
  return fs
    .readdirSync(dir)
    .filter((f) => /\.(png|jpe?g|webp|gif|svg)$/i.test(f))
    .filter((f) => !f.startsWith("."));
}

function main() {
  const enrichedPath = path.join(WORKSPACE, "data", "products.enriched.json");
  const products = JSON.parse(fs.readFileSync(enrichedPath, "utf8")) as Enriched[];
  const overrides = loadOverrides();
  const candidates = imageExtensions(DEFAULT_DIR).map((f) => path.join(DEFAULT_DIR, f));
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });

  const used = new Set<string>();

  for (const p of products) {
    p.images = [];
    let best: { file: string; s: number } | null = null;
    if (overrides[p.slug]?.length) {
      for (const rel of overrides[p.slug]) {
        const abs = path.isAbsolute(rel) ? rel : path.join(DEFAULT_DIR, rel);
        if (fs.existsSync(abs)) {
          const ext = path.extname(abs);
          const destName = `${p.slug}-1${ext}`;
          const dest = path.join(PUBLIC_DIR, destName);
          copyFile(abs, dest);
          p.images.push({ src: `/product-images/${destName}`, alt: `${p.name} — equipment photo` });
          used.add(abs);
        }
      }
    }
    if (p.images.length === 0) {
      for (const file of candidates) {
        if (used.has(file)) continue;
        const s = score(path.basename(file), p);
        if (!best || s > best.s) best = { file, s };
      }
      if (best && best.s >= THRESHOLD) {
        const ext = path.extname(best.file);
        const destName = `${p.slug}-1${ext}`;
        copyFile(best.file, path.join(PUBLIC_DIR, destName));
        p.images.push({ src: `/product-images/${destName}`, alt: `${p.name} — equipment photo` });
        used.add(best.file);
      }
    }
    p.imageStatus = p.images.length ? "matched" : "placeholder";
  }

  fs.mkdirSync(path.join(WORKSPACE, "data"), { recursive: true });
  fs.writeFileSync(enrichedPath, JSON.stringify(products, null, 2), "utf8");
  const matched = products.filter((x) => x.imageStatus === "matched").length;
  console.log(`Updated ${products.length} products; ${matched} with local images.`);
}

main();
