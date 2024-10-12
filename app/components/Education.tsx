"use client";
import React from "react";
import { Navigation } from "./nav"; // Import Navigation component
import Particles from "./particles"; // Import Particles component
import { BoxReveal } from "./magicui/box-reveal";

export const Education: React.FC = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-tl from-black via-zinc-600/20 to-black">
      {/* Include the Particles component */}
      <Particles className="absolute inset-0 z-0" quantity={50} staticity={60} ease={60} refresh={false} />

      {/* Include the Navigation component */}
      <Navigation />
      {/* Include BoxReveal with wrapped content */}
      <div className="size-full max-w-lg items-center justify-center overflow-hidden pt-8">
  <BoxReveal boxColor={"#FFFFFF"} duration={0.5}>
    <p className="text-white text-[3.5rem] font-semibold">
      B M S C E<span className="text-[#5046e6]"></span>
    </p>
  </BoxReveal>

  <BoxReveal boxColor={"#FFFFFF"} duration={0.5}>
    <h2 className="mt-[.5rem] text-white text-[1rem]">
      Bachelor of Engineering -{" "}
      <span className="text-[#5046e6]">Information Science and Engineering</span>
    </h2>
  </BoxReveal>

  <BoxReveal boxColor={"#5046e6"} duration={0.5}>
    <div className="mt-6">
      <p className="text-white">
        -&gt; CGPA: 9.02
        <span className="font-semibold text-[#5046e6]"><br/>-&gt; Dec 2022 - May 2026*</span>
      </p>
    </div>
  </BoxReveal>
</div>
    </div>
  );
};

export default Education;
