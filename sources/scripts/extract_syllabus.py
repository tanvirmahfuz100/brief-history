#!/usr/bin/env python3
import re
from pathlib import Path

ROOT = Path("/media/tanvir/Knowledge1/Questions")
TXT = ROOT / ".work" / "syllabus.txt"

SEMESTERS = [
    ("First Year First Semester", [
        ("1101", "Introduction to Financial Accounting", 3),
        ("1102", "Introduction to Business", 3),
        ("1103", "Business Communication and Report Writing", 3),
        ("1104", "Mathematics for Business Decisions-I", 3),
        ("1105", "History of the Emergence of Bangladesh", 4),
    ]),
    ("First Year Second Semester", [
        ("1201", "Intermediate Accounting", 3),
        ("1202", "Microeconomics", 3),
        ("1203", "Management", 3),
        ("1204", "Mathematics for Business Decisions-II", 3),
        ("1205", "Computer Concepts and Application", 2),
        ("1206", "Lab: Office Application", 2),
    ]),
    ("Second Year First Semester", [
        ("2101", "Advanced Financial Accounting-I", 3),
        ("2102", "Macroeconomics", 3),
        ("2103", "Business Statistics-I", 3),
        ("2104", "Business Laws", 3),
        ("2105", "Financial Management", 3),
    ]),
    ("Second Year Second Semester", [
        ("2201", "Advanced Financial Accounting-II", 3),
        ("2202", "Corporate Laws and Secretarial Practices", 3),
        ("2203", "Business Statistics-II", 3),
        ("2204", "Marketing", 3),
        ("2205", "Income Tax: Laws and Practice", 3),
        ("2206", "Lab: Programming and Database Management", 2),
    ]),
    ("Third Year First Semester", [
        ("3101", "Cost Accounting", 3),
        ("3102", "Corporate Finance", 3),
        ("3103", "Audit and Assurance", 3),
        ("3104", "Banking and Insurance", 3),
        ("3105", "VAT and Cross-Border Taxation", 3),
        ("3106", "Entrepreneurship and Business Development", 1),
    ]),
    ("Third Year Second Semester", [
        ("3201", "Management Accounting", 3),
        ("3202", "Corporate Reporting", 3),
        ("3203", "Forensic Accounting", 3),
        ("3204", "Organizational Behavior", 3),
        ("3205", "Accounting Information Systems", 2),
        ("3206", "Lab: Enterprise Resource Planning", 2),
    ]),
    ("Fourth Year First Semester", [
        ("4101", "Advanced Management Accounting", 3),
        ("4102", "Financial Market and Investment Analysis", 3),
        ("4103", "Public Sector and NGO Accounting", 3),
        ("4104", "Supply Chain and Operation Management", 3),
        ("4105", "IT Governance and Information System Audit", 3),
    ]),
    ("Fourth Year Second Semester", [
        ("4201", "Accounting Theory", 3),
        ("4202", "Business Analysis and Valuation", 3),
        ("4203", "Research Methodology", 3),
        ("4204", "Strategic Management", 3),
        ("4205", "Data Analytics", 2),
        ("4206", "Lab: Application of Data Analytic Tools", 2),
    ]),
]

FOOTER = "Curriculum of the Department of Accounting and Information Systems, University of Barishal"


def clean_block(s):
    lines = []
    for line in s.splitlines():
        t = line.strip()
        if not t:
            lines.append("")
            continue
        if t == FOOTER or re.fullmatch(r"\d{1,3}", t):
            continue
        lines.append(t)
    text = "\n".join(lines)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()


def section(body, labels):
    for lab in labels:
        m = re.search(re.escape(lab) + r"\s*", body, re.I)
        if m:
            return body[m.end():]
    return ""


def cut_at(body, labels):
    idx = len(body)
    for lab in labels:
        m = re.search(r"\n\s*" + re.escape(lab), body, re.I)
        if m and m.start() < idx:
            idx = m.start()
    return body[:idx]


def parse_courses(text):
    start = text.find("DETAILED SYLLABUS")
    body = text[start:]
    heads = list(re.finditer(r"(?m)^(\d{4})\s*:\s*(.+)$", body))
    courses = []
    for i, m in enumerate(heads):
        code = m.group(1)
        title = m.group(2).strip()
        end = heads[i + 1].start() if i + 1 < len(heads) else len(body)
        chunk = body[m.end():end]
        objectives = section(chunk, ["Course Objectives:", "Course Objective:", "Rationale of the Course:", "Rational of the Course:"])
        objectives = cut_at(objectives, ["Intended Learning Outcomes", "Course Learning Outcomes", "Detailed Course Contents"])
        ilos = section(chunk, ["Intended Learning Outcomes (ILOs):", "Intended Learning Outcomes (ILO):", "Course Learning Outcomes (CLO):", "Intended Learning Outcomes:"])
        ilos = cut_at(ilos, ["Detailed Course Contents", "Course Contents", "Mapping of CLOs"])
        contents = section(chunk, ["Detailed Course Contents:", "Course Contents:", "Course Contents"])
        contents = cut_at(contents, ["Recommended Textbooks:", "Reference Materials:", "References:", "Recommended Books:"])
        books = section(chunk, ["Recommended Textbooks:", "Reference Materials:", "References:", "Recommended Books:"])
        courses.append({
            "code": code, "title": title,
            "objectives": clean_block(objectives),
            "ilos": clean_block(ilos),
            "contents": clean_block(contents),
            "books": clean_block(books),
        })
    return courses


def main():
    text = TXT.read_text(encoding="utf-8", errors="replace")
    courses = parse_courses(text)
    by_code = {}
    for c in courses:
        by_code.setdefault(c["code"], []).append(c)

    out = []
    out.append("# AIS BBA Curriculum — 2022-23 (11th Batch) — Extracted Catalog\n")
    out.append("Source: `Syllabus` (128-page PDF, University of Barishal, Department of Accounting & Information Systems).")
    out.append("Effective from the 11th batch, session 2022-2023. Only the AIS curriculum section is used; the Management Studies program that also appears in Part C is excluded.\n")
    out.append("## Program facts\n")
    out.append("- Degree: BBA (Hons.) in Accounting and Information Systems, 4 years / 8 semesters.")
    out.append("- Total: 136 credits (127 course credits + 6 viva + 3 internship).")
    out.append("- Each course: 100 marks = 40 continuous assessment (attendance 5, tutorial/assignment 10, two midterms 20, class performance 5) + 60 semester final.")
    out.append("- Semester final: 3 hours, 60 marks; scripts double-examined, third examiner if >20% difference.")
    out.append("- Class hours: 45 per course (60 for 4-credit courses); 24-week semester (20 teaching + 1 prep + 3 exam).\n")
    out.append("## Semester-wise course map\n")
    out.append("| Semester | Code | Course | Credits |")
    out.append("|---|---|---|---:|")
    for sem, items in SEMESTERS:
        for code, title, cr in items:
            out.append(f"| {sem} | {code} | {title} | {cr} |")
    out.append("\n## Detailed course outlines\n")
    for sem, items in SEMESTERS:
        out.append(f"### {sem}\n")
        for code, title, cr in items:
            cands = by_code.get(code, [])
            c = None
            for cand in cands:
                if cand["title"].lower().replace("–", "-").replace("  ", " ") in title.lower() or title.lower() in cand["title"].lower():
                    c = cand
                    break
            if c is None and cands:
                c = cands[0]
            out.append(f"#### {code} — {title} ({cr} credits)\n")
            if not c:
                out.append("_No detailed outline printed in the source._\n")
                continue
            if c["objectives"]:
                out.append("**Course objectives.** " + " ".join(c["objectives"].split()) + "\n")
            if c["ilos"]:
                out.append("**Intended learning outcomes.**\n")
                out.append(c["ilos"] + "\n")
            if c["contents"]:
                out.append("**Detailed contents.**\n")
                out.append(c["contents"] + "\n")
            if c["books"]:
                out.append("**Textbooks / references.** " + " ".join(c["books"].split()) + "\n")
    (ROOT / "sources" / "syllabus_catalog.md").write_text("\n".join(out), encoding="utf-8")
    print("courses parsed:", len(courses))
    print("written sources/syllabus_catalog.md", len("\n".join(out)))


if __name__ == "__main__":
    main()
