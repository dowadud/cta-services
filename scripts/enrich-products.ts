import * as fs from "fs";
import * as path from "path";
import { scrapedProductSchema } from "@/lib/product-types";
import { rewriteProductForCTA } from "@/lib/product-copy";

function main() {
  const rawPath = path.join(process.cwd(), "data", "products.json");
  const raw = JSON.parse(fs.readFileSync(rawPath, "utf8"));
  const parsed = scrapedProductSchema.array().parse(raw);
  const enriched = parsed.map((p) => {
    const r = rewriteProductForCTA(p);
    return {
      ...r,
      images: [] as { src: string; alt: string }[],
      imageStatus: "placeholder" as const,
    };
  });
  fs.writeFileSync(
    path.join(process.cwd(), "data", "products.enriched.json"),
    JSON.stringify(enriched, null, 2),
    "utf8",
  );
  console.log(`Wrote ${enriched.length} rows to data/products.enriched.json (images pending match-images)`);
}

main();
