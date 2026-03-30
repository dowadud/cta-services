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
    sitemap: "https://thectaservices.com/sitemap.xml",
    host: "https://thectaservices.com",
  };
}
