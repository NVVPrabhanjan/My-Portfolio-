"use client";
import React, { useState } from "react";
import { Navigation } from "./nav";
import { motion, AnimatePresence } from "framer-motion";

/* ------------------------------------------------------------------
   DATA — skill tree as a directory hierarchy
------------------------------------------------------------------ */
interface SkillFile {
  name: string;
  ext: string;
  level: number;       // 0-100
  description: string;
  deps?: string[];
  color: string;
}

interface SkillFolder {
  name: string;
  icon: string;
  color: string;
  files: SkillFile[];
}

const SKILL_TREE: SkillFolder[] = [
  {
    name: "languages",
    icon: "📁",
    color: "#e5c07b",
    files: [
      { name: "java",       ext: ".java",  level: 85, color: "#f89820", description: "OOP, Spring, JDBC, data structures", deps: ["C++", "OOP"] },
      { name: "javascript", ext: ".js",    level: 88, color: "#f7df1e", description: "ES2024, async/await, prototypes, DOM", deps: ["Node.js", "React"] },
      { name: "typescript", ext: ".ts",    level: 82, color: "#3178c6", description: "Strict typing, generics, decorators", deps: ["JavaScript"] },
      { name: "python",     ext: ".py",    level: 70, color: "#3572a5", description: "Scripting, automation, data utilities", deps: [] },
      { name: "c_cpp",      ext: ".cpp",   level: 75, color: "#f34b7d", description: "Pointers, memory management, STL", deps: [] },
      { name: "sql",        ext: ".sql",   level: 80, color: "#e38c00", description: "Joins, indexes, transactions, views", deps: ["MySQL", "PostgreSQL"] },
    ],
  },
  {
    name: "frameworks",
    icon: "📁",
    color: "#61dafb",
    files: [
      { name: "react",       ext: ".jsx",  level: 90, color: "#61dafb", description: "Hooks, context, performance patterns", deps: ["JavaScript", "TypeScript"] },
      { name: "nextjs",      ext: ".tsx",  level: 85, color: "#ffffff", description: "App router, SSR, SSG, API routes", deps: ["React", "TypeScript"] },
      { name: "nodejs",      ext: ".js",   level: 84, color: "#3c873a", description: "Express, clustering, event loop tuning", deps: ["JavaScript"] },
      { name: "expressjs",   ext: ".js",   level: 82, color: "#aaaaaa", description: "REST APIs, middleware, routing", deps: ["Node.js"] },
      { name: "tailwindcss", ext: ".css",  level: 88, color: "#38bdf8", description: "Utility-first CSS, responsive design", deps: ["CSS"] },
      { name: "mongodb",     ext: ".json", level: 78, color: "#4db33d", description: "Aggregation pipelines, indexing, Atlas", deps: ["Node.js"] },
    ],
  },
  {
    name: "devops",
    icon: "📁",
    color: "#f05032",
    files: [
      { name: "git",         ext: ".sh",   level: 88, color: "#f05032", description: "Branching, rebasing, workflows, hooks", deps: [] },
      { name: "docker",      ext: ".yaml", level: 65, color: "#2496ed", description: "Containers, volumes, compose basics", deps: ["Linux"] },
      { name: "aws_ec2",     ext: ".tf",   level: 72, color: "#ff9900", description: "EC2, load balancers, security groups", deps: ["Linux", "Networking"] },
      { name: "jenkins",     ext: ".sh",   level: 68, color: "#d33833", description: "CI/CD pipelines, build automation", deps: ["Git", "Docker"] },
      { name: "linux",       ext: ".sh",   level: 78, color: "#fcc624", description: "Bash, cron, system services, SSH", deps: [] },
      { name: "postman",     ext: ".json", level: 85, color: "#ef5b25", description: "API testing, environments, collections", deps: ["HTTP", "REST"] },
    ],
  },
  {
    name: "soft-skills",
    icon: "📁",
    color: "#bd93f9",
    files: [
      { name: "problem_solving",   ext: ".md", level: 92, color: "#bd93f9", description: "Algorithms, data structures, LeetCode", deps: [] },
      { name: "system_design",     ext: ".md", level: 75, color: "#bc8cff", description: "Architecture, scalability, trade-offs", deps: [] },
      { name: "team_collaboration",ext: ".md", level: 88, color: "#a678e5", description: "Agile, code reviews, pair programming", deps: [] },
      { name: "rapid_learning",    ext: ".md", level: 95, color: "#c9a0f5", description: "Pick up new frameworks in days", deps: [] },
    ],
  },
];

const EXT_COLORS: Record<string, string> = {
  ".java": "#f89820",
  ".js":   "#f7df1e",
  ".ts":   "#3178c6",
  ".tsx":  "#61dafb",
  ".jsx":  "#61dafb",
  ".py":   "#3572a5",
  ".cpp":  "#f34b7d",
  ".sql":  "#e38c00",
  ".css":  "#38bdf8",
  ".json": "#cbcb41",
  ".yaml": "#cc3434",
  ".tf":   "#5c4ee5",
  ".sh":   "#50fa7b",
  ".md":   "#aaaaaa",
};

const LevelBar = ({ level, color }: { level: number; color: string }) => (
  <div className="w-full h-1.5 bg-[#21262d] rounded-full overflow-hidden">
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: `${level}%` }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="h-full rounded-full"
      style={{ background: color }}
    />
  </div>
);

const Skills = () => {
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({
    languages: true,
    frameworks: false,
    devops: false,
    "soft-skills": false,
  });
  const [selectedFile, setSelectedFile] = useState<SkillFile | null>(SKILL_TREE[0].files[0]);

  const toggleFolder = (name: string) => {
    setOpenFolders((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div className="relative min-h-screen ide-bg text-[#e6edf3] overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_50%_30%_at_20%_20%,rgba(188,140,255,0.04),transparent)]" />

      <Navigation />

      <main className="container mx-auto px-4 sm:px-6 pt-20 pb-16 max-w-7xl">

        {/* Page title — styled as a comment */}
        <header className="mb-8 pt-4">
          <h1 className="font-mono text-2xl md:text-3xl font-bold text-[#6272a4]">
            <span className="token-comment">/* skills.json */</span>
          </h1>
          <p className="font-mono text-sm text-[#484f58] mt-2">
            <span className="text-[#3fb950]">$</span> ls -la ~/skills/ --recursive
          </p>
        </header>

        <div className="grid lg:grid-cols-[280px_1fr] gap-4 min-h-[600px]">

          {/* ---- Left: File Explorer ---- */}
          <div className="editor-window overflow-hidden flex flex-col">
            <div className="editor-titlebar flex-shrink-0">
              <div className="flex items-center gap-1.5">
                <div className="traffic-dot traffic-dot-red" />
                <div className="traffic-dot traffic-dot-yellow" />
                <div className="traffic-dot traffic-dot-green" />
              </div>
              <span className="ml-3 font-mono text-xs text-[#8b949e]">EXPLORER</span>
            </div>

            <div className="flex-1 overflow-y-auto p-2" style={{ scrollbarWidth: "thin" }}>
              <div className="font-mono text-[11px] text-[#484f58] px-2 py-1 uppercase tracking-widest">
                ~/skills
              </div>

              {SKILL_TREE.map((folder) => (
                <div key={folder.name} className="mb-1">
                  {/* Folder toggle */}
                  <button
                    onClick={() => toggleFolder(folder.name)}
                    className="file-tree-item w-full text-left hover:bg-[#21262d]"
                    aria-expanded={openFolders[folder.name]}
                  >
                    <span className="text-[10px] transition-transform duration-200" style={{ display: "inline-block", transform: openFolders[folder.name] ? "rotate(90deg)" : "rotate(0deg)" }}>
                      ▶
                    </span>
                    <span>{folder.icon}</span>
                    <span style={{ color: folder.color }}>{folder.name}/</span>
                    <span className="ml-auto text-[#484f58] text-[10px]">{folder.files.length}</span>
                  </button>

                  {/* Files */}
                  <AnimatePresence initial={false}>
                    {openFolders[folder.name] && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden ml-4 border-l border-[#21262d] pl-2"
                      >
                        {folder.files.map((file) => {
                          const extColor = EXT_COLORS[file.ext] || "#8b949e";
                          const isSelected = selectedFile?.name === file.name;
                          return (
                            <button
                              key={file.name}
                              onClick={() => setSelectedFile(file)}
                              className={`file-tree-item w-full text-left ${isSelected ? "active" : ""}`}
                            >
                              <span className="font-bold text-[10px]" style={{ color: extColor }}>
                                {file.ext.replace(".", "").toUpperCase().slice(0, 2)}
                              </span>
                              <span className={isSelected ? "text-[#58a6ff]" : ""}>{file.name}</span>
                              <span style={{ color: extColor }} className="ml-auto text-[10px]">{file.ext}</span>
                            </button>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Explorer status */}
            <div className="border-t border-[#21262d] px-3 py-1.5 font-mono text-[10px] text-[#484f58] flex-shrink-0">
              {SKILL_TREE.reduce((a, f) => a + f.files.length, 0)} skills indexed
            </div>
          </div>

          {/* ---- Right: Detail Pane ---- */}
          <div className="editor-window overflow-hidden flex flex-col">
            {selectedFile ? (
              <>
                {/* Tab header */}
                <div className="editor-titlebar flex-shrink-0">
                  <div className="flex items-center gap-1.5 mr-4">
                    <div className="traffic-dot traffic-dot-red" />
                    <div className="traffic-dot traffic-dot-yellow" />
                    <div className="traffic-dot traffic-dot-green" />
                  </div>
                  <div className="editor-tab active">
                    <span className="font-bold text-[10px]" style={{ color: EXT_COLORS[selectedFile.ext] || "#8b949e" }}>
                      {selectedFile.ext.replace(".", "").toUpperCase().slice(0, 2)}
                    </span>
                    <span>{selectedFile.name}{selectedFile.ext}</span>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedFile.name}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="flex-1 overflow-auto p-6 space-y-6"
                    style={{ scrollbarWidth: "thin" }}
                  >
                    {/* File header */}
                    <div>
                      <div className="font-mono text-[11px] text-[#484f58] mb-2">
                        // {selectedFile.name}{selectedFile.ext} — skill module
                      </div>
                      <h2 className="font-mono text-2xl font-bold" style={{ color: selectedFile.color }}>
                        {selectedFile.name.replace(/_/g, " ")}
                      </h2>
                      <div className="font-mono text-xs text-[#8b949e] mt-1">{selectedFile.ext} module</div>
                    </div>

                    {/* Proficiency */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between font-mono text-xs">
                        <span className="text-[#484f58]">proficiency</span>
                        <span className="font-bold" style={{ color: selectedFile.color }}>{selectedFile.level}%</span>
                      </div>
                      <LevelBar level={selectedFile.level} color={selectedFile.color} />
                    </div>

                    {/* Description as code comment */}
                    <div className="ide-card p-4">
                      <pre className="font-mono text-sm leading-relaxed whitespace-pre-wrap">
                        <span className="token-comment">/**{"\n"} * {selectedFile.description}{"\n"} * @proficiency {selectedFile.level}/100{"\n"} */</span>
                      </pre>
                    </div>

                    {/* Dependencies */}
                    {selectedFile.deps && selectedFile.deps.length > 0 && (
                      <div className="space-y-3">
                        <div className="font-mono text-xs text-[#484f58] uppercase tracking-widest">dependencies</div>
                        <div className="ide-card p-4 font-mono text-xs">
                          <span className="token-keyword">import</span>
                          <span className="token-punctuation"> {"{ "}</span>
                          {selectedFile.deps.map((d, i) => (
                            <span key={d}>
                              <span className="token-string">{d}</span>
                              {i < (selectedFile.deps?.length ?? 0) - 1 && <span className="token-punctuation">, </span>}
                            </span>
                          ))}
                          <span className="token-punctuation">{" }"}</span>
                          <span className="token-keyword"> from </span>
                          <span className="token-string">"@core/skills"</span>
                        </div>
                      </div>
                    )}

                    {/* package.json-style metadata */}
                    <div className="space-y-3">
                      <div className="font-mono text-xs text-[#484f58] uppercase tracking-widest">metadata</div>
                      <div className="ide-card p-4 font-mono text-xs leading-relaxed">
                        <div><span className="token-property">"name"</span><span className="token-punctuation">: </span><span className="token-string">"{selectedFile.name}"</span><span className="token-punctuation">,</span></div>
                        <div><span className="token-property">"version"</span><span className="token-punctuation">: </span><span className="token-string">"1.0.0"</span><span className="token-punctuation">,</span></div>
                        <div><span className="token-property">"proficiency"</span><span className="token-punctuation">: </span><span className="token-number">{selectedFile.level}</span><span className="token-punctuation">,</span></div>
                        <div><span className="token-property">"type"</span><span className="token-punctuation">: </span><span className="token-string">"{selectedFile.ext.slice(1)}"</span><span className="token-punctuation">,</span></div>
                        <div><span className="token-property">"status"</span><span className="token-punctuation">: </span><span className="token-string">"active"</span></div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Status bar */}
                <div className="border-t border-[#21262d] px-4 py-1.5 font-mono text-[10px] text-[#484f58] flex items-center gap-4 flex-shrink-0">
                  <span>● {selectedFile.name}</span>
                  <span>{selectedFile.ext}</span>
                  <span className="ml-auto" style={{ color: selectedFile.color }}>
                    {selectedFile.level >= 80 ? "✓ proficient" : selectedFile.level >= 60 ? "◐ intermediate" : "○ learning"}
                  </span>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center font-mono text-sm text-[#484f58]">
                <span>Select a file to view details</span>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Skills;