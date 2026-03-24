import * as fs from "fs";
import * as path from "path";
import { clientCatalogSchema } from "@/lib/product-types";

const BANNED_SUBSTRINGS = ["thesweeper.com", "wp-content/uploads"];

function main() {
  const p = path.join(process.cwd(), "data", "products.enriched.json");
  if (!fs.existsSync(p)) {
    console.error("Missing data/products.enriched.json — run npm run pipeline or copy seed file.");
    process.exit(1);
  }
  const data = JSON.parse(fs.readFileSync(p, "utf8"));
  const catalog = clientCatalogSchema.parse(data);
  for (const product of catalog) {
    for (const img of product.images) {
      for (const b of BANNED_SUBSTRINGS) {
        if (img.src.includes(b)) {
          console.error(`Forbidden URL fragment "${b}" in image src for ${product.slug}: ${img.src}`);
          process.exit(1);
        }
      }
      if (img.src.startsWith("http://") || img.src.startsWith("https://")) {
        console.error(`Remote image not allowed for ${product.slug}: ${img.src}`);
        process.exit(1);
      }
    }
  }
  console.log(`Verified ${catalog.length} products — client data OK.`);
}

main();
