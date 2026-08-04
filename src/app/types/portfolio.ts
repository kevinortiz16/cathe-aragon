export interface PortfolioItem {
  id: string;
  brand_name: string;
  title: string;
  description: string | null;
  cover_image: string | null;
  metric_label: string | null;
  metric_value: string | null;
  external_link: string | null;
  featured: boolean;
  published: boolean;
  created_at: string;
}