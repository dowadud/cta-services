# CTA Services LLC — Project Status Report
**Date:** March 24, 2026  
**Prepared for:** External developer handoff / outside help

---

## 1. What This Project Is

A production-ready Next.js website for:

**CTA Services LLC**  
- Phone: 704-458-7691  
- Address: 1480 Concord Pkwy North, Concord, NC 28025  
- Email: ctaservices@outlook.com  

**Purpose:** Professional flooring equipment company website — sales, rentals, parts, and service.  
**Inspired by layout/structure of:** https://www.thesweeper.com and https://www.diamondtoolstore.com  
**Original content only:** All copy is rewritten, no competitor images used.

---

## 2. Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router, TypeScript) |
| Styling | Tailwind CSS v3 (dark industrial theme) |
| Animation | Framer Motion v12 |
| Components | shadcn/ui (hand-written, no CLI used) |
| Validation | Zod |
| Icons | Lucide React |
| Data | Static JSON (no database) |
| Forms | Next.js Server Actions |
| Deployment target | Vercel |

---

## 3. What Has Been Completed ✅

### Project scaffold
- `package.json` written manually with all correct dependencies
- `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `postcss.config.mjs`
- `eslint.config.mjs`
- `components.json` (shadcn config)
- `.gitignore`
- Global CSS (`app/globals.css`) with full CSS variable dark theme

### UI Components (hand-written shadcn/ui style)
All located in `components/ui/`:
- `button.tsx`, `card.tsx`, `badge.tsx`
- `input.tsx`, `textarea.tsx`, `label.tsx`
- `separator.tsx`, `accordion.tsx`
- `sheet.tsx` (mobile nav drawer)
- `navigation-menu.tsx`, `dialog.tsx`

### Shared Layout Components
- `components/site-header.tsx` — sticky, mobile hamburger Sheet, desktop nav, company phone/address
- `components/site-footer.tsx` — full 4-column footer with NAP, categories, service links
- `components/motion.tsx` — `FadeIn`, `FadeInGroup`, `FadeInItem`, `HoverLift` (all prefers-reduced-motion safe)
- `components/product-card.tsx` — image, category badge, title, price, CTA buttons

### App Pages (all written)

| Route | File | Status |
|---|---|---|
| `/` | `app/page.tsx` | ✅ Complete |
| `/products` | `app/products/page.tsx` | ✅ Complete |
| `/products/[slug]` | `app/products/[slug]/page.tsx` | ✅ Complete |
| `/rentals` | `app/rentals/page.tsx` | ✅ Complete |
| `/service-repair` | `app/service-repair/page.tsx` | ✅ Complete |
| `/parts` | `app/parts/page.tsx` | ✅ Complete |
| `/about` | `app/about/page.tsx` | ✅ Complete |
| `/contact` | `app/contact/page.tsx` | ✅ Complete |

### Contact / Quote Form
- `app/contact/contact-form.tsx` — client component, `useActionState`, Zod validation
- `app/contact/actions.ts` — Server Action, validates and logs submission server-side
- Ready to hook into Resend or Outlook SMTP (documented in README)

### SEO
- `app/layout.tsx` — JSON-LD LocalBusiness schema, metadataBase, OpenGraph
- `app/sitemap.ts` — auto-generates sitemap for all pages + 500 products
- `app/robots.ts` — allows all, points to sitemap
- Per-page `metadata` exports on every route
- Keywords target "flooring equipment Concord NC", "floor scrubber rental Charlotte NC", etc.

### Library files
- `lib/company.ts` — single source of truth for all company NAP data
- `lib/products.ts` — catalog loader (`getAllProducts`, `getProductBySlug`, `getFeaturedProducts`, `getCategories`)
- `lib/product-types.ts` — Zod schemas for `ScrapedProduct` and `ClientProduct`
- `lib/product-copy.ts` — `rewriteProductForCTA()` function for original B2B copy generation
- `lib/utils.ts` — `cn()` class merge utility

### Data Pipeline (Python — runs without Node)
- `scripts/bootstrap_catalog.py` — fetches product metadata from public WooCommerce Store API (thesweeper.com), writes `data/products.json` + `data/products.enriched.json`
- `scripts/scrape-diamondtoolstore.py` — fetches floor machine products from Diamond Tool Store Shopify API, merges into enriched catalog
- `scripts/match-local-images.py` — fuzzy-matches local image filenames to product slugs, copies to `public/product-images/`
- `scripts/verify-client-data.py` — compliance check, exits with error if any competitor image URL appears in shipped JSON

### Product Catalog (`data/products.enriched.json`)
**1,203 total products — VERIFIED: no competitor image URLs**

| Category | Count |
|---|---|
| Factory Cat Scrubber Parts | 283 |
| Hardware / General | 209 |
| Floor Grinders | 121 |
| Other Parts | 93 |
| Floor Polishers | 87 |
| Auto Scrubbers | 56 |
| Equipment | 54 |
| Floor Scrapers | 51 |
| Shot Blasters | 32 |
| Concrete Scarifiers | 26 |
| Power Trowels | 5 (hand-curated) |

**Hand-curated featured equipment (with original specs):**
- Whiteman STXDF Hydrostatic-Drive Ride-On Trowel (84 HP, 10 ft path)
- Whiteman MX-365 Ride-On Trowel
- Allen Engineering ROP180-P Polishing Rider
- Walk-Behind Power Trowel 36"
- Husqvarna PG 510 Concrete Grinder

### Images
- 5 local PNGs exist in project root: `IMG_2055.PNG` through `IMG_2059.PNG`
- 3 matched via `image-overrides.json`:
  - `IMG_2058.PNG` → Whiteman STXDF
  - `IMG_2059.PNG` → Allen ROP180-P
  - `IMG_2057.PNG` → Husqvarna PG 510
- 1,200 products show placeholder ("Image needed" badge)

### Git
- Repo initialized in `/Users/nadhirwadud/Desktop/cta services/`
- 2 commits made:
  - `feat: scaffold CTA Services LLC Next.js site` (63 files)
  - `docs: add comprehensive README`
- **No GitHub remote connected yet** — user must add this

### Documentation
- `README.md` — full setup, pipeline, image workflow, Vercel deploy, email hook docs

---

## 4. Critical Blocking Issue ⛔

### Node.js / npm is NOT installed on this machine

**This is the primary blocker.** The entire Next.js app cannot be run, built, or tested until Node.js is installed.

**Evidence:**
```
$ node --version
node: NOT FOUND

$ npm --version
npm: NOT FOUND

$ npx --version
command not found: npx
```

**What this means:**
- `npm install` has NOT been run — `node_modules/` does not exist
- `npm run dev` (local dev server) cannot start
- `npm run build` (Vercel build) has NOT been tested or verified to pass
- TypeScript compilation has not been verified
- All component code is written but **unverified against the actual Next.js compiler**

---

## 5. Secondary Issues / Risks ⚠️

### 5a. Build has NOT been tested
Because Node is not available, we have never run:
```bash
npm install
npm run build
```
There may be TypeScript errors, missing imports, or Tailwind config issues that only surface during the actual build.

**Known potential issues:**
- `tailwindcss-animate` is in `package.json` but the Tailwind config imports it via `require()`. If the package isn't installed, the build will fail.
- `framer-motion` v12 uses `useActionState` which requires React 19 — the package.json specifies React 19, which should be fine, but needs verification.
- The `app/contact/contact-form.tsx` uses `useActionState` which is a React 19 / Next.js 15 API — needs to be confirmed working.
- `generateStaticParams` in `/products/[slug]/page.tsx` is limited to 500 slugs to avoid memory issues during build — may need adjustment.

### 5b. No GitHub remote connected
The git repo is local only. To push to GitHub:
```bash
git remote add origin https://github.com/YOUR_USERNAME/cta-services-web.git
git push -u origin main
```
Until this is done, Vercel deployment cannot be triggered.

### 5c. Vercel build script
The `build` script in `package.json` is:
```json
"build": "npm run verify:data && next build"
```
`verify:data` runs `tsx scripts/verify-client-data.ts`. This requires `tsx` (a dev dependency) and Node/TypeScript at build time. On Vercel this will work because Vercel installs all devDependencies before building.

If you want to simplify, you can change the Vercel build command to just `next build` in the Vercel dashboard.

### 5d. Only 3 of 1,203 products have actual photos
The rest show a placeholder card with "Image needed" badge. The site will work and look professional, but product detail pages for 1,200 items will have no photo. To fix this:
1. Add photos to the project root or a folder
2. Edit `data/image-overrides.json` to map product slugs to filenames
3. Re-run `python3 scripts/match-local-images.py`
4. Commit and push

### 5e. Contact form does NOT send email yet
Form submissions are validated and logged to the server console only. No email is sent. To wire up email, a developer needs to:
- Add `npm install resend` (or `nodemailer`)
- Add env var `RESEND_API_KEY` (or SMTP credentials) to Vercel
- Uncomment/add the email-send block in `app/contact/actions.ts`
- Full instructions are in `README.md`

### 5f. Site URL is a placeholder
`metadataBase` in `app/layout.tsx` and `BASE` in `app/sitemap.ts` are set to `https://ctaservicesnc.com`. This needs to be updated to the real domain once one is chosen/purchased.

---

## 6. File Structure Overview

```
cta services/
├── app/
│   ├── layout.tsx              ← Root layout, JSON-LD, metadata
│   ├── page.tsx                ← Homepage (Hero, Categories, Products, Why CTA, Contact)
│   ├── globals.css             ← Tailwind + CSS variables (dark theme)
│   ├── sitemap.ts
│   ├── robots.ts
│   ├── not-found.tsx
│   ├── about/page.tsx
│   ├── contact/
│   │   ├── page.tsx
│   │   ├── contact-form.tsx    ← Client component
│   │   └── actions.ts          ← Server Action (Zod + logging)
│   ├── parts/page.tsx
│   ├── products/
│   │   ├── page.tsx            ← Filterable grid
│   │   └── [slug]/page.tsx     ← Product detail
│   ├── rentals/page.tsx
│   └── service-repair/page.tsx
│
├── components/
│   ├── motion.tsx              ← FadeIn, FadeInGroup, HoverLift
│   ├── product-card.tsx
│   ├── site-header.tsx
│   ├── site-footer.tsx
│   └── ui/
│       ├── button.tsx, card.tsx, badge.tsx
│       ├── input.tsx, textarea.tsx, label.tsx
│       ├── accordion.tsx, sheet.tsx, dialog.tsx
│       └── separator.tsx, navigation-menu.tsx
│
├── lib/
│   ├── company.ts              ← Single source of truth for CTA NAP
│   ├── products.ts             ← Catalog data access functions
│   ├── product-types.ts        ← Zod schemas
│   ├── product-copy.ts         ← B2B copy rewrite function
│   └── utils.ts                ← cn() utility
│
├── data/
│   ├── products.json           ← Raw research data (1,203 items)
│   ├── products.enriched.json  ← Client-safe catalog (verified clean)
│   └── image-overrides.json    ← Manual slug → filename mappings
│
├── scripts/
│   ├── bootstrap_catalog.py    ← Fetch from thesweeper.com Store API
│   ├── scrape-diamondtoolstore.py ← Fetch Diamond Tool Store floor machines
│   ├── match-local-images.py   ← Match local PNGs to products
│   ├── verify-client-data.py   ← Compliance check (no competitor images)
│   └── *.ts                    ← TypeScript versions (require Node)
│
├── public/
│   ├── placeholder-product.svg
│   └── product-images/
│       ├── whiteman-stxdf-ride-on-trowel-1.PNG
│       ├── allen-rop180-polishing-rider-1.PNG
│       └── husqvarna-pg510-concrete-grinder-1.PNG
│
├── IMG_2055.PNG … IMG_2059.PNG  ← Owner's local photos (5 total)
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── next.config.ts
├── eslint.config.mjs
├── components.json
├── .gitignore
├── README.md
└── PROJECT_STATUS.md           ← This file
```

---

## 7. What the Outside Developer Needs to Do

### Step 1 — Install Node.js
```bash
# Download from https://nodejs.org (LTS version 20 or 22)
# Or with Homebrew:
brew install node
```

### Step 2 — Install dependencies
```bash
cd "/Users/nadhirwadud/Desktop/cta services"
npm install
```

### Step 3 — Test the dev server
```bash
npm run dev
# Should open at http://localhost:3000
```

### Step 4 — Fix any TypeScript / build errors
```bash
npm run build
# Fix any errors that surface
```

### Step 5 — Connect GitHub remote
```bash
git remote add origin https://github.com/THEIR_USERNAME/cta-services-web.git
git push -u origin main
```

### Step 6 — Deploy to Vercel
1. Go to vercel.com → Add New Project → Import from GitHub
2. Framework: Next.js (auto-detected)
3. Build Command: `next build` (simplest, skips local verify step)
4. Deploy

### Step 7 (optional) — Wire up contact form email
See `README.md` section "Hook in email delivery" for Resend or SMTP/Outlook instructions.

---

## 8. What Works Without Node Right Now

These all work with Python 3 only (already confirmed working):

```bash
# Re-run full data pipeline
python3 scripts/bootstrap_catalog.py        # ✅ tested, fetched 800 products
python3 scripts/scrape-diamondtoolstore.py  # ✅ tested, added 398 floor machines
python3 scripts/match-local-images.py       # ✅ tested, 3 matched, 1200 placeholders
python3 scripts/verify-client-data.py       # ✅ PASSES — no forbidden URLs
```

---

## 9. Company Info — Where It Lives

All company info (name, phone, address, email) across every page comes from one file:

```
lib/company.ts
```

Change it there and it updates everywhere automatically (header, footer, product pages, contact page, JSON-LD schema, footer).

---

## 10. Summary Table

| Item | Status |
|---|---|
| Next.js project scaffolded | ✅ Done |
| All 8 pages written | ✅ Done |
| Product catalog (1,203 items) | ✅ Done, verified clean |
| Diamond Tool Store floor machines added | ✅ Done (398 machines) |
| Whiteman STXDF + power trowels added | ✅ Done (5 hand-curated) |
| Image pipeline scripts | ✅ Done (3 matched, 1,200 placeholders) |
| SEO / JSON-LD / sitemap / robots | ✅ Done |
| Contact/quote forms (UI + validation) | ✅ Done |
| Compliance check (no competitor images) | ✅ Passing |
| Git initialized, 2 commits | ✅ Done |
| **Node.js installed** | ❌ NOT INSTALLED — PRIMARY BLOCKER |
| **npm install run** | ❌ NOT RUN |
| **Build tested locally** | ❌ NOT TESTED |
| **GitHub remote connected** | ❌ NOT CONNECTED |
| **Vercel deployed** | ❌ NOT DEPLOYED |
| Contact form sends email | ❌ Placeholder only (docs in README) |
| Real domain configured | ❌ Placeholder URL used |
| Product photos (most items) | ❌ 1,200 placeholders need photos |
