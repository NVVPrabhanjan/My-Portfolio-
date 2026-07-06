'use client';
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

/* ----------------------------------------------------------------
   File-tab navigation items — each tab is a "source file"
---------------------------------------------------------------- */
const NAV_TABS = [
  { href: "/aboutme",    label: "about.tsx",      ext: "tsx",  color: "#61dafb" },
  { href: "/projects",   label: "projects.ts",    ext: "ts",   color: "#3178c6" },
  { href: "/skills",     label: "skills.json",    ext: "json", color: "#cbcb41" },
  { href: "/Experience", label: "experience.git", ext: "git",  color: "#f05032" },
  { href: "/Education",  label: "education/",     ext: "dir",  color: "#e5c07b" },
  { href: "/contact",    label: "contact.sh",     ext: "sh",   color: "#50fa7b" },
];

const FileIcon = ({ ext, color }: { ext: string; color: string }) => {
  const icons: Record<string, string> = {
    tsx:  "⚛",
    ts:   "TS",
    json: "{}",
    git:  "⎇",
    dir:  "📁",
    sh:   "$",
  };
  return (
    <span
      className="text-[10px] font-bold font-mono flex-shrink-0 w-4 text-center"
      style={{ color }}
      aria-hidden="true"
    >
      {icons[ext] || ext}
    </span>
  );
};

export const Navigation: React.FC = () => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#1F2428]/95 backdrop-blur-md border-b border-[#21262d] shadow-lg shadow-black/30"
          : "bg-[#1F2428]/80 backdrop-blur-sm border-b border-[#21262d]"
      }`}
    >
      {/* ---- Desktop IDE Title Bar ---- */}
      <div className="hidden md:flex items-stretch h-9 border-b border-[#21262d]">
        {/* Traffic lights + logo */}
        <div className="flex items-center gap-2 px-4 border-r border-[#21262d] min-w-[200px]">
          <div className="flex items-center gap-1.5">
            <div className="traffic-dot traffic-dot-red" />
            <div className="traffic-dot traffic-dot-yellow" />
            <div className="traffic-dot traffic-dot-green" />
          </div>
          <Link
            href="/"
            className="ml-3 font-mono text-xs text-[#8b949e] hover:text-[#e6edf3] transition-colors flex items-center gap-1.5"
            aria-label="Go to homepage"
          >
            <span className="text-[#58a6ff]">P.</span>
            <span>portfolio</span>
          </Link>
        </div>

        {/* File Tabs */}
        <nav
          className="flex items-stretch flex-1 overflow-x-auto"
          aria-label="Main navigation"
          style={{ scrollbarWidth: "none" }}
        >
          {NAV_TABS.map((tab) => {
            const isActive = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`editor-tab group relative flex-shrink-0 ${isActive ? "active" : ""}`}
                aria-current={isActive ? "page" : undefined}
              >
                <FileIcon ext={tab.ext} color={tab.color} />
                <span className="text-xs">{tab.label}</span>
                {/* Unsaved dot on hover */}
                <span className="dot opacity-0 group-hover:opacity-100 transition-opacity duration-200" aria-hidden="true" />
                {/* Active indicator bar */}
                {isActive && (
                  <motion.span
                    layoutId="active-tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#58a6ff]"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2 px-4 border-l border-[#21262d]">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1 rounded text-xs font-mono text-[#8b949e] hover:text-[#e6edf3] border border-[#30363d] hover:border-[#58a6ff]/50 hover:bg-[#58a6ff]/5 transition-all duration-200"
            aria-label="Download resume PDF"
          >
            <span className="text-[#50fa7b]">▶</span>
            resume.pdf
          </a>
        </div>
      </div>

      {/* ---- Mobile Bar ---- */}
      <div className="flex md:hidden items-center justify-between px-4 h-12">
        <Link
          href="/"
          className="font-mono text-sm text-[#8b949e] hover:text-[#e6edf3] transition-colors flex items-center gap-1"
          aria-label="Go to homepage"
        >
          <span className="text-[#58a6ff] font-bold">P.</span>
          <span>portfolio</span>
        </Link>

        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded font-mono text-xs text-[#8b949e] hover:text-white border border-[#30363d] hover:border-[#58a6ff]/50 transition-all"
          aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={mobileOpen}
        >
          <span className="text-[#50fa7b]">$</span>
          {mobileOpen ? "exit" : "nav"}
          <span className={`cursor-blink ${mobileOpen ? "opacity-0" : ""}`}>_</span>
        </button>
      </div>

      {/* ---- Mobile Menu — Command Palette Style ---- */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm md:hidden z-40"
            />
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className="fixed top-14 inset-x-4 bg-[#161B22] border border-[#30363d] rounded-lg shadow-2xl md:hidden z-50 overflow-hidden"
            >
              {/* Command palette header */}
              <div className="px-4 py-2.5 border-b border-[#21262d] flex items-center gap-2">
                <span className="text-[#50fa7b] font-mono text-xs">$</span>
                <span className="font-mono text-xs text-[#8b949e]">navigate --to</span>
                <span className="cursor-blink font-mono text-[#e6edf3] text-xs">_</span>
              </div>
              <nav className="py-1" aria-label="Mobile navigation">
                {NAV_TABS.map((tab, idx) => {
                  const isActive = pathname === tab.href;
                  return (
                    <motion.div
                      key={tab.href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.04 }}
                    >
                      <Link
                        href={tab.href}
                        className={`flex items-center gap-3 px-4 py-3 font-mono text-sm transition-colors duration-150 ${
                          isActive
                            ? "bg-[#58a6ff]/10 text-[#58a6ff] border-l-2 border-[#58a6ff]"
                            : "text-[#8b949e] hover:bg-[#21262d] hover:text-[#e6edf3] border-l-2 border-transparent"
                        }`}
                        aria-current={isActive ? "page" : undefined}
                      >
                        <FileIcon ext={tab.ext} color={tab.color} />
                        <span>{tab.label}</span>
                        {isActive && (
                          <span className="ml-auto text-[10px] text-[#8b949e]">● active</span>
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
                <div className="border-t border-[#21262d] px-4 py-3">
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 font-mono text-sm text-[#8b949e] hover:text-[#e6edf3] transition-colors"
                  >
                    <span className="text-[#50fa7b] text-[10px]">▶</span>
                    resume.pdf
                  </a>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navigation;