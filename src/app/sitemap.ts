import { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";
import { SUB_BRANDS } from "@/lib/sub-brands";
import { CITY_SLUGS, normalizeCitySlug } from "@/lib/cities";
import { todayInSiteZone } from "@/lib/dates";
import { SITE_URL } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient();
  const baseUrl = SITE_URL;

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
    .gte("valid_until", todayInSiteZone());

  const now = new Date();
  const staticRoutes = [
    { url: baseUrl, lastModified: now },
    { url: `${baseUrl}/planes`, lastModified: now },
    { url: `${baseUrl}/blog`, lastModified: now },
    { url: `${baseUrl}/tienda`, lastModified: now },
    { url: `${baseUrl}/tienda/plantillas`, lastModified: now },
    { url: `${baseUrl}/tienda/productos`, lastModified: now },
    { url: `${baseUrl}/sobre-tatakoa`, lastModified: now },
    { url: `${baseUrl}/contacto`, lastModified: now },
  ];

  const cityRoutes = CITY_SLUGS.map((city) => ({
    url: `${baseUrl}/planes/${city}`,
    lastModified: now,
  }));

  const brandRoutes = SUB_BRANDS.map((brand) => ({
    url: `${baseUrl}/marcas/${brand.slug}`,
    lastModified: now,
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
    url: `${baseUrl}/planes/${normalizeCitySlug(plan.city)}/${plan.slug}`,
    lastModified: new Date(plan.created_at),
  }));

  return [
    ...staticRoutes,
    ...cityRoutes,
    ...brandRoutes,
    ...postRoutes,
    ...productRoutes,
    ...planRoutes,
  ];
}
