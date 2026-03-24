#!/usr/bin/env python3
"""Match local images to products by filename fuzzy-scoring.
Copies matched images into public/product-images/ with slug-based names.
Reads data/image-overrides.json for manual assignments."""

import json, os, re, shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data"
DEFAULT_DIR = Path(os.environ.get("CTA_LOCAL_IMAGE_DIR", str(ROOT)))
PUBLIC_IMAGES = ROOT / "public" / "product-images"
THRESHOLD = float(os.environ.get("CTA_IMAGE_MATCH_THRESHOLD", "0.25"))
IMAGE_EXTS = {".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg"}

def normalize(s):
    return re.sub(r"[^a-z0-9]+", " ", s.lower()).strip()

def tokenize(s):
    return set(w for w in normalize(s).split() if len(w) > 1)

def score(filename_stem, product):
    stem_tokens = tokenize(filename_stem)
    product_tokens = (
        tokenize(product["slug"].replace("-", " "))
        | tokenize(product["name"])
        | tokenize(product.get("category", ""))
    )
    if not stem_tokens:
        return 0.0
    hits = sum(1 for t in stem_tokens if t in product_tokens)
    return hits / len(stem_tokens)

def load_overrides():
    p = DATA / "image-overrides.json"
    if p.exists():
        return json.loads(p.read_text(encoding="utf-8"))
    return {}

def list_images(directory):
    try:
        return [
            directory / f
            for f in os.listdir(directory)
            if Path(f).suffix.lower() in IMAGE_EXTS and not f.startswith(".")
        ]
    except FileNotFoundError:
        return []

def main():
    enriched_path = DATA / "products.enriched.json"
    products = json.loads(enriched_path.read_text(encoding="utf-8"))
    overrides = load_overrides()
    candidates = list_images(DEFAULT_DIR)
    PUBLIC_IMAGES.mkdir(parents=True, exist_ok=True)

    used = set()
    stats = {"matched": 0, "override": 0, "placeholder": 0}

    for p in products:
        p["images"] = []
        slug = p["slug"]

        # 1. Manual override wins
        if slug in overrides:
            for rel in overrides[slug]:
                src = Path(rel) if Path(rel).is_absolute() else DEFAULT_DIR / rel
                if src.exists():
                    ext = src.suffix
                    dest_name = f"{slug}-1{ext}"
                    dest = PUBLIC_IMAGES / dest_name
                    shutil.copy2(src, dest)
                    p["images"].append({"src": f"/product-images/{dest_name}", "alt": f"{p['name']} — equipment photo"})
                    used.add(str(src))
            if p["images"]:
                p["imageStatus"] = "matched"
                stats["override"] += 1
                continue

        # 2. Fuzzy filename match
        best = None
        best_score = 0.0
        for candidate in candidates:
            if str(candidate) in used:
                continue
            s = score(candidate.stem, p)
            if s > best_score:
                best_score = s
                best = candidate

        if best and best_score >= THRESHOLD:
            ext = best.suffix
            dest_name = f"{slug}-1{ext}"
            dest = PUBLIC_IMAGES / dest_name
            shutil.copy2(best, dest)
            p["images"].append({"src": f"/product-images/{dest_name}", "alt": f"{p['name']} — equipment photo"})
            used.add(str(best))
            p["imageStatus"] = "matched"
            stats["matched"] += 1
        else:
            p["imageStatus"] = "placeholder"
            stats["placeholder"] += 1

    enriched_path.write_text(json.dumps(products, indent=2), encoding="utf-8")
    print(f"Done. Overrides: {stats['override']}  Fuzzy matched: {stats['matched']}  Placeholders: {stats['placeholder']}")

if __name__ == "__main__":
    main()
