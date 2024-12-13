"use client";
import React from "react";
import { Navigation } from "./nav";
import Particles from "./particles";
import BoxReveal from "./magicui/box-reveal";

export const Education: React.FC = () => {
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
          My{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
            Education
          </span>
        </h1>

        <div className="space-y-8">
          <BoxReveal boxColor="#5046e6" duration={0.5}>
            <div className="bg-white/10 p-6 rounded-xl">
              <h2 className="text-3xl font-bold text-white mb-4">
                B M S College of Engineering
              </h2>
              <p className="text-xl text-[#5046e6] mb-2">
                Bachelor of Engineering - Information Science and Engineering
              </p>
              <div className="text-white space-y-2">
                <p>
                  <span className="font-semibold">CGPA:</span> 9.02
                </p>
                <p>
                  <span className="font-semibold">Duration:</span> Dec 2022 -
                  May 2026*
                </p>
                <p className="text-sm text-gray-300">
                  * Expected graduation date
                </p>
              </div>
            </div>
          </BoxReveal>

          <BoxReveal boxColor="#5046e6" duration={0.7}>
            <div className="bg-white/10 p-6 rounded-xl">
              <h3 className="text-2xl font-semibold text-white mb-4">
                Academic Highlights
              </h3>
              <ul className="list-disc list-inside text-white space-y-2">
                <li>Consistently maintained high academic performance</li>
                <li>Active participant in technical workshops and seminars</li>
                <li>
                  Strong foundation in computer science and software engineering
                </li>
                <li>
                  Developed practical skills through industry-relevant
                  coursework
                </li>
              </ul>
            </div>
          </BoxReveal>
        </div>
      </div>
    </div>
  );
};

export default Education;
