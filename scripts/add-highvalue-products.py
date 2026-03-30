#!/usr/bin/env python3
"""
Add 14 high-value Diamond Tool Store products (floor-machines $67k+)
to data/products.enriched.json with CTA Services original copy and local images.
"""

import json, re, os

WDIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def slugify(title: str) -> str:
    t = title.lower()
    t = re.sub(r"[^a-z0-9]+", "-", t)
    return t.strip("-")

def strip_html(html: str) -> str:
    text = re.sub(r"<[^>]+>", " ", html or "")
    return re.sub(r"\s{2,}", " ", text).strip()

def ext_from_url(url: str) -> str:
    path = url.split("?")[0].split("/")[-1]
    return os.path.splitext(path)[1] or ".jpg"

def cta_copy(title: str, category: str, raw_desc: str) -> dict:
    """Generate original CTA Services marketing copy."""
    t = title.lower()
    c = category.lower()

    if "shot blast" in t or "blaster" in t:
        short = (
            f"The {title} delivers high-production surface preparation for concrete and steel — "
            "available through CTA Services for sale or contract rental in the Carolinas."
        )
        long = (
            f"CTA Services LLC supplies the {title} to contractors and facility teams "
            "who need dependable shot blasting performance on concrete floors, steel decks, and bridge surfaces. "
            "This machine profiles surfaces to SSPC-SP6 through SP10 standards, improving coating adhesion "
            "and removing contaminants without chemical exposure. Our team provides delivery, operator orientation, "
            "and on-call support for the duration of your project. Contact CTA Services for current availability, "
            "rental pricing, and fleet planning for multi-site programs."
        )
        specs_hint = "Shot Blaster — Surface Prep Equipment"

    elif "floor scraper" in t or "ride-on scraper" in t or "brb" in t:
        short = (
            f"The {title} removes flooring materials at production speed — "
            "available through CTA Services for sale and flexible rental terms."
        )
        long = (
            f"CTA Services offers the {title} for contractors tackling large-scale floor covering removal. "
            "This ride-on scraper handles vinyl, tile, rubber, epoxy, and adhesive removal efficiently "
            "across warehouse, retail, and industrial floor programs. Operator controls are intuitive, "
            "and the machine is designed to minimize manual labor and material handling time. "
            "CTA Services delivers, services, and supports this unit throughout the Carolinas. "
            "Ask about our rental packages and fleet maintenance programs."
        )
        specs_hint = "Ride-On Floor Scraper"

    elif "grinder" in t or "polisher" in t or "grinding" in t or "gr2" in t or "rop180" in t:
        short = (
            f"The {title} is a professional-grade concrete grinding and polishing machine "
            "supplied by CTA Services for sale and rental."
        )
        long = (
            f"CTA Services supplies the {title} for polished concrete, coating removal, "
            "and surface leveling applications. This machine is designed for high-production floor programs "
            "where consistency, dust control, and ease of operation are priorities. "
            "Whether you're preparing a warehouse floor for epoxy, polishing a retail slab, or removing "
            "old coatings on a renovation project, CTA Services can deliver this unit and provide on-site support. "
            "Contact us for sale pricing, rental availability, and scheduled maintenance programs."
        )
        specs_hint = "Floor Grinder / Polisher"

    elif "steel blaster" in t or "ebe" in t:
        short = (
            f"The {title} is engineered for steel surface preparation and blasting — "
            "available through CTA Services for industrial and bridge applications."
        )
        long = (
            f"CTA Services offers the {title} for steel surface preparation projects "
            "including bridge decks, steel structures, and industrial fabrication environments. "
            "Designed to achieve near-white blast standards, this unit delivers controlled abrasive "
            "coverage with integrated dust recovery for contained job sites. "
            "Our team handles logistics, operator training, and ongoing service support. "
            "Contact CTA Services to discuss project requirements, rental terms, and availability."
        )
        specs_hint = "Steel Surface Blaster"

    else:
        short = (
            f"The {title} is industrial-grade floor equipment available from CTA Services "
            "for sale, rental, and service in the Carolinas."
        )
        long = (
            f"CTA Services LLC supplies and services the {title} for contractors, "
            "facility managers, and floor prep crews who require dependable equipment and responsive support. "
            "We provide delivery, operator orientation, and maintenance across the Charlotte metro region. "
            "Contact us for current inventory, sale pricing, and flexible rental terms."
        )
        specs_hint = category

    return {"short": short, "long": long, "specs_hint": specs_hint}


def classify_category(title: str, tags: list) -> str:
    t = title.lower()
    tag_str = " ".join(tags).lower()

    if "shot blast" in t or "blaster" in t:
        return "Shot Blasters"
    if "floor scraper" in t or "ride-on scraper" in t or "brb" in t:
        return "Floor Scrapers"
    if "grinder" in t or "gr2" in t or "cpg" in t or "pg " in t:
        return "Floor Grinders"
    if "polisher" in t or "polishing" in t or "burnish" in t or "rop180" in t:
        return "Floor Grinders"
    if "scrubber" in t:
        return "Auto Scrubbers"
    if "scarif" in t:
        return "Concrete Scarifiers"
    return "Equipment"


# ── Product definitions ─────────────────────────────────────────────────────
# Manually define specs extracted from the product HTML descriptions

PRODUCT_SPECS = {
    "blastpro-brb-4500-ride-on-floor-scraper": {
        "Engine": "77 HP Ford LPG",
        "Torque": "3,600 ft-lbs",
        "Drive": "Hydrostatic",
        "Blade Width": "60 in",
        "Type": "Ride-On Floor Scraper",
    },
    "bp-505-self-propelled-portable-shot-blaster": {
        "Blast Width": "20 in",
        "Drive": "Self-Propelled",
        "Application": "Steel surface preparation",
        "Dismantles To": "Fits 24-in manhole",
        "Type": "Portable Shot Blaster",
    },
    "self-propelled-portable-shot-blaster-bp-10-super": {
        "Blast Width": "10 in",
        "Drive": "Electric self-propelled",
        "Application": "Medium-large surface prep",
        "Type": "Self-Propelled Shot Blaster",
    },
    "bp-15-super-self-propelled-portable-shot-blaster": {
        "Blast Width": "15 in",
        "Drive": "Electric self-propelled",
        "Application": "Medium-large scale",
        "Air Wash": "Advanced separation",
        "Type": "Self-Propelled Shot Blaster",
    },
    "blastpro-self-propelled-portable-shot-blaster-1": {
        "Blast Width": "30 in",
        "Model": "BP-2-30-SUPER",
        "Drive": "Advanced drive system",
        "Application": "Large-scale industrial",
        "Type": "Self-Propelled Shot Blaster",
    },
    "blastpro-bpz-20-360-ride-on-shot-blaster": {
        "Blast Width": "20 in",
        "Pattern": "360° coverage",
        "Drive": "Ride-On",
        "Application": "Large-scale surface prep",
        "Type": "Ride-On Shot Blaster",
    },
    "gr2-60-six-head-planetary-grinder-polisher": {
        "Grinding Width": "60 in",
        "Heads": "6 planetary",
        "Generator": "23 kW on-board",
        "Power": "480V 3-phase or on-board",
        "Vacuum": "Turbine 2-stage integrated",
        "Type": "Planetary Grinder / Polisher",
    },
    "allem-polishing-rider-rop180-p": {
        "Model": "ROP180-P",
        "Type": "Ride-On Concrete Polisher",
        "Drive": "Propelled",
        "Application": "Large-area concrete polishing",
    },
    "husqvarna-blastrac-bmr-25p-shot-blaster": {
        "Model": "BMR 25P",
        "Type": "Ride-On Shot Blaster",
        "Drive": "Self-propelled ride-on",
        "Application": "Large concrete floor prep",
        "Brand": "Husqvarna Blastrac",
    },
    "husqvarna-blastrac-2-48ds": {
        "Model": "2-48DS",
        "Blast Width": "48 in",
        "Type": "Walk-Behind Shot Blaster",
        "Brand": "Husqvarna Blastrac",
        "Application": "High-production concrete prep",
    },
    "husqvarna-blastrac-2-30ds": {
        "Model": "2-30DS",
        "Blast Width": "30 in",
        "Type": "Walk-Behind Shot Blaster",
        "Brand": "Husqvarna Blastrac",
        "Application": "Medium-large concrete prep",
    },
    "husqvarna-blastrac-bmr-75d": {
        "Model": "BMR 75D",
        "Type": "Ride-On Shot Blaster",
        "Drive": "Ride-on diesel",
        "Brand": "Husqvarna Blastrac",
        "Application": "Industrial large-area prep",
    },
    "husqvarna-blastrac-2-20dt-shot-blaster": {
        "Model": "2-20DT",
        "Blast Width": "20 in",
        "Type": "Shot Blaster",
        "Brand": "Husqvarna Blastrac",
        "Application": "Concrete and steel prep",
    },
    "husqvarna-blastrac-ebe-500-steel-blaster": {
        "Model": "EBE 500",
        "Type": "Steel Blaster",
        "Brand": "Husqvarna Blastrac",
        "Application": "Steel surface preparation",
    },
}

# ── Load raw data from both API pages ─────────────────────────────────────────
all_raw = []
for fname in [
    f"{WDIR}/.firecrawl/diamondtool-products-api.json",
    f"{WDIR}/.firecrawl/diamondtool-products-api-p2.json",
]:
    with open(fname) as f:
        data = json.load(f)
    for p in data["products"]:
        price = float(p["variants"][0]["price"])
        if price >= 67597:
            all_raw.append(p)

print(f"Found {len(all_raw)} products with price >= $67,597")

# ── Build enriched product entries ────────────────────────────────────────────
new_products = []
for p in all_raw:
    handle = p["handle"]
    title = p["title"]
    raw_desc = strip_html(p.get("body_html", ""))
    price = float(p["variants"][0]["price"])
    tags = p.get("tags", [])

    category = classify_category(title, tags)
    copy = cta_copy(title, category, raw_desc)
    slug = slugify(title)
    specs = PRODUCT_SPECS.get(handle, {"Type": category, "Brand": title.split()[0]})

    # Map local image file
    local_images = []
    for img_url in [i["src"] for i in p.get("images", [])]:
        ext = ext_from_url(img_url)
        local_filename = f"/product-images/{handle}{ext}"
        local_path = f"{WDIR}/public/product-images/{handle}{ext}"
        if os.path.exists(local_path):
            local_images.append({
                "src": local_filename,
                "alt": f"{title} — floor equipment"
            })

    has_images = len(local_images) > 0
    entry = {
        "id": 900000 + len(new_products),
        "slug": slug,
        "name": title,
        "category": category,
        "shortDescription": copy["short"],
        "longDescription": copy["long"],
        "specs": {k: str(v) for k, v in specs.items()},
        "price": {
            "amount": price,
            "currency": "USD",
            "display": f"${price:,.2f}",
        },
        "images": local_images if has_images else [
            {"src": "/placeholder-product.svg", "alt": f"{title} — placeholder"}
        ],
        "imageStatus": "matched" if has_images else "placeholder",
        "featured": True,
        "inStock": True,
    }
    new_products.append(entry)
    print(f"  ✓ {title} — {len(local_images)} image(s), ${price:,.2f}")

# ── Merge into existing enriched catalog ──────────────────────────────────────
enriched_path = f"{WDIR}/data/products.enriched.json"
with open(enriched_path) as f:
    existing = json.load(f)

# Remove any previous DTS high-value entries to avoid duplicates
existing = [p for p in existing if not str(p.get("id", "")).startswith("dts-hv-")]

# Add new products at the front (they'll appear first in featured)
merged = new_products + existing

with open(enriched_path, "w") as f:
    json.dump(merged, f, indent=2, ensure_ascii=False)

print(f"\nCatalog updated: {len(merged)} total products ({len(new_products)} new high-value added)")
