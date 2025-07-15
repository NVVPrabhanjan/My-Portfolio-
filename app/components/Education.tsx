"use client";
import React from "react";
import { Navigation } from "./nav";
import Particles from "./particles";
import BoxReveal from "./magicui/box-reveal";

const educationData = {
  university: "B M S College of Engineering",
  degree: "Bachelor of Engineering - Information Science and Engineering",
  cgpa: "8.89",
  duration: {
    start: "Dec 2022",
    end: "May 2026",
  },
  highlights: [
    {
      title: "Academic Excellence",
      description: "Consistently maintained high academic performance with 8.89 CGPA"
    },
    {
      title: "Technical Engagement",
      description: "Active participant in technical workshops and seminars"
    },
    {
      title: "Core Competency",
      description: "Strong foundation in computer science fundamentals and software engineering principles"
    },
    {
      title: "Practical Experience",
      description: "Hands-on experience through industry-relevant coursework and projects"
    }
  ]
};

export const Education: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-tl from-black via-zinc-600/20 to-black">
      <Navigation />
      <Particles
        className="absolute inset-0 -z-10"
        quantity={50}
        staticity={60}
        ease={60}
        refresh={false}
      />

      <main className="container mx-auto px-4 py-20 md:py-32 relative">
        <header className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white">
            My{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 animate-gradient">
              Education
            </span>
          </h1>
        </header>

        <div className="max-w-4xl mx-auto space-y-8">
          <div> {/* Wrapper div to handle BoxReveal children prop */}
            <BoxReveal boxColor="#5046e6" duration={0.5}>
              <div className="bg-white/10 p-6 rounded-xl">
                <h2 className="text-3xl font-bold text-white mb-2">
                  {educationData.university}
                </h2>
                <p className="text-xl font-medium bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-4">
                  {educationData.degree}
                </p>
                <div className="flex flex-wrap gap-4 mb-4">
                  <span className="px-3 py-1 text-sm bg-white/20 rounded-full text-white">
                    CGPA: {educationData.cgpa}
                  </span>
                  <span className="px-3 py-1 text-sm bg-white/20 rounded-full text-white">
                    {educationData.duration.start} - {educationData.duration.end}*
                  </span>
                </div>
                <p className="text-sm text-gray-400">* Expected graduation date</p>
              </div>
            </BoxReveal>
          </div>

          <div> {/* Wrapper div to handle BoxReveal children prop */}
            <BoxReveal boxColor="#5046e6" duration={0.7}>
              <div className="bg-white/10 p-6 rounded-xl">
                <h2 className="text-2xl font-semibold text-white mb-6">
                  Academic Highlights
                </h2>
                <div className="grid gap-6 md:grid-cols-2">
                  {educationData.highlights.map((highlight, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <h3 className="text-lg font-semibold text-blue-400 mb-2">
                        {highlight.title}
                      </h3>
                      <p className="text-gray-300">{highlight.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </BoxReveal>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Education;