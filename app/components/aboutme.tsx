"use client";
import React from "react";
import { Navigation } from "./nav"; // Import Navigation component
import Particles from "./particles"; // Import Particles component
import Link from "next/link";
import BoxReveal from "./magicui/box-reveal";
export default function AboutMe() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-tl from-black via-zinc-600/20 to-black">
      <h1 className="text-center text-5xl md:text-7xl lg:text-8xl font-bold mb-16 tracking-tight text-white">
      About  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">Me</span>
        </h1>
      {/* Include the Particles component */}
      <Particles className="absolute inset-0 z-0" quantity={50} staticity={60} ease={60} refresh={false} />

      {/* Include the Navigation component */}
      <Navigation />
    <div className="size-full max-w-lg items-center justify-center overflow-hidden pt-8">
      {/* About Me Section */}
      <BoxReveal boxColor={"#5046e6"} duration={0.8}>
        <div>
          <p className="text-white mt-2">
            I am Prabhanjan, an Information Science student with a strong foundation in Java, data structures, algorithms, and problem-solving.
          </p>
        </div>
      </BoxReveal>

      {/* Skills Section */}
      <BoxReveal boxColor={"#5046e6"} duration={0.5}>
        <div>
          <h2 className="text-white text-[2rem] font-semibold">Skills</h2>
          <p className="text-white mt-2">I am passionate about web development and have experience working with:</p>
          <ul className="text-white list-disc list-inside mt-2">
            <li>HTML</li>
            <li>CSS</li>
            <li>JavaScript</li>
            <li>SQL</li>
            <li>ReactJS</li>
            <li>NextJS</li>
          </ul>
        </div>
      </BoxReveal>

      {/* Challenges Section */}
      <BoxReveal boxColor={"#5046e6"} duration={0.4}>
        <div>
          <h2 className="text-white text-[2rem] font-semibold">My Approach</h2>
          <p className="text-white mt-2">
            I enjoy taking on new challenges and collaborating with teams to deliver quality projects. In my free time, I work on personal projects, explore different technologies, and continuously learn new skills to expand my knowledge base.
          </p>
        </div>
      </BoxReveal>

      {/* Journey Section */}
      <BoxReveal boxColor={"#5046e6"} duration={1.0}>
        <div>
          <h2 className="text-white text-[2rem] font-semibold">My Journey</h2>
          <p className="text-white mt-2">
            This page showcases my journey, skills, and passions. Feel free to explore the rest of the site to learn more about me and my work!
          </p>
        </div>
      </BoxReveal>
    </div>

      </div>
  );
}
