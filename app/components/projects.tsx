"use client";
import React from 'react';
import { Navigation } from './nav'; // Import Navigation component
import Particles from './particles'; // Import Particles component

const projects = [
  {
    id: 1,
    title: 'My Portfolio',
    description: 'This page showcases my journey, skills, and passions. Feel free to explore the rest of the site to learn more about me and my work!',
    image: '/Project_MyPortfolio.png', // Replace with your image path
  },
  {
    id: 2,
    title: 'Project Two',
    description: 'This is a brief description of Project Two.',
    image: 'path/to/project-two-image.jpg', // Replace with your image path
  },
  // Add more projects as needed
];

const Projects = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-tl from-black via-zinc-600/20 to-black py-10">
      {/* Include the Particles component */}
      <Particles className="absolute inset-0 z-0" quantity={50} staticity={60} ease={60} refresh={false} />

      {/* Include the Navigation component */}
      <Navigation />

      <div className="relative z-10 text-center">
        <h1 className="text-4xl text-white font-bold sm:text-6xl md:text-8xl mb-8">
          My Projects
        </h1>
        <div className="flex flex-wrap gap-8 justify-center">
          {projects.map(project => (
            <div key={project.id} className="project-card bg-white p-6 rounded-lg shadow-lg max-w-xs">
              <img src={project.image} alt={project.title} className="project-image w-full h-48 object-cover rounded-t-lg mb-4" />
              <h2 className="project-title text-2xl font-semibold mb-2">{project.title}</h2>
              <p className="project-description text-gray-700">{project.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
