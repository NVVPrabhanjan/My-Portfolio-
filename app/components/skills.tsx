import React from "react";
import { Navigation } from "./nav"; // Import Navigation component
import Particles from "./particles"; // Import Particles component
import BoxReveal from "./magicui/box-reveal"; // Import BoxReveal component

const Skills = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-tl from-black via-zinc-600/20 to-black">
      <h1 className="text-center text-5xl md:text-7xl lg:text-8xl font-bold mb-16 tracking-tight text-white">
      My <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">Skills</span>
        </h1>
      {/* Include the Particles component */}
      <Particles className="absolute inset-0 z-0" quantity={50} staticity={60} ease={60} refresh={false} />

      {/* Include the Navigation component */}
      <Navigation />

      {/* Main content of the Skills section */}
      <section className="relative z-10 text-center text-white mx-10 my-3 pt-32">
        {/* Flexbox container for side-by-side layout */}
        <div className="flex flex-wrap justify-center space-x-10 space-y-8">
          {/* Technical Skills in BoxReveal format */}
          <BoxReveal boxColor={"#5046e6"} duration={0.5}>
            <div>
              <h2 className="text-white text-[2rem] font-semibold">Technical Skills</h2>
              <ul className="text-white list-disc list-inside mt-2">
            <li>HTML</li>
            <li>CSS</li>
            <li>JavaScript</li>
            <li>SQL</li>
            <li>ReactJS</li>
            <li>NextJS</li>
          </ul>
            </div>
          </BoxReveal>

          {/* Tools/Platforms in BoxReveal format */}
          <BoxReveal boxColor={"#5046e6"} duration={0.5}>
            <div>
              <h2 className="text-white text-[2rem] font-semibold">Tools/Platforms</h2>
              <ul className="text-white list-disc list-inside mt-2">
                <li>Visual Studio Code (VS Code)</li>
                <li>LeetCode</li>
                <li>Windows</li>
              </ul>
            </div>
          </BoxReveal>

          {/* Soft Skills in BoxReveal format */}
          <BoxReveal boxColor={"#5046e6"} duration={0.5}>
            <div>
              <h2 className="text-white text-[2rem] font-semibold">Soft Skills</h2>
              <ul className="text-white list-disc list-inside mt-2">
                <li>Quick Learner</li>
                <li>Good Explaining Skills</li>
                <li>Organizational Skills</li>
                <li>Team Player</li>
                <li>Self-Motivated</li>
                <li>Strong Communication</li>
              </ul>
            </div>
          </BoxReveal>
        </div>
      </section>
    </div>
  );
};

export default Skills;
