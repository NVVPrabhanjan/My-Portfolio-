"use client";
import React from "react";
import { Navigation } from "../components/nav";
import Particles from "../components/particles";
import { Briefcase, Code, Server, Globe } from "lucide-react";

// Types
interface ExperienceDescription {
  project: string;
  details: string;
  technologies: string[];
}

interface Experience {
  title: string;
  company: string;
  period: string;
  descriptions: ExperienceDescription[];
}

interface SkillCategory {
  name: string;
  skills: string[];
  icon: React.ReactNode;
}

const experiences: Experience[] = [
  {
    title: "Full Stack Web Developer",
    company: "Parjanya Web Development",
    period: "Aug 2024 - Oct 2024",
    descriptions: [
      {
        project: "St. Joseph High School Website",
        details:
          "Developed a full-stack website using Next.js to integrate front-end and back-end functionalities, providing a seamless and dynamic user experience for school-related information.",
        technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
      },
      {
        project: "Curly Cuts Pet Grooming",
        details:
          "Designed a responsive front-end for Curly Cuts using Next.js, focusing on a modern and user-friendly web page design.",
        technologies: ["Next.js", "React", "Responsive Design"],
      },
    ],
  },
];

const skillCategories: SkillCategory[] = [
  {
    name: "Programming Languages",
    skills: ["Java", "C++", "C", "TypeScript", "JavaScript"],
    icon: <Code className="text-blue-500" size={24} />,
  },
  {
    name: "Web Technologies",
    skills: ["HTML", "CSS", "ReactJS", "NextJS", "Express JS", "Node JS"],
    icon: <Globe className="text-green-500" size={24} />,
  },
  {
    name: "Computer Science Fundamentals",
    skills: ["Data Structures", "Algorithms", "OOPS", "DBMS", "Operating Systems"],
    icon: <Server className="text-purple-500" size={24} />,
  },
];

const ExperienceCard: React.FC<{ experience: Experience }> = ({ experience }) => {
  return (
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">{experience.title}</h2>
          <p className="text-gray-300">{experience.company}</p>
          <p className="text-sm text-gray-400">{experience.period}</p>
        </div>
        <Briefcase size={36} className="text-blue-500" />
      </div>

      {experience.descriptions.map((desc, index) => (
        <div key={index} className="bg-white/5 rounded-lg p-4">
          <h3 className="font-semibold text-white mb-2">{desc.project}</h3>
          <p className="text-gray-300 mb-3">{desc.details}</p>
          <div className="flex flex-wrap gap-2">
            {desc.technologies.map((tech, techIndex) => (
              <span
                key={techIndex}
                className="px-2 py-1 bg-white/10 text-xs text-white rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const SkillSection = () => {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {skillCategories.map((category, index) => (
        <div
          key={index}
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/20 transition-all duration-300"
        >
          <div className="flex items-center mb-4">
            {category.icon}
            <h3 className="ml-3 text-xl font-semibold text-white">{category.name}</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {category.skills.map((skill, skillIndex) => (
              <span
                key={skillIndex}
                className="px-3 py-1 bg-white/10 text-white rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const Experience = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-tl from-black via-zinc-900 to-black text-white py-16 overflow-hidden">
      <Particles
        className="absolute inset-0 z-0"
        quantity={100}
        staticity={50}
        ease={70}
        refresh={false}
      />
      <Navigation />

      <div className="relative z-10 container mx-auto px-4">
        <h1 className="text-center text-5xl md:text-7xl lg:text-8xl font-bold mb-16 tracking-tight">
          Professional{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
            Experience
          </span>
        </h1>

        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold mb-6">Work Experience</h2>
            {experiences.map((exp, index) => (
              <ExperienceCard key={index} experience={exp} />
            ))}
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-6">Skills</h2>
            <SkillSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
