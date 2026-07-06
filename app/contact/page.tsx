"use client";
import React, { useState, useRef, useEffect, KeyboardEvent } from "react";
import { Navigation } from "../components/nav";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, Phone } from "lucide-react";

/* ------------------------------------------------------------------
   TERMINAL STATE MACHINE
------------------------------------------------------------------ */
type Stage = "idle" | "name" | "email" | "message" | "confirm" | "sending" | "done";

interface TerminalLine {
  type: "prompt" | "input" | "output" | "success" | "error" | "info" | "comment";
  text: string;
}

const SOCIALS = [
  { icon: <Mail className="w-4 h-4" />,     label: "email",    href: "mailto:nvvenkatprabhanjan@gmail.com",                         value: "nvvenkatprabhanjan@gmail.com",          color: "#f85149" },
  { icon: <Github className="w-4 h-4" />,   label: "github",   href: "https://github.com/NVVPrabhanjan",                             value: "github.com/NVVPrabhanjan",              color: "#e6edf3" },
  { icon: <Linkedin className="w-4 h-4" />, label: "linkedin", href: "https://www.linkedin.com/in/n-v-venkata-prabhanjan-740213248/", value: "linkedin.com/in/n-v-venkata-prabhanjan", color: "#0077b5" },
  { icon: <Twitter className="w-4 h-4" />,  label: "twitter",  href: "https://x.com/Venkatprabhanj2",                               value: "x.com/Venkatprabhanj2",                 color: "#1da1f2" },
  { icon: <Phone className="w-4 h-4" />,    label: "phone",    href: "tel:7893152309",                                               value: "+91 7893152309",                        color: "#3fb950" },
];

const BOOT_LINES: TerminalLine[] = [
  { type: "comment", text: "# contact.sh — interactive message transmitter v1.0.0" },
  { type: "output",  text: "Initializing secure channel..." },
  { type: "success", text: "✓ Connection established — prabhanjan.live" },
  { type: "output",  text: "" },
  { type: "info",    text: "Welcome! Use the terminal below to send a message." },
  { type: "info",    text: "Type your responses and press Enter to continue." },
  { type: "output",  text: "" },
];

export default function ContactMe() {
  const [stage, setStage]           = useState<Stage>("idle");
  const [lines, setLines]           = useState<TerminalLine[]>(BOOT_LINES);
  const [inputVal, setInputVal]     = useState("");
  const [name, setName]             = useState("");
  const [email, setEmail]           = useState("");
  const [message, setMessage]       = useState("");
  const [started, setStarted]       = useState(false);
  const inputRef                    = useRef<HTMLInputElement>(null);
  const bottomRef                   = useRef<HTMLDivElement>(null);

  // Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  // Focus input on click
  const focusInput = () => inputRef.current?.focus();

  const addLines = (newLines: TerminalLine[]) => {
    setLines((prev) => [...prev, ...newLines]);
  };

  const prompt = (text: string) => {
    addLines([{ type: "prompt", text }]);
  };

  const handleStart = () => {
    setStarted(true);
    setStage("name");
    addLines([
      { type: "prompt",  text: "contact.sh --start" },
      { type: "output",  text: "" },
      { type: "info",    text: "Starting message transmission..." },
      { type: "output",  text: "" },
      { type: "prompt",  text: "contact --name" },
      { type: "output",  text: "Enter your name:" },
    ]);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const validateEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const handleSubmit = () => {
    const val = inputVal.trim();
    if (!val) return;

    // Echo input
    addLines([{ type: "input", text: `> ${val}` }]);
    setInputVal("");

    if (stage === "name") {
      setName(val);
      setStage("email");
      addLines([
        { type: "output", text: "" },
        { type: "success", text: `✓ Name registered: ${val}` },
        { type: "output", text: "" },
        { type: "prompt", text: "contact --email" },
        { type: "output", text: "Enter your email address:" },
      ]);
    } else if (stage === "email") {
      if (!validateEmail(val)) {
        addLines([
          { type: "error",  text: "✗ Invalid email format. Please try again." },
          { type: "prompt", text: "contact --email" },
          { type: "output", text: "Enter your email address:" },
        ]);
        return;
      }
      setEmail(val);
      setStage("message");
      addLines([
        { type: "output", text: "" },
        { type: "success", text: `✓ Email verified: ${val}` },
        { type: "output", text: "" },
        { type: "prompt", text: "contact --message" },
        { type: "output", text: "Enter your message (press Enter when done):" },
      ]);
    } else if (stage === "message") {
      setMessage(val);
      setStage("confirm");
      addLines([
        { type: "output", text: "" },
        { type: "success", text: "✓ Message captured." },
        { type: "output", text: "" },
        { type: "output", text: "┌─ Transmission Preview ─────────────────────────────┐" },
        { type: "output", text: `│  From:    ${name.padEnd(41)}│` },
        { type: "output", text: `│  Email:   ${val.slice(0,41).padEnd(41)}│` },
        { type: "output", text: `│  Message: ${val.slice(0,41).padEnd(41)}│` },
        { type: "output", text: "└────────────────────────────────────────────────────┘" },
        { type: "output", text: "" },
        { type: "prompt", text: "contact --confirm" },
        { type: "output", text: "Send this message? [y/N]:" },
      ]);
    } else if (stage === "confirm") {
      if (val.toLowerCase() === "y" || val.toLowerCase() === "yes") {
        setStage("sending");
        addLines([
          { type: "output", text: "" },
          { type: "info",   text: "Establishing connection to prabhanjan.live..." },
          { type: "info",   text: "Encrypting payload..." },
          { type: "info",   text: "Transmitting packet [████████████████] 100%" },
        ]);
        // Simulate sending
        setTimeout(() => {
          setStage("done");
          addLines([
            { type: "output",  text: "" },
            { type: "success", text: "✓ ACK received from prabhanjan.live" },
            { type: "success", text: "✓ Message delivered successfully!" },
            { type: "output",  text: "" },
            { type: "comment", text: "# Prabhanjan will respond within 24 hours." },
            { type: "output",  text: "" },
            { type: "output",  text: "[session] Connection closed." },
            { type: "output",  text: "[session] Exit code: 0" },
          ]);
        }, 2000);
      } else {
        setStage("idle");
        setStarted(false);
        addLines([
          { type: "output", text: "" },
          { type: "error",  text: "✗ Transmission cancelled." },
          { type: "output", text: "" },
          { type: "info",   text: "Session terminated. Click 'Start Session' to try again." },
        ]);
      }
    }
  };

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSubmit();
  };

  const getPromptColor = (type: TerminalLine["type"]) => {
    switch (type) {
      case "prompt":  return "text-[#3fb950]";
      case "input":   return "text-[#e6edf3]";
      case "success": return "text-[#3fb950]";
      case "error":   return "text-[#f85149]";
      case "info":    return "text-[#58a6ff]";
      case "comment": return "text-[#6272a4]";
      default:        return "text-[#8b949e]";
    }
  };

  return (
    <div className="relative min-h-screen ide-bg text-[#e6edf3] overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_50%_30%_at_70%_20%,rgba(63,185,80,0.03),transparent)]" />
      <Navigation />

      <main className="container mx-auto px-4 sm:px-6 pt-20 pb-16 max-w-7xl">
        {/* Header */}
        <header className="mb-8 pt-4">
          <h1 className="font-mono text-2xl md:text-3xl font-bold text-[#50fa7b]">
            {"/** contact.sh **/"}
          </h1>
          <p className="font-mono text-xs text-[#484f58] mt-2">
            <span className="text-[#3fb950]">$</span> ./contact.sh --interactive
          </p>
        </header>

        <div className="grid lg:grid-cols-[1fr_300px] gap-6">

          {/* ---- Terminal Window ---- */}
          <div className="terminal-window shadow-2xl shadow-black/50 flex flex-col" style={{ minHeight: "520px" }}>
            {/* Titlebar */}
            <div className="terminal-titlebar flex-shrink-0">
              <div className="traffic-dot traffic-dot-red" />
              <div className="traffic-dot traffic-dot-yellow" />
              <div className="traffic-dot traffic-dot-green" />
              <span className="ml-3 font-mono text-xs text-[#8b949e]">
                prabhanjan@portfolio:~$ contact.sh
              </span>
              <div className="ml-auto flex items-center gap-1.5 font-mono text-[10px] text-[#484f58]">
                {stage === "done" ? (
                  <span className="text-[#3fb950]">● session closed</span>
                ) : started ? (
                  <span className="text-[#e3b341]">● session active</span>
                ) : (
                  <span className="text-[#484f58]">○ idle</span>
                )}
              </div>
            </div>

            {/* Output area */}
            <div
              className="flex-1 overflow-y-auto terminal-body cursor-text"
              onClick={focusInput}
              style={{ scrollbarWidth: "thin" }}
            >
              {lines.map((line, i) => (
                <AnimatePresence key={i} mode="wait">
                  <motion.div
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.15 }}
                    className={`font-mono text-xs leading-relaxed whitespace-pre-wrap ${getPromptColor(line.type)}`}
                  >
                    {line.type === "prompt" ? (
                      <span>
                        <span className="text-[#3fb950]">prabhanjan@portfolio</span>
                        <span className="text-[#e6edf3]">:~$</span>{" "}
                        <span className="text-[#e6edf3]">{line.text}</span>
                      </span>
                    ) : (
                      line.text
                    )}
                  </motion.div>
                </AnimatePresence>
              ))}

              {/* Live input line */}
              {started && stage !== "done" && stage !== "sending" && (
                <div className="flex items-center gap-1 font-mono text-xs mt-1">
                  <span className="text-[#3fb950]">{">"}</span>
                  <span className="text-[#e6edf3]">{inputVal}</span>
                  <span className="cursor-blink inline-block w-[6px] h-[13px] bg-[#e6edf3] align-middle" />
                </div>
              )}

              {/* Sending animation */}
              {stage === "sending" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-mono text-xs text-[#e3b341] mt-2"
                >
                  <span className="cursor-blink">▮</span> Processing...
                </motion.div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input row */}
            <div className="border-t border-[#21262d] px-4 py-3 flex items-center gap-3 flex-shrink-0">
              {!started && stage !== "done" ? (
                <button
                  onClick={handleStart}
                  className="flex items-center gap-2 px-4 py-2 font-mono text-xs font-bold text-[#0d1117] bg-[#3fb950] hover:bg-[#57c975] rounded transition-all hover:scale-[1.02] active:scale-95"
                >
                  <span>▶</span> Start Session
                </button>
              ) : stage === "done" ? (
                <div className="font-mono text-xs text-[#484f58]">
                  Session closed · Exit code: 0
                </div>
              ) : (
                <>
                  <span className="font-mono text-xs text-[#3fb950] flex-shrink-0">$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    onKeyDown={handleKey}
                    disabled={stage === "sending"}
                    className="flex-1 bg-transparent font-mono text-xs text-[#e6edf3] outline-none placeholder-[#484f58] caret-transparent"
                    placeholder={
                      stage === "name"    ? "Type your name..." :
                      stage === "email"   ? "your@email.com" :
                      stage === "message" ? "Type your message..." :
                      stage === "confirm" ? "y / n" : ""
                    }
                    autoComplete="off"
                    spellCheck={false}
                    aria-label="Terminal input"
                  />
                  <button
                    onClick={handleSubmit}
                    disabled={stage === "sending" || !inputVal.trim()}
                    className="px-3 py-1.5 font-mono text-xs text-[#0d1117] bg-[#3fb950] hover:bg-[#57c975] disabled:opacity-40 disabled:pointer-events-none rounded transition-all"
                    aria-label="Submit"
                  >
                    ↵
                  </button>
                </>
              )}
            </div>
          </div>

          {/* ---- Right: SSH Connections panel ---- */}
          <div className="space-y-4">
            {/* Connection panel */}
            <div className="editor-window overflow-hidden">
              <div className="editor-titlebar">
                <div className="flex items-center gap-1.5">
                  <div className="traffic-dot traffic-dot-red" />
                  <div className="traffic-dot traffic-dot-yellow" />
                  <div className="traffic-dot traffic-dot-green" />
                </div>
                <span className="ml-3 font-mono text-xs text-[#8b949e]">connections.sh</span>
              </div>
              <div className="p-4 space-y-3">
                <div className="font-mono text-[10px] text-[#484f58] mb-3">
                  # Direct connections
                </div>
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 group"
                  >
                    <div className="mt-0.5 flex-shrink-0" style={{ color: s.color }}>
                      {s.icon}
                    </div>
                    <div>
                      <div className="font-mono text-[11px] text-[#484f58] group-hover:text-[#8b949e] transition-colors">
                        {s.label}@prabhanjan
                      </div>
                      <div
                        className="font-mono text-xs group-hover:underline transition-colors truncate max-w-[200px]"
                        style={{ color: s.color }}
                      >
                        {s.value}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Response time */}
            <div className="editor-window overflow-hidden">
              <div className="px-4 py-3 border-b border-[#21262d] font-mono text-[10px] text-[#484f58]">
                // response SLA
              </div>
              <div className="p-4 space-y-2 font-mono text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#8b949e]">Email</span>
                  <span className="text-[#3fb950]">&lt; 24h</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#8b949e]">LinkedIn</span>
                  <span className="text-[#3fb950]">&lt; 24h</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#8b949e]">GitHub</span>
                  <span className="text-[#e3b341]">&lt; 48h</span>
                </div>
                <div className="mt-3 pt-3 border-t border-[#21262d]">
                  <div className="flex items-center gap-2 text-[10px] text-[#484f58]">
                    <span className="w-2 h-2 rounded-full bg-[#3fb950]" aria-hidden="true" />
                    Open to internships, freelance, and collaboration
                  </div>
                </div>
              </div>
            </div>

            {/* Compiler success */}
            <div className="editor-window overflow-hidden border-[#3fb950]/20">
              <div className="p-4 font-mono text-xs space-y-1.5">
                <div className="text-[#3fb950]">✓ Build Successful</div>
                <div className="text-[#3fb950]">✓ Tests Passed (42/42)</div>
                <div className="text-[#3fb950]">✓ Ready to Deploy</div>
                <div className="text-[#e3b341] mt-2">⚡ Available immediately</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}