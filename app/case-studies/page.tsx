import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Case Studies | Nepal Exporting IT",
  description:
    "See measurable outcomes from software, logistics, and cloud projects delivered by Nepal Exporting IT.",
};

const studies = [
  {
    industry: "Fintech",
    title: "A faster path through onboarding",
    problem: "A regulated lender was losing qualified applicants during a fragmented KYC flow.",
    tags: ["Next.js", "AWS", "Python"],
    result: "42% higher completion rate and 2.1× faster verification",
  },
  {
    industry: "Logistics",
    title: "Dispatch without the spreadsheet",
    problem: "A regional operator needed one source of truth for drivers, routes, and live exceptions.",
    tags: ["Flutter", "Node.js", "PostgreSQL"],
    result: "50k DAU supported · 3.5 hours saved per dispatcher daily",
  },
  {
    industry: "B2B SaaS",
    title: "Infrastructure ready for demand",
    problem: "A growing SaaS product faced rising cloud spend and outages during every traffic spike.",
    tags: ["AWS", "Kubernetes", "Terraform"],
    result: "38% lower cloud spend · Zero-downtime failover",
  },
];

export default function CaseStudiesPage() {
  return (
    <main>
      <section className="bg-[#f4f0e8] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6b746c]">Selected work</p>
          <h1 className="mt-5 text-3xl font-medium text-[#16352e] sm:text-4xl md:text-5xl lg:text-6xl">Proof, not promises.</h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-[#59675e] sm:text-base">Real products. Real constraints. Measurable outcomes.</p>
        </div>
      </section>

      <section className="bg-[#fbfaf6] px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {studies.map(({ industry, title, problem, tags, result }, index) => (
            <article key={title} className="flex min-w-0 flex-col border border-[#d9ddd4] bg-white p-5 sm:p-6">
              <span className="inline-flex min-h-7 w-fit items-center bg-[#e7eddb] px-2.5 text-xs font-semibold text-[#365b40]">{industry}</span>
              <p className="mt-5 text-xs font-semibold text-[#82907d]">CASE 0{index + 1}</p>
              <h2 className="mt-2 text-xl font-semibold leading-snug text-[#16352e]">{title}</h2>
              <p className="mt-3 flex-1 text-sm leading-6 text-[#6b746c]">{problem}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {tags.map((tag) => <span key={tag} className="border border-[#d9ddd4] px-2.5 py-1.5 text-xs text-[#59675e]">{tag}</span>)}
              </div>
              <div className="mt-6 border-l-2 border-[#66834f] bg-[#f4f7f0] p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#6b746c]">Outcome</p>
                <p className="mt-2 text-sm font-semibold leading-6 text-[#365b40]">{result}</p>
              </div>
              <Link href="/contact" className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#16352e] underline decoration-[#a7b69b] underline-offset-4 hover:decoration-[#16352e]">
                Discuss a similar project <ArrowRight aria-hidden="true" size={16} />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="bg-[#16352e] px-5 py-12 text-white sm:px-8 sm:py-16 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-medium sm:text-3xl">Working on something similar?</h2>
          <Link href="/contact" className="inline-flex min-h-11 items-center justify-center gap-2 bg-[#d7e85d] px-5 py-3 text-sm font-semibold text-[#16352e] hover:bg-[#e2ef82] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
            Get a free quote <ArrowRight aria-hidden="true" size={17} />
          </Link>
        </div>
      </section>
    </main>
  );
}