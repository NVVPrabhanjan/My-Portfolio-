"use client";
import React, { useState } from "react";
import { Navigation } from "./nav";
import Particles from "./particles";
import { ExternalLink, Github, CodeIcon } from "lucide-react";

// Define the Project type
interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  githubLink: string;
  technologies: string[];
  type: string;
}

// Project data
const projects: Project[] = [
  {
    id: 1,
    title: "My Portfolio",
    description: `A comprehensive showcase of my professional journey, skills, and projects. 
Designed to provide an intuitive and engaging user experience.`,
    image: "/Project_MyPortfolio.png",
    githubLink: "https://github.com/yourusername/my-portfolio",
    technologies: ["Next.js", "Tailwind CSS", "React"],
    type: "Web Development",
  },
  {
    id: 2,
    title: "Job Portal",
    description: `Full-stack job marketplace connecting job seekers and employers.
• Implemented comprehensive job search and application features
• Developed robust RESTful API
• Created responsive and intuitive user interface`,
    image: "/JobPortal.jpg",
    githubLink: "https://github.com/yourusername/job-portal",
    technologies: ["Express.js", "React", "MongoDB", "Tailwind CSS"],
    type: "Full Stack",
  },
  {
    id: 3,
    title: "ATM Transaction",
    description: `Comprehensive banking application featuring:
• Customer account creation
• Money transfer capabilities
• Detailed transaction history
• Secure banking operations`,
    image: "",
    githubLink: "https://github.com/yourusername/atm-transaction",
    technologies: ["Java", "SQL", "OOP"],
    type: "Banking App",
  },
  {
    id: 4,
    title: "BMSCE Events",
    description: `Event management platform for BMSCE:
• Seamless event registration
• User-friendly event navigation
• Integrated database management`,
    image: "",
    githubLink: "https://github.com/yourusername/bmsce-events",
    technologies: ["React.js", "Express.js", "MySQL"],
    type: "Web Application",
  },
];

// ProjectCard Component
const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="project-card relative group overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl bg-white/10 backdrop-blur-sm border border-white/10 hover:border-white/20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {project.image ? (
        <div className="relative overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="text-white text-center">
              <p className="text-sm">{project.type}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-16 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
          <CodeIcon className="text-white" size={32} />
        </div>
      )}

      <div className="p-5">
        <h2 className="text-xl font-bold text-white mb-2">{project.title}</h2>
        <p className="text-gray-300 text-sm mb-4 h-32 overflow-hidden">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech: string, index: number) => (
            <span
              key={index}
              className="px-2 py-1 bg-white/10 text-xs text-white rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>

        {project.githubLink && (
          <div className="flex space-x-2">
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition"
            >
              <Github size={16} />
              <span>GitHub</span>
            </a>
            {isHovered && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                <ExternalLink size={16} />
                <span>View</span>
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Projects Component
const Projects = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-tl from-black via-zinc-900 to-black py-16 overflow-hidden">
      <Particles
        className="absolute inset-0 z-0"
        quantity={100}
        staticity={50}
        ease={70}
        refresh={false}
      />
      <Navigation />

      <div className="relative z-10 container mx-auto px-4">
        <h1 className="text-center text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-16 tracking-tight">
          My{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
            Projects
          </span>
        </h1>

        <div className="
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;