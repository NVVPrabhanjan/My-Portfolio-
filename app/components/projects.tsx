"use client";
import React, { useState } from "react";
import { Navigation } from "./nav";
import Particles from "./particles";
import { ExternalLink, Github, CodeIcon } from "lucide-react";
import Image from "next/image"; // Import Next.js Image component

// Define the Project type with optional image
interface Project {
  id: number;
  title: string;
  description: string;
  image?: string;
  githubLink: string;
  technologies: string[];
  type: string;
  deployedLink?: string;
}

// Project data with optional deployed links
const projects: Project[] = [
  {
    id: 1,
    title: "My Portfolio",
    description: `An engaging and comprehensive personal portfolio showcasing my professional journey, technical skills, and projects. 
The platform is designed to deliver an intuitive user experience while highlighting my expertise and accomplishments.`,
    image: "/Project_MyPortfolio.png",
    githubLink: "https://github.com/NVVPrabhanjan/My-Portfolio-",
    deployedLink: "https://prabhanjan.live/",
    technologies: ["Next.js", "Tailwind CSS"],
    type: "Web Development",
  },
  {
    id: 2,
    title: "Job Portal",
    description: `A full-stack job marketplace connecting employers and job seekers seamlessly. 
Features include advanced job search, intuitive application processes, and detailed user profiles. 
Backed by a robust RESTful API and a responsive, user-friendly interface.`,
    image: "/JobPortal.jpg",
    githubLink: "https://github.com/NVVPrabhanjan/JobPortal",
    technologies: ["Express.js", "React", "MongoDB", "Tailwind CSS"],
    type: "Full Stack",
  },
  {
    id: 5,
    title: "Course Selling Website",
    description: `An innovative platform designed for seamless online course sales and management. 
Key features include course browsing and instructor-student interaction. 
Built with a powerful tech stack ensuring performance and scalability.`,
    image: "/CourseSelling.png",
    githubLink: "https://github.com/NVVPrabhanjan/JobPortal",
    technologies: ["Express.js", "React", "MongoDB"],
    type: "Full Stack",
  },
  {
    id: 3,
    title: "ATM Transaction",
    description: `A comprehensive banking application simulating core ATM functionalities. 
Features include secure customer account creation, money transfers, detailed transaction history, and efficient banking operations. `,
image:"/image.png",    
githubLink: "https://github.com/yourusername/atm-transaction",
    technologies: ["Java", "SQL", "OOP"],
    type: "Banking App",
  },
  {
    id: 4,
    title: "BMSCE Events",
    description: `An event management platform tailored for BMSCE, streamlining event registration and navigation. 
Provides a user-friendly interface for participants and robust database integration for organizers. Enhances event management efficiency and user engagement.`,
    githubLink: "https://github.com/NVVPrabhanjan/BMSCE_Events",
    technologies: ["React.js", "Express.js", "MySQL"],
    type: "Web Application",
  },
];


// ProjectCard Component with improved hover and link handling
const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="project-card relative group overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl bg-white/10 backdrop-blur-sm border border-white/10 hover:border-white/20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {project.image ? (
        <div className="relative overflow-hidden h-48">
          <Image
            src={project.image}
            alt={project.title}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 group-hover:scale-110"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
          />
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <p className="text-white text-sm">{project.type}</p>
          </div>
        </div>
      ) : (
        <div className="h-16 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
          <CodeIcon className="text-white" size={32} />
        </div>
      )}

      <div className="p-5 text-justify">
        <h2 className="text-xl font-bold text-white mb-2">{project.title}</h2>
        <p className="text-gray-300 text-sm mb-4 h-32 overflow-hidden">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-white/10 text-xs text-white rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex space-x-2">
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition"
            >
              <Github size={16} />
              <span>GitHub</span>
            </a>
          )}
          
          {project.deployedLink && isHovered && (
            <a
              href={project.deployedLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              <ExternalLink size={16} />
              <span>View Live</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

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

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl pt-20 md:pt-32">
        <h1 className="text-center text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-16 tracking-tight">
          My{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
            Projects
          </span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;