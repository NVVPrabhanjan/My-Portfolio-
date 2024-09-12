import React from "react";
import { Navigation } from "./nav"; // Import Navigation component
import Particles from "./particles"; // Import Particles component

const Skills = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-tl from-black via-zinc-600/20 to-black">
      {/* Include the Particles component */}
      <Particles className="absolute inset-0 z-0" quantity={50} staticity={60} ease={60} refresh={false} />

      {/* Include the Navigation component */}
      <Navigation />

      {/* Main content of the Skills section */}
      <section className="relative z-10 text-center text-white mx-10 my-3 pt-32">
        <h1 className="text-4xl font-bold sm:text-6xl md:text-8xl mb-6">
          Skills
        </h1>

        {/* Technical Skills */}
        <div className="space-y-6">
          <h2 className="text-3xl font-semibold">Technical Skills</h2>
          <ul className="list-disc list-inside space-y-2 text-lg">
            <li>Data Structures and Algorithms</li>
            <li>Problem Solving</li>
            <li>Java</li>
            <li>C</li>
            <li>C++</li>
            <li>HTML</li>
            <li>CSS</li>
            <li>JavaScript</li>
            <li>SQL</li>
            <li>MongoDB</li>
            <li>NodeJS</li>
          </ul>

          {/* Tools/Platforms */}
          <h2 className="text-3xl font-semibold">Tools/Platforms</h2>
          <ul className="list-disc list-inside space-y-2 text-lg">
            <li>Visual Studio Code (VS Code)</li>
            <li>LeetCode</li>
            <li>Windows</li>
          </ul>

          {/* Soft Skills */}
          <h2 className="text-3xl font-semibold">Soft Skills</h2>
          <ul className="list-disc list-inside space-y-2 text-lg">
            <li>Quick Learner</li>
            <li>Good Explaining Skills</li>
            <li>Organizational Skills</li>
            <li>Team Player</li>
            <li>Self-Motivated</li>
            <li>Strong Communication</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Skills;
