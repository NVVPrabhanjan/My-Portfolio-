"use client";
import React from "react";
import { Navigation } from "../components/nav";
import Particles from "../components/particles";
import { Briefcase, Code, Server, Globe } from "lucide-react";
import { PinContainer } from "../components/magicui/3d-pin";
import Link from "next/link";

// Types
interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
}

interface Project {
  title: string;
  description: string;
  technologies: string[];
  image: string;
  link?: string;
}

interface SkillCategory {
  name: string;
  skills: string[];
  icon: React.ReactNode;
}

const experiences: Experience[] = [
  {
    company: " Looped Labs Pvt. Ltd.",
    role: "Full Stack Developer",
    period: "Feb 2025 - Mar 2025",
    description: "Designed a stable system architecture using AWS EC2 with Load Balancing to ensure high availability and scalability. Used Node.js and optimized core utilization to handle parallel user requests, improving server efficiency by at least 20%. Independently designed and managed a dynamic gallery module, enabling real-time media upload, retrieval, and presentation for end users. Implemented SEO for better search visibility and followed CI/CD practices using Jenkins for smooth deployment."
  }
];


const skillCategories: SkillCategory[] = [
  {
    name: "Programming Languages",
    skills: ["Java", "C++", "C", "JavaScript"],
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
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/20 transition-all duration-300">
      <div className="flex items-center mb-4">
        <Briefcase className="text-blue-500" size={24} />
        <div className="ml-3">
          <h3 className="text-xl font-semibold text-white">{experience.company}</h3>
          <p className="text-slate-300">{experience.role}</p>
          <p className="text-slate-400 text-sm">{experience.period}</p>
        </div>
      </div>
      <p className="text-slate-300">{experience.description}</p>
    </div>
  );
};

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <PinContainer title={project.title} href={project.link}>
      <div className="flex flex-col p-4 tracking-tight text-slate-100/50 w-[24rem] h-[24rem]">
        <h3 className="font-bold text-lg text-slate-100">{project.title}</h3>
        <p className="text-slate-500 text-sm mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech, index) => (
            <span key={index} className="px-2 py-1 bg-white/10 text-xs text-white rounded-full">
              {tech}
            </span>
          ))}
        </div>
        <img src={project.image} alt={project.title} className="mt-6 rounded-lg w-full h-48 object-cover" />
      </div>
    </PinContainer>
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
      <Particles className="absolute inset-0 z-0" quantity={100} staticity={50} ease={70} refresh={false} />
      <Navigation />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl pt-20 md:pt-32">
        <h1 className="text-center text-5xl md:text-7xl lg:text-8xl font-bold mb-16 tracking-tight">
          Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">Experience</span>
        </h1>

        <div className="space-y-12">
          <div>
            <h2 className="text-3xl font-bold mb-6">Work Experience</h2>
            <div className="grid gap-6">
              {experiences.map((experience, index) => (
                <ExperienceCard key={index} experience={experience} />
              ))}
            </div>
          </div>

          <div>
            <h2 className="py-10 text-3xl font-bold mb-6">Skills</h2>
            <SkillSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;