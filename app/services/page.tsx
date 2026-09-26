import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "IT Services | Nepal Exporting IT",
  description:
    "Explore custom software development, technical consulting, UI/UX design, and quality assurance from Nepal Exporting IT.",
};

const services = [
  {
    id: "software",
    number: "01",
    title: "Custom Software Development",
    description: "Web and mobile applications designed, built, and deployed to meet your business goals.",
    includes: ["Websites and business apps", "Mobile from one codebase", "APIs, integrations, and deployment"],
    tags: ["React", "Next.js", "Flutter"],
    engagement: "Fixed or retainer",
  },
  {
    id: "consulting",
    number: "02",
    title: "Technical Consulting",
    description: "Strategic guidance on architecture, technology selection, scalability, and product planning.",
    includes: ["Architecture reviews", "Scalability and roadmap planning", "Practical technical direction"],
    tags: ["AWS", "Node.js", "PostgreSQL"],
    engagement: "Fixed scope",
  },
  {
    id: "design",
    number: "03",
    title: "UI/UX Design",
    description: "Modern, intuitive interfaces designed to improve user experience and engagement.",
    includes: ["User flows and wireframes", "High-fidelity interfaces", "Design systems and prototypes"],
    tags: ["Figma", "Research", "Design systems"],
    engagement: "Fixed scope",
  },
  {
    id: "qa",
    number: "04",
    title: "Quality Assurance",
    description: "Comprehensive testing and quality checks to ensure reliability, performance, and stability.",
    includes: ["Functional and regression testing", "Performance and accessibility checks", "Release confidence"],
    tags: ["QA", "Automation", "CI/CD"],
    engagement: "Fixed or retainer",
  },
];

const technologies = ["React", "Next.js", "Python", "AWS", "Flutter", "PostgreSQL", "TypeScript", "OpenAI", "Kubernetes", "Terraform"];

export default function ServicesPage() {
  return (
    <main>
      <section className="bg-[#f4f0e8] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6b746c]">Our services</p>
          <h1 className="mt-5 max-w-4xl text-3xl font-medium leading-tight text-[#16352e] sm:text-4xl md:text-5xl lg:text-6xl">Engineering for your next stage.</h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-[#59675e] sm:text-base">Senior-level delivery, clear ownership, and a working relationship built around your goals.</p>
        </div>
      </section>

      <div className="bg-[#fbfaf6]">
        {services.map((service, index) => (
          <section key={service.id} id={service.id} className={`scroll-mt-24 border-b border-[#d9ddd4] px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20 ${index % 2 === 1 ? "bg-[#f4f0e8]" : ""}`}>
            <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
              <div>
                <span className="font-serif text-4xl text-[#66834f]">{service.number}</span>
                <h2 className="mt-4 text-2xl font-medium leading-tight text-[#16352e] sm:text-3xl md:text-4xl">{service.title}</h2>
                <p className="mt-4 max-w-xl text-sm leading-7 text-[#59675e] sm:text-base">{service.description}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#16352e]">What&apos;s included</h3>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {service.includes.map((item) => (
                    <li key={item} className="flex min-w-0 items-start gap-3 text-sm leading-6 text-[#59675e]">
                      <Check aria-hidden="true" className="mt-1 shrink-0 text-[#66834f]" size={16} />{item}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap items-center gap-2">
                  {service.tags.map((tag) => <span key={tag} className="border border-[#d9ddd4] bg-white/70 px-2.5 py-1.5 text-xs text-[#59675e]">{tag}</span>)}
                  <span className="ml-1 border border-[#cad8c4] bg-[#e7eddb] px-2.5 py-1.5 text-xs font-medium text-[#365b40]">{service.engagement}</span>
                </div>
                <Link href="/contact" className="mt-7 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#16352e] underline decoration-[#a7b69b] underline-offset-4 hover:decoration-[#16352e]">
                  Discuss this service <ArrowRight aria-hidden="true" size={16} />
                </Link>
              </div>
            </div>
          </section>
        ))}
      </div>

      <section aria-label="Technology stack" className="w-full overflow-hidden border-y border-[#d9ddd4] bg-[#fbfaf6] py-5">
        <div className="tech-track" aria-hidden="true">
          {[...technologies, ...technologies].map((technology, index) => (
            <span key={`${technology}-${index}`} className="whitespace-nowrap">{technology}<span aria-hidden="true" className="ml-7 text-[#8e9c7e]">·</span></span>
          ))}
        </div>
        <p className="sr-only">Technologies: {technologies.join(", ")}</p>
      </section>

      <section className="bg-[#e7eddb] px-5 py-12 sm:px-8 sm:py-16 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6b746c]">Let&apos;s talk</p>
            <h2 className="mt-2 text-2xl font-medium text-[#16352e] sm:text-3xl">Have a project in mind?</h2>
          </div>
          <Link href="/contact" className="inline-flex min-h-11 items-center justify-center gap-2 bg-[#16352e] px-5 py-3 text-sm font-semibold text-white hover:bg-[#285344] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16352e]">
            Get a free quote <ArrowRight aria-hidden="true" size={17} />
          </Link>
        </div>
      </section>
    </main>
  );
}