"use client";
import React, { useState } from "react";
import { Navigation } from "./nav";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, ExternalLink } from "lucide-react";

/* ------------------------------------------------------------------
   README sections — rendered as markdown-like IDE content
------------------------------------------------------------------ */
const CI_BADGES = [
  { label: "CGPA", value: "8.89/10", color: "#3fb950", bg: "rgba(63,185,80,0.12)" },
  { label: "Projects", value: "6+", color: "#58a6ff", bg: "rgba(88,166,255,0.12)" },
  { label: "Users", value: "2,000+", color: "#bc8cff", bg: "rgba(188,140,255,0.12)" },
  { label: "Throughput", value: "+20%", color: "#e3b341", bg: "rgba(227,179,65,0.12)" },
];

const TECH_BADGES = [
  { name: "React", color: "#61dafb" },
  { name: "Next.js", color: "#ffffff" },
  { name: "Node.js", color: "#3c873a" },
  { name: "Java", color: "#f89820" },
  { name: "TypeScript", color: "#3178c6" },
  { name: "MongoDB", color: "#4db33d" },
  { name: "AWS", color: "#ff9900" },
  { name: "Docker", color: "#2496ed" },
  { name: "Jenkins", color: "#d33833" },
  { name: "Git", color: "#f05032" },
];

const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com/NVVPrabhanjan", icon: <Github className="w-4 h-4" />, user: "NVVPrabhanjan", color: "#e6edf3" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/n-v-venkata-prabhanjan-740213248/", icon: <Linkedin className="w-4 h-4" />, user: "prabhanjan-nv", color: "#0077b5" },
  { label: "Twitter", href: "https://x.com/Venkatprabhanj2", icon: <Twitter className="w-4 h-4" />, user: "@Venkatprabhanj2", color: "#1da1f2" },
];

const README_SECTIONS = [
  {
    id: "background",
    heading: "## 👨‍💻 Background",
    content: `I'm an enthusiastic Information Science student with a deep passion for problem solving and software architecture. I enjoy designing high-performance systems, optimizing full-stack applications, and building solutions that combine clean code with responsive design.\n\nCurrently pursuing my B.E. at B.M.S. College of Engineering (BMSCE), Bengaluru — graduating May 2026.`,
  },
  {
    id: "philosophy",
    heading: "## ⚙️ Engineering Philosophy",
    content: `I believe in practical application and data-driven optimization. During my developer stint at Looped Labs, I optimized Node.js process utilization to gain a 20%+ increase in request throughput — proving that efficiency lies in deep technical understanding, not just adding more resources.\n\nI build software designed to scale gracefully under pressure.`,
  },
  {
    id: "interests",
    heading: "## 🎯 Current Focus",
    content: `- Distributed systems and microservices architecture\n- Cloud-native deployment (AWS EC2, DigitalOcean)\n- Performance optimization in Node.js environments\n- System design patterns and scalability trade-offs\n- Open-source contributions`,
  },
];

export default function AboutMe() {
  const [activeSection, setActiveSection] = useState("background");

  return (
    <div className="relative min-h-screen ide-bg text-[#e6edf3] overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_50%_30%_at_30%_10%,rgba(88,166,255,0.04),transparent)]" />
      <Navigation />

      <main className="container mx-auto px-4 sm:px-6 pt-20 pb-16 max-w-7xl">
        {/* Header */}
        <header className="mb-8 pt-4">
          <h1 className="font-mono text-2xl md:text-3xl font-bold text-[#6272a4]">
            /** about.tsx **/
          </h1>
          <p className="font-mono text-xs text-[#484f58] mt-2">
            <span className="text-[#3fb950]">$</span> cat README.md
          </p>
        </header>

        <div className="grid lg:grid-cols-[320px_1fr] gap-6">

          {/* ---- LEFT: Profile Card (styled as a GitHub profile panel) ---- */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            {/* Avatar card */}
            <div className="editor-window overflow-hidden">
              <div className="editor-titlebar">
                <div className="flex items-center gap-1.5">
                  <div className="traffic-dot traffic-dot-red" />
                  <div className="traffic-dot traffic-dot-yellow" />
                  <div className="traffic-dot traffic-dot-green" />
                </div>
                <span className="ml-3 font-mono text-xs text-[#8b949e]">NVVPrabhanjan / profile</span>
              </div>
              <div className="p-4">
                {/* Profile image */}
                <div className="relative w-full aspect-square rounded-lg overflow-hidden border border-[#30363d] mb-4">
                  <Image
                    src="/profile.jpg"
                    alt="Prabhanjan N.V.V — Full Stack Developer"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    priority
                  />
                </div>

                <h2 className="font-mono text-lg font-bold text-[#e6edf3]">Prabhanjan N.V.V</h2>
                <p className="font-mono text-sm text-[#8b949e] mt-0.5">Full Stack Developer</p>
                <p className="font-mono text-xs text-[#484f58] mt-1">
                  <span className="text-[#58a6ff]">@</span>NVVPrabhanjan
                </p>

                {/* Bio */}
                <p className="font-mono text-xs text-[#8b949e] mt-3 leading-relaxed border-t border-[#21262d] pt-3">
                  Building scalable systems · ISE @ BMSCE · Open to work
                </p>

                {/* Status */}
                <div className="mt-3 flex items-center gap-2 font-mono text-xs">
                  <span className="w-2 h-2 rounded-full bg-[#3fb950]" aria-hidden="true" />
                  <span className="text-[#3fb950]">Open to opportunities</span>
                </div>

                {/* Location / org */}
                <div className="mt-3 space-y-1.5 font-mono text-xs text-[#8b949e]">
                  <div>📍 Bengaluru, India</div>
                  <div>🏛️ BMSCE — Class of 2026</div>
                  <div>
                    <a href="mailto:nvvenkatprabhanjan@gmail.com" className="text-[#58a6ff] hover:underline">
                      ✉ nvvenkatprabhanjan@gmail.com
                    </a>
                  </div>
                </div>

                {/* Social links */}
                <div className="mt-4 space-y-2 border-t border-[#21262d] pt-4">
                  {SOCIAL_LINKS.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 font-mono text-xs text-[#8b949e] hover:text-[#e6edf3] transition-colors group"
                    >
                      <span className="group-hover:scale-110 transition-transform" style={{ color: s.color }}>
                        {s.icon}
                      </span>
                      <span>{s.user}</span>
                    </a>
                  ))}
                </div>

                {/* Actions */}
                <div className="mt-4 space-y-2">
                  <Link
                    href="/contact"
                    className="w-full flex items-center justify-center gap-2 py-2 font-mono text-xs font-bold text-[#0d1117] bg-[#3fb950] hover:bg-[#57c975] rounded transition-all"
                  >
                    <span>▶</span> contact --me
                  </Link>
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-2 font-mono text-xs text-[#8b949e] border border-[#30363d] hover:border-[#58a6ff]/50 hover:text-[#e6edf3] rounded transition-all"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> resume.pdf
                  </a>
                </div>
              </div>
            </div>


          </motion.div>

          {/* ---- RIGHT: README.md content ---- */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="space-y-4"
          >
            {/* README window */}
            <div className="editor-window overflow-hidden">
              <div className="editor-titlebar">
                <div className="flex items-center gap-1.5">
                  <div className="traffic-dot traffic-dot-red" />
                  <div className="traffic-dot traffic-dot-yellow" />
                  <div className="traffic-dot traffic-dot-green" />
                </div>
                <div className="editor-tab active ml-3">
                  <span>📝</span>
                  <span>README.md</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3fb950] ml-1" />
                </div>
              </div>

              {/* Section navigation (tabs within README) */}
              <div className="flex border-b border-[#21262d] overflow-x-auto" style={{ scrollbarWidth: "none" }}>
                {README_SECTIONS.map((sec) => (
                  <button
                    key={sec.id}
                    onClick={() => setActiveSection(sec.id)}
                    className={`px-4 py-2 font-mono text-xs whitespace-nowrap border-b-2 transition-colors ${activeSection === sec.id
                      ? "text-[#58a6ff] border-[#58a6ff]"
                      : "text-[#484f58] border-transparent hover:text-[#8b949e]"
                      }`}
                  >
                    {sec.id}
                  </button>
                ))}
              </div>

              {/* README body */}
              <div className="p-6 min-h-[220px]">
                {README_SECTIONS.filter((s) => s.id === activeSection).map((sec) => (
                  <motion.div
                    key={sec.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <h2 className="font-mono text-base font-bold text-[#e6edf3]">{sec.heading}</h2>
                    <div className="font-mono text-sm text-[#8b949e] leading-relaxed whitespace-pre-line">
                      {sec.content.split("\n").map((line, i) => (
                        <p key={i} className={`${line.startsWith("-") ? "pl-4 text-[#e6edf3]" : ""} mb-2`}>
                          {line.startsWith("-") ? (
                            <>
                              <span className="text-[#3fb950] mr-2">→</span>
                              {line.slice(2)}
                            </>
                          ) : (
                            line
                          )}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Tech badges section */}
            <div className="editor-window overflow-hidden">
              <div className="editor-titlebar">
                <div className="flex items-center gap-1.5">
                  <div className="traffic-dot traffic-dot-red" />
                  <div className="traffic-dot traffic-dot-yellow" />
                  <div className="traffic-dot traffic-dot-green" />
                </div>
                <span className="ml-3 font-mono text-xs text-[#8b949e]">## Tech Stack</span>
              </div>
              <div className="p-5">
                <div className="flex flex-wrap gap-2">
                  {TECH_BADGES.map((t) => (
                    <div
                      key={t.name}
                      className="flex items-center gap-1.5 px-3 py-1 rounded font-mono text-xs border border-[#30363d] hover:border-[#484f58] transition-colors"
                      style={{ background: `${t.color}10` }}
                    >
                      <div className="w-2 h-2 rounded-full" style={{ background: t.color }} aria-hidden="true" />
                      <span style={{ color: t.color }}>{t.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* CI Badges panel */}
            <div className="editor-window overflow-hidden">
              <div className="px-4 py-2.5 border-b border-[#21262d] font-mono text-xs text-[#484f58]">
                // metrics
              </div>
              <div className="p-3 grid grid-cols-2 gap-2">
                {CI_BADGES.map((b) => (
                  <div
                    key={b.label}
                    className="rounded px-3 py-2 font-mono text-center border"
                    style={{ background: b.bg, borderColor: `${b.color}30` }}
                  >
                    <div className="text-base font-bold" style={{ color: b.color }}>{b.value}</div>
                    <div className="text-[10px] text-[#484f58]">{b.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}