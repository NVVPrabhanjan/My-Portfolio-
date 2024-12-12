'use client';
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Particles from "./components/particles";
import IconCloud from "@/app/components/magicui/icon-cloud";

// Icon slugs array
const slugs = [
  "typescript",
  "javascript",
  "dart",
  "java",
  "react",
  "flutter",
  "android",
  "html5",
  "css3",
  "nodedotjs",
  "express",
  "nextdotjs",
  "prisma",
  "amazonaws",
  "postgresql",
  "firebase",
  "nginx",
  "vercel",
  "testinglibrary",
  "jest",
  "cypress",
  "docker",
  "git",
  "jira",
  "github",
  "gitlab",
  "visualstudiocode",
  "androidstudio",
  "sonarqube",
  "figma",
];

// Navigation array
const navigation = [
  { name: "About Me", href: "/aboutme" },
  { name: "Contact", href: "/contact" },
  { name: "Education", href: "/Education" },
  { name: "Skills", href: "/skills" },
  { name: "Projects", href: "/projects" },
  { name: "Experience", href: "/Experience" },
  { name: "Resume", href: "/resume.pdf" },
];

export default function Home() {
  const [hasVisited, setHasVisited] = useState(false);

  useEffect(() => {
    const visited = localStorage.getItem("hasVisited");
    if (visited) {
      setHasVisited(true);
    }
  }, []);

  const handleAnimationEnd = () => {
    localStorage.setItem("hasVisited", "true");
    setHasVisited(true);
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black">
      <nav className={`my-8 md:my-16 ${!hasVisited ? 'animate-fade-in' : ''}`}>
        <ul className="flex flex-col md:flex-row items-center justify-center gap-4">
          {navigation.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-sm md:text-base duration-500 text-zinc-500 hover:text-zinc-300"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="hidden md:block w-screen h-px animate-glow bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0 animate-fade-left" />

      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={100}
      />

      <h1
        className={`py-3 px-1 z-10 text-3xl sm:text-4xl md:text-6xl lg:text-9xl text-transparent bg-white cursor-default text-edge-outline ${
          !hasVisited ? "animate-title" : ""
        } font-display whitespace-nowrap bg-clip-text duration-1000`}
        onAnimationEnd={handleAnimationEnd}
      >
        Prabhanjan
      </h1>

      <div className="hidden md:block w-screen h-px animate-glow bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0 animate-fade-right" />
      {/* Pass the required iconSlugs prop */}
      <IconCloud iconSlugs={slugs} width="200px" />
    </div>
  );
}
