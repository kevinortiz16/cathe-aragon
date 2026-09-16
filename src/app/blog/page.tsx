import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Post } from "@/types/post";

export const metadata = {
  title: "Blog | TATAKOA",
  description: "Guías de viaje, vida nómada, RV y camping.",
};

interface PageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function BlogPage({ searchParams }: PageProps) {
  const { q } = await searchParams;
  const supabase = await createClient();

  let query = supabase
    .from("posts")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (q) {
    query = query.or(`title.ilike.%${q}%,excerpt.ilike.%${q}%`);
  }

  const { data: posts, error } = await query;

  if (error) {
    console.error("Error fetching posts:", error);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <h1 className="text-4xl font-semibold mb-2">Blog</h1>
      <p className="text-tatakoa-charcoal/60 mb-12">
        {q
          ? `Resultados para "${q}"`
          : "Guías de viaje, tips para nómadas, RV y camping por todo USA."}
      </p>

      {(!posts || posts.length === 0) && (
        <p className="text-tatakoa-charcoal/50">
          {q ? "No se encontraron resultados." : "Aún no hay posts publicados."}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts?.map((post: Post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="group block rounded-2xl border border-black/5 overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="aspect-video bg-tatakoa-sand/10 flex items-center justify-center text-tatakoa-sand/40 text-sm">
              {post.cover_image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={post.cover_image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                "Sin imagen"
              )}
            </div>
            <div className="p-5">
              <span className="text-xs font-medium text-tatakoa-terracotta uppercase tracking-wide">
                {post.category}
              </span>
              <h2 className="text-lg font-semibold mt-2 group-hover:text-tatakoa-terracotta transition-colors">
                {post.title}
              </h2>
              <p className="text-sm text-tatakoa-charcoal/60 mt-2 line-clamp-2">
                {post.excerpt}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}