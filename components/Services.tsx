import { Check, Globe2, Smartphone, Cloud, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Service = {
  icon: LucideIcon;
  title: string;
  summary: string;
  deliverables: string[];
  badges: string[];
};

const services: Service[] = [
  {
    icon: Globe2,
    title: "Web Application Development",
    summary: "Full-stack web products built and maintained by senior engineers.",
    deliverables: [
      "Production-grade frontend in React or Next.js",
      "API and database architecture built for scale",
      "CI/CD pipeline with automated testing",
      "Performance and accessibility audit before launch",
    ],
    badges: ["React", "Next.js", "TypeScript", "PostgreSQL"],
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    summary: "Cross-platform apps shipped to both app stores from one codebase.",
    deliverables: [
      "iOS and Android builds from a shared Flutter codebase",
      "Offline-first data sync and push notifications",
      "App Store and Play Store submission handled end-to-end",
      "Crash monitoring and release pipeline setup",
    ],
    badges: ["Flutter", "Dart", "Firebase", "Fastlane"],
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    summary: "Infrastructure that scales without a 2am page.",
    deliverables: [
      "AWS infrastructure provisioned as code",
      "Container orchestration and auto-scaling setup",
      "Monitoring, logging, and alerting stack",
      "Cost audit with a concrete reduction plan",
    ],
    badges: ["AWS", "Docker", "Terraform", "Kubernetes"],
  },
  {
    icon: Users,
    title: "Senior Staff Augmentation",
    summary: "Vetted senior engineers embedded directly in your team.",
    deliverables: [
      "Engineers pre-vetted for seniority, not just syntax",
      "Overlap with your working hours guaranteed in writing",
      "Direct Slack and standup access, no account-manager layer",
      "Swap or scale the team within a week's notice",
    ],
    badges: ["Node", "React", "Python", "Go"],
  },
];

export default function Services() {
  return (
    <section id="services" className="border-b border-slate-800 bg-slate-900 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-xl">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-50">
            What we deliver
          </h2>
          <p className="mt-4 text-slate-400">
            Four services, one standard: senior engineers who own outcomes, not tickets.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {services.map(({ icon: Icon, title, summary, deliverables, badges }) => (
            <div
              key={title}
              className="flex flex-col rounded-lg border border-slate-700 bg-slate-800/50 p-6"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-md border border-slate-700 bg-slate-900">
                <Icon className="h-5 w-5 text-amber-400" />
              </div>

              <h3 className="mt-5 text-lg font-medium text-slate-50">{title}</h3>
              <p className="mt-2 text-sm text-slate-400">{summary}</p>

              <ul className="mt-5 space-y-2.5">
                {deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-2 border-t border-slate-700 pt-5">
                {badges.map((badge) => (
                  <span
                    key={badge}
                    className="rounded border border-slate-700 bg-slate-900 px-2 py-1 font-mono text-xs text-slate-400"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
