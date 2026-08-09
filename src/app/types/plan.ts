export interface Plan {
  id: string;
  title: string;
  slug: string;
  city: string;
  description: string | null;
  content: string | null;
  cover_image: string | null;
  affiliate_link: string | null;
  valid_until: string;
  featured: boolean;
  published: boolean;
  created_at: string;
}