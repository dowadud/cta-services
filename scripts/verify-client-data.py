#!/usr/bin/env python3
"""Verify products.enriched.json has no competitor image URLs.
Exits with error if banned content found."""

import json, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BANNED = ["thesweeper.com", "diamondtoolstore.com", "wp-content/uploads", "cdn.shopify.com"]

def main():
    p = ROOT / "data" / "products.enriched.json"
    if not p.exists():
        print("ERROR: Missing data/products.enriched.json")
        sys.exit(1)
    catalog = json.loads(p.read_text(encoding="utf-8"))
    errors = []
    for product in catalog:
        for img in product.get("images") or []:
            src = img.get("src","")
            if src.startswith("http://") or src.startswith("https://"):
                errors.append(f"{product['slug']}: remote image {src}")
            for ban in BANNED:
                if ban in src:
                    errors.append(f"{product['slug']}: forbidden fragment '{ban}' in {src}")
    if errors:
        print("COMPLIANCE ERRORS:")
        for e in errors:
            print(" •", e)
        sys.exit(1)
    print(f"OK — verified {len(catalog)} products, no forbidden image URLs found.")

if __name__ == "__main__":
    main()
