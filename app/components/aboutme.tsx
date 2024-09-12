"use client";
import React from "react";
import { Navigation } from "./nav"; // Import Navigation component
import Particles from "./particles"; // Import Particles component
import Link from "next/link";

export default function AboutMe() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-tl from-black via-zinc-600/20 to-black">
      {/* Include the Particles component */}
      <Particles className="absolute inset-0 z-0" quantity={50} staticity={60} ease={60} refresh={false} />

      {/* Include the Navigation component */}
      <Navigation />

      <div className="relative z-10 text-center">
        <h1 className="text-4xl text-white font-bold sm:text-6xl md:text-8xl">
          About Me
        </h1>
        <p className="text-white mx-10 my-3 sm:mx-20 lg:mx-52">
          I am Prabhanjan, an Information Science student with a strong foundation in Java, data structures, algorithms, and problem-solving. I am passionate about web development and have experience working with HTML, CSS, JavaScript, Node.js, SQL, and MongoDB. I enjoy taking on new challenges and collaborating with teams to deliver quality projects. In my free time, I work on personal projects, explore different technologies, and continuously learn new skills to expand my knowledge base.
        </p>
        <p className="mt-4 text-zinc-400 text-lg">
          This page showcases my journey, skills, and passions. Feel free to explore the rest of the site to learn more about me and my work!
        </p>
      </div>
    </div>
  );
}
