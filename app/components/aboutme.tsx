import React from "react";
import Link from "next/link";

export default function AboutMe() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-tl from-black via-zinc-600/20 to-black">
      <nav className="my-8">
        <Link href="/">
          <a className="text-sm text-zinc-500 hover:text-zinc-300">
            &larr; Back to Home
          </a>
        </Link>
      </nav>

      <div className="text-center">
        <h1 className="text-4xl text-white font-bold sm:text-6xl md:text-8xl">
          About Me
        </h1>
        <p className="mt-4 text-zinc-400 text-lg max-w-3xl">
          I am Prabhanjan, an Information Science student with a strong
          foundation in Java, data structures, algorithms, and problem-solving.
          I am passionate about web development and have experience working with
          HTML, CSS, JavaScript, Node.js, SQL, and MongoDB. I enjoy taking on
          new challenges and collaborating with teams to deliver quality
          projects. In my free time, I work on personal projects, explore
          different technologies, and continuously learn new skills to expand my
          knowledge base.
        </p>
        <p className="mt-4 text-zinc-400 text-lg">
          This page showcases my journey, skills, and passions. Feel free to
          explore the rest of the site to learn more about me and my work!
        </p>
      </div>
    </div>
  );
}
