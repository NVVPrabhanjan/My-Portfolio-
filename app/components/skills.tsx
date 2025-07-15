"use client";
import React from "react";
import { Navigation } from "./nav";
import Particles from "./particles";
import BoxReveal from "./magicui/box-reveal";
import { Code, Settings, Users } from "lucide-react";

const skillCategories = [
  {
    title: "Technical Skills",
    icon: <Code className="w-10 h-10 text-blue-500" />,
    skills: [
      "C/C++",
      "Java",
      "HTML", 
      "CSS", 
      "JavaScript",  
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "SQL" 
    ]
  },
  {
    title: "Tools/Platforms",
    icon: <Settings className="w-10 h-10 text-green-500" />,
    skills: [
      "AWS EC2",
      "Digital Ocean",     
      "Visual Studio Code",
      "Git & GitHub",
      "LeetCode",
      "Postman",
      "Docker (Basic)",
      "Jenkins",
      "Windows",
      "Linux"
    ]
  },
  {
    title: "Soft Skills",
    icon: <Users className="w-10 h-10 text-purple-500" />,
    skills: [
      "Rapid Learning",
      "Problem Solving",
      "Team Collaboration", 
      "Communication",
      "Time Management",
      "Adaptability",
      "Critical Thinking",
      "Leadership"
    ]
  }
];


const Skills = () => {
  return (
    <div className="relative flex flex-col flex-row items-center justify-center min-h-screen bg-gradient-to-tl from-black via-zinc-900 to-black overflow-hidden">
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
          My <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">Skills</span>
        </h1>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <BoxReveal 
              key={category.title} 
              boxColor="#5046e6" 
              duration={0.5 + (index * 0.2)}
            >
              <div className="bg-white/10 p-6 rounded-xl border border-white/10 hover:border-white/30 transition-all duration-300">
                <div className="flex items-center mb-4 space-x-4">
                  {category.icon}
                  <h2 className="text-2xl font-semibold text-white">
                    {category.title}
                  </h2>
                </div>
                <ul className="space-y-2 text-gray-300">
                  {category.skills.map((skill) => (
                    <li 
                      key={skill} 
                      className="flex items-center space-x-2 hover:text-white transition-colors"
                    >
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </BoxReveal>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;