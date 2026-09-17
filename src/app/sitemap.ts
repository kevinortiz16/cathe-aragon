import { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";
import { SUB_BRANDS } from "@/lib/sub-brands";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient();
  const baseUrl = "https://tatakoa.co";
  const today = new Date().toISOString().split("T")[0];

  const { data: posts } = await supabase
    .from("posts")
    .select("slug, created_at")
    .eq("published", true);

  const { data: products } = await supabase
    .from("products")
    .select("slug, created_at")
    .eq("active", true);

  const { data: plans } = await supabase
    .from("plans")
    .select("city, slug, created_at")
    .eq("published", true)
    .gte("valid_until", today);

  const staticRoutes = [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/planes`, lastModified: new Date() },
    { url: `${baseUrl}/blog`, lastModified: new Date() },
    { url: `${baseUrl}/tienda`, lastModified: new Date() },
    { url: `${baseUrl}/tienda/plantillas`, lastModified: new Date() },
    { url: `${baseUrl}/tienda/productos`, lastModified: new Date() },
    { url: `${baseUrl}/sobre-tatakoa`, lastModified: new Date() },
    { url: `${baseUrl}/portafolio`, lastModified: new Date() },
    { url: `${baseUrl}/contacto`, lastModified: new Date() },
  ];

  const brandRoutes = SUB_BRANDS.map((brand) => ({
    url: `${baseUrl}/marcas/${brand.slug}`,
    lastModified: new Date(),
  }));

  const postRoutes = (posts ?? []).map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.created_at),
  }));

  const productRoutes = (products ?? []).map((product) => ({
    url: `${baseUrl}/tienda/${product.slug}`,
    lastModified: new Date(product.created_at),
  }));

  const planRoutes = (plans ?? []).map((plan) => ({
    url: `${baseUrl}/planes/${plan.city}/${plan.slug}`,
    lastModified: new Date(plan.created_at),
  }));

  return [...staticRoutes, ...brandRoutes, ...postRoutes, ...productRoutes, ...planRoutes];
}