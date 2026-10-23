import Link from "next/link";
import { PATHS } from "../../../../data/paths";
import PathView from "@/components/path-view";

export function generateStaticParams() {
  return PATHS.map((p) => ({ courseSlug: p.slug }));
}

export default async function PathPage({
  params,
}: {
  params: Promise<{ courseSlug: string }>;
}) {
  const { courseSlug: slug } = await params;
  const path = PATHS.find((p) => p.slug === slug);

  if (!path) {
    return (
      <div className="mx-auto max-w-720 px-6 py-24 text-center">
        <h1 className="font-reading text-ink">Path not found</h1>
        <Link
          href="/browse"
          className="inline-block mt-6 text-accent underline underline-offset-3 hover:no-underline"
        >
          Return to browse
        </Link>
      </div>
    );
  }

  return <PathView path={path} />;
}
