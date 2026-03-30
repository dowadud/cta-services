import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/contact/actions"],
      },
    ],
    sitemap: "https://ctaservicesnc.com/sitemap.xml",
    host: "https://ctaservicesnc.com",
  };
}
