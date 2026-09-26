import type { Metadata } from "next";
import { Facebook, Github, Instagram, Linkedin } from "lucide-react";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact | Nepal Exporting IT",
  description:
    "Tell Nepal Exporting IT about your project. We respond within one business day with a clear proposal.",
};

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/nepalexportingit/", Icon: Instagram },
  { label: "LinkedIn", href: "https://www.linkedin.com/", Icon: Linkedin },
  { label: "Facebook", href: "https://www.facebook.com/", Icon: Facebook },
  { label: "GitHub", href: "https://github.com/orgs/NepalExportingIT", Icon: Github },
];

export default function ContactPage() {
  return (
    <main className="bg-[#f4f0e8] px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <section className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6b746c]">Contact</p>
          <h1 className="mt-4 text-3xl font-medium text-[#16352e] sm:text-4xl md:text-5xl">Let&apos;s build something.</h1>
          <p className="mt-4 text-sm leading-7 text-[#59675e] sm:text-base">We&apos;ll respond within one business day with a clear proposal.</p>
          <div className="mt-8 border border-[#d9ddd4] bg-white p-5 sm:p-7">
            <ContactForm />
          </div>
        </section>

        <aside className="min-w-0 lg:pt-14">
          <div className="border-t border-[#bfc9bb] py-6">
            <h2 className="text-sm font-semibold text-[#16352e]">Email</h2>
            <a href="mailto:hello@nepalexportingit.com" className="mt-2 inline-flex min-h-11 items-center text-sm text-[#365b40] underline decoration-[#a7b69b] underline-offset-4 hover:decoration-[#16352e]">hello@nepalexportingit.com</a>
          </div>
          <div className="border-t border-[#bfc9bb] py-6">
            <h2 className="text-sm font-semibold text-[#16352e]">Phone</h2>
            <div className="mt-2 flex flex-col items-start">
              <a href="tel:+9779823687080" className="inline-flex min-h-11 items-center text-sm text-[#365b40]">+977-9823-687080 (Nepal)</a>
              <a href="tel:+9779741812578" className="inline-flex min-h-11 items-center text-sm text-[#365b40]">+977-9741-812578 (Nepal)</a>
            </div>
          </div>
          <div className="border-t border-[#bfc9bb] py-6">
            <a href="https://calendly.com/nepalexportingit" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#16352e] underline decoration-[#a7b69b] underline-offset-4 hover:decoration-[#16352e]">Or pick a time directly <span aria-hidden="true">→</span></a>
          </div>
          <div className="border-t border-[#bfc9bb] py-6">
            <h2 className="text-sm font-semibold text-[#16352e]">Follow along</h2>
            <div className="mt-3 flex gap-2">
              {socialLinks.map(({ label, href, Icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="inline-flex h-11 w-11 items-center justify-center border border-[#cbd3c8] text-[#365b40] hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#16352e]">
                  <Icon aria-hidden="true" size={18} />
                </a>
              ))}
            </div>
          </div>
          <p className="border-t border-[#bfc9bb] pt-6 text-sm leading-6 text-[#6b746c]">We respond to every inquiry within one business day, Monday to Friday.</p>
        </aside>
      </div>
    </main>
  );
}