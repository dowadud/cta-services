#!/usr/bin/env python3
"""One-shot bootstrap: fetch Store API → data/products.json + data/products.enriched.json.
Run `npm run match-images` after Node install to attach local photos."""

import json
import re
import ssl
import time
import urllib.request
from pathlib import Path

BASE = "https://www.thesweeper.com"
UA = "CTAServicesResearch/1.0 (+internal)"
DELAY = 0.45
MAX_PAGES = int(__import__("os").environ.get("BOOTSTRAP_MAX_PAGES", "8"))
PER_PAGE = 100
ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data"


def fetch_json(url: str):
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "application/json"})
    ctx = ssl.create_default_context()
    with urllib.request.urlopen(req, context=ctx, timeout=60) as r:
        return json.loads(r.read().decode("utf-8"))


def strip_html(html: str) -> str:
    text = re.sub(r"<[^>]+>", " ", html or "")
    text = text.replace("&nbsp;", " ")
    return re.sub(r"\s+", " ", text).strip()


def opening(category: str) -> str:
    c = category.lower()
    if "part" in c or "access" in c or "replacement" in c:
        return "Dependable wear component engineered to restore uptime and predictable performance across compatible equipment."
    if "brush" in c or "pad" in c:
        return "Surface-prep accessory sized for professional concrete schedules, maintenance passes, and predictable finish quality."
    if "scrubber" in c or "machine" in c or "sweeper" in c:
        return "Built for demanding floor programs, this unit supports consistent daily production through modern scrub and recovery components."
    return "Industrial flooring component supplied by CTA Services for crews that prioritize reliable fitment, support, and fast turnaround."


def main():
    DATA.mkdir(parents=True, exist_ok=True)
    raw_products = []
    for page in range(1, MAX_PAGES + 1):
        url = f"{BASE}/wp-json/wc/store/v1/products?per_page={PER_PAGE}&page={page}"
        batch = fetch_json(url)
        if not batch:
            break
        for p in batch:
            slug = p.get("slug") or ""
            if not slug or slug == "shop":
                continue
            minor = int(p.get("prices", {}).get("currency_minor_unit") or 2)
            amt = int(p.get("prices", {}).get("price") or 0) / (10**minor)
            display = ""
            if amt > 0:
                prefix = p.get("prices", {}).get("currency_prefix", "$")
                display = f"{prefix}{amt:.{minor}f}"
            cats = p.get("categories") or []
            names = [
                c.get("name", "").strip()
                for c in cats
                if c.get("name") and str(c.get("name")).upper() != "NULL"
            ]
            category = " · ".join(names) or "Equipment"
            specs = {}
            sku = p.get("sku")
            if sku:
                specs["SKU"] = sku
            for attr in p.get("attributes") or []:
                label = (attr.get("name") or "").strip()
                terms = attr.get("terms") or []
                val = ", ".join(t.get("name", "") for t in terms if t.get("name"))
                if label and val:
                    specs[label] = val
            raw_products.append(
                {
                    "id": int(p["id"]),
                    "slug": slug,
                    "name": strip_html(p.get("name", "")),
                    "category": category,
                    "shortDescription": strip_html(p.get("short_description", "")),
                    "longDescription": strip_html(p.get("description", "")),
                    "specs": specs,
                    "price": (
                        {"amount": amt, "currency": p.get("prices", {}).get("currency_code", "USD"), "display": display}
                        if amt > 0
                        else None
                    ),
                    "sourceUrl": p.get("permalink") or f"{BASE}/product/{slug}",
                }
            )
        if len(batch) < PER_PAGE:
            break
        time.sleep(DELAY)

    (DATA / "products.json").write_text(json.dumps(raw_products, indent=2), encoding="utf-8")

    enriched = []
    for p in raw_products:
        sku_hint = p["specs"].get("SKU", "")
        op = opening(p["category"])
        short = f'{p["name"]}: {op.split(".")[0]}.'
        long_txt = " ".join(
            [
                op,
                "CTA Services LLC helps Concord–Charlotte teams spec, source, and sustain floor equipment with responsive service, parts support, and rental options when schedules demand flexibility.",
                f"Reference: {sku_hint}." if sku_hint else "",
                "Request a quote for delivered pricing, availability, and recommended consumables.",
            ]
        ).strip()
        enriched.append(
            {
                **p,
                "shortDescription": short,
                "longDescription": long_txt,
                "images": [],
                "imageStatus": "placeholder",
            }
        )
    # Remove sourceUrl from client file (plan: client-safe)
    for row in enriched:
        row.pop("sourceUrl", None)

    (DATA / "products.enriched.json").write_text(json.dumps(enriched, indent=2), encoding="utf-8")
    print(f"Wrote {len(raw_products)} products to data/products.json and products.enriched.json")


if __name__ == "__main__":
    main()
