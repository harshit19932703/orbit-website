"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || mobileMenuOpen
          ? "bg-black/80 backdrop-blur-2xl border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">O</span>
            </div>
            <span className="text-lg font-semibold text-white">Orbit</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/features"
              className={`text-sm transition-colors ${
                pathname === "/features" ? "text-white" : "text-[#a1a1aa] hover:text-white"
              }`}
            >
              Features
            </Link>
            <Link
              href="/pricing"
              className={`text-sm transition-colors ${
                pathname === "/pricing" ? "text-white" : "text-[#a1a1aa] hover:text-white"
              }`}
            >
              Pricing
            </Link>
            <Link
              href="/docs"
              className={`text-sm transition-colors ${
                pathname === "/docs" ? "text-white" : "text-[#a1a1aa] hover:text-white"
              }`}
            >
              Docs
            </Link>
            <Link
              href="/blog"
              className={`text-sm transition-colors ${
                pathname?.startsWith("/blog") ? "text-white" : "text-[#a1a1aa] hover:text-white"
              }`}
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className={`text-sm transition-colors ${
                pathname === "/contact" ? "text-white" : "text-[#a1a1aa] hover:text-white"
              }`}
            >
              Contact
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="https://app.withorbit.io/signup"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm"
            >
              Get started free
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/[0.08]">
            <div className="flex flex-col space-y-4">
              <Link
                href="/features"
                className={`text-sm transition-colors ${
                  pathname === "/features" ? "text-white" : "text-[#a1a1aa] hover:text-white"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href="/pricing"
                className={`text-sm transition-colors ${
                  pathname === "/pricing" ? "text-white" : "text-[#a1a1aa] hover:text-white"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="/docs"
                className={`text-sm transition-colors ${
                  pathname === "/docs" ? "text-white" : "text-[#a1a1aa] hover:text-white"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Docs
              </Link>
              <Link
                href="/blog"
                className={`text-sm transition-colors ${
                  pathname?.startsWith("/blog") ? "text-white" : "text-[#a1a1aa] hover:text-white"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="/contact"
                className={`text-sm transition-colors ${
                  pathname === "/contact" ? "text-white" : "text-[#a1a1aa] hover:text-white"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <a
                href="https://app.withorbit.io/signup"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm text-center"
              >
                Get started free
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
