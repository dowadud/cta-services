#!/usr/bin/env python3
"""Add top-20 most expensive Diamond Tool Store products to the catalog."""

import json, re, os

WDIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def slugify(title):
    t = title.lower()
    t = re.sub(r"[^a-z0-9]+", "-", t)
    return t.strip("-")

def strip_html(html):
    text = re.sub(r"<[^>]+>", " ", html or "")
    return re.sub(r"\s{2,}", " ", text).strip()

def ext_from_url(url):
    path = url.split("?")[0].split("/")[-1]
    return os.path.splitext(path)[1] or ".jpg"

def classify_category(title, tags):
    t = title.lower()
    if "shot blast" in t or "blaster" in t or "spe " in t or "ebe " in t:
        return "Shot Blasters"
    if "scraper" in t or "brb" in t or "ecobot" in t or "workhorse" in t:
        return "Floor Scrapers"
    if "grinder" in t or "pg 8" in t or "exp " in t or "grinding" in t:
        return "Floor Grinders"
    if "scrubber" in t or "scrub" in t or "bms " in t or "5200" in t or "5700" in t or "8000" in t or "5625" in t:
        return "Auto Scrubbers"
    if "scarif" in t or "shaver" in t or "fs351" in t:
        return "Concrete Scarifiers"
    if "eraser" in t or "rotary" in t:
        return "Floor Grinders"
    return "Equipment"

def cta_copy(title, category, raw_desc):
    t = title.lower()
    c = category.lower()

    if "shot blast" in t or "blaster" in t or "spe " in t or "ebe " in t:
        short = (
            f"The {title} delivers industrial-scale surface preparation for concrete and steel — "
            "available through CTA Services for sale and rental in the Carolinas."
        )
        long = (
            f"CTA Services LLC supplies the {title} for contractors and facility teams "
            "requiring dependable, production-scale shot blasting on concrete floors, steel decks, "
            "and industrial surfaces. This machine profiles to SSPC standards, removes coatings and "
            "contaminants, and improves adhesion for coatings, overlays, and waterproofing systems. "
            "CTA Services provides delivery, operator orientation, and on-call support throughout "
            "the Charlotte metro region. Contact us for current sale pricing, rental availability, "
            "and multi-site fleet programs."
        )
    elif "scraper" in t or "brb" in t or "ecobot" in t or "workhorse" in t:
        short = (
            f"The {title} handles large-scale floor covering removal at production speed — "
            "available through CTA Services for sale and flexible rental."
        )
        long = (
            f"CTA Services offers the {title} for contractors and facility teams tackling "
            "vinyl, tile, epoxy, rubber, and adhesive removal on warehouse, retail, and industrial floors. "
            "This unit minimizes manual labor, reduces material handling time, and maintains output "
            "across full-day production schedules. CTA Services delivers, services, and supports "
            "this machine throughout the Carolinas. Contact us for rental packages and fleet maintenance agreements."
        )
    elif "grinder" in t or "exp " in t or "eraser" in t or "grinding" in t:
        short = (
            f"The {title} is a professional-grade concrete grinding and surface prep machine "
            "supplied by CTA Services for sale and rental."
        )
        long = (
            f"CTA Services supplies the {title} for polished concrete, coating removal, "
            "surface leveling, and CSP profiling on commercial and industrial floors. "
            "Whether preparing a warehouse slab for epoxy, removing old coatings on a renovation, "
            "or grinding for a polished concrete finish, this machine delivers consistent results "
            "at production output. CTA Services provides delivery, support, and scheduled maintenance "
            "across the Charlotte metro. Contact us for sale pricing and rental availability."
        )
    elif "scrubber" in t or "bms" in t or "5200" in t or "5700" in t or "8000" in t or "5625" in t:
        short = (
            f"The {title} is a heavy-duty ride-on floor scrubber "
            "available from CTA Services for daily facility maintenance programs."
        )
        long = (
            f"CTA Services supplies and services the {title} for facility managers and "
            "floor maintenance crews requiring dependable daily cleaning performance. "
            "This ride-on unit reduces labor requirements on large-format floors — warehouses, "
            "distribution centers, manufacturing areas, and retail environments. "
            "CTA Services offers delivery, operator training, and preventive maintenance programs. "
            "Contact us for rental terms, sale pricing, and fleet service agreements."
        )
    elif "scarif" in t or "shaver" in t:
        short = (
            f"The {title} provides controlled surface milling and coating removal "
            "for concrete floor preparation — supplied by CTA Services."
        )
        long = (
            f"CTA Services offers the {title} for controlled-depth concrete scarifying, "
            "leveling high spots, removing adhesives, and profiling slabs for overlays or coatings. "
            "Available in propane, electric, and self-propelled configurations for varying project scales. "
            "CTA Services supports this unit with delivery, operator orientation, and service. "
            "Contact us for rental availability and current pricing in the Carolinas."
        )
    else:
        short = (
            f"The {title} is industrial-grade floor equipment available from CTA Services "
            "for sale, rental, and service in the Carolinas."
        )
        long = (
            f"CTA Services LLC supplies and services the {title} for contractors, "
            "facility managers, and floor prep crews who require dependable equipment "
            "and responsive support. We provide delivery, operator orientation, and maintenance "
            "across the Charlotte metro. Contact us for current inventory, sale pricing, and flexible rental terms."
        )
    return {"short": short, "long": long}


# Load top-20 staging file
with open(f"{WDIR}/.firecrawl/top20-expensive.json") as f:
    staged = json.load(f)

# Load existing catalog
with open(f"{WDIR}/data/products.enriched.json") as f:
    existing = json.load(f)

existing_ids = {str(p.get("id","")) for p in existing}
existing_slugs = {p.get("slug","") for p in existing}

# Remove any prior runs of this script
existing = [p for p in existing if not str(p.get("id","")).startswith("dts-t20-")]

new_products = []
for idx, item in enumerate(staged):
    handle = item["handle"]
    title = item["title"]
    price = item["price"]
    tags = item.get("tags", [])
    category = classify_category(title, tags)
    copy = cta_copy(title, category, strip_html(item.get("body_html","")))
    slug = slugify(title)

    # Find local images
    local_images = []
    for i, url in enumerate(item.get("all_images", [])):
        ext = ext_from_url(url)
        suffix = "" if i == 0 else f"-{i+1}"
        local_path = f"{WDIR}/public/product-images/{handle}{suffix}{ext}"
        if os.path.exists(local_path):
            web_path = f"/product-images/{handle}{suffix}{ext}"
            local_images.append({
                "src": web_path,
                "alt": f"{title} — floor equipment"
            })

    has_images = len(local_images) > 0
    entry = {
        "id": 910000 + idx,
        "slug": slug,
        "name": title,
        "category": category,
        "shortDescription": copy["short"],
        "longDescription": copy["long"],
        "specs": {"Type": category, "Brand": title.split()[0]},
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
    print(f"  ✓ {title[:55]:<55} ${price:>10,.2f}  {len(local_images)} img(s)")

merged = new_products + existing

with open(f"{WDIR}/data/products.enriched.json", "w") as f:
    json.dump(merged, f, indent=2, ensure_ascii=False)

print(f"\nCatalog updated: {len(merged)} total products ({len(new_products)} new)")
