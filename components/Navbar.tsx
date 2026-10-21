"use client";

import { useEffect, useState } from "react";
import { FaBars, FaPaperPlane, FaXmark } from "react-icons/fa6";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Terminal", href: "#terminal" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({
  brandMain,
  brandAccent,
}: {
  brandMain: string;
  brandAccent: string;
}) {
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const current = window.scrollY;
      setProgress(total > 0 ? (current / total) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* Top Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 z-50 h-1 bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500 transition-all duration-150"
        style={{ width: `${progress}%` }}
        aria-hidden
      />

      <nav className="fixed top-0 right-0 left-0 z-40 transition-all duration-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <a href="#hero" className="group flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 via-violet-600 to-pink-500 font-mono text-lg font-bold text-white shadow-lg shadow-cyan-500/20 transition-transform duration-300 group-hover:scale-105">
                {"</>" as string}
              </div>
              <span className="text-xl font-bold tracking-tight text-white transition-colors group-hover:text-cyan-400">
                {brandMain}
                <span className="text-cyan-400">{brandAccent}</span>
              </span>
            </a>

            {/* Desktop Navigation Links */}
            <div className="glass-panel hidden items-center space-x-1 rounded-full border border-slate-700/50 px-4 py-2 md:flex">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-full px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800/50 hover:text-cyan-400"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Hire CTA & Mobile Toggle */}
            <div className="flex items-center space-x-4">
              <a
                href="#contact"
                className="glow-btn hidden items-center justify-center rounded-full border border-cyan-500/50 bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:border-cyan-400 sm:inline-flex"
              >
                <FaPaperPlane className="mr-2 text-xs text-cyan-400" />
                {" Hire Me"}
              </a>

              <button
                type="button"
                aria-label="Toggle Menu"
                onClick={() => setMenuOpen((v) => !v)}
                className="glass-panel rounded-lg p-2 text-slate-300 hover:text-white focus:outline-none md:hidden"
              >
                {menuOpen ? (
                  <FaXmark className="text-xl" />
                ) : (
                  <FaBars className="text-xl" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        <div
          className={`glass-panel border-b border-slate-800 px-6 py-6 transition-all duration-300 md:hidden ${menuOpen ? "block" : "hidden"}`}
        >
          <div className="flex flex-col space-y-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="text-base font-medium text-slate-300 hover:text-cyan-400"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={closeMenu}
              className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 py-3 text-center text-sm font-bold text-white shadow-lg"
            >
              Hire Me Now
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
