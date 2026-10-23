import Link from "next/link";
import { BLOG_POSTS } from "../../../data/blog";

export default function BlogIndexPage() {
  return (
    <div className="mx-auto max-w-720 px-6 py-12">
      <nav className="flex items-center gap-2 text-xs font-ui text-ink-muted mb-8">
        <Link href="/" className="text-accent hover:no-underline">
          Home
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-ink">Blog</span>
      </nav>

      <h1 className="font-reading mb-2">Blog</h1>
      <p className="text-[14px] font-ui text-ink-muted mb-10">
        Notes and short writing about past questions and exam preparation.
      </p>

      <div className="space-y-8">
        {BLOG_POSTS.map((post) => (
          <article key={post.slug} className="border-b border-rule pb-8 last:border-0 last:pb-0">
            <h2 className="mb-2">
              <Link
                href={`/blog/${post.slug}`}
                className="text-ink hover:text-accent underline underline-offset-3 hover:no-underline"
              >
                {post.title}
              </Link>
            </h2>
            <p className="mb-2 text-[13px] font-ui text-ink-muted">
              {post.date}
            </p>
            <p className="font-reading text-ink leading-[1.7]">
              {post.excerpt}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
