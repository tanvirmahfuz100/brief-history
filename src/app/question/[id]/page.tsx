import Link from "next/link";
import { courseSlug } from "@/lib/slug";
import { QUESTIONS } from "../../../../data/questions";
import QuestionView from "@/components/question-view";

export function generateStaticParams() {
  return QUESTIONS.map((q) => ({ id: q.id }));
}

export default async function QuestionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const question = QUESTIONS.find((q) => q.id === id);

  if (!question) {
    return (
      <div className="mx-auto max-w-720 px-6 py-24 text-center">
        <h1 className="font-reading text-ink">Question not found</h1>
        <p className="mt-4 text-[15px] font-ui text-ink-muted">
          The requested question does not exist in the archive.
        </p>
        <Link
          href="/browse"
          className="inline-block mt-6 text-accent underline underline-offset-3 hover:no-underline"
        >
          Return to browse
        </Link>
      </div>
    );
  }

  return <QuestionView question={question} />;
}
