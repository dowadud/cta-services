import { z } from "zod";

/** Raw research output from scraper (may include sourceUrl; not shipped to client). */
export const scrapedProductSchema = z.object({
  id: z.number(),
  slug: z.string(),
  name: z.string(),
  category: z.string(),
  shortDescription: z.string(),
  longDescription: z.string(),
  specs: z.record(z.string(), z.string()),
  price: z
    .object({
      amount: z.number(),
      currency: z.string(),
      display: z.string(),
    })
    .nullable(),
  sourceUrl: z.string().url(),
});

export type ScrapedProduct = z.infer<typeof scrapedProductSchema>;

const productImageSchema = z.object({
  src: z.string(),
  alt: z.string(),
});

/** Client-safe catalog entry (no competitor URLs). */
export const clientProductSchema = z.object({
  id: z.number(),
  slug: z.string(),
  name: z.string(),
  category: z.string(),
  shortDescription: z.string(),
  longDescription: z.string(),
  specs: z.record(z.string(), z.string()),
  price: z
    .object({
      amount: z.number(),
      currency: z.string(),
      display: z.string(),
    })
    .nullable(),
  images: z.array(productImageSchema),
  imageStatus: z.enum(["matched", "placeholder"]),
});

export type ClientProduct = z.infer<typeof clientProductSchema>;

export const clientCatalogSchema = z.array(clientProductSchema);
