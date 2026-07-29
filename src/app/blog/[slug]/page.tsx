import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!post) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-16">
      <span className="text-xs font-medium text-primary uppercase tracking-wide">
        {post.category}
      </span>
      <h1 className="text-4xl font-semibold mt-2 mb-4">{post.title}</h1>
      <p className="text-dark/50 text-sm mb-8">
        {new Date(post.created_at).toLocaleDateString("es-MX", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>

      {post.cover_image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.cover_image}
          alt={post.title}
          className="w-full rounded-2xl mb-8"
        />
      )}

      <div className="prose max-w-none">
        <p>{post.content}</p>
      </div>
    </article>
  );
}