'use client';
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Navigation } from "./components/nav";
import { Github, Linkedin, Twitter } from "lucide-react";

/* ------------------------------------------------------------------
   TYPING CODE — describes Prabhanjan as a typed object
------------------------------------------------------------------ */
const CODE_LINES = [
  { tokens: [{ t: "// portfolio/src/developer.ts", c: "token-comment" }] },
  { tokens: [] },
  { tokens: [{ t: "interface", c: "token-keyword" }, { t: " Developer ", c: "token-type" }, { t: "{", c: "token-punctuation" }] },
  { tokens: [{ t: "  name:", c: "token-property" }, { t: " string;", c: "token-punctuation" }] },
  { tokens: [{ t: "  role:", c: "token-property" }, { t: " string[];", c: "token-punctuation" }] },
  { tokens: [{ t: "  location:", c: "token-property" }, { t: " string;", c: "token-punctuation" }] },
  { tokens: [{ t: "  education:", c: "token-property" }, { t: " string;", c: "token-punctuation" }] },
  { tokens: [{ t: "  openToWork:", c: "token-property" }, { t: " boolean;", c: "token-punctuation" }] },
  { tokens: [{ t: "}", c: "token-punctuation" }] },
  { tokens: [] },
  { tokens: [{ t: "const", c: "token-keyword" }, { t: " prabhanjan", c: "token-variable" }, { t: ": ", c: "token-punctuation" }, { t: "Developer", c: "token-type" }, { t: " = {", c: "token-punctuation" }] },
  { tokens: [{ t: "  name:", c: "token-property" }, { t: ' "', c: "token-punctuation" }, { t: "Prabhanjan N.V.V", c: "token-string" }, { t: '",', c: "token-punctuation" }] },
  { tokens: [{ t: "  role:", c: "token-property" }, { t: " [", c: "token-punctuation" }] },
  { tokens: [{ t: '    "', c: "token-punctuation" }, { t: "Full Stack Developer", c: "token-string" }, { t: '",', c: "token-punctuation" }] },
  { tokens: [{ t: '    "', c: "token-punctuation" }, { t: "Java Developer", c: "token-string" }, { t: '",', c: "token-punctuation" }] },
  { tokens: [{ t: '    "', c: "token-punctuation" }, { t: "Problem Solver", c: "token-string" }, { t: '",', c: "token-punctuation" }] },
  { tokens: [{ t: "  ],", c: "token-punctuation" }] },
  { tokens: [{ t: "  location:", c: "token-property" }, { t: ' "', c: "token-punctuation" }, { t: "Bengaluru, India", c: "token-string" }, { t: '",', c: "token-punctuation" }] },
  { tokens: [{ t: "  education:", c: "token-property" }, { t: ' "', c: "token-punctuation" }, { t: "BMSCE · ISE · 8.89 CGPA", c: "token-string" }, { t: '",', c: "token-punctuation" }] },
  { tokens: [{ t: "  openToWork:", c: "token-property" }, { t: " true", c: "token-keyword" }, { t: ",", c: "token-punctuation" }] },
  { tokens: [{ t: "};", c: "token-punctuation" }] },
  { tokens: [] },
  { tokens: [{ t: "export default", c: "token-keyword" }, { t: " prabhanjan;", c: "token-variable" }] },
];

/* Dashboard panels on the right side */
const STATS = [
  { label: "projects", value: "6+",    color: "#58a6ff" },
  { label: "users",    value: "2000+", color: "#3fb950" },
  { label: "cgpa",     value: "8.89",  color: "#bc8cff" },
  { label: "yoe",      value: "1+",    color: "#e3b341" },
];

const SOCIALS = [
  { href: "https://github.com/NVVPrabhanjan",                          label: "GitHub",   icon: <Github className="w-4 h-4" />,   user: "NVVPrabhanjan" },
  { href: "https://www.linkedin.com/in/n-v-venkata-prabhanjan-740213248/", label: "LinkedIn", icon: <Linkedin className="w-4 h-4" />, user: "prabhanjan-nv" },
  { href: "https://x.com/Venkatprabhanj2",                             label: "Twitter",  icon: <Twitter className="w-4 h-4" />,  user: "@Venkatprabhanj2" },
];

/* ------------------------------------------------------------------
   MINIMAP — abstract colored bars
------------------------------------------------------------------ */
const MinimapBar = ({ width, color, opacity = 1 }: { width: number; color: string; opacity?: number }) => (
  <div className="flex items-center h-[3px] mb-[2px]" aria-hidden="true">
    <div style={{ width: `${width}%`, background: color, opacity, borderRadius: 1 }} className="h-full" />
  </div>
);

export default function Home() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [mounted, setMounted] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setMounted(true);
    // Reveal lines one by one with a typewriter pace
    let lineIdx = 0;
    intervalRef.current = setInterval(() => {
      lineIdx++;
      setVisibleLines(lineIdx);
      if (lineIdx >= CODE_LINES.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
    }, 90);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="relative min-h-screen ide-bg overflow-hidden">
      {/* Subtle radial accent */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_30%_at_70%_10%,rgba(88,166,255,0.05),transparent)]" />

      <Navigation />

      <main
        className="relative z-10 container mx-auto px-4 sm:px-6 pt-16 md:pt-10 pb-12 max-w-7xl min-h-screen flex flex-col lg:flex-row items-center gap-8 lg:gap-10"
        style={{ paddingTop: "clamp(4rem, 10vh, 6rem)" }}
      >
        {mounted && (
          <>
            {/* ============================================================
                LEFT — Editor Window
            ============================================================ */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-full lg:w-[55%] flex-shrink-0"
              aria-label="Code editor showing developer profile"
            >
              <div className="editor-window shadow-2xl shadow-black/50">
                {/* Window chrome */}
                <div className="editor-titlebar">
                  <div className="flex items-center gap-1.5">
                    <div className="traffic-dot traffic-dot-red" />
                    <div className="traffic-dot traffic-dot-yellow" />
                    <div className="traffic-dot traffic-dot-green" />
                  </div>
                  {/* File tabs */}
                  <div className="ml-4 flex items-center gap-0 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
                    <div className="editor-tab active">
                      <span className="text-[10px] font-bold text-[#3178c6]">TS</span>
                      <span>developer.ts</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#3fb950] ml-1" title="Saved" />
                    </div>
                    <div className="editor-tab opacity-50">
                      <span className="text-[10px] font-bold text-[#61dafb]">⚛</span>
                      <span>index.tsx</span>
                    </div>
                    <div className="editor-tab opacity-40">
                      <span className="text-[10px] text-[#cbcb41]">{"{}"}</span>
                      <span>package.json</span>
                    </div>
                  </div>
                </div>

                {/* Breadcrumb */}
                <div className="flex items-center gap-1 px-4 py-1.5 bg-[#0d1117] border-b border-[#21262d] font-mono text-[11px] text-[#484f58]" aria-label="File path">
                  <span>portfolio</span>
                  <span>›</span>
                  <span>src</span>
                  <span>›</span>
                  <span className="text-[#8b949e]">developer.ts</span>
                </div>

                {/* Editor body: gutter + code + minimap */}
                <div className="flex overflow-hidden" style={{ maxHeight: "420px" }}>
                  {/* Gutter */}
                  <div className="editor-gutter py-4 flex flex-col flex-shrink-0" aria-hidden="true">
                    {CODE_LINES.map((_, i) => (
                      <div key={i} className={`line-number ${i < visibleLines ? "active" : "opacity-30"}`}>
                        {i + 1}
                      </div>
                    ))}
                  </div>

                  {/* Code lines */}
                  <div className="flex-1 py-4 px-4 overflow-auto font-mono text-[13px] leading-[1.6]" style={{ scrollbarWidth: "thin" }}>
                    {CODE_LINES.map((line, i) => (
                      <div
                        key={i}
                        className={`transition-opacity duration-200 whitespace-pre ${
                          i === 0 ? "diff-add" :
                          i >= 10 && i <= 20 ? "diff-add" :
                          "diff-context"
                        } ${i < visibleLines ? "opacity-100" : "opacity-0"}`}
                      >
                        {line.tokens.length === 0 ? (
                          <span>&nbsp;</span>
                        ) : (
                          line.tokens.map((tok, j) => (
                            <span key={j} className={tok.c}>{tok.t}</span>
                          ))
                        )}
                        {/* Blinking cursor on last visible line */}
                        {i === visibleLines - 1 && visibleLines < CODE_LINES.length && (
                          <span className="cursor-blink inline-block w-[7px] h-[14px] bg-[#e6edf3] align-middle ml-[1px]" aria-label="text cursor" />
                        )}
                      </div>
                    ))}
                    {/* Cursor after all done */}
                    {visibleLines >= CODE_LINES.length && (
                      <div className="diff-context flex items-center font-mono text-[13px]">
                        <span className="cursor-blink inline-block w-[7px] h-[14px] bg-[#58a6ff] align-middle" aria-label="text cursor" />
                      </div>
                    )}
                  </div>

                  {/* Minimap */}
                  <div className="hidden lg:block w-[60px] border-l border-[#21262d] py-4 px-2 flex-shrink-0 bg-[#0d1117]" aria-hidden="true">
                    <MinimapBar width={80} color="#6272a4" />
                    <MinimapBar width={0}  color="transparent" />
                    <MinimapBar width={50} color="#ff79c6" />
                    <MinimapBar width={30} color="#8be9fd" />
                    <MinimapBar width={30} color="#8be9fd" />
                    <MinimapBar width={40} color="#8be9fd" />
                    <MinimapBar width={20} color="#8be9fd" />
                    <MinimapBar width={10} color="#f8f8f2" />
                    <MinimapBar width={0}  color="transparent" />
                    <MinimapBar width={70} color="#50fa7b" opacity={0.7} />
                    <MinimapBar width={55} color="#bd93f9" />
                    <MinimapBar width={60} color="#f1fa8c" />
                    <MinimapBar width={10} color="#f8f8f2" />
                    <MinimapBar width={50} color="#f1fa8c" />
                    <MinimapBar width={50} color="#f1fa8c" />
                    <MinimapBar width={50} color="#f1fa8c" />
                    <MinimapBar width={10} color="#f8f8f2" />
                    <MinimapBar width={60} color="#f1fa8c" />
                    <MinimapBar width={70} color="#f1fa8c" />
                    <MinimapBar width={30} color="#ff79c6" />
                    <MinimapBar width={10} color="#f8f8f2" />
                    <MinimapBar width={0}  color="transparent" />
                    <MinimapBar width={50} color="#bd93f9" />
                  </div>
                </div>

                {/* Editor status strip */}
                <div className="flex items-center justify-between px-4 py-1.5 bg-[#007ACC] font-mono text-[11px] text-white border-t border-[#0062a3]" aria-label="Editor status">
                  <div className="flex items-center gap-3">
                    <span>⎇ main</span>
                    <span className="opacity-70">|</span>
                    <span className="text-[#90ee90]">✓ 0 errors</span>
                    <span className="opacity-70">|</span>
                    <span>TypeScript 5.2</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span>UTF-8</span>
                    <span>LF</span>
                    <span>Ln {visibleLines}, Col 1</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ============================================================
                RIGHT — Developer Dashboard Panels
            ============================================================ */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
              className="w-full lg:w-[45%] space-y-4"
            >
              {/* Status badge */}
              <div className="ide-card p-4 flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#3fb950] git-pulse flex-shrink-0" aria-hidden="true" />
                  <span className="font-mono text-xs text-[#3fb950] font-bold tracking-wider">● OPEN TO WORK</span>
                </div>
                <div className="ml-auto font-mono text-xs text-[#484f58]">status: active</div>
              </div>

              {/* Package.json panel */}
              <div className="ide-card overflow-hidden">
                <div className="editor-titlebar">
                  <div className="flex items-center gap-1.5">
                    <div className="traffic-dot traffic-dot-red" />
                    <div className="traffic-dot traffic-dot-yellow" />
                    <div className="traffic-dot traffic-dot-green" />
                  </div>
                  <span className="ml-3 font-mono text-xs text-[#cbcb41]">{"{}"}</span>
                  <span className="font-mono text-xs text-[#8b949e]">package.json</span>
                </div>
                <pre className="p-4 font-mono text-xs leading-relaxed text-[#8b949e] overflow-auto" style={{ scrollbarWidth: "thin" }}>
<span className="token-punctuation">{"{"}</span>{"\n"}
<span className="token-property">  "name"</span><span className="token-punctuation">: </span><span className="token-string">"prabhanjan-nvv"</span><span className="token-punctuation">,</span>{"\n"}
<span className="token-property">  "version"</span><span className="token-punctuation">: </span><span className="token-string">"2026.1.0"</span><span className="token-punctuation">,</span>{"\n"}
<span className="token-property">  "status"</span><span className="token-punctuation">: </span><span className="token-string">"seeking-internship"</span><span className="token-punctuation">,</span>{"\n"}
<span className="token-property">  "skills"</span><span className="token-punctuation">: </span><span className="token-punctuation">{"["}</span><span className="token-string">"React"</span><span className="token-punctuation">, </span><span className="token-string">"Node.js"</span><span className="token-punctuation">, </span><span className="token-string">"Java"</span><span className="token-punctuation">, </span><span className="token-string">"AWS"</span><span className="token-punctuation">{"],"}</span>{"\n"}
<span className="token-property">  "cgpa"</span><span className="token-punctuation">: </span><span className="token-number">8.89</span><span className="token-punctuation">,</span>{"\n"}
<span className="token-property">  "license"</span><span className="token-punctuation">: </span><span className="token-string">"MIT"</span>{"\n"}
<span className="token-punctuation">{"}"}</span>
                </pre>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-3">
                {STATS.map((s) => (
                  <div key={s.label} className="ide-card p-3 text-center hover:border-[#30363d] transition-colors">
                    <div className="font-mono text-xl font-bold" style={{ color: s.color }}>{s.value}</div>
                    <div className="font-mono text-[10px] text-[#484f58] mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Git remotes / socials */}
              <div className="ide-card overflow-hidden">
                <div className="px-4 py-2 border-b border-[#21262d] font-mono text-xs text-[#8b949e] flex items-center gap-2">
                  <span className="text-[#f05032]">⎇</span>
                  <span>git remote -v</span>
                </div>
                <div className="p-4 space-y-2">
                  {SOCIALS.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 font-mono text-xs text-[#8b949e] hover:text-[#58a6ff] group transition-colors"
                    >
                      <span className="text-[#3fb950] font-bold group-hover:text-[#58a6ff] transition-colors">{s.label.padEnd(10)}</span>
                      <span className="flex items-center gap-1.5 opacity-70 group-hover:opacity-100 transition-opacity">
                        {s.icon}
                        <span>{s.user}</span>
                      </span>
                      <span className="ml-auto opacity-30 group-hover:opacity-70 text-[10px]">(fetch)</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/projects"
                  className="flex-1 flex items-center justify-center gap-2 px-5 py-3 font-mono text-sm font-bold text-[#0B0F14] bg-[#3fb950] hover:bg-[#57c975] rounded transition-all duration-200 hover:scale-[1.02] active:scale-95 shadow-lg shadow-[#3fb950]/20"
                >
                  <span>▶</span>
                  <span>run projects.ts</span>
                </Link>
                <Link
                  href="/contact"
                  className="flex-1 flex items-center justify-center gap-2 px-5 py-3 font-mono text-sm font-bold text-[#e6edf3] border border-[#30363d] hover:border-[#58a6ff]/60 hover:bg-[#58a6ff]/5 rounded transition-all duration-200 hover:scale-[1.02] active:scale-95"
                >
                  <span className="text-[#58a6ff]">$</span>
                  <span>contact --me</span>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </main>
    </div>
  );
}
