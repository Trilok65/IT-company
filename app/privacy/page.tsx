import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Nepal Exporting IT",
  description: "Read how Nepal Exporting IT collects, uses, and protects information submitted through this website.",
};

const sections = [
  ["Information We Collect", "When you contact us, we may collect your name, work email, company name, project type, budget range, and message. Basic technical information may also be received by the services used to host and protect this website."],
  ["How We Use Your Information", "We use inquiry details to respond to you, assess project fit, and prepare proposals. We do not sell your personal information or use it for unrelated advertising."],
  ["Data Storage & Security", "Inquiry information is retained only as reasonably needed to manage your request and business records. We use reasonable safeguards, but no internet transmission or storage method can be guaranteed completely secure."],
  ["Third-Party Services", "This website may rely on hosting, security, and form-processing providers to operate and deliver your inquiry. Those providers process information under their own terms and privacy practices."],
  ["Cookies", "The website may use essential technical storage needed for its operation. If analytics or other non-essential cookies are introduced, this policy will be updated and any required consent will be requested."],
  ["Your Rights", "You may request access to, correction of, or deletion of personal information you have provided, subject to applicable legal requirements. Contact us using the address below and include enough detail for us to locate your inquiry."],
  ["Contact Us", "For privacy questions or requests, email hello@nepalexportingit.com."],
];

export default function PrivacyPage() {
  return (
    <main className="bg-[#fbfaf6] px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
      <article className="mx-auto max-w-[680px]">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6b746c]">Legal</p>
        <h1 className="mt-4 text-3xl font-medium text-[#16352e] sm:text-4xl md:text-5xl">Privacy Policy</h1>
        <p className="mt-3 text-xs text-[#87938b]">Last updated: January 2026</p>
        <div className="mt-9 space-y-7">
          {sections.map(([title, text]) => (
            <section key={title}>
              <h2 className="text-lg font-semibold text-[#16352e]">{title}</h2>
              {title === "Contact Us" ? (
                <p className="mt-2 text-sm leading-7 text-[#59675e]">For privacy questions or requests, email <a className="underline decoration-[#a7b69b] underline-offset-4 hover:decoration-[#16352e]" href="mailto:hello@nepalexportingit.com">hello@nepalexportingit.com</a>.</p>
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
