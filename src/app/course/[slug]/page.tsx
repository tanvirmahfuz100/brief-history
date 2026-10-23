import Link from "next/link";
import { notFound } from "next/navigation";
import { QuestionCard } from "@/components/question-card";
import { courseSlug } from "@/lib/slug";
import { QUESTIONS, SYLLABI } from "../../../../data/questions";

export function generateStaticParams() {
  return Array.from(
    new Set(QUESTIONS.map((q) => courseSlug(q.courseCode)))
  ).map((slug) => ({ slug }));
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = Object.entries(SYLLABI).find(
    ([code]) => courseSlug(code) === slug
  );

  if (!course) {
    notFound();
  }

  const [courseCode, syllabus] = course;
  const courseQuestions = QUESTIONS.filter((q) => q.courseCode === courseCode);

  return (
    <div className="mx-auto max-w-1120 px-6 py-12">
      <nav className="flex items-center gap-2 text-xs font-ui text-ink-muted mb-8">
        <a href="/browse" className="text-accent hover:no-underline">
          Browse
        </a>
        <span aria-hidden="true">/</span>
        <span className="text-ink">{courseCode.toUpperCase()}</span>
      </nav>

      <h1 className="font-reading mb-6">
        {courseCode.toUpperCase()} &mdash; {syllabus.title}
      </h1>

      <section className="mb-12">
        <h2 className="mb-4 text-[15px] font-ui text-ink-muted uppercase tracking-wider">
          Syllabus topics
        </h2>
        <ul className="space-y-3 font-reading text-ink leading-[1.7]">
          {syllabus.topics.map((topic) => (
            <li key={topic} className="list-disc pl-4">
              {topic}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="mb-6 text-[15px] font-ui text-ink-muted uppercase tracking-wider">
          Past questions ({courseQuestions.length})
        </h2>
        <div className="space-y-0">
          {courseQuestions.map((q) => (
            <QuestionCard key={q.id} {...q} />
          ))}
        </div>
      </section>
    </div>
  );
}
