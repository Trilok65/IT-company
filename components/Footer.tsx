import Link from "next/link";
import { Facebook, Github, Instagram, Linkedin } from "lucide-react";

const companyLinks = [
  ["About Us", "/about"],
  ["Services", "/services"],
  ["Case Studies", "/case-studies"],
  ["Pricing", "/pricing"],
  ["Contact", "/contact"],
];

const serviceLinks = [
  ["Custom Software Development", "/services#software"],
  ["Technical Consulting", "/services#consulting"],
  ["UI/UX Design", "/services#design"],
  ["Quality Assurance", "/services#qa"],
];

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/nepalexportingit/", Icon: Instagram },
  { label: "LinkedIn", href: "https://www.linkedin.com/", Icon: Linkedin },
  { label: "Facebook", href: "https://www.facebook.com/", Icon: Facebook },
  { label: "GitHub", href: "https://github.com/orgs/NepalExportingIT", Icon: Github },
];

export default function Footer() {
  return (
    <footer className="bg-[#16352e] text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-10 gap-y-12 px-5 py-14 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:px-10 lg:py-16">
        <div>
          <Link href="/" className="inline-flex min-h-11 items-center gap-2.5 font-semibold">
            <span aria-hidden="true" className="flex h-9 w-9 items-center justify-center rounded-full bg-[#d7e85d] text-xs font-bold text-[#16352e]">NE</span>
            <span>Nepal Exporting IT</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-6 text-white/70">
            Bridging Nepal&apos;s tech talent with global businesses.
          </p>
          <div className="mt-5 flex flex-col items-start gap-2 text-sm text-white/80">
            <a className="min-h-11 inline-flex items-center hover:text-[#d7e85d]" href="mailto:hello@nepalexportingit.com">hello@nepalexportingit.com</a>
            <a className="min-h-11 inline-flex items-center hover:text-[#d7e85d]" href="tel:+9779823687080">+977-9823-687080 (Nepal)</a>
            <a className="min-h-11 inline-flex items-center hover:text-[#d7e85d]" href="tel:+9779741812578">+977-9741-812578 (Nepal)</a>
          </div>
          <div className="mt-4 flex gap-2">
            {socialLinks.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="inline-flex h-11 w-11 items-center justify-center text-white/75 transition-colors hover:bg-white/10 hover:text-[#d7e85d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d7e85d]"
              >
                <Icon aria-hidden="true" size={18} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-white">Company</h2>
          <ul className="mt-4 space-y-1">
            {companyLinks.map(([label, href]) => (
              <li key={href}><Link className="inline-flex min-h-10 items-center text-sm text-white/70 hover:text-white" href={href}>{label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-white">Services</h2>
          <ul className="mt-4 space-y-1">
            {serviceLinks.map(([label, href]) => (
              <li key={href}><Link className="inline-flex min-h-10 items-center text-sm text-white/70 hover:text-white" href={href}>{label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-white">Legal</h2>
          <ul className="mt-4 space-y-1">
            <li><Link className="inline-flex min-h-10 items-center text-sm text-white/70 hover:text-white" href="/privacy">Privacy Policy</Link></li>
            <li><Link className="inline-flex min-h-10 items-center text-sm text-white/70 hover:text-white" href="/terms">Terms &amp; Conditions</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-5 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
          <p>© 2026 Nepal Exporting IT. All rights reserved. Made in Kathmandu 🇳🇵</p>
          <div className="flex gap-5">
            <Link className="min-h-11 inline-flex items-center hover:text-white" href="/privacy">Privacy</Link>
            <Link className="min-h-11 inline-flex items-center hover:text-white" href="/terms">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}