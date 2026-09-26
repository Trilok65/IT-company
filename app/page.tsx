import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Cloud, Code2, Palette, Quote, ShieldCheck, Star } from "lucide-react";

export const metadata: Metadata = {
	title: "Nepal Exporting IT | Reliable Tech for Growing Businesses",
	description:
		"Nepal-based IT outsourcing. Custom software, cloud, and consulting delivered on time and on budget for companies worldwide.",
};

const services = [
	{
		icon: Code2,
		title: "Custom Software Development",
		description: "Web and mobile products built around your goals, users, and next stage of growth.",
		tags: ["React", "Next.js", "Flutter"],
	},
	{
		icon: Cloud,
		title: "Technical Consulting",
		description: "Practical architecture, cloud, and product guidance for confident decisions.",
		tags: ["AWS", "Node.js", "PostgreSQL"],
	},
	{
		icon: Palette,
		title: "UI/UX Design",
		description: "Clear user journeys and polished interfaces that make complex work feel simple.",
		tags: ["Figma", "Research", "Design systems"],
	},
	{
		icon: ShieldCheck,
		title: "Quality Assurance",
		description: "Thoughtful testing that catches issues early and builds release confidence.",
		tags: ["QA", "Automation", "CI/CD"],
	},
];

const testimonials = [
	{
		quote: "They shipped in three weeks what our previous agency quoted six months for. The senior-only staffing claim actually held up.",
		name: "Sarah Whitfield",
		role: "CTO, Fintech startup",
		initials: "SW",
	},
	{
		quote: "The weekly demos made our distributed team feel like one team. We always knew what was happening and why.",
		name: "Marcus Chen",
		role: "VP Engineering, Northstar",
		initials: "MC",
	},
	{
		quote: "Our AWS bill dropped 38% in the first month after their infrastructure review. The engagement paid for itself.",
		name: "Priya Nair",
		role: "Head of Product, Relay",
		initials: "PN",
	},
];

const processSteps = [
	["01", "Tell us what you need", "A short call or message is enough."],
	["02", "Get a clear proposal", "Scope, timeline, and price in plain language."],
	["03", "We build, you stay in the loop", "Regular updates and shared dashboards."],
	["04", "Ship and support", "Ongoing support is available after launch."],
];

export default function HomePage() {
	return (
		<main>
			<section className="overflow-hidden bg-[#f4f0e8]">
				<div className="mx-auto grid max-w-7xl gap-12 px-5 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-10 lg:py-28">
					<div>
						<p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6b746c]">IT Outsourcing · Kathmandu, Nepal</p>
						<h1 className="mt-5 max-w-3xl text-3xl font-medium leading-tight text-[#16352e] sm:text-4xl md:text-5xl lg:text-6xl">
							Reliable tech for growing businesses.
						</h1>
						<p className="mt-6 max-w-2xl text-sm leading-7 text-[#59675e] sm:text-base">
							We design, build, and support digital products for companies worldwide — with clear communication from the first conversation to launch.
						</p>
						<div className="mt-8 flex flex-col gap-3 sm:flex-row">
							<Link href="/contact" className="inline-flex min-h-11 items-center justify-center gap-2 bg-[#16352e] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#285344] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16352e]">
								Get a free quote <ArrowRight aria-hidden="true" size={17} />
							</Link>
							<Link href="/case-studies" className="inline-flex min-h-11 items-center justify-center gap-2 border border-[#aeb8ad] px-5 py-3 text-sm font-semibold text-[#16352e] transition-colors hover:bg-white/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16352e]">
								See our work <ArrowRight aria-hidden="true" size={17} />
							</Link>
						</div>
						<p className="mt-7 text-sm text-[#6b746c]">Trusted by teams at Relay, Northstar, and 12+ companies</p>
					</div>
					<div className="grid grid-cols-2 gap-3 sm:gap-4">
						<div className="col-span-2 border border-[#d9ddd4] bg-[#fbfaf6] p-5 sm:p-7">
							<span className="text-xs font-semibold uppercase tracking-wider text-[#6b746c]">Built around outcomes</span>
							<p className="mt-4 max-w-md font-serif text-2xl leading-snug text-[#16352e] sm:text-3xl">One accountable team, from the first brief to what comes next.</p>
						</div>
						<div className="min-w-0 bg-[#cad8c4] p-5 sm:p-7">
							<span className="font-serif text-4xl text-[#16352e] sm:text-5xl">12+</span>
							<p className="mt-2 text-xs leading-5 text-[#46584d] sm:text-sm">Teams supported worldwide</p>
						</div>
						<div className="min-w-0 bg-[#d7e85d] p-5 sm:p-7">
							<span className="font-serif text-4xl text-[#16352e] sm:text-5xl">1 day</span>
							<p className="mt-2 text-xs leading-5 text-[#46584d] sm:text-sm">Proposal response target</p>
						</div>
					</div>
				</div>
			</section>

			<section aria-label="Client results" className="border-b border-[#d9ddd4] bg-[#fbfaf6]">
				<div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-[#d9ddd4] px-5 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-8 lg:px-10">
					{[
						["42%", "Avg. completion rate lift · Fintech client"],
						["50k+", "Daily active users supported · Logistics client"],
						["38%", "Avg. cloud cost reduction · SaaS client"],
					].map(([value, label]) => (
						<div key={value} className="py-6 sm:px-6 sm:py-8 first:sm:pl-0 last:sm:pr-0">
							<p className="font-serif text-4xl text-[#526d42] sm:text-5xl">{value}</p>
							<p className="mt-2 text-sm leading-6 text-[#6b746c]">{label}</p>
						</div>
					))}
				</div>
			</section>

			<section className="bg-[#fbfaf6] py-16 sm:py-20 lg:py-24">
				<div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
					<div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
						<div>
							<p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6b746c]">What we do</p>
							<h2 className="mt-3 text-2xl font-medium text-[#16352e] sm:text-3xl md:text-4xl">What we build</h2>
						</div>
						<Link href="/services" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#16352e] underline decoration-[#a7b69b] underline-offset-4 hover:decoration-[#16352e]">
							See all services <ArrowRight aria-hidden="true" size={16} />
						</Link>
					</div>
					<div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6">
						{services.map(({ icon: Icon, title, description, tags }, index) => (
							<article key={title} className="min-w-0 border border-[#d9ddd4] bg-white p-5 sm:p-7">
								<div className="flex h-11 w-11 items-center justify-center bg-[#e7eddb] text-[#365b40]">
									<Icon aria-hidden="true" size={21} />
								</div>
								<p className="mt-5 text-xs font-semibold text-[#7e897d]">0{index + 1}</p>
								<h3 className="mt-2 text-lg font-semibold text-[#16352e] sm:text-xl">{title}</h3>
								<p className="mt-3 max-w-xl text-sm leading-6 text-[#6b746c]">{description}</p>
								<div className="mt-5 flex flex-wrap gap-2">
									{tags.map((tag) => <span key={tag} className="border border-[#d9ddd4] px-2.5 py-1.5 text-xs text-[#59675e]">{tag}</span>)}
								</div>
							</article>
						))}
					</div>
				</div>
			</section>

			<section className="bg-[#e7eddb] py-16 sm:py-20 lg:py-24">
				<div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
					<div className="max-w-2xl">
						<p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6b746c]">Client voices</p>
						<h2 className="mt-3 text-2xl font-medium text-[#16352e] sm:text-3xl md:text-4xl">Good work gets talked about.</h2>
					</div>
					<div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
						{testimonials.map(({ quote, name, role, initials }) => (
							<figure key={name} className="flex min-w-0 flex-col border border-[#cad5c8] bg-white/70 p-5 sm:p-6">
								<div aria-label="5 out of 5 stars" className="flex gap-1 text-[#a27739]">
									{Array.from({ length: 5 }, (_, index) => <Star key={index} aria-hidden="true" size={15} fill="currentColor" />)}
								</div>
								<Quote aria-hidden="true" className="mt-5 text-[#72905f]" size={21} />
								<blockquote className="mt-3 flex-1 text-sm leading-7 text-[#34483c]">“{quote}”</blockquote>
								<figcaption className="mt-6 flex items-center gap-3 border-t border-[#d9ddd4] pt-4">
									<span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#16352e] text-xs font-semibold text-[#d7e85d]">{initials}</span>
									<span className="min-w-0"><span className="block text-sm font-semibold text-[#16352e]">{name}</span><span className="mt-1 block text-xs leading-5 text-[#6b746c]">{role}</span></span>
								</figcaption>
							</figure>
						))}
					</div>
				</div>
			</section>

			<section className="bg-[#fbfaf6] py-16 sm:py-20 lg:py-24">
				<div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
					<p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6b746c]">How we work</p>
					<h2 className="mt-3 text-2xl font-medium text-[#16352e] sm:text-3xl md:text-4xl">A clear path from brief to launch.</h2>
					<ol className="mt-9 grid grid-cols-1 border-t border-[#cbd3c7] sm:grid-cols-2 lg:grid-cols-4">
						{processSteps.map(([number, title, description]) => (
							<li key={number} className="min-w-0 border-b border-[#cbd3c7] py-5 sm:border-r sm:px-5 sm:first:pl-0 lg:border-b-0 lg:first:pl-0 lg:last:border-r-0">
								<span className="font-serif text-3xl text-[#66834f]">{number}</span>
								<h3 className="mt-4 text-base font-semibold leading-6 text-[#16352e]">{title}</h3>
								<p className="mt-2 text-sm leading-6 text-[#6b746c]">{description}</p>
							</li>
						))}
					</ol>
				</div>
			</section>

			<section className="bg-[#16352e] px-5 py-14 text-white sm:px-8 sm:py-16 lg:px-10">
				<div className="mx-auto flex max-w-7xl flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
					<div>
						<h2 className="text-2xl font-medium sm:text-3xl md:text-4xl">Ready to build something?</h2>
						<p className="mt-3 text-sm leading-6 text-white/70 sm:text-base">Clear proposal within one business day. No commitment required.</p>
					</div>
					<div className="flex flex-col gap-3 sm:min-w-56">
						<Link href="/contact" className="inline-flex min-h-11 items-center justify-center gap-2 bg-[#d7e85d] px-5 py-3 text-sm font-semibold text-[#16352e] hover:bg-[#e2ef82] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
							Get a free quote <ArrowRight aria-hidden="true" size={17} />
						</Link>
						<a href="https://calendly.com/nepalexportingit" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center gap-2 border border-white/35 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
							Pick a time on Calendly <ArrowRight aria-hidden="true" size={17} />
						</a>
					</div>
				</div>
			</section>
		</main>
	);
}
