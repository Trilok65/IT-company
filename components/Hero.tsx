import { ArrowRight, PlayCircle, Code2, Boxes, Server, Smartphone, Cloud } from "lucide-react";

const stack = [
  { name: "React", icon: Code2 },
  { name: "Next.js", icon: Boxes },
  { name: "Node", icon: Server },
  { name: "Flutter", icon: Smartphone },
  { name: "AWS", icon: Cloud },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-slate-800 bg-slate-900">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 pb-20 pt-24 lg:grid-cols-[1.1fr_0.9fr] lg:pt-32">
        {/* Copy column */}
        <div className="flex flex-col justify-center">
          <div className="mb-6 flex items-center gap-2 font-mono text-xs text-slate-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400" />
            </span>
            engineers online across 6 timezones
          </div>

          <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight text-slate-50 sm:text-5xl lg:text-6xl">
            Senior engineering,{" "}
            <span className="text-amber-400">without the Silicon Valley invoice.</span>
          </h1>

          <p className="mt-6 max-w-lg text-lg text-slate-400">
            We staff production-ready senior developers for startups and enterprises
            worldwide — overlapping your working hours, shipping in your stack, at a
            fraction of local hiring cost.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-md bg-amber-400 px-5 py-3 text-sm font-medium text-slate-900 transition-colors hover:bg-amber-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
            >
              Book a Discovery Call
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#work"
              className="inline-flex items-center gap-2 rounded-md border border-slate-700 px-5 py-3 text-sm font-medium text-slate-200 transition-colors hover:border-slate-500 hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
            >
              <PlayCircle className="h-4 w-4" />
              View Projects
            </a>
          </div>
        </div>

        {/* Visual column: simple stat panel, keeps hero grounded rather than decorative */}
        <div className="flex items-center">
          <div className="w-full rounded-lg border border-slate-700 bg-slate-800/50 p-6">
            <dl className="grid grid-cols-2 gap-6">
              {[
                ["40+", "engineers"],
                ["6", "time zones covered"],
                ["120+", "projects shipped"],
                ["4.9/5", "avg. client rating"],
              ].map(([value, label]) => (
                <div key={label}>
                  <dt className="font-mono text-2xl text-cyan-400">{value}</dt>
                  <dd className="mt-1 text-sm text-slate-400">{label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Floating tech stack ribbon */}
      <div className="relative border-t border-slate-800 bg-slate-950/60 py-4">
        <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex shrink-0 animate-[scroll_22s_linear_infinite] items-center gap-10 pr-10 motion-reduce:animate-none">
            {[...stack, ...stack].map(({ name, icon: Icon }, i) => (
              <div key={`${name}-${i}`} className="flex items-center gap-2 whitespace-nowrap">
                <Icon className="h-4 w-4 text-slate-500" />
                <span className="font-mono text-sm text-slate-400">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
