"use client";
import React, { useState } from "react";
import { Navigation } from "../components/nav";
import { motion, AnimatePresence } from "framer-motion";

/* ------------------------------------------------------------------
   DATA — each experience is a git commit
------------------------------------------------------------------ */
interface CommitFile {
  name: string;
  additions: number;
  deletions: number;
}

interface Commit {
  hash: string;
  shortHash: string;
  author: string;
  email: string;
  date: string;
  branch: string;
  subject: string;
  body: string[];
  skills: string[];
  files: CommitFile[];
  stats: { additions: number; deletions: number; files: number };
}

const COMMITS: Commit[] = [
  {
    hash:      "a3f8c91d7e2b104f5e6a3d8c9b0f2e1a7d4c5b6e",
    shortHash: "a3f8c91",
    author:    "Prabhanjan N.V.V",
    email:     "nvvenkatprabhanjan@gmail.com",
    date:      "Feb 2025 → Mar 2025",
    branch:    "feat/fullstack-internship",
    subject:   "feat(career): Full Stack Developer Intern @ Looped Labs Pvt. Ltd.",
    body: [
      "+ Designed stable system architecture using AWS EC2 with Load Balancing to ensure high availability and scalability for incoming client traffic",
      "+ Optimized Node.js core process utilization to handle concurrent user requests, improving overall server responsiveness and throughput by 20%+",
      "+ Independently designed, built, and managed an interactive gallery module supporting real-time media uploads and content retrieval",
      "+ Implemented SEO best practices for improved search ranking and established automated CI/CD workflows using Jenkins for smooth deployments",
      "- Removed legacy SMTP handler, migrated to Kafka-based async email microservice",
    ],
    skills: ["Node.js", "AWS EC2", "Load Balancing", "Jenkins", "CI/CD", "SEO", "Express.js"],
    files: [
      { name: "server/cluster.js",           additions: 142, deletions: 18 },
      { name: "services/gallery.service.ts",  additions: 287, deletions: 0  },
      { name: "config/nginx.conf",            additions: 64,  deletions: 12 },
      { name: "pipelines/Jenkinsfile",        additions: 98,  deletions: 0  },
      { name: "services/smtp.service.ts",     additions: 0,   deletions: 115 },
    ],
    stats: { additions: 591, deletions: 145, files: 5 },
  },
];

const CommitCard = ({ commit }: { commit: Commit }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="relative">
      {/* Graph line */}
      <div
        className="absolute left-[18px] top-10 bottom-0 w-[2px] bg-[#21262d]"
        aria-hidden="true"
      />

      {/* Commit dot */}
      <div
        className="absolute left-[10px] top-[14px] w-4 h-4 rounded-full bg-[#0B0F14] border-2 border-[#3fb950] z-10"
        style={{ boxShadow: "0 0 0 4px rgba(63,185,80,0.1)" }}
        aria-hidden="true"
      />

      {/* Card */}
      <div className="ml-10 editor-window mb-6">
        {/* Commit header */}
        <button
          onClick={() => setExpanded((v) => !v)}
          className="w-full text-left"
          aria-expanded={expanded}
        >
          <div className="px-4 py-3 bg-[#161B22] border-b border-[#21262d] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-xs text-[#3fb950] font-bold">● commit</span>
              <code className="font-mono text-xs text-[#8be9fd] bg-[#0d1117] px-2 py-0.5 rounded border border-[#21262d]">
                {commit.shortHash}
              </code>
              <span className="font-mono text-[10px] text-[#484f58] hidden sm:inline">
                ({commit.hash.slice(0, 16)}...)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] text-[#58a6ff] bg-[#58a6ff]/10 border border-[#58a6ff]/20 px-2 py-0.5 rounded">
                ⎇ {commit.branch}
              </span>
              <span className="font-mono text-[10px] text-[#484f58]">{expanded ? "▾" : "▸"} diff</span>
            </div>
          </div>

          <div className="px-4 py-3 space-y-1">
            <div className="flex items-center gap-3 font-mono text-[11px] text-[#484f58]">
              <span>Author: <span className="text-[#8b949e]">{commit.author} &lt;{commit.email}&gt;</span></span>
            </div>
            <div className="font-mono text-[11px] text-[#484f58]">
              Date: <span className="text-[#8b949e]">{commit.date}</span>
            </div>
          </div>

          <div className="px-4 pb-4">
            <p className="font-mono text-sm font-semibold text-[#e6edf3] leading-relaxed">
              {commit.subject}
            </p>
          </div>
        </button>

        {/* Expandable diff */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden border-t border-[#21262d]"
            >
              {/* Diff body */}
              <div className="p-4 bg-[#0d1117] font-mono text-xs leading-relaxed space-y-1">
                {commit.body.map((line, i) => (
                  <div
                    key={i}
                    className={
                      line.startsWith("+")
                        ? "diff-add text-[#3fb950]"
                        : line.startsWith("-")
                        ? "diff-remove text-[#f85149]"
                        : "diff-context text-[#8b949e]"
                    }
                  >
                    {line}
                  </div>
                ))}
              </div>

              {/* Changed files */}
              <div className="border-t border-[#21262d] p-4">
                <div className="font-mono text-[11px] text-[#484f58] uppercase tracking-widest mb-3">
                  Changed Files — {commit.stats.files} files
                </div>
                <div className="space-y-1.5">
                  {commit.files.map((f) => (
                    <div key={f.name} className="flex items-center gap-3 font-mono text-xs">
                      <span className="text-[#8b949e] flex-1 truncate">{f.name}</span>
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        {f.additions > 0 && (
                          <span className="text-[#3fb950]">+{f.additions}</span>
                        )}
                        {f.deletions > 0 && (
                          <span className="text-[#f85149]">-{f.deletions}</span>
                        )}
                        {/* Visual bar */}
                        <div className="hidden sm:flex items-center gap-[2px]">
                          {Array.from({ length: Math.min(Math.round((f.additions / (f.additions + f.deletions + 1)) * 5), 5) }).map((_, i) => (
                            <div key={i} className="w-2 h-2.5 rounded-sm bg-[#3fb950]/70" />
                          ))}
                          {Array.from({ length: Math.min(5 - Math.round((f.additions / (f.additions + f.deletions + 1)) * 5), 5) }).map((_, i) => (
                            f.deletions > 0 ? <div key={i} className="w-2 h-2.5 rounded-sm bg-[#f85149]/70" /> : null
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Summary stats */}
                <div className="mt-4 pt-3 border-t border-[#21262d] flex items-center gap-4 font-mono text-xs">
                  <span className="text-[#484f58]">{commit.stats.files} files changed</span>
                  <span className="text-[#3fb950]">+{commit.stats.additions} insertions</span>
                  <span className="text-[#f85149]">-{commit.stats.deletions} deletions</span>
                </div>
              </div>

              {/* Skill tags */}
              <div className="border-t border-[#21262d] px-4 py-3 flex flex-wrap gap-2">
                {commit.skills.map((s) => (
                  <span
                    key={s}
                    className="font-mono text-[10px] px-2.5 py-1 rounded bg-[#21262d] text-[#8b949e] border border-[#30363d] hover:border-[#58a6ff]/40 hover:text-[#58a6ff] transition-colors"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const Experience = () => {
  return (
    <div className="relative min-h-screen ide-bg text-[#e6edf3] overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_30%_at_80%_20%,rgba(248,81,73,0.03),transparent)]" />
      <Navigation />

      <main className="container mx-auto px-4 sm:px-6 pt-20 pb-16 max-w-4xl">
        {/* Header */}
        <header className="mb-10 pt-4">
          <h1 className="font-mono text-2xl md:text-3xl font-bold text-[#f05032]">
            # git log --author="Prabhanjan"
          </h1>
          <div className="font-mono text-xs text-[#484f58] mt-3 space-y-1">
            <div>
              <span className="text-[#3fb950]">$</span> git log --oneline --graph --decorate
            </div>
            <div className="text-[#484f58]">
              Showing {COMMITS.length} commit{COMMITS.length !== 1 ? "s" : ""} · click to expand diff
            </div>
          </div>
        </header>

        {/* Git graph */}
        <div className="relative pl-4">
          {COMMITS.map((commit) => (
            <CommitCard key={commit.hash} commit={commit} />
          ))}

          {/* Origin marker */}
          <div className="ml-10 flex items-center gap-3 font-mono text-xs text-[#484f58] py-3">
            <div className="w-4 h-4 rounded-full border border-[#484f58] flex items-center justify-center flex-shrink-0" aria-hidden="true">
              <div className="w-1.5 h-1.5 rounded-full bg-[#484f58]" />
            </div>
            <span>Initial commit · git init · Dec 2022</span>
          </div>
        </div>

        {/* Summary stats panel */}
        <div className="mt-12 editor-window">
          <div className="editor-titlebar">
            <div className="flex items-center gap-1.5">
              <div className="traffic-dot traffic-dot-red" />
              <div className="traffic-dot traffic-dot-yellow" />
              <div className="traffic-dot traffic-dot-green" />
            </div>
            <span className="ml-3 font-mono text-xs text-[#8b949e]">career-stats.json</span>
          </div>
          <div className="grid sm:grid-cols-3 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-[#21262d]">
            {[
              { label: "total_commits",   value: "∞",    color: "#3fb950", note: "side projects + prod" },
              { label: "lines_written",   value: "10k+", color: "#58a6ff", note: "across all repos" },
              { label: "uptime_boost",    value: "20%+", color: "#bc8cff", note: "Node.js throughput" },
            ].map((s) => (
              <div key={s.label} className="p-5 text-center">
                <div className="font-mono text-2xl font-bold" style={{ color: s.color }}>{s.value}</div>
                <div className="font-mono text-xs text-[#484f58] mt-1">{s.label}</div>
                <div className="font-mono text-[10px] text-[#30363d] mt-0.5">{s.note}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Experience;