"use client";
import React, { useState } from "react";
import { Navigation } from "./nav";
import { motion, AnimatePresence } from "framer-motion";

/* ------------------------------------------------------------------
   DATA — education as a filesystem
------------------------------------------------------------------ */
interface FileNode {
  name: string;
  type: "file" | "dir";
  ext?: string;
  content?: string;
  children?: FileNode[];
}

const EDUCATION_TREE: FileNode = {
  name: "BMSCE",
  type: "dir",
  children: [
    {
      name: "degree.md",
      type: "file",
      ext: "md",
      content: `# B.E. — Information Science and Engineering\n\n**Institution:** B.M.S. College of Engineering, Bengaluru\n**Duration:** Dec 2022 → May 2026 *(Expected)*\n**Location:** Bengaluru, India\n\n> One of India's premier autonomous engineering institutions, BMSCE has consistently\n> ranked among the top 50 engineering colleges nationally.`,
    },
    {
      name: "cgpa.json",
      type: "file",
      ext: "json",
      content: `{\n  "score": 8.89,\n  "max": 10.0,\n  "grade": "A+",\n  "status": "active",\n  "semester": 7\n}`,
    },
    {
      name: ".env",
      type: "file",
      ext: "env",
      content: `START_DATE="Dec 2022"\nEND_DATE="May 2026"\nSTATUS="enrolled"\nBRANCH="Information Science"\nCOLLEGE_CODE="BMSCE"\nCITY="Bengaluru"`,
    },
    {
      name: "coursework",
      type: "dir",
      children: [
        { name: "DSA.java",      type: "file", ext: "java",  content: "// Data Structures & Algorithms\n// Arrays, Linked Lists, Trees, Graphs\n// Dynamic Programming, Greedy, Backtracking\n// Time complexity: O(n log n) avg case" },
        { name: "DBMS.sql",      type: "file", ext: "sql",   content: "-- Database Management Systems\n-- Normalization (1NF → BCNF)\n-- Joins, Indexes, Transactions\n-- Query optimization, Views, Triggers" },
        { name: "OS.c",          type: "file", ext: "c",     content: "/* Operating Systems */\n/* Process management, scheduling */\n/* Memory allocation, paging */\n/* File systems, deadlock prevention */" },
        { name: "Networks.sh",   type: "file", ext: "sh",    content: "# Computer Networks\n# OSI Model, TCP/IP stack\n# Routing protocols, DNS, HTTP\n# Network security fundamentals" },
        { name: "SoftEng.md",    type: "file", ext: "md",    content: "# Software Engineering\n## SDLC, Agile, Scrum\n## Design patterns, UML\n## Testing strategies, CI/CD\n## Version control workflows" },
        { name: "WebTech.tsx",   type: "file", ext: "tsx",   content: "// Web Technologies\n// HTML5, CSS3, JavaScript ES2024\n// React, Next.js App Router\n// REST APIs, GraphQL basics" },
        { name: "OOP.java",      type: "file", ext: "java",  content: "// Object-Oriented Programming\n// Encapsulation, Inheritance\n// Polymorphism, Abstraction\n// Design principles: SOLID, DRY" },
        { name: "SysDesign.md",  type: "file", ext: "md",    content: "# System Design Foundations\n## Scalability, load balancing\n## Caching strategies, CDN\n## Microservices architecture\n## Database sharding" },
      ],
    },
    {
      name: "projects",
      type: "dir",
      children: [
        { name: "FAROUCHE.ts",   type: "file", ext: "ts",   content: "// Farouche Event Platform\n// 2000+ participants, 45+ events\n// Stack: Next.js, Kafka, AWS EC2\n// Status: ✓ DEPLOYED" },
        { name: "JobPortal.jsx", type: "file", ext: "jsx",  content: "// Job Portal Platform\n// Full-stack MERN application\n// JWT auth, role-based access\n// Status: ✓ DEPLOYED" },
        { name: "portfolio.tsx", type: "file", ext: "tsx",  content: "// IDE-themed Portfolio\n// Next.js 13 + Tailwind + Framer\n// You are looking at this right now\n// Status: ✓ RUNNING" },
      ],
    },
    {
      name: "highlights.json",
      type: "file",
      ext: "json",
      content: `[\n  {\n    "title": "Academic Performance",\n    "note": "8.89 CGPA consistently maintained"\n  },\n  {\n    "title": "Technical Engagement",\n    "note": "Hackathons, dev workshops, seminars"\n  },\n  {\n    "title": "Practical Labs",\n    "note": "Full-stack systems, OOP, databases"\n  },\n  {\n    "title": "Open Source",\n    "note": "Projects on GitHub: NVVPrabhanjan"\n  }\n]`,
    },
  ],
};

const EXT_COLORS: Record<string, string> = {
  md:   "#aaaaaa",
  json: "#cbcb41",
  env:  "#50fa7b",
  java: "#f89820",
  sql:  "#e38c00",
  c:    "#f34b7d",
  sh:   "#50fa7b",
  tsx:  "#61dafb",
  jsx:  "#61dafb",
  ts:   "#3178c6",
};

const FILE_ICONS: Record<string, string> = {
  md:   "📝",
  json: "{}",
  env:  "🔧",
  java: "☕",
  sql:  "🗃️",
  c:    "⚙️",
  sh:   "$",
  tsx:  "⚛",
  jsx:  "⚛",
  ts:   "TS",
};

interface TreeNodeProps {
  node: FileNode;
  depth?: number;
  onSelect: (node: FileNode) => void;
  selectedName: string | null;
}

const TreeNode: React.FC<TreeNodeProps> = ({ node, depth = 0, onSelect, selectedName }) => {
  const [open, setOpen] = useState(depth === 0);

  if (node.type === "dir") {
    return (
      <div>
        <button
          onClick={() => setOpen((v) => !v)}
          className="file-tree-item w-full text-left"
          style={{ paddingLeft: `${8 + depth * 16}px` }}
          aria-expanded={open}
        >
          <span className="text-[#e3b341] text-xs" aria-hidden="true">{open ? "▾" : "▸"}</span>
          <span aria-hidden="true">📁</span>
          <span className="text-[#e5c07b]">{node.name}/</span>
          {node.children && (
            <span className="ml-auto text-[#484f58] text-[10px]">{node.children.length}</span>
          )}
        </button>
        <AnimatePresence initial={false}>
          {open && node.children && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
              style={{ borderLeft: `1px solid #21262d`, marginLeft: `${16 + depth * 16}px` }}
            >
              {node.children.map((child) => (
                <TreeNode
                  key={child.name}
                  node={child}
                  depth={depth + 1}
                  onSelect={onSelect}
                  selectedName={selectedName}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  const ext = node.ext || "";
  const color = EXT_COLORS[ext] || "#8b949e";
  const icon  = FILE_ICONS[ext] || "📄";
  const isSelected = selectedName === node.name;

  return (
    <button
      onClick={() => onSelect(node)}
      className={`file-tree-item w-full text-left ${isSelected ? "active" : ""}`}
      style={{ paddingLeft: `${8 + depth * 16}px` }}
    >
      <span className="font-bold text-[10px]" style={{ color }}>{icon}</span>
      <span className={isSelected ? "text-[#58a6ff]" : ""}>{node.name}</span>
      <span className="ml-auto text-[10px] opacity-60" style={{ color }}>.{ext}</span>
    </button>
  );
};

export const Education: React.FC = () => {
  const [selected, setSelected] = useState<FileNode | null>(
    EDUCATION_TREE.children?.find((n) => n.type === "file") ?? null
  );

  const ext = selected?.ext ?? "";
  const iconColor = EXT_COLORS[ext] || "#8b949e";

  return (
    <div className="relative min-h-screen ide-bg text-[#e6edf3] overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_50%_30%_at_30%_20%,rgba(227,179,65,0.03),transparent)]" />
      <Navigation />

      <main className="container mx-auto px-4 sm:px-6 pt-20 pb-16 max-w-7xl">
        {/* Header */}
        <header className="mb-8 pt-4">
          <h1 className="font-mono text-2xl md:text-3xl font-bold text-[#e3b341]">
            $ ls -la ~/education/
          </h1>
          <p className="font-mono text-xs text-[#484f58] mt-2">
            B.M.S. College of Engineering · Information Science · Bengaluru
          </p>
        </header>

        <div className="grid lg:grid-cols-[260px_1fr] gap-4 min-h-[600px]">
          {/* File explorer */}
          <div className="editor-window overflow-hidden flex flex-col">
            <div className="editor-titlebar flex-shrink-0">
              <div className="flex items-center gap-1.5">
                <div className="traffic-dot traffic-dot-red" />
                <div className="traffic-dot traffic-dot-yellow" />
                <div className="traffic-dot traffic-dot-green" />
              </div>
              <span className="ml-3 font-mono text-xs text-[#8b949e]">EXPLORER</span>
            </div>
            <div className="flex-1 overflow-y-auto py-2" style={{ scrollbarWidth: "thin" }}>
              <div className="font-mono text-[11px] text-[#484f58] px-3 py-1 uppercase tracking-widest">
                ~/education
              </div>
              <TreeNode
                node={EDUCATION_TREE}
                depth={0}
                onSelect={setSelected}
                selectedName={selected?.name ?? null}
              />
            </div>
            {/* Directory info */}
            <div className="border-t border-[#21262d] px-3 py-1.5 font-mono text-[10px] text-[#484f58] flex-shrink-0">
              BMSCE · ISE · 8.89 CGPA
            </div>
          </div>

          {/* File preview pane */}
          <div className="editor-window overflow-hidden flex flex-col">
            {selected ? (
              <>
                {/* Tab */}
                <div className="editor-titlebar flex-shrink-0">
                  <div className="flex items-center gap-1.5 mr-4">
                    <div className="traffic-dot traffic-dot-red" />
                    <div className="traffic-dot traffic-dot-yellow" />
                    <div className="traffic-dot traffic-dot-green" />
                  </div>
                  <div className="editor-tab active">
                    <span className="font-bold text-[10px]" style={{ color: iconColor }}>
                      {FILE_ICONS[ext] || "📄"}
                    </span>
                    <span>{selected.name}</span>
                  </div>
                </div>

                {/* Breadcrumb */}
                <div className="flex items-center gap-1 px-4 py-1.5 bg-[#0d1117] border-b border-[#21262d] font-mono text-[11px] text-[#484f58]">
                  <span>BMSCE</span>
                  <span>›</span>
                  <span className="text-[#8b949e]">{selected.name}</span>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={selected.name}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.18 }}
                    className="flex"
                    style={{ flex: 1, overflow: "hidden" }}
                  >
                    {/* Gutter */}
                    <div className="editor-gutter py-4 flex-shrink-0" aria-hidden="true">
                      {(selected.content ?? "").split("\n").map((_, i) => (
                        <div key={i} className="line-number">{i + 1}</div>
                      ))}
                    </div>
                    {/* Content */}
                    <div
                      className="flex-1 overflow-auto py-4 px-5 font-mono text-sm leading-relaxed whitespace-pre-wrap"
                      style={{ scrollbarWidth: "thin" }}
                    >
                      {ext === "json" ? (
                        <span className="token-string">{selected.content}</span>
                      ) : ext === "env" ? (
                        selected.content?.split("\n").map((line, i) => {
                          const [key, val] = line.split("=");
                          return (
                            <div key={i}>
                              <span className="token-variable">{key}</span>
                              <span className="token-operator">=</span>
                              <span className="token-string">{val}</span>
                            </div>
                          );
                        })
                      ) : (
                        <pre className="whitespace-pre-wrap font-mono text-[13px] text-[#8b949e] leading-relaxed">
                          {selected.content}
                        </pre>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Status strip */}
                <div className="border-t border-[#21262d] px-4 py-1.5 font-mono text-[10px] text-[#484f58] flex items-center gap-4 flex-shrink-0">
                  <span>{selected.name}</span>
                  <span style={{ color: iconColor }}>.{ext}</span>
                  <span className="ml-auto text-[#3fb950]">✓ read-only</span>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center font-mono text-sm text-[#484f58]">
                Select a file to preview
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Education;