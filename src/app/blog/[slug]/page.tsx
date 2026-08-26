import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ReactMarkdown from "react-markdown";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: post } = await supabase
    .from("posts")
    .select("title, excerpt, cover_image")
    .eq("slug", slug)
    .single();

  if (!post) return {};

  return {
    title: `${post.title} | Cathe Aragon`,
    description: post.excerpt ?? undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt ?? undefined,
      images: post.cover_image ? [post.cover_image] : undefined,
    },
  };
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
      <div className="bg-secondary/5">
        <article className="mx-auto max-w-3xl px-4 py-16">
          {/* todo el contenido existente del artículo se queda igual aquí adentro */}
      <span className="text-xs font-medium text-primary uppercase tracking-wide">
        {post.category}
      </span>
      <h1 className="text-4xl font-semibold mt-2 mb-4">{post.title}</h1>

      <div className="flex items-center gap-3 mb-8">
        <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 bg-secondary/10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/kevin_blog.png "
            alt="Kevin Ortiz"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="text-sm font-medium text-dark">Kevin Ortiz</p>
          <p className="text-xs text-dark/50">
            {new Date(post.created_at).toLocaleDateString("es-MX", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      {post.cover_image && (
        <div className="mb-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.cover_image}
            alt={post.title}
            className="w-full rounded-2xl"
      />
          <p className="text-xs text-dark/40 italic mt-2 text-align-right">
            Fotografía by Ureflect
          </p>
        </div>
      )}

      <div className="prose max-w-none prose-headings:font-semibold prose-a:text-primary">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
    </article>
  </div>
  );
}