"use client";
import React, { useState } from "react";
import { Navigation } from "./nav";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, GitFork, Star, AlertCircle, Clock, CheckCircle, XCircle } from "lucide-react";

/* ------------------------------------------------------------------
   DATA
------------------------------------------------------------------ */
interface Project {
  id: number;
  repo: string;
  description: string;
  language: string;
  langColor: string;
  stars: number;
  forks: number;
  issues: number;
  topics: string[];
  githubLink: string;
  deployedLink?: string;
  buildStatus: "passing" | "failing" | "none";
  deployed: boolean;
  lastCommit: string;
  readme: string;
  folderTree: string[];
  pinned?: boolean;
  type: string;
}

const PROJECTS: Project[] = [
  {
    id: 1,
    repo: "NVVPrabhanjan/FAROUCHE-Website",
    description: "Full-stack event platform serving 2,000+ participants across 45+ events. Jenkins CI/CD, AWS EC2 + DigitalOcean, Kafka-based email microservice, Google Sheets real-time dashboards.",
    language: "TypeScript",
    langColor: "#3178c6",
    stars: 12,
    forks: 3,
    issues: 0,
    topics: ["next.js", "kafka", "aws", "jenkins", "mongodb"],
    githubLink: "https://github.com/NVVPrabhanjan/FAROUCHE-Website",
    deployedLink: "https://farouche25.tech/",
    buildStatus: "passing",
    deployed: true,
    lastCommit: "2 months ago",
    readme: "Hostel management platform for 2,000+ participants. Features Kafka async email, real-time Google Sheets dashboards, Jenkins CI/CD, and DigitalOcean/AWS infrastructure.",
    folderTree: ["app/", "api/", "kafka/", "Jenkinsfile", "docker-compose.yml", "README.md"],
    pinned: true,
    type: "Web Development",
  },
  {
    id: 2,
    repo: "NVVPrabhanjan/JobPortal",
    description: "Full-stack job portal connecting job seekers and recruiters with secure authentication, user dashboards, and job listings. Responsive UI with Tailwind CSS.",
    language: "JavaScript",
    langColor: "#f7df1e",
    stars: 8,
    forks: 2,
    issues: 1,
    topics: ["react", "express", "mongodb", "tailwindcss"],
    githubLink: "https://github.com/NVVPrabhanjan/JobPortal",
    deployedLink: "https://job-portal-weld-one.vercel.app/",
    buildStatus: "passing",
    deployed: true,
    lastCommit: "3 months ago",
    readme: "Job portal with JWT authentication, role-based access for seekers and recruiters, real-time job listings, and application tracking.",
    folderTree: ["client/", "server/", "models/", "routes/", ".env.example", "package.json"],
    type: "Full Stack",
  },
  {
    id: 3,
    repo: "NVVPrabhanjan/My-Portfolio-",
    description: "IDE-themed personal portfolio built with Next.js 13. Features syntax highlighting, git log experience viewer, terminal contact form, and VS Code-inspired navigation.",
    language: "TypeScript",
    langColor: "#3178c6",
    stars: 5,
    forks: 1,
    issues: 0,
    topics: ["next.js", "tailwindcss", "framer-motion", "portfolio"],
    githubLink: "https://github.com/NVVPrabhanjan/My-Portfolio-",
    deployedLink: "https://prabhanjan.live/",
    buildStatus: "passing",
    deployed: true,
    lastCommit: "1 day ago",
    readme: "IDE-themed portfolio website. The design language is entirely inspired by developer tools — VS Code, git log, terminal, and file explorers.",
    folderTree: ["app/", "components/", "public/", "global.css", "next.config.mjs", "tailwind.config.ts"],
    type: "Web Development",
  },
  {
    id: 4,
    repo: "NVVPrabhanjan/CourseSellingApp",
    description: "Online course sales and management platform with course browsing, instructor-student interaction, and scalable backend.",
    language: "JavaScript",
    langColor: "#f7df1e",
    stars: 4,
    forks: 1,
    issues: 2,
    topics: ["react", "express", "mongodb"],
    githubLink: "https://github.com/NVVPrabhanjan/CourseSellingApp",
    buildStatus: "passing",
    deployed: false,
    lastCommit: "5 months ago",
    readme: "Course marketplace with instructor dashboards, student enrollment, and content management. Built with MERN stack.",
    folderTree: ["frontend/", "backend/", "models/", "middleware/", "package.json"],
    type: "Full Stack",
  },
  {
    id: 5,
    repo: "NVVPrabhanjan/ATM-Simulator",
    description: "Comprehensive banking application simulating core ATM functionalities: account creation, money transfers, transaction history, and OOP-driven business logic.",
    language: "Java",
    langColor: "#b07219",
    stars: 3,
    forks: 0,
    issues: 0,
    topics: ["java", "oop", "sql", "banking"],
    githubLink: "https://github.com/NVVPrabhanjan",
    buildStatus: "passing",
    deployed: false,
    lastCommit: "8 months ago",
    readme: "ATM simulator with JDBC + MySQL backend. Features secure PIN validation, account CRUD, transaction history, and concurrency-safe balance operations.",
    folderTree: ["src/main/java/", "src/test/", "schema.sql", "pom.xml", "README.md"],
    type: "Systems",
  },
  {
    id: 6,
    repo: "NVVPrabhanjan/BMSCE_Events",
    description: "Event management platform for BMSCE streamlining event registration and navigation with a user-friendly interface and robust database integration.",
    language: "JavaScript",
    langColor: "#f7df1e",
    stars: 2,
    forks: 1,
    issues: 0,
    topics: ["react", "express", "mysql"],
    githubLink: "https://github.com/NVVPrabhanjan/BMSCE_Events",
    buildStatus: "none",
    deployed: false,
    lastCommit: "6 months ago",
    readme: "College event portal with event CRUD, student registration, organizer dashboards, and MySQL relational backend.",
    folderTree: ["client/", "server/", "db/", "routes/", "package.json"],
    type: "Web Application",
  },
];

const CATEGORIES = ["All", "Full Stack", "Web Development", "Systems"];

const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f7df1e",
  Java:       "#b07219",
};

/* ------------------------------------------------------------------
   REPO CARD
------------------------------------------------------------------ */
const RepoCard = ({ project }: { project: Project }) => {
  const [showTree, setShowTree] = useState(false);

  const BuildBadge = () => {
    if (project.buildStatus === "passing")
      return <span className="badge-passing flex items-center gap-1"><CheckCircle className="w-3 h-3" /> passing</span>;
    if (project.buildStatus === "failing")
      return <span className="badge-failing flex items-center gap-1"><XCircle className="w-3 h-3" /> failing</span>;
    return null;
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.25 }}
      className="editor-window flex flex-col h-full hover:border-[#30363d] transition-colors"
    >
      {/* Repo header */}
      <div className="px-4 pt-4 pb-3 border-b border-[#21262d]">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2 flex-wrap">
            <svg className="w-4 h-4 text-[#8b949e] flex-shrink-0" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 010-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"/>
            </svg>
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm font-bold text-[#58a6ff] hover:underline"
            >
              {project.repo}
            </a>
            {project.pinned && (
              <span className="font-mono text-[9px] px-1.5 py-0.5 rounded-full border border-[#e3b341]/30 text-[#e3b341] bg-[#e3b341]/10">
                📌 pinned
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <BuildBadge />
            {project.deployed && (
              <span className="badge-deployed flex items-center gap-1">▲ deployed</span>
            )}
          </div>
        </div>

        {/* Topics */}
        <div className="flex flex-wrap gap-1.5 mt-2">
          {project.topics.map((t) => (
            <span key={t} className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-[#388bfd1a] text-[#58a6ff] border border-[#388bfd40]">
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* README preview */}
      <div className="px-4 py-3 flex-1">
        <div className="font-mono text-[10px] text-[#484f58] mb-1.5 flex items-center gap-1.5">
          <span>📄</span> README.md
        </div>
        <p className="font-mono text-xs text-[#8b949e] leading-relaxed line-clamp-3">
          {project.readme}
        </p>
      </div>

      {/* Folder tree toggle */}
      <div className="border-t border-[#21262d]">
        <button
          onClick={() => setShowTree((v) => !v)}
          className="w-full px-4 py-2 font-mono text-[10px] text-[#484f58] hover:text-[#8b949e] hover:bg-[#21262d] transition-colors flex items-center gap-1.5 text-left"
        >
          <span>{showTree ? "▾" : "▸"}</span>
          <span>📁 file tree</span>
          <span className="ml-auto">{project.folderTree.length} items</span>
        </button>
        <AnimatePresence initial={false}>
          {showTree && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden border-t border-[#21262d] bg-[#0d1117]"
            >
              <div className="px-4 py-2 space-y-1">
                {project.folderTree.map((f) => (
                  <div key={f} className="font-mono text-[11px] text-[#8b949e] flex items-center gap-2">
                    <span className="text-[#484f58]">├─</span>
                    <span>{f.endsWith("/") ? "📁" : "📄"}</span>
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Stats row */}
      <div className="border-t border-[#21262d] px-4 py-2.5 flex items-center gap-4 font-mono text-[11px] text-[#8b949e]">
        <div className="flex items-center gap-1.5">
          <div className="lang-dot" style={{ background: LANG_COLORS[project.language] || "#aaa" }} />
          <span>{project.language}</span>
        </div>
        <div className="flex items-center gap-1">
          <Star className="w-3.5 h-3.5" />
          <span>{project.stars}</span>
        </div>
        <div className="flex items-center gap-1">
          <GitFork className="w-3.5 h-3.5" />
          <span>{project.forks}</span>
        </div>
        {project.issues > 0 && (
          <div className="flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{project.issues}</span>
          </div>
        )}
        <div className="ml-auto flex items-center gap-1 text-[#484f58]">
          <Clock className="w-3 h-3" />
          <span>{project.lastCommit}</span>
        </div>
      </div>

      {/* Action row */}
      <div className="border-t border-[#21262d] px-4 py-3 flex gap-2">
        <a
          href={project.githubLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 py-1.5 font-mono text-xs text-[#8b949e] hover:text-[#e6edf3] border border-[#30363d] hover:border-[#58a6ff]/50 rounded transition-all hover:bg-[#58a6ff]/5"
        >
          <Github className="w-3.5 h-3.5" />
          Code
        </a>
        {project.deployedLink ? (
          <a
            href={project.deployedLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 py-1.5 font-mono text-xs text-[#0d1117] font-bold bg-[#3fb950] hover:bg-[#57c975] rounded transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Live
          </a>
        ) : (
          <div className="flex-1 flex items-center justify-center gap-1.5 py-1.5 font-mono text-xs text-[#484f58] border border-[#21262d] rounded cursor-default">
            Local only
          </div>
        )}
      </div>
    </motion.div>
  );
};

/* ------------------------------------------------------------------
   PAGE
------------------------------------------------------------------ */
const Projects = () => {
  const [filter, setFilter] = useState("All");

  const filtered = PROJECTS.filter((p) => {
    if (filter === "All") return true;
    if (filter === "Web Development") return p.type.toLowerCase().includes("web");
    return p.type.toLowerCase() === filter.toLowerCase();
  });

  const pinned = filtered.find((p) => p.pinned);
  const rest    = filtered.filter((p) => !p.pinned);

  return (
    <div className="relative min-h-screen ide-bg text-[#e6edf3] overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_50%_30%_at_50%_10%,rgba(88,166,255,0.04),transparent)]" />
      <Navigation />

      <main className="container mx-auto px-4 sm:px-6 pt-20 pb-16 max-w-7xl">
        {/* Header */}
        <header className="mb-8 pt-4">
          <h1 className="font-mono text-2xl md:text-3xl font-bold text-[#6272a4]">
            // projects
          </h1>
          <p className="font-mono text-xs text-[#484f58] mt-2">
            <span className="text-[#3fb950]">$</span> gh repo list NVVPrabhanjan --limit 6
          </p>
        </header>

        {/* Branch filter */}
        <div className="flex items-center gap-3 mb-8 flex-wrap">
          <span className="font-mono text-xs text-[#484f58]">⎇ filter:</span>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`font-mono text-xs px-3 py-1.5 rounded border transition-all duration-200 ${
                filter === cat
                  ? "bg-[#58a6ff]/10 text-[#58a6ff] border-[#58a6ff]/40"
                  : "text-[#8b949e] border-[#30363d] hover:border-[#484f58] hover:text-[#e6edf3]"
              }`}
            >
              {cat}
            </button>
          ))}
          <span className="ml-auto font-mono text-xs text-[#484f58]">{filtered.length} repos</span>
        </div>

        {/* Pinned / Featured */}
        {pinned && (filter === "All" || filter === "Web Development") && (
          <div className="mb-8">
            <div className="font-mono text-[11px] text-[#484f58] uppercase tracking-widest mb-3 flex items-center gap-2">
              <span>📌</span> Pinned Repository
            </div>
            <div className="grid lg:grid-cols-2 gap-4">
              <RepoCard project={pinned} />
              {/* Featured README expanded view */}
              <div className="editor-window overflow-hidden">
                <div className="editor-titlebar">
                  <div className="flex items-center gap-1.5">
                    <div className="traffic-dot traffic-dot-red" />
                    <div className="traffic-dot traffic-dot-yellow" />
                    <div className="traffic-dot traffic-dot-green" />
                  </div>
                  <span className="ml-3 font-mono text-xs text-[#8b949e]">📄 README.md — {pinned.repo.split("/")[1]}</span>
                </div>
                <div className="p-5 font-mono text-sm space-y-4 overflow-auto" style={{ maxHeight: "320px", scrollbarWidth: "thin" }}>
                  <div className="token-comment"># {pinned.repo.split("/")[1]}</div>
                  <div className="text-[#e6edf3] text-xs leading-relaxed">{pinned.description}</div>
                  <div>
                    <div className="token-comment">## Tech Stack</div>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {pinned.topics.map((t) => (
                        <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-[#388bfd1a] text-[#58a6ff] border border-[#388bfd40]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="token-comment">## Status</div>
                    <div className="mt-1.5 space-y-1 text-xs">
                      <div className="text-[#3fb950]">✓ Build: {pinned.buildStatus}</div>
                      <div className="text-[#58a6ff]">▲ Deployed: {pinned.deployed ? "Yes" : "No"}</div>
                      <div className="text-[#e3b341]">⎇ Last commit: {pinned.lastCommit}</div>
                    </div>
                  </div>
                  <div>
                    <div className="token-comment">## File Tree</div>
                    <div className="mt-1.5 space-y-1">
                      {pinned.folderTree.map((f) => (
                        <div key={f} className="text-xs text-[#8b949e] flex items-center gap-2">
                          <span className="text-[#484f58]">├─</span>
                          <span>{f.endsWith("/") ? "📁" : "📄"}</span>
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other repos grid */}
        {rest.length > 0 && (
          <>
            <div className="font-mono text-[11px] text-[#484f58] uppercase tracking-widest mb-4">
              Repositories ({rest.length})
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              <AnimatePresence mode="popLayout">
                {rest.map((project) => (
                  <RepoCard key={project.id} project={project} />
                ))}
              </AnimatePresence>
            </div>
          </>
        )}

        {filtered.length === 0 && (
          <div className="editor-window p-12 text-center font-mono text-sm text-[#484f58]">
            <div className="text-2xl mb-3">404</div>
            <div>No repositories found for branch: <span className="text-[#58a6ff]">{filter}</span></div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Projects;