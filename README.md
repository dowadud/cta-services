# CTA Services LLC — Website

Production Next.js website for **CTA Services LLC**, a professional flooring equipment company in Concord, NC.

**Phone:** 704-458-7691  
**Address:** 1480 Concord Pkwy North, Concord, NC 28025  
**Email:** ctaservices@outlook.com

---

## Tech Stack

- **Next.js 15** (App Router, TypeScript)
- **Tailwind CSS** — industrial dark theme (slate/graphite + copper accent)
- **Framer Motion** — hero, scroll fade-ups, hover lifts
- **shadcn/ui** — Button, Card, Badge, Sheet, Accordion, Dialog, Input, Label, Textarea
- **Zod** — server-side form validation

---

## Setup

### Prerequisites
- Node.js 20+ (run `node -v` to check)
- npm 10+ or pnpm

### Install

```bash
cd "cta services"
npm install
```

### Dev server

```bash
npm run dev
# → http://localhost:3000
```

---

## Data Pipeline

### 1. Bootstrap product catalog (Python — no Node required)

Fetches product metadata from publicly available sources and writes:
- `data/products.json` — raw research archive
- `data/products.enriched.json` — client-safe catalog with original CTA Services copy

```bash
python3 scripts/bootstrap_catalog.py
```

Optional env vars:
```
BOOTSTRAP_MAX_PAGES=8    # number of pages to fetch (default 8)
```

### 2. Add Diamond Tool Store floor machines

```bash
python3 scripts/scrape-diamondtoolstore.py
```

This appends floor machine products (scrubbers, grinders, scarifiers, shot blasters, trowels) to `data/products.enriched.json`. Safe to re-run — skips slugs already present.

### 3. Image matching

```bash
python3 scripts/match-local-images.py
```

Scans the project root (or `CTA_LOCAL_IMAGE_DIR`) for image files, fuzzy-matches them to products by filename similarity, and copies matches into `public/product-images/`.

**Manual overrides** — edit `data/image-overrides.json`:

```json
{
  "whiteman-stxdf-ride-on-trowel": ["IMG_2058.PNG"],
  "some-product-slug": ["my-photo.jpg"]
}
```

Then re-run `match-local-images.py` to apply.

**Adding new photos later:**
1. Drop the image file into the project root or a subfolder.
2. Add an entry to `data/image-overrides.json` mapping the product slug to the filename.
3. Run `python3 scripts/match-local-images.py`.
4. The image appears at `/product-images/{slug}-1.ext` and is served by Vercel.

### 4. Compliance check

Verifies no competitor image URLs appear in the shipped JSON:

```bash
python3 scripts/verify-client-data.py
```

This also runs automatically before every `npm run build`.

---

## Running the Full Pipeline

```bash
python3 scripts/bootstrap_catalog.py
python3 scripts/scrape-diamondtoolstore.py
python3 scripts/match-local-images.py
python3 scripts/verify-client-data.py
npm run build
```

---

## Content Review Checklist

Before launching, spot-check the following for accidental verbatim phrases:

- [ ] Open 5 random products in `/products/[slug]` and read the long description — confirm it does not match any source site's prose
- [ ] Search `data/products.enriched.json` for the word "Factory Cleaning Equipment" (competitor name) — should return zero results
- [ ] Confirm `public/product-images/` contains only files you own or have rights to

---

## Pages

| Route | File |
|---|---|
| `/` | `app/page.tsx` |
| `/products` | `app/products/page.tsx` |
| `/products/[slug]` | `app/products/[slug]/page.tsx` |
| `/rentals` | `app/rentals/page.tsx` |
| `/service-repair` | `app/service-repair/page.tsx` |
| `/parts` | `app/parts/page.tsx` |
| `/about` | `app/about/page.tsx` |
| `/contact` | `app/contact/page.tsx` |

---

## Forms

Contact and quote forms use **Next.js Server Actions** (`app/contact/actions.ts`).

Currently: validated server-side → logged to console → success response returned.

### Hook in email delivery (Resend — recommended)

1. `npm install resend`
2. Add `RESEND_API_KEY=re_...` to `.env.local`
3. In `app/contact/actions.ts`, replace the comment block with:

```ts
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);
await resend.emails.send({
  from: "CTA Services <noreply@ctaservicesnc.com>",
  to: "ctaservices@outlook.com",
  subject: `[CTA] ${parsed.data.subject}`,
  text: JSON.stringify(parsed.data, null, 2),
});
```

4. Add `RESEND_API_KEY` to Vercel environment variables.

### Hook in email delivery (SMTP / Outlook)

```ts
import nodemailer from "nodemailer";
const transport = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
});
await transport.sendMail({ from: ..., to: "ctaservices@outlook.com", ... });
```

Env vars: `SMTP_USER`, `SMTP_PASS`.

---

## Deployment — Vercel

### First deploy

1. Push this repo to GitHub:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/cta-services-web.git
   git push -u origin main
   ```

2. Go to [vercel.com](https://vercel.com) → **Add New Project** → Import from GitHub.

3. Vercel detects Next.js automatically. No build command changes needed.

4. Click **Deploy**.

### Environment variables on Vercel

No env vars are required for the base site. If you add email:
- `RESEND_API_KEY` or `SMTP_USER` / `SMTP_PASS`

Add them under **Project → Settings → Environment Variables**.

### Build command (default — do not change)

```
npm run build
```

The `build` script runs `verify-client-data.py` first via `tsx scripts/verify-client-data.ts` which checks for forbidden URLs, then runs `next build`.

> **Note:** The Python verification script runs locally. On Vercel, Python is not available by default. Either run verification locally before push, or use the TypeScript version (`scripts/verify-client-data.ts`) by ensuring Node + tsx are available in the build environment.

### Update site URL

When you have a real domain, update `metadataBase` in `app/layout.tsx` and the `BASE` constant in `app/sitemap.ts` from `https://ctaservicesnc.com` to your actual domain.

---

## Image Replacement Workflow

1. Name your photo file descriptively (e.g. `husqvarna-pg510.jpg`).
2. Add it to the project root or `public/product-images/` directly.
3. If adding to root: add an override in `data/image-overrides.json`, then run `python3 scripts/match-local-images.py`.
4. If dropping directly into `public/product-images/`: name it `{slug}-1.jpg` (matching the product's slug exactly) — the product page will pick it up immediately.
5. Commit and push. Vercel will redeploy.

---

## Company Information (in code)

All company NAP (Name, Address, Phone) is centralized in `lib/company.ts`. Update there to change it everywhere.

```
lib/company.ts → COMPANY.legalName / phoneDisplay / email / fullAddress / telHref / mailtoHref
```
