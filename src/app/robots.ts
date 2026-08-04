import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/cuenta/", "/api/"],
    },
    sitemap: "https://cathearagon.com/sitemap.xml",
  };
}