"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const links = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!headerRef.current?.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function isActive(href: string) {
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  }

  function closeMenu() {
    setIsMenuOpen(false);
  }

  function linkClasses(href: string) {
    return `relative min-h-11 inline-flex items-center text-sm font-medium transition-colors hover:text-[#16352e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#16352e] ${
      isActive(href)
        ? "text-[#16352e] after:absolute after:bottom-1 after:left-0 after:h-0.5 after:w-full after:bg-[#16352e]"
        : "text-[#59675e]"
    }`;
  }

  return (
    <header ref={headerRef} className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between gap-4 px-5 sm:px-8 lg:px-10">
        <Link
          href="/"
          onClick={closeMenu}
          className="inline-flex min-h-11 shrink-0 items-center gap-2.5 text-sm font-bold text-[#16352e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#16352e]"
        >
          <span aria-hidden="true" className="flex h-9 w-9 items-center justify-center rounded-full bg-[#d7e85d] text-xs font-bold">
            NE
          </span>
          <span>Nepal Exporting IT</span>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-3 md:flex lg:gap-5 xl:gap-7">
          {links.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              aria-current={isActive(href) ? "page" : undefined}
              className={linkClasses(href)}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex lg:gap-5">
          <Link
            href="/contact"
            className="inline-flex min-h-11 items-center justify-center bg-[#16352e] px-3 text-sm font-semibold text-white transition-colors hover:bg-[#285344] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16352e] lg:px-5"
          >
            Get a free quote
          </Link>
        </div>

        <button
          type="button"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMenuOpen((open) => !open)}
          className="inline-flex h-11 w-11 items-center justify-center text-[#16352e] transition-colors hover:bg-[#f4f0e8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16352e] md:hidden"
        >
          {isMenuOpen ? <X aria-hidden="true" size={22} /> : <Menu aria-hidden="true" size={22} />}
        </button>
      </div>

      <nav
        id="mobile-navigation"
        aria-label="Mobile navigation"
        className={`${isMenuOpen ? "block" : "hidden"} absolute left-0 right-0 top-full border-t border-[#d9ddd4] bg-white px-5 pb-5 pt-2 shadow-md md:hidden sm:px-8`}
      >
        <div className="mx-auto flex max-w-7xl flex-col">
          {links.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              aria-current={isActive(href) ? "page" : undefined}
              onClick={closeMenu}
              className={`flex min-h-12 items-center border-b border-[#edf0e9] text-sm font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#16352e] ${
                isActive(href) ? "text-[#16352e] underline decoration-2 underline-offset-4" : "text-[#59675e]"
              }`}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={closeMenu}
            className="mt-4 inline-flex min-h-11 items-center justify-center bg-[#16352e] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#285344] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16352e]"
          >
            Get a free quote
          </Link>
        </div>
      </nav>
    </header>
  );
}