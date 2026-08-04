import { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient();
  const baseUrl = "https://cathearagon.com";

  const { data: posts } = await supabase
    .from("posts")
    .select("slug, created_at")
    .eq("published", true);

  const { data: products } = await supabase
    .from("products")
    .select("slug, created_at")
    .eq("active", true);

  const staticRoutes = [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/blog`, lastModified: new Date() },
    { url: `${baseUrl}/tienda`, lastModified: new Date() },
    { url: `${baseUrl}/portafolio`, lastModified: new Date() },
    { url: `${baseUrl}/contacto`, lastModified: new Date() },
  ];

  const postRoutes = (posts ?? []).map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.created_at),
  }));

  const productRoutes = (products ?? []).map((product) => ({
    url: `${baseUrl}/tienda/${product.slug}`,
    lastModified: new Date(product.created_at),
  }));

  return [...staticRoutes, ...postRoutes, ...productRoutes];
}