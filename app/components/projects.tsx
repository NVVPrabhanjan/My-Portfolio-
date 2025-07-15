"use client";
import React, { useState } from "react";
import { Navigation } from "./nav";
import Particles from "./particles";
import { ExternalLink, Github, CodeIcon, TagIcon } from "lucide-react";
import Image from "next/image";

interface Technology {
  name: string;
  color: string;
}

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

const getTechnologyColor = (tech: string): string => {
  const colors: { [key: string]: string } = {
    "Next.js": "bg-black",
    "React": "bg-blue-600",
    "Express.js": "bg-green-600",
    "MongoDB": "bg-green-500",
    "MySQL": "bg-blue-500",
    "Tailwind CSS": "bg-cyan-500",
    "Java": "bg-red-500",
    "SQL": "bg-orange-500",
    "OOP": "bg-purple-500"
  };
  return colors[tech] || "bg-gray-500";
};

const ProjectImage: React.FC<{ project: Project }> = ({ project }) => {
  if (!project.image) {
    return (
      <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
        <CodeIcon className="text-white" size={32} />
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden h-48 group">
      <Image
        src={project.image}
        alt={project.title}
        layout="fill"
        objectFit="cover"
        className="transition-transform duration-500 group-hover:scale-110"
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-4 left-4 flex items-center space-x-2">
          <TagIcon size={16} className="text-white" />
          <span className="text-white text-sm font-medium">{project.type}</span>
        </div>
      </div>
    </div>
  );
};

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <article
      className="group h-full flex flex-col rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl bg-white/10 backdrop-blur-sm border border-white/10 hover:border-white/20 hover:translate-y-[-4px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ProjectImage project={project} />

      <div className="p-6 flex flex-col flex-grow">
        <h2 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
          {project.title}
        </h2>
        <p className="text-gray-300 text-sm mb-4 flex-grow">
          {project.description}
        </p>

        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, index) => (
              <span
                key={index}
                className={`px-3 py-1 text-xs text-white rounded-full ${getTechnologyColor(tech)} bg-opacity-20 backdrop-blur-sm border border-white/10`}
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex space-x-3">
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all duration-300"
              aria-label={`View ${project.title} source code on GitHub`}
            >
              <Github size={16} />
              <span>GitHub</span>
            </a>
            
            {project.deployedLink && (
              <a
                href={project.deployedLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center space-x-2 px-4 py-2 text-white rounded-lg transition-all duration-300 ${
                  isHovered 
                    ? "bg-blue-500 hover:bg-blue-600" 
                    : "bg-blue-500/50"
                }`}
                aria-label={`View live demo of ${project.title}`}
              >
                <ExternalLink size={16} />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

const Projects = () => {
  const projects: Project[] = [
    {
      id: 1,
      title: "Farouche - Hostel Website",
      description: " Led the full-stack development and deployment of a dynamic platform serving 2,000+ participants across 45+ events, with CI/CD workflows using Jenkins and scalable infrastructure on DigitalOcean and AWS. Integrated Google Sheets for real-time dashboards, Cloudinary for efficient media handling, and a Kafka-based Gmail microservice to overcome SMTP limitations and support asynchronous email delivery.",
      image: "/Farouche.png",
      githubLink: "https://github.com/NVVPrabhanjan/FAROUCHE-Website",
      deployedLink: "https://farouche25.tech/",
      technologies: ["Express.js", "MongoDB", "Next.js", "Tailwind CSS"],
      type: "Web Development",
    },
    {
      id: 2,
      title: "Job Portal",
      description: "Built a full-stack job portal connecting job seekers and recruiters, with secure authentication, user dashboards, and job listings. Designed a clean, responsive UI using Tailwind CSS to ensure smooth navigation and accessibility across devices.",
      image: "/JobPortal.jpg",
      githubLink: "https://github.com/NVVPrabhanjan/JobPortal",
      deployedLink: "https://job-portal-weld-one.vercel.app/",
      technologies: ["Express.js", "React", "MongoDB", "Tailwind CSS"],
      type: "Full Stack",
    },
    {
      id: 3,
      title: "My Portfolio",
      description: "An engaging and comprehensive personal portfolio showcasing my professional journey, technical skills, and projects. The platform is designed to deliver an intuitive user experience while highlighting my expertise and accomplishments.",
      image: "/Project_MyPortfolio.png",
      githubLink: "https://github.com/NVVPrabhanjan/My-Portfolio-",
      deployedLink: "https://prabhanjan.live/",
      technologies: ["Next.js", "Tailwind CSS"],
      type: "Web Development",
    },
    {
      id: 4,
      title: "Course Selling Website",
      description: "An innovative platform designed for seamless online course sales and management. Key features include course browsing and instructor-student interaction. Built with a powerful tech stack ensuring performance and scalability.",
      image: "/CourseSelling.png",
      githubLink: "https://github.com/NVVPrabhanjan/CourseSellingApp",
      technologies: ["Express.js", "React", "MongoDB"],
      type: "Full Stack",
    },
    {
      id: 5,
      title: "ATM Transaction",
      description: "A comprehensive banking application simulating core ATM functionalities. Features include secure customer account creation, money transfers, detailed transaction history, and efficient banking operations.",
      image: "/image.png",
      githubLink: "https://github.com/NVVPrabhanjan",
      technologies: ["Java", "SQL", "OOP"],
      type: "Banking App",
    },
    {
      id: 6,
      title: "BMSCE Events",
      description: "An event management platform tailored for BMSCE, streamlining event registration and navigation. Provides a user-friendly interface for participants and robust database integration for organizers. Enhances event management efficiency and user engagement.",
      githubLink: "https://github.com/NVVPrabhanjan/BMSCE_Events",
      technologies: ["React", "Express.js", "MySQL"],
      type: "Web Application",
    }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-tl from-black via-zinc-900 to-black">
      <Navigation />
      
      <Particles
        className="absolute inset-0 -z-10"
        quantity={100}
        staticity={50}
        ease={70}
        refresh={false}
      />

      <main className="container mx-auto px-4 py-20 md:py-32 relative">
        <header className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
            My{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 animate-gradient">
              Projects
            </span>
          </h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Projects;