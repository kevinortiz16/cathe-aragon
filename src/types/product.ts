export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price_cents: number;
  currency: string;
  cover_image: string | null;
  file_path: string | null;
  file_format: string | null;
  product_type: "digital" | "physical";
  active: boolean;
  created_at: string;
  // Columnas opcionales (ver supabase/migrations/20261021_mejoras.sql)
  long_description?: string | null;
  preview_images?: string[] | null;
}