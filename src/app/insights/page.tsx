import Link from "next/link";
import { QUESTIONS, type QuestionType } from "../../../data/questions";

const TYPES: QuestionType[] = ["Theory", "Numerical", "MCQ", "Short"];

function countBy(
  questions: typeof QUESTIONS,
  key: "courseCode" | "teacher"
) {
  const map = new Map<string, Record<QuestionType, number>>();
  for (const q of questions) {
    const k = q[key];
    if (!map.has(k)) map.set(k, { Theory: 0, Numerical: 0, MCQ: 0, Short: 0 });
    map.get(k)![q.questionType] += 1;
  }
  return Array.from(map.entries()).sort((a, b) => a[0].localeCompare(b[0]));
}

export default function InsightsPage() {
  const byCourse = countBy(QUESTIONS, "courseCode");
  const byTeacher = countBy(QUESTIONS, "teacher");

  return (
    <div className="mx-auto max-w-1120 px-6 py-12">
      <nav className="flex items-center gap-2 text-xs font-ui text-ink-muted mb-8">
        <Link href="/" className="text-accent hover:no-underline">
          Home
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-ink">Insights</span>
      </nav>

      <h1 className="font-reading mb-2">Insights</h1>
      <p className="text-[14px] font-ui text-ink-muted mb-10">
        Simple tallies of past questions by course and teacher.
      </p>

      <section className="mb-14">
        <h2 className="mb-4 text-[15px] font-ui text-ink-muted uppercase tracking-wider">
          Questions by course &amp; type
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-[13px] font-ui">
            <thead>
              <tr className="border-b border-rule text-[11px] uppercase tracking-wider text-ink-muted">
                <th className="pb-3 text-ink font-semibold">Course</th>
                {TYPES.map((t) => (
                  <th key={t} className="pb-3 w-16 text-right">
                    {t}
                  </th>
                ))}
                <th className="pb-3 w-16 text-right text-ink font-semibold">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {byCourse.map(([course, counts]) => {
                const total = TYPES.reduce((s, t) => s + counts[t], 0);
                return (
                  <tr key={course} className="border-b border-rule last:border-0">
                    <td className="py-4 text-ink">{course.toUpperCase()}</td>
                    {TYPES.map((t) => (
                      <td key={t} className="py-4 text-right">
                        {counts[t] || "-"}
                      </td>
                    ))}
                    <td className="py-4 text-right text-ink font-semibold">
                      {total}
                    </td>
                  </tr>
                );
              })}
              <tr className="border-t border-rule text-ink font-semibold">
                <td className="py-4">All courses</td>
                {TYPES.map((t) => (
                  <td key={t} className="py-4 text-right">
                    {byCourse.reduce(
                      (s, [, c]) => s + (c[t] || 0),
                      0
                    ) || "-"}
                  </td>
                ))}
                <td className="py-4 text-right">
                  {byCourse.reduce((s, [, c]) => s + Object.values(c).reduce((a, b) => a + b, 0), 0)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-[15px] font-ui text-ink-muted uppercase tracking-wider">
          Questions by teacher &amp; type
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-[13px] font-ui">
            <thead>
              <tr className="border-b border-rule text-[11px] uppercase tracking-wider text-ink-muted">
                <th className="pb-3 text-ink font-semibold">Teacher</th>
                {TYPES.map((t) => (
                  <th key={t} className="pb-3 w-16 text-right">
                    {t}
                  </th>
                ))}
                <th className="pb-3 w-16 text-right text-ink font-semibold">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {byTeacher.map(([teacher, counts]) => {
                const total = TYPES.reduce((s, t) => s + counts[t], 0);
                return (
                  <tr key={teacher} className="border-b border-rule last:border-0">
                    <td className="py-4 text-ink">{teacher}</td>
                    {TYPES.map((t) => (
                      <td key={t} className="py-4 text-right">
                        {counts[t] || "-"}
                      </td>
                    ))}
                    <td className="py-4 text-right text-ink font-semibold">
                      {total}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
