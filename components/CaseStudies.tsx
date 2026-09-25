import { ImageIcon, ArrowUpRight, TrendingUp } from "lucide-react";

type CaseStudy = {
  title: string;
  tags: string[];
  problem: string;
  solution: string;
  metricValue: string;
  metricLabel: string;
};

const caseStudies: CaseStudy[] = [
  {
    title: "Fintech onboarding rebuild",
    tags: ["Next.js", "AWS", "Fintech"],
    problem: "Drop-off during KYC onboarding was costing the client ~30% of signups.",
    solution:
      "Rebuilt the flow as a single-page app with async document verification and step-level analytics.",
    metricValue: "+42%",
    metricLabel: "onboarding completion",
  },
  {
    title: "Logistics dispatch app",
    tags: ["Flutter", "Node", "Logistics"],
    problem: "Dispatchers relied on spreadsheets and phone calls to route drivers.",
    solution:
      "Shipped a cross-platform dispatch app with live GPS tracking and automated route assignment.",
    metricValue: "3.5 hrs",
    metricLabel: "saved per dispatcher, daily",
  },
  {
    title: "SaaS infrastructure overhaul",
    tags: ["AWS", "Kubernetes", "SaaS"],
    problem: "Rising AWS spend and repeated outages during traffic spikes.",
    solution:
      "Migrated to auto-scaling Kubernetes clusters with infrastructure-as-code and load-tested failover.",
    metricValue: "-38%",
    metricLabel: "monthly cloud spend",
  },
];

export default function CaseStudies() {
  return (
    <section id="work" className="border-b border-slate-800 bg-slate-900 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-xl">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-50">
              Featured work
            </h2>
            <p className="mt-4 text-slate-400">
              A few of the problems our teams have shipped their way out of.
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {caseStudies.map((cs) => (
            <article
              key={cs.title}
              className="flex flex-col overflow-hidden rounded-lg border border-slate-700 bg-slate-800/50"
            >
              {/* Screenshot placeholder */}
              <div className="flex aspect-[16/10] items-center justify-center border-b border-slate-700 bg-slate-900">
                <ImageIcon className="h-8 w-8 text-slate-700" />
              </div>

              <div className="flex flex-1 flex-col p-6">
                <div className="flex flex-wrap gap-2">
                  {cs.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded border border-slate-700 bg-slate-900 px-2 py-1 font-mono text-xs text-slate-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="mt-4 text-lg font-medium text-slate-50">{cs.title}</h3>

                <div className="mt-4 space-y-3 text-sm">
                  <p className="text-slate-400">
                    <span className="font-medium text-slate-300">Problem — </span>
                    {cs.problem}
                  </p>
                  <p className="text-slate-400">
                    <span className="font-medium text-slate-300">Solution — </span>
                    {cs.solution}
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-3 border-t border-slate-700 pt-5">
                  <TrendingUp className="h-4 w-4 text-cyan-400" />
                  <span className="font-mono text-xl text-cyan-400">{cs.metricValue}</span>
                  <span className="text-sm text-slate-400">{cs.metricLabel}</span>
                </div>

                <a
                  href="#"
                  className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-slate-300 hover:text-amber-400"
                >
                  Read the full case study
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
