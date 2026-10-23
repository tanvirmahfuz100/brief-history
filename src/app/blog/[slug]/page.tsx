import Link from "next/link";
import { notFound } from "next/navigation";
import { ReadingSurface } from "@/components/reading-surface";
import { BLOG_POSTS } from "../../../../data/blog";

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const blocks = post.body.split("\n\n").filter(Boolean);

  return (
    <ReadingSurface
      title={post.title}
      backHref="/blog"
      courseSlug={`blog-${slug}`}
      totalQuestions={0}
    >
      {blocks.map((block, i) => {
        if (block.startsWith("# ")) {
          return (
            <h2 key={i} className="font-reading mb-4 text-ink">
              {block.slice(2)}
            </h2>
          );
        }
        if (block.startsWith("## ")) {
          return (
            <h3 key={i} className="font-reading mb-4 text-ink">
              {block.slice(3)}
            </h3>
          );
        }
        return (
          <p key={i} className="font-reading mb-6 text-ink leading-[1.7]">
            {block}
          </p>
        );
      })}
      <Link
        href="/blog"
        className="inline-block text-xs font-ui text-accent underline underline-offset-3 hover:no-underline"
      >
        ← Back to blog
      </Link>
    </ReadingSurface>
  );
}
