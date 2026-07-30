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
  active: boolean;
  created_at: string;
}