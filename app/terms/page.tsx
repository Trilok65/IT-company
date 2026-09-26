import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Nepal Exporting IT",
  description: "Read the terms that apply to use of the Nepal Exporting IT website and its information.",
};

const sections = [
  ["Acceptance of Terms", "By accessing this website, you agree to these terms. If you do not agree, please do not use the website."],
  ["Services We Provide", "Website content describes services that may include software development, technical consulting, design, and quality assurance. An inquiry does not create a service relationship; project scope and responsibilities are confirmed separately in a written agreement."],
  ["Payment & Billing", "Fees, billing schedules, expenses, and payment terms will be set out in the applicable project agreement. Work may be paused for overdue amounts as specified in that agreement."],
  ["Intellectual Property", "Unless a separate written agreement says otherwise, website content and branding belong to Nepal Exporting IT or their respective owners. Ownership and permitted use of project deliverables will be defined in the project agreement."],
  ["Confidentiality", "Each party should protect confidential information received from the other and use it only for the agreed business purpose. Any project-specific confidentiality obligations should be documented in a separate agreement."],
  ["Limitation of Liability", "This website is provided for general information on an as-available basis. To the extent allowed by law, Nepal Exporting IT is not liable for indirect or consequential loss arising from use of the website; signed project agreements govern service-related liability."],
  ["Governing Law", "These website terms are governed by the laws of Nepal, without regard to conflict-of-law principles. Any mandatory consumer or other protections that apply to you remain unaffected."],
  ["Contact Us", "Questions about these terms can be sent to hello@nepalexportingit.com."],
];

export default function TermsPage() {
  return (
    <main className="bg-[#fbfaf6] px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
      <article className="mx-auto max-w-[680px]">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6b746c]">Legal</p>
        <h1 className="mt-4 text-3xl font-medium text-[#16352e] sm:text-4xl md:text-5xl">Terms &amp; Conditions</h1>
        <p className="mt-3 text-xs text-[#87938b]">Last updated: January 2026</p>
        <div className="mt-9 space-y-7">
          {sections.map(([title, text]) => (
            <section key={title}>
              <h2 className="text-lg font-semibold text-[#16352e]">{title}</h2>
              {title === "Contact Us" ? (
                <p className="mt-2 text-sm leading-7 text-[#59675e]">Questions about these terms can be sent to <a className="underline decoration-[#a7b69b] underline-offset-4 hover:decoration-[#16352e]" href="mailto:hello@nepalexportingit.com">hello@nepalexportingit.com</a>.</p>
              ) : (
                <p className="mt-2 text-sm leading-7 text-[#59675e]">{text}</p>
              )}
            </section>
          ))}
        </div>
      </article>
    </main>
  );
}
