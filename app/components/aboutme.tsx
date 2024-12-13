"use client";
import React from "react";
import { Navigation } from "./nav";
import Particles from "./particles";
import BoxReveal from "./magicui/box-reveal";

export default function AboutMe() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-tl from-black via-zinc-600/20 to-black">
      <Navigation />
      <Particles 
        className="absolute inset-0 z-0" 
        quantity={50} 
        staticity={60} 
        ease={60} 
        refresh={false} 
      />

<div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl pt-20 md:pt-32">
        <h1 className="text-center text-5xl md:text-7xl lg:text-8xl font-bold mb-16 tracking-tight text-white">
          About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">Me</span>
        </h1>

        <div className="space-y-8">
          <BoxReveal boxColor="#5046e6" duration={0.8}>
            <p className="text-white text-lg">
              Hi, I'm Prabhanjan, an Information Science student passionate about technology and innovation. 
              I have a strong foundation in programming, data structures, and problem-solving.
            </p>
          </BoxReveal>

          <BoxReveal boxColor="#5046e6" duration={0.6}>
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">Skills</h2>
              <div className="grid grid-cols-2 gap-2 text-white">
                <ul className="list-disc list-inside">
                  <li>HTML</li>
                  <li>CSS</li>
                  <li>JavaScript</li>
                </ul>
                <ul className="list-disc list-inside">
                  <li>SQL</li>
                  <li>ReactJS</li>
                  <li>NextJS</li>
                </ul>
              </div>
            </div>
          </BoxReveal>

          <BoxReveal boxColor="#5046e6" duration={0.7}>
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">My Approach</h2>
              <p className="text-white text-lg">
                I thrive on challenges and collaborative teamwork. My goal is to create innovative solutions 
                that make a meaningful impact. I continuously learn and explore new technologies to expand my skills.
              </p>
            </div>
          </BoxReveal>

          <BoxReveal boxColor="#5046e6" duration={1.0}>
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">My Journey</h2>
              <p className="text-white text-lg">
                This site is a reflection of my professional growth and passion for technology. 
                I invite you to explore my projects and learn more about my journey.
              </p>
            </div>
          </BoxReveal>
        </div>
      </div>
    </div>
  );
}