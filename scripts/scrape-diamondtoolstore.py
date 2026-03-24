#!/usr/bin/env python3
"""Scrape Diamond Tool Store floor machines via Shopify public storefront API.
No competitor images are stored in the output — only text metadata."""

import json, re, ssl, time, urllib.request
from pathlib import Path

BASE = "https://www.diamondtoolstore.com"
UA = "CTAServicesResearch/1.0 (+internal)"
ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data"

def fetch_json(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "application/json"})
    ctx = ssl.create_default_context()
    with urllib.request.urlopen(req, context=ctx, timeout=60) as r:
        return json.loads(r.read().decode("utf-8"))

def strip_html(html):
    text = re.sub(r"<[^>]+>", " ", html or "")
    text = text.replace("&nbsp;", " ").replace("&amp;", "&").replace("&lt;", "<").replace("&gt;", ">")
    return re.sub(r"\s+", " ", text).strip()

def opening(title, tags):
    t = (title + " " + " ".join(tags)).lower()
    if "shot blast" in t:
        return "High-production shot blasting unit engineered for surface preparation on concrete and steel, delivering consistent profile depth and contamination removal."
    if "scraper" in t or "floor scrap" in t:
        return "Industrial floor scraper built to efficiently remove vinyl tile, rubber flooring, carpet adhesive, and coatings from concrete substrates with minimal downtime."
    if "scarifi" in t or "shaver" in t:
        return "Concrete scarifier engineered for controlled depth milling, coating removal, and surface profiling on industrial and commercial floors."
    if "grinder" in t or "grinding" in t or "planetary" in t:
        return "Professional-grade concrete grinder built for coating removal, surface leveling, and preparation for polished concrete or resinous flooring systems."
    if "polisher" in t or "polishing" in t or "burnisher" in t or "burnish" in t:
        return "Floor polishing and burnishing machine designed to maintain and restore high-gloss finishes on concrete, vinyl, and hard surface floors."
    if "scrubber" in t or "auto scrub" in t:
        return "Commercial auto scrubber delivering efficient daily floor cleaning with combined scrub-and-dry action, reducing labor time and chemical usage."
    if "trowel" in t:
        return "Ride-on concrete trowel built for high-speed finishing of large commercial and industrial slabs with precision pitch control and maximum coverage."
    if "sweeper" in t:
        return "Industrial floor sweeper built to maintain clean, debris-free production environments across large hard-surface areas."
    return "Professional floor equipment supplied by CTA Services for commercial and industrial concrete, surface prep, and facility maintenance programs."

def rewrite(p, brand=""):
    title = strip_html(p.get("title",""))
    tags = p.get("tags") or []
    desc_raw = strip_html(p.get("body_html",""))
    op = opening(title, tags)
    sku = ""
    for v in p.get("variants") or []:
        if v.get("sku"):
            sku = v["sku"]; break

    short = f"{title}: {op.split('.')[0]}."
    long_txt = " ".join(filter(None, [
        op,
        "CTA Services LLC supplies, services, and rents professional floor equipment across the Concord–Charlotte metro. Our team helps you match the right machine to your project scope, application type, and maintenance program.",
        f"Available for sale, rental, or lease. {f'Reference: {sku}.' if sku else ''} Contact us for current pricing, delivery, and service coverage.",
    ]))
    return short, long_txt

CATEGORY_MAP = {
    "shot blast": "Shot Blasters",
    "scraper": "Floor Scrapers",
    "scarifi": "Concrete Scarifiers",
    "shaver": "Concrete Scarifiers",
    "grinder": "Floor Grinders",
    "grinding": "Floor Grinders",
    "polishing rider": "Floor Polishers",
    "polisher": "Floor Polishers",
    "burnisher": "Floor Polishers",
    "burnish": "Floor Polishers",
    "scrubber": "Auto Scrubbers",
    "swingo": "Auto Scrubbers",
    "chariot": "Auto Scrubbers",
    "iscrub": "Auto Scrubbers",
    "trowel": "Power Trowels",
    "ergo": "Floor Polishers",
    "sweeper": "Industrial Sweepers",
}

def classify(title, tags):
    low = (title + " " + " ".join(tags)).lower()
    for key, cat in CATEGORY_MAP.items():
        if key in low:
            return cat
    return "Floor Equipment"

def build_specs(p):
    specs = {}
    for v in p.get("variants") or []:
        if v.get("sku"):
            specs["SKU"] = v["sku"]
        break
    if p.get("vendor"):
        specs["Brand"] = p["vendor"]
    for opt in p.get("options") or []:
        name = opt.get("name","").strip()
        vals = opt.get("values") or []
        if name and vals and name.lower() not in ("title","default title"):
            specs[name] = ", ".join(str(v) for v in vals[:4])
    return specs

def main():
    DATA.mkdir(parents=True, exist_ok=True)
    all_products = []
    for page in range(1, 10):
        url = f"{BASE}/collections/floor-machines/products.json?limit=250&page={page}"
        data = fetch_json(url)
        batch = data.get("products") or []
        if not batch:
            break
        all_products.extend(batch)
        if len(batch) < 250:
            break
        time.sleep(0.5)

    print(f"Fetched {len(all_products)} floor machine products")

    enriched_path = DATA / "products.enriched.json"
    existing = json.loads(enriched_path.read_text(encoding="utf-8")) if enriched_path.exists() else []
    existing_slugs = {p["slug"] for p in existing}

    # Build floor-machine-specific ID base (start above 1M to avoid collision)
    id_base = 1_000_000
    new_entries = []
    for i, p in enumerate(all_products):
        slug = f"dts-{p['handle']}"
        if slug in existing_slugs:
            continue
        price_raw = p["variants"][0].get("price","0") if p.get("variants") else "0"
        try:
            amount = float(price_raw)
        except Exception:
            amount = 0.0
        category = classify(p.get("title",""), p.get("tags") or [])
        short, long_txt = rewrite(p, p.get("vendor",""))
        specs = build_specs(p)
        entry = {
            "id": id_base + i,
            "slug": slug,
            "name": strip_html(p.get("title","")),
            "category": category,
            "shortDescription": short,
            "longDescription": long_txt,
            "specs": specs,
            "price": {"amount": amount, "currency": "USD", "display": f"${amount:,.2f}"} if amount > 0 else None,
            "images": [],
            "imageStatus": "placeholder",
        }
        new_entries.append(entry)
        existing_slugs.add(slug)

    # Also inject the Whiteman STXDF and comparable power trowels (hand-curated, original copy)
    power_trowels = [
        {
            "id": 2_000_001,
            "slug": "whiteman-stxdf-ride-on-trowel",
            "name": "Whiteman STXDF Hydrostatic-Drive Ride-On Trowel",
            "category": "Power Trowels",
            "shortDescription": "Whiteman STXDF Ride-On Trowel: 84-HP dual-fuel ride-on finishing machine with hydrostatic drive, twin six-blade rotors, and 10-foot path — built for high-production commercial slab finishing.",
            "longDescription": "The Whiteman STXDF is a large-format ride-on concrete trowel designed for demanding commercial and industrial pours. Its 84-HP Ford Power Products engine operates on gasoline or LPG, providing the torque necessary for both pan floating early in the finish cycle and high-speed burnishing on the close. The hydrostatic drive system uses variable-displacement pumps and radial piston motors to maintain consistent rotor speed under load — reducing operator corrections and delivering a flatter, more uniform finish. CTA Services LLC rents, sells, and services heavy concrete finishing equipment across the Concord–Charlotte region. Our team can help match the right machine size and fuel type to your specific project, pour volume, and schedule. Ask about operator familiarization, on-site support, and planned maintenance programs.",
            "specs": {
                "Engine": "84 HP Ford Power Products (Gas/LPG Dual Fuel)",
                "Path Width": "117 in (2,971 mm) — 10 ft non-overlap twin rotors",
                "Rotor Configuration": "Twin six-blade, non-overlap",
                "Rotor RPM": "0–150 RPM",
                "Fuel Tank": "14.5 gal (54 L)",
                "Fuel Consumption": "~3.5 gal/hr",
                "Overall Length": "131 in (3,327 mm)",
                "Overall Width": "64 in (1,625 mm)",
                "Overall Height": "71 in (1,803 mm)",
                "Operating Weight": "~2,600–2,769 lb (1,179–1,255 kg)",
                "Drive System": "Hydrostatic — variable displacement pump & radial piston motors",
                "Controls": "Digital display, Active Speed Control, Visual Pitch Indicator, LED lighting",
                "Availability": "Sale · Rental · Service",
            },
            "price": None,
            "images": [],
            "imageStatus": "placeholder",
        },
        {
            "id": 2_000_002,
            "slug": "multiquip-mx365-ride-on-trowel",
            "name": "MQ Whiteman MX-365 Ride-On Trowel (36\"/65 HP)",
            "category": "Power Trowels",
            "shortDescription": "MQ Whiteman MX-365 Ride-On Trowel: Compact 65-HP ride-on trowel with overlapping 36-inch rotors, hydraulic drive, and full electronic controls — ideal for medium commercial slabs.",
            "longDescription": "A mid-range ride-on concrete trowel from the Whiteman line, the MX-365 combines a 65-HP engine with overlapping rotors and hydraulic drive for responsive finishing across medium commercial pours. Electronic pitch control and a straightforward operator interface make it a practical choice for crews transitioning from walk-behind to ride-on machines. CTA Services LLC rents and services ride-on trowels across the greater Charlotte metro. Contact us for current availability, delivery, and a pre-use walkthrough.",
            "specs": {
                "Engine": "65 HP (gasoline)",
                "Rotor Diameter": "36 in each (overlapping)",
                "Drive System": "Hydraulic",
                "Controls": "Electronic pitch control",
                "Availability": "Rental · Sale",
            },
            "price": None,
            "images": [],
            "imageStatus": "placeholder",
        },
        {
            "id": 2_000_003,
            "slug": "allen-rop180-polishing-rider",
            "name": "Allen Engineering ROP180-P Polishing Rider",
            "category": "Power Trowels",
            "shortDescription": "Allen Engineering ROP180-P: Dedicated ride-on floor polishing machine with planetary head configuration, suited for large-format polished concrete and densified industrial floors.",
            "longDescription": "The Allen Engineering ROP180-P is a ride-on polishing platform designed for production-scale polished concrete programs. Its planetary head configuration applies consistent downward pressure across the polishing path, enabling uniform scratch removal and gloss development on large industrial, commercial, and warehouse floors. CTA Services LLC supports polished concrete programs with equipment, pads, densifiers, and on-call service across the Concord–Charlotte area. Ask about our rental program for single-project or ongoing polishing contracts.",
            "specs": {
                "Application": "Polished concrete, densified concrete floors",
                "Head Configuration": "Planetary polishing heads",
                "Drive": "Ride-on, self-propelled",
                "Coverage": "High-production wide-path",
                "Availability": "Rental · Quote for sale",
            },
            "price": None,
            "images": [],
            "imageStatus": "placeholder",
        },
        {
            "id": 2_000_004,
            "slug": "multiquip-walk-behind-power-trowel-36",
            "name": "Walk-Behind Power Trowel — 36 Inch (Gas)",
            "category": "Power Trowels",
            "shortDescription": "36-inch walk-behind gas power trowel: Workhorse finishing machine for residential slabs, smaller commercial pours, and tight access areas requiring blade or pan floating.",
            "longDescription": "A 36-inch walk-behind power trowel is the standard entry point for professional concrete finishing on pours from 1,000 to 5,000 sq ft. Single-rotor design delivers excellent maneuverability and blade or pan compatibility for floating and finishing passes. CTA Services LLC rents walk-behind trowels by the day, week, or month, with delivery to job sites across Cabarrus, Mecklenburg, and surrounding counties. Ask about our trowel blade and pan kits available with every rental.",
            "specs": {
                "Rotor Diameter": "36 in",
                "Engine": "Honda GX200 or equivalent (5.5–7 HP)",
                "Blade Count": "4–6 blades",
                "RPM Range": "0–150 RPM",
                "Application": "Floating, finishing, burnishing",
                "Availability": "Daily · Weekly · Monthly rental",
            },
            "price": None,
            "images": [],
            "imageStatus": "placeholder",
        },
        {
            "id": 2_000_005,
            "slug": "husqvarna-pg510-concrete-grinder",
            "name": "Husqvarna PG 510 Concrete Grinder",
            "category": "Floor Grinders",
            "shortDescription": "Husqvarna PG 510: Single-phase 220V planetary concrete grinder for coating removal, surface prep, and concrete polishing on medium commercial floors.",
            "longDescription": "The Husqvarna PG 510 is a compact planetary grinder suited for surface preparation, epoxy coating removal, and polished concrete programs on floors from 500 to 10,000 sq ft. Its three planetary satellite heads deliver consistent grinding contact across flat and slightly uneven substrates. CTA Services LLC supplies, services, and rents Husqvarna concrete grinding equipment. Ask about compatible diamond tooling, wet/dry dust collection packages, and planned maintenance.",
            "specs": {
                "Power": "220V single-phase electric",
                "Grinding Width": "~20 in",
                "Head Configuration": "Planetary — 3 satellite heads",
                "Weight": "~287 lb",
                "Application": "Coating removal, surface prep, polishing",
                "Brand": "Husqvarna",
                "Availability": "Sale · Rental · Service",
            },
            "price": {"amount": 11285.00, "currency": "USD", "display": "$11,285.00"},
            "images": [],
            "imageStatus": "placeholder",
        },
    ]
    for pt in power_trowels:
        if pt["slug"] not in existing_slugs:
            new_entries.append(pt)
            existing_slugs.add(pt["slug"])

    all_entries = existing + new_entries
    enriched_path.write_text(json.dumps(all_entries, indent=2), encoding="utf-8")
    print(f"Added {len(new_entries)} new entries. Total catalog: {len(all_entries)} products.")

if __name__ == "__main__":
    main()
