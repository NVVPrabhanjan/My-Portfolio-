'use client';
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navigation } from "./components/nav";
import { Github, Linkedin, Twitter, Play, Terminal } from "lucide-react";

/* ------------------------------------------------------------------
   JAVA CODE — Developer.java
------------------------------------------------------------------ */
type Token = { t: string; c: string; tooltip?: string };
type CodeLine = { tokens: Token[]; highlight?: boolean };

const JAVA_LINES: CodeLine[] = [
  { tokens: [{ t: "package", c: "token-keyword" }, { t: " dev.prabhanjan;", c: "token-variable" }] },
  { tokens: [] },
  { tokens: [{ t: "/**", c: "token-comment" }] },
  { tokens: [{ t: " * @author  ", c: "token-comment" }, { t: "Prabhanjan N.V.V", c: "token-comment", tooltip: "That's me!" }] },
  { tokens: [{ t: " * @version ", c: "token-comment" }, { t: "2026.1.0", c: "token-comment" }] },
  { tokens: [{ t: " * @since   ", c: "token-comment" }, { t: "Dec 2022", c: "token-comment" }] },
  { tokens: [{ t: " */", c: "token-comment" }] },
  { tokens: [{ t: "public class", c: "token-keyword" }, { t: " Developer", c: "token-type" }, { t: " {", c: "token-punctuation" }] },
  { tokens: [] },
  { tokens: [{ t: "  private final", c: "token-keyword" }, { t: " String", c: "token-type" }, { t: " name", c: "token-variable" }, { t: " = ", c: "token-punctuation" }, { t: '"Prabhanjan N.V.V"', c: "token-string", tooltip: "Open to rename for your team 😄" }, { t: ";", c: "token-punctuation" }] },
  { tokens: [{ t: "  private final", c: "token-keyword" }, { t: " String", c: "token-type" }, { t: " college", c: "token-variable" }, { t: " = ", c: "token-punctuation" }, { t: '"BMSCE · ISE"', c: "token-string" }, { t: ";", c: "token-punctuation" }] },
  { tokens: [{ t: "  private final", c: "token-keyword" }, { t: " double", c: "token-type" }, { t: " cgpa", c: "token-variable" }, { t: " = ", c: "token-punctuation" }, { t: "8.89", c: "token-number", tooltip: "Out of 10.0 🎓" }, { t: ";", c: "token-punctuation" }] },
  { tokens: [{ t: "  private", c: "token-keyword" }, { t: " boolean", c: "token-type" }, { t: " openToWork", c: "token-variable" }, { t: " = ", c: "token-punctuation" }, { t: "true", c: "token-keyword", tooltip: "Currently seeking internships!" }, { t: ";", c: "token-punctuation" }] },
  { tokens: [] },
  { tokens: [{ t: "  private", c: "token-keyword" }, { t: " String[]", c: "token-type" }, { t: " roles", c: "token-variable" }, { t: " = {", c: "token-punctuation" }] },
  { tokens: [{ t: '    "Full Stack Developer"', c: "token-string", tooltip: "React · Next.js · Node.js" }, { t: ",", c: "token-punctuation" }] },
  { tokens: [{ t: '    "Java Developer"', c: "token-string", tooltip: "OOP · Spring · JDBC" }, { t: ",", c: "token-punctuation" }] },
  { tokens: [{ t: '    "Problem Solver"', c: "token-string", tooltip: "LeetCode · System Design" }] },
  { tokens: [{ t: "  };", c: "token-punctuation" }] },
  { tokens: [] },
  { tokens: [{ t: "  public static void", c: "token-keyword" }, { t: " main", c: "token-function" }, { t: "(String[] args) {", c: "token-punctuation" }] },
  { tokens: [{ t: "    Developer", c: "token-type" }, { t: " dev", c: "token-variable" }, { t: " = ", c: "token-punctuation" }, { t: "new", c: "token-keyword" }, { t: " Developer();", c: "token-punctuation" }] },
  { tokens: [{ t: "    dev.", c: "token-variable" }, { t: "build", c: "token-function", tooltip: "Click ▶ Run to explore!" }, { t: "();", c: "token-punctuation" }] },
  { tokens: [{ t: "  }", c: "token-punctuation" }] },
  { tokens: [{ t: "}", c: "token-punctuation" }] },
];

/* ------------------------------------------------------------------
   ALTERNATE FILE — pom.xml snippet (shown on tab click)
------------------------------------------------------------------ */
const POM_LINES: CodeLine[] = [
  { tokens: [{ t: "<?xml ", c: "token-keyword" }, { t: 'version="1.0"', c: "token-string" }, { t: "?>", c: "token-keyword" }] },
  { tokens: [{ t: "<project>", c: "token-tag" }] },
  { tokens: [{ t: "  <groupId>", c: "token-tag" }, { t: "dev.prabhanjan", c: "token-string" }, { t: "</groupId>", c: "token-tag" }] },
  { tokens: [{ t: "  <artifactId>", c: "token-tag" }, { t: "portfolio", c: "token-string" }, { t: "</artifactId>", c: "token-tag" }] },
  { tokens: [{ t: "  <version>", c: "token-tag" }, { t: "2026.1.0", c: "token-number" }, { t: "</version>", c: "token-tag" }] },
  { tokens: [{ t: "  <dependencies>", c: "token-tag" }] },
  { tokens: [{ t: "    <dependency>", c: "token-tag" }] },
  { tokens: [{ t: "      <artifactId>", c: "token-tag" }, { t: "spring-boot", c: "token-string" }, { t: "</artifactId>", c: "token-tag" }] },
  { tokens: [{ t: "    </dependency>", c: "token-tag" }] },
  { tokens: [{ t: "    <dependency>", c: "token-tag" }] },
  { tokens: [{ t: "      <artifactId>", c: "token-tag" }, { t: "react-nextjs", c: "token-string" }, { t: "</artifactId>", c: "token-tag" }] },
  { tokens: [{ t: "    </dependency>", c: "token-tag" }] },
  { tokens: [{ t: "  </dependencies>", c: "token-tag" }] },
  { tokens: [{ t: "</project>", c: "token-tag" }] },
];

/* ------------------------------------------------------------------
   STATS — with tooltips
------------------------------------------------------------------ */
const STATS = [
  { label: "projects",  value: "6+",    color: "#58a6ff", tooltip: "Full-stack & systems projects" },
  { label: "users",     value: "2K+",   color: "#3fb950", tooltip: "On the Farouche platform" },
  { label: "cgpa",      value: "8.89",  color: "#bc8cff", tooltip: "Out of 10.0 at BMSCE" },
  { label: "throughput",value: "+20%",  color: "#e3b341", tooltip: "Node.js optimisation @ Looped Labs" },
];

const SOCIALS = [
  { href: "https://github.com/NVVPrabhanjan",                                 label: "github",   icon: <Github className="w-3.5 h-3.5" />,   user: "NVVPrabhanjan" },
  { href: "https://www.linkedin.com/in/n-v-venkata-prabhanjan-740213248/",    label: "linkedin", icon: <Linkedin className="w-3.5 h-3.5" />, user: "prabhanjan-nv" },
  { href: "https://x.com/Venkatprabhanj2",                                   label: "twitter",  icon: <Twitter className="w-3.5 h-3.5" />,  user: "@Venkatprabhanj2" },
];

/* ------------------------------------------------------------------
   TABS
------------------------------------------------------------------ */
type TabId = "java" | "pom";
const TABS: { id: TabId; label: string; icon: string; color: string }[] = [
  { id: "java", label: "Developer.java", icon: "☕", color: "#f89820" },
  { id: "pom",  label: "pom.xml",        icon: "<>", color: "#e3b341" },
];

/* ------------------------------------------------------------------
   MINIMAP
------------------------------------------------------------------ */
const MinimapBar = ({ w, color }: { w: number; color: string }) => (
  <div className="h-[2px] mb-[2px]" style={{ width: `${w}%`, background: color, borderRadius: 1, opacity: 0.7 }} />
);

const MINIMAP_JAVA = [
  { w: 50, c: "#bd93f9" }, { w: 0,  c: "transparent" }, { w: 60, c: "#6272a4" }, { w: 50, c: "#6272a4" },
  { w: 45, c: "#6272a4" }, { w: 40, c: "#6272a4" }, { w: 20, c: "#6272a4" }, { w: 65, c: "#f89820" },
  { w: 0,  c: "transparent" }, { w: 70, c: "#8be9fd" }, { w: 65, c: "#8be9fd" }, { w: 55, c: "#50fa7b" },
  { w: 40, c: "#ff79c6" }, { w: 0,  c: "transparent" }, { w: 50, c: "#f1fa8c" }, { w: 55, c: "#f1fa8c" },
  { w: 60, c: "#f1fa8c" }, { w: 50, c: "#f1fa8c" }, { w: 20, c: "#f8f8f2" }, { w: 0,  c: "transparent" },
  { w: 65, c: "#8be9fd" }, { w: 60, c: "#bd93f9" }, { w: 50, c: "#8be9fd" }, { w: 20, c: "#f8f8f2" }, { w: 10, c: "#f8f8f2" },
];

/* ------------------------------------------------------------------
   INTERACTIVE CODE LINE
------------------------------------------------------------------ */
const CodeLineRow = ({
  line, lineNum, isVisible, isHovered, onHover, onLeave
}: {
  line: CodeLine;
  lineNum: number;
  isVisible: boolean;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) => {
  const [tooltip, setTooltip] = useState<string | null>(null);

  return (
    <div
      className={`relative flex items-center transition-all duration-150 cursor-default select-text
        ${isHovered ? "bg-[#ffffff08]" : ""}
        ${!isVisible ? "opacity-0" : "opacity-100"}
      `}
      onMouseEnter={onHover}
      onMouseLeave={() => { onLeave(); setTooltip(null); }}
      role="row"
    >
      {/* Line number */}
      <div
        className={`flex-shrink-0 w-10 text-right pr-3 font-mono text-[11px] select-none transition-colors ${
          isHovered ? "text-[#8b949e]" : "text-[#3c4553]"
        }`}
      >
        {lineNum}
      </div>

      {/* Code */}
      <div className="flex-1 px-3 font-mono text-[12px] leading-[1.65] whitespace-pre">
        {line.tokens.length === 0 ? (
          <span>&nbsp;</span>
        ) : (
          line.tokens.map((tok, j) => (
            <span
              key={j}
              className={`${tok.c} ${tok.tooltip ? "cursor-help underline decoration-dotted decoration-[#484f58] underline-offset-2 hover:decoration-current" : ""} transition-colors duration-100`}
              onMouseEnter={() => tok.tooltip && setTooltip(tok.tooltip)}
              onMouseLeave={() => setTooltip(null)}
            >
              {tok.t}
            </span>
          ))
        )}
      </div>

      {/* Tooltip */}
      <AnimatePresence>
        {tooltip && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.95 }}
            transition={{ duration: 0.12 }}
            className="absolute left-14 -top-8 z-50 px-2.5 py-1.5 font-mono text-[10px] text-[#e6edf3] bg-[#1f2428] border border-[#30363d] rounded shadow-xl pointer-events-none whitespace-nowrap"
          >
            {tooltip}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ------------------------------------------------------------------
   STAT CARD — interactive
------------------------------------------------------------------ */
const StatCard = ({ stat }: { stat: typeof STATS[0] }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="ide-card p-3 text-center cursor-default group relative overflow-hidden transition-all duration-200 hover:border-[#30363d]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="font-mono text-lg font-bold transition-transform duration-200 group-hover:scale-110" style={{ color: stat.color }}>
        {stat.value}
      </div>
      <div className="font-mono text-[10px] text-[#484f58] mt-0.5">{stat.label}</div>
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-x-0 bottom-0 px-2 py-1.5 bg-[#1f2428] border-t border-[#30363d] font-mono text-[9px] text-[#8b949e] text-center"
          >
            {stat.tooltip}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ------------------------------------------------------------------
   HOME PAGE
------------------------------------------------------------------ */
export default function Home() {
  const [activeTab, setActiveTab]       = useState<TabId>("java");
  const [visibleLines, setVisibleLines] = useState(0);
  const [doneTyping, setDoneTyping]     = useState(false);
  const [hoveredLine, setHoveredLine]   = useState<number | null>(null);
  const [mounted, setMounted]           = useState(false);
  const [runOutput, setRunOutput]       = useState<string[]>([]);
  const [isRunning, setIsRunning]       = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentLines = activeTab === "java" ? JAVA_LINES : POM_LINES;

  // Typing animation — fast but readable
  useEffect(() => {
    setMounted(true);
    setVisibleLines(0);
    setDoneTyping(false);
    let idx = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      idx++;
      setVisibleLines(idx);
      if (idx >= currentLines.length) {
        clearInterval(intervalRef.current!);
        setDoneTyping(true);
      }
    }, activeTab === "java" ? 70 : 50);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [activeTab]);

  // "Run" button simulation
  const handleRun = () => {
    if (isRunning) return;
    setIsRunning(true);
    setRunOutput([]);
    const outputs = [
      "> javac Developer.java",
      "> java Developer",
      "",
      "  Initializing dev.prabhanjan.Developer...",
      "  Loading skills: [React, Node.js, Java, AWS] ✓",
      "  Running build pipeline... ✓",
      "  openToWork = true",
      "",
      '  System.out.println("Building awesome apps!");',
      "  → Building awesome apps!",
      "",
      "  Process finished with exit code 0",
    ];
    outputs.forEach((line, i) => {
      setTimeout(() => {
        setRunOutput((prev) => [...prev, line]);
        if (i === outputs.length - 1) setIsRunning(false);
      }, i * 120);
    });
  };

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen ide-bg overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_40%_at_60%_0%,rgba(248,152,32,0.04),transparent)]" />
      <Navigation />

      <main className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 flex flex-col lg:flex-row gap-4 lg:gap-6 items-start"
        style={{ paddingTop: "clamp(3.5rem,8vh,5rem)", paddingBottom: "2rem", minHeight: "100svh" }}
      >
        {/* ================================================================
            LEFT — Editor Window (compact)
        ================================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full lg:w-[56%] flex-shrink-0"
        >
          <div className="editor-window shadow-2xl shadow-black/60">

            {/* ---- Title bar + file tabs ---- */}
            <div className="editor-titlebar h-9">
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <div className="traffic-dot traffic-dot-red" />
                <div className="traffic-dot traffic-dot-yellow" />
                <div className="traffic-dot traffic-dot-green" />
              </div>
              {/* Tabs — clickable */}
              <div className="ml-3 flex items-stretch overflow-x-auto flex-1" style={{ scrollbarWidth: "none" }}>
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`editor-tab flex-shrink-0 transition-all duration-200 relative ${activeTab === tab.id ? "active" : "opacity-60 hover:opacity-90"}`}
                    aria-selected={activeTab === tab.id}
                  >
                    <span className="text-[10px] font-bold" style={{ color: tab.color }}>{tab.icon}</span>
                    <span className="text-[11px]">{tab.label}</span>
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="tab-underline"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#f89820]"
                        transition={{ type: "spring", stiffness: 400, damping: 35 }}
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Run button */}
              <button
                onClick={handleRun}
                disabled={isRunning}
                className={`ml-auto flex items-center gap-1.5 px-3 h-full font-mono text-[11px] font-bold transition-all flex-shrink-0
                  ${isRunning ? "text-[#484f58] cursor-not-allowed" : "text-[#3fb950] hover:bg-[#3fb950]/10 hover:text-[#57c975]"}`}
                title="Run Developer.java"
              >
                <Play className="w-3 h-3" />
                Run
              </button>
            </div>

            {/* ---- Breadcrumb ---- */}
            <div className="flex items-center gap-1 px-4 py-1 bg-[#0d1117] border-b border-[#21262d] font-mono text-[10px] text-[#484f58]">
              <span>portfolio</span><span>›</span>
              <span>src</span><span>›</span>
              <span>dev.prabhanjan</span><span>›</span>
              <span className="text-[#8b949e]">{activeTab === "java" ? "Developer.java" : "pom.xml"}</span>
            </div>

            {/* ---- Editor body ---- */}
            <div className="flex" style={{ maxHeight: "360px" }}>

              {/* Code + gutter */}
              <div className="flex flex-1 overflow-auto" style={{ scrollbarWidth: "thin" }}>
                {/* Gutter */}
                <div className="flex-shrink-0 bg-[#0d1117] py-2" aria-hidden="true" style={{ minWidth: "40px" }}>
                  {currentLines.map((_, i) => (
                    <div
                      key={i}
                      className={`w-full text-right pr-2 font-mono text-[11px] leading-[1.65] select-none transition-colors ${
                        hoveredLine === i ? "text-[#8b949e]" : "text-[#3c4553]"
                      } ${i < visibleLines ? "" : "opacity-0"}`}
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>

                {/* Lines */}
                <div className="flex-1 py-2 bg-[#0d1117]" role="grid" aria-label="Code editor">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      {currentLines.map((line, i) => (
                        <CodeLineRow
                          key={i}
                          line={line}
                          lineNum={i + 1}
                          isVisible={i < visibleLines}
                          isHovered={hoveredLine === i}
                          onHover={() => setHoveredLine(i)}
                          onLeave={() => setHoveredLine(null)}
                        />
                      ))}
                      {/* Cursor */}
                      {!doneTyping && visibleLines < currentLines.length && (
                        <div className="flex items-center pl-10 h-[21px]">
                          <span className="cursor-blink inline-block w-[6px] h-[13px] bg-[#e6edf3] ml-3 align-middle" aria-label="text cursor" />
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Minimap */}
              <div className="hidden lg:flex flex-col w-[48px] border-l border-[#21262d] py-2 px-1.5 flex-shrink-0 bg-[#0a0e13]" aria-hidden="true">
                {MINIMAP_JAVA.map((b, i) => (
                  <MinimapBar key={i} w={b.w} color={b.c} />
                ))}
              </div>
            </div>

            {/* ---- Console / Run Output ---- */}
            <AnimatePresence>
              {runOutput.length > 0 && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="border-t border-[#21262d] overflow-hidden"
                >
                  <div className="flex items-center gap-2 px-4 py-1.5 bg-[#111827] border-b border-[#21262d]">
                    <Terminal className="w-3 h-3 text-[#484f58]" />
                    <span className="font-mono text-[10px] text-[#484f58]">TERMINAL</span>
                    <button
                      onClick={() => setRunOutput([])}
                      className="ml-auto font-mono text-[10px] text-[#484f58] hover:text-[#e6edf3] transition-colors"
                    >
                      ✕ clear
                    </button>
                  </div>
                  <div className="px-4 py-2 bg-[#0d1117] max-h-[120px] overflow-y-auto font-mono text-[11px] leading-relaxed space-y-px" style={{ scrollbarWidth: "thin" }}>
                    {runOutput.map((line, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -4 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.1 }}
                        className={
                          line.startsWith(">") ? "text-[#3fb950]" :
                          line.includes("exit code 0") ? "text-[#3fb950] font-bold" :
                          line.includes("→") ? "text-[#f1fa8c]" :
                          line.startsWith("  ") ? "text-[#8b949e]" :
                          "text-[#484f58]"
                        }
                      >
                        {line || <span>&nbsp;</span>}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ---- Status bar ---- */}
            <div className="flex items-center justify-between px-3 py-1 bg-[#f89820] font-mono text-[10px] text-[#0d1117] font-bold">
              <div className="flex items-center gap-3">
                <span>⎇ main</span>
                <span className="opacity-60">|</span>
                <span>☕ Java 17</span>
                <span className="opacity-60">|</span>
                <span>✓ 0 errors</span>
              </div>
              <div className="flex items-center gap-3 opacity-70">
                <span>UTF-8</span>
                <span>Ln {Math.min(visibleLines, currentLines.length)}</span>
              </div>
            </div>
          </div>

          {/* Hint text */}
          <p className="mt-2 font-mono text-[10px] text-[#3c4553] text-center">
            hover lines for tooltips · click tabs to switch · press{" "}
            <span className="text-[#3fb950]">▶ Run</span> to execute
          </p>
        </motion.div>

        {/* ================================================================
            RIGHT — Compact Dashboard
        ================================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.12, ease: "easeOut" }}
          className="w-full lg:w-[44%] space-y-3"
        >
          {/* ── Name / status ── */}
          <div className="ide-card p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[10px] text-[#3fb950] font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#3fb950] git-pulse" aria-hidden="true" />
                ● OPEN TO WORK
              </span>
              <span className="font-mono text-[10px] text-[#484f58]">status: active</span>
            </div>
            <h1 className="font-mono text-xl font-bold text-[#e6edf3] leading-tight">
              Prabhanjan <span className="text-[#f89820]">N.V.V</span>
            </h1>
            <p className="font-mono text-xs text-[#8b949e] mt-1">
              Full Stack Developer · Java · BMSCE ISE
            </p>
            <p className="font-mono text-[10px] text-[#484f58] mt-1">
              📍 Bengaluru, India
            </p>
          </div>

          {/* ── Stats grid ── */}
          <div className="grid grid-cols-4 gap-2">
            {STATS.map((s) => (
              <StatCard key={s.label} stat={s} />
            ))}
          </div>

          {/* ── Git remotes ── */}
          <div className="ide-card overflow-hidden">
            <div className="px-3 py-2 border-b border-[#21262d] font-mono text-[10px] text-[#8b949e] flex items-center gap-2">
              <span className="text-[#f05032]">⎇</span>
              <span>git remote -v</span>
            </div>
            <div className="px-3 py-2 space-y-1.5">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-mono text-[11px] text-[#8b949e] hover:text-[#58a6ff] group transition-colors"
                >
                  <span className="text-[#3fb950] font-bold w-16 flex-shrink-0 group-hover:text-[#58a6ff] transition-colors">
                    {s.label}
                  </span>
                  <span className="flex items-center gap-1.5 opacity-75 group-hover:opacity-100 transition-opacity">
                    {s.icon}
                    <span className="truncate max-w-[140px]">{s.user}</span>
                  </span>
                  <span className="ml-auto text-[9px] opacity-30 group-hover:opacity-60">(fetch)</span>
                </a>
              ))}
            </div>
          </div>

          {/* ── CTA buttons ── */}
          <div className="flex gap-2">
            <Link
              href="/projects"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 font-mono text-xs font-bold text-[#0d1117] bg-[#3fb950] hover:bg-[#57c975] rounded transition-all hover:scale-[1.02] active:scale-95 shadow-md shadow-[#3fb950]/20"
            >
              <span>▶</span> run projects
            </Link>
            <Link
              href="/contact"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 font-mono text-xs font-bold text-[#e6edf3] border border-[#30363d] hover:border-[#58a6ff]/60 hover:bg-[#58a6ff]/5 rounded transition-all hover:scale-[1.02] active:scale-95"
            >
              <span className="text-[#58a6ff]">$</span> contact --me
            </Link>
          </div>

          {/* ── Quick nav links ── */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { href: "/aboutme",    label: "about.tsx",  color: "#61dafb" },
              { href: "/skills",     label: "skills.json", color: "#cbcb41" },
              { href: "/Experience", label: "experience.git", color: "#f05032" },
            ].map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="ide-card px-3 py-2 font-mono text-[10px] text-[#484f58] hover:text-[#e6edf3] hover:border-[#30363d] transition-all text-center truncate"
                style={{ color: "inherit" }}
              >
                <span style={{ color: n.color }}>›</span> {n.label}
              </Link>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
