import Link from "next/link";
import React from "react";
import Particles from "./components/particles";

const navigation = [
  { name: "About Me", href: "/aboutme" },
  { name: "Contact", href: "/contact" },
  { name: "Education", href: "/Education" },
  { name: "Skills", href: "/skills" },
  { name: "Projects", href: "/projects" },
  { name: "Achievements and Certifications", href: "/achievements" },
  { name: "Resume", href: "/resume.pdf" },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black">
      <nav className="my-8 md:my-16 animate-fade-in">
        <ul className="flex flex-col md:flex-row items-center justify-center gap-4">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm md:text-base duration-500 text-zinc-500 hover:text-zinc-300"
            >
              {item.name}
            </Link>
          ))}
        </ul>
      </nav>

      <div className="hidden md:block w-screen h-px animate-glow bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0 animate-fade-left" />
      
      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={100}
      />
      
      <h1 className="py-3 px-1 z-10 text-3xl sm:text-4xl md:text-6xl lg:text-9xl text-transparent bg-white cursor-default text-edge-outline animate-title font-display whitespace-nowrap bg-clip-text duration-1000">
        Prabhanjan
      </h1>

      <div className="hidden md:block w-screen h-px animate-glow bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0 animate-fade-right" />

      <div className="my-8 md:my-16 text-center animate-fade-in">
        <h2 className="text-xs sm:text-sm md:text-base text-zinc-500 px-4 sm:px-8 md:px-20 lg:px-52">
          An Information Science student with a strong foundation in Java, data
          structures, algorithms and problem-solving. Skilled in HTML, CSS,
          JavaScript, NodeJS, SQL and MongoDB. Good at working in teams with
          strong communication skills, and taking on new projects and practical
          tasks.
        </h2>
      </div>
    </div>
  );
}
