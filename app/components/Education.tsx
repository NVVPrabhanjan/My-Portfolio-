"use client";
import React from "react";
import { Navigation } from "./nav"; // Import Navigation component
import Particles from "./particles"; // Import Particles component

export const Education: React.FC = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-tl from-black via-zinc-600/20 to-black">
      {/* Include the Particles component */}
      <Particles className="absolute inset-0 z-0" quantity={50} staticity={60} ease={60} refresh={false} />

      {/* Include the Navigation component */}
      <Navigation />

      {/* Main content of the Education section */}
      <section className="relative z-10 text-center text-white mx-10 my-3">
        <h1 className="text-4xl font-bold sm:text-6xl md:text-8xl mb-6">
          Education
        </h1>
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-semibold">B M S College of Engineering</h3>
            <p>Bachelor of Engineering - Information Science and Engineering</p>
            <p>CGPA: 9.15</p>
            <p>Dec 2022 - May 2026*</p>
          </div>
          
          <div>
            <h3 className="text-2xl font-semibold">Sri Vidhya Junior College</h3>
            <p>XII (State Board)</p>
            <p>Percentage: 97.5%</p>
            <p>April 2022</p>
          </div>
          
          <div>
            <h3 className="text-2xl font-semibold">Narayana English Medium School</h3>
            <p>X (State Board)</p>
            <p>Percentage: 100%</p>
            <p>March 2020</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Education;
