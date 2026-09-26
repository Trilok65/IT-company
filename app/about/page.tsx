import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Linkedin } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Nepal Exporting IT",
  description:
    "Meet Nepal Exporting IT: a Kathmandu-based team connecting Nepal's engineering talent with global businesses.",
};

const reasons = [
  {
    title: "Nepal-based, globally delivered",
    description: "Competitive rates, strong English communication, and timezone overlap with Asia and Europe.",
  },
  {
    title: "Accountability at every step",
    description: "You always know who owns what, what has been done, and what comes next.",
  },
  {
    title: "Works inside your existing stack",
    description: "We join your Slack, use your Jira, and adapt. You do not rebuild your workflow around us.",
  },
  {
    title: "Fixed-scope or ongoing retainer",
    description: "One-time builds, feature sprints, or long-term product support, structured around your needs.",
  },
];

export default function AboutPage() {
  return (
    <main>
      <section className="bg-[#f4f0e8] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6b746c]">About Nepal Exporting IT</p>
          <h1 className="mt-5 max-w-4xl text-3xl font-medium leading-tight text-[#16352e] sm:text-4xl md:text-5xl lg:text-6xl">
            The outsourcing agency that doesn&apos;t feel like one.
          </h1>
          <p className="mt-6 max-w-2xl text-sm leading-7 text-[#59675e] sm:text-base">
            We bridge Nepal&apos;s deep engineering talent with global businesses that need reliable, senior-level delivery.
          </p>
        </div>
      </section>

      <section className="bg-[#fbfaf6] px-5 py-14 sm:px-8 sm:py-20 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.55fr_1fr] lg:gap-20">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6b746c]">Our mission</p>
          <p className="max-w-3xl font-serif text-2xl leading-relaxed text-[#16352e] sm:text-3xl">
            Nepal Exporting IT was founded to prove that outsourcing doesn&apos;t have to mean slow communication, missed deadlines, or mystery teams. We work as an extension of your company — in your Slack, using your tools, accountable to your goals.
          </p>
        </div>
      </section>

      <section className="bg-[#e7eddb] px-5 py-14 sm:px-8 sm:py-20 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6b746c]">The people behind the work</p>
          <h2 className="mt-3 text-2xl font-medium text-[#16352e] sm:text-3xl md:text-4xl">Meet the team</h2>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {[1, 2, 3].map((member) => (
              <article key={member} className="min-w-0 border border-[#cad5c8] bg-white/70 p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#16352e] text-sm font-semibold text-[#d7e85d]" aria-hidden="true">YN</div>
                  <Link href="#" aria-label="LinkedIn profile" className="inline-flex h-11 w-11 items-center justify-center text-[#365b40] hover:bg-[#e7eddb] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#16352e]">
                    <Linkedin aria-hidden="true" size={19} />
                  </Link>
                </div>
                <h3 className="mt-5 text-lg font-semibold text-[#16352e]">Your Name Here</h3>
                <p className="mt-1 text-sm text-[#6b746c]">Co-Founder &amp; CEO</p>
                <p className="mt-4 text-sm leading-6 text-[#59675e]">10+ years building products for global clients.</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fbfaf6] px-5 py-14 sm:px-8 sm:py-20 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6b746c]">Why teams work with us</p>
          <div className="mt-8 grid grid-cols-1 gap-0 sm:grid-cols-2">
            {reasons.map(({ title, description }, index) => (
              <article key={title} className={`min-w-0 border-t border-[#d9ddd4] py-6 sm:px-6 sm:first:pl-0 ${index % 2 === 0 ? "sm:border-r" : ""} ${index < 2 ? "sm:pb-8" : ""}`}>
                <span className="font-serif text-3xl text-[#66834f]">0{index + 1}</span>
                <h2 className="mt-3 text-lg font-semibold text-[#16352e]">{title}</h2>
                <p className="mt-2 max-w-md text-sm leading-6 text-[#6b746c]">{description}</p>
              </article>
            ))}
          </div>
          <Link href="/contact" className="mt-8 inline-flex min-h-11 items-center justify-center gap-2 bg-[#16352e] px-5 py-3 text-sm font-semibold text-white hover:bg-[#285344] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16352e]">
            Get a free quote <ArrowRight aria-hidden="true" size={17} />
          </Link>
        </div>
      </section>
    </main>
  );
}