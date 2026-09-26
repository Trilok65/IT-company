import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing | Nepal Exporting IT",
  description:
    "Compare staff augmentation, dedicated team, and fixed-scope project engagement models from Nepal Exporting IT.",
};

const plans = [
  {
    title: "Staff augmentation",
    price: "From $3,500/mo",
    features: ["Vetted senior engineers", "Month-to-month flexibility", "Your tools, rituals, and process"],
  },
  {
    title: "Dedicated team",
    price: "From $8,000/mo",
    features: ["Weekly planning and demos", "Flexible team size", "Continuous product ownership"],
    featured: true,
  },
  {
    title: "Fixed-scope project",
    price: "From $5,000",
    features: ["Defined scope and milestones", "Weekly progress reporting", "90-day post-launch warranty"],
  },
];

export default function PricingPage() {
  return (
    <main>
      <section className="bg-[#f4f0e8] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6b746c]">Engagement models</p>
          <h1 className="mt-5 text-3xl font-medium leading-tight text-[#16352e] sm:text-4xl md:text-5xl lg:text-6xl">Choose your way to grow.</h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-[#59675e] sm:text-base">Start with what you need today. Scale as your business changes.</p>
        </div>
      </section>

      <section className="bg-[#fbfaf6] px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {plans.map(({ title, price, features, featured }) => (
            <article key={title} className={`relative flex min-w-0 flex-col border bg-white p-5 sm:p-7 ${featured ? "border-2 border-[#66834f]" : "border-[#d9ddd4]"}`}>
              {featured && <span className="absolute right-4 top-4 bg-[#e7eddb] px-2.5 py-1.5 text-xs font-semibold text-[#365b40]">Most popular</span>}
              <p className="pr-24 text-xs font-semibold uppercase tracking-wider text-[#6b746c]">Engagement model</p>
              <h2 className="mt-5 text-xl font-semibold leading-snug text-[#16352e]">{title}</h2>
              <p className="mt-3 font-serif text-3xl text-[#365b40]">{price}</p>
              <ul className="mt-6 flex-1 space-y-3 border-t border-[#d9ddd4] pt-5">
                {features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm leading-6 text-[#59675e]">
                    <Check aria-hidden="true" className="mt-1 shrink-0 text-[#66834f]" size={16} />{feature}
                  </li>
                ))}
              </ul>
              <Link href="/contact" className={`mt-7 inline-flex min-h-11 items-center justify-center gap-2 px-5 py-3 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16352e] ${featured ? "bg-[#16352e] text-white hover:bg-[#285344]" : "border border-[#aeb8ad] text-[#16352e] hover:bg-[#f4f0e8]"}`}>
                Discuss this model <ArrowRight aria-hidden="true" size={16} />
              </Link>
            </article>
          ))}
        </div>
        <div className="mx-auto mt-10 max-w-7xl border-t border-[#d9ddd4] pt-7 text-center">
          <p className="text-sm text-[#59675e]">Not sure which fits your project?</p>
          <a href="https://calendly.com/nepalexportingit" target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex min-h-11 items-center justify-center gap-2 text-sm font-semibold text-[#16352e] underline decoration-[#a7b69b] underline-offset-4 hover:decoration-[#16352e]">
            Book a free 20-min call <ArrowRight aria-hidden="true" size={16} />
          </a>
        </div>
      </section>
    </main>
  );
}