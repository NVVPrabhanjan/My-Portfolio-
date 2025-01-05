"use client";
import React from "react";
import { Navigation } from "./nav";
import Particles from "./particles";
import BoxReveal from "./magicui/box-reveal";
import Image from "next/image";
import Link from "next/link";

export default function AboutMe() {
  return (
    <div className="relative min-h-screen bg-gradient-to-tl from-black via-zinc-600/20 to-black">
      <Navigation />
      <Particles 
        className="absolute inset-0 z-0" 
        quantity={50} 
        staticity={60} 
        ease={60} 
        refresh={false} 
      />

      <div className="relative z-10 container mx-auto px-4 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left Column - Image and Name */}
          <div className="relative">
            <div className="relative aspect-[4/5] w-full max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl transform rotate-2"></div>
              <div className="absolute inset-0 bg-black rounded-2xl transform -rotate-2">
                <Image
                  src="/profile.jpg" // Replace with your image path
                  alt="Prabhanjan"
                  fill
                  className="object-cover rounded-2xl"
                  priority
                />
              </div>
            </div>
            <div className="mt-8 text-center md:text-left">
              <h1 className="text-4xl md:text-6xl font-bold text-white">
                Prabhanjan
              </h1>
              <p className="text-xl text-gray-400 mt-2">Information Science Student</p>
              <Link className="text-2xl font-semibold text-blue-400 mb-4" target="_blank" href={'https://www.linkedin.com/in/n-v-venkata-prabhanjan-740213248/' }> LinkedIn
              </Link>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="space-y-8">
            <BoxReveal boxColor="#5046e6" duration={0.8}>
              <div className="bg-zinc-900/50 p-6 rounded-xl">
                <h2 className="text-2xl font-semibold text-white mb-4">About Me</h2>
                <p className="text-gray-300">
                  Hi, I'm passionate about technology and innovation. With a strong foundation 
                  in programming, data structures, and problem-solving, I'm constantly pushing 
                  the boundaries of what's possible in tech.
                </p>
              </div>
            </BoxReveal>

            <BoxReveal boxColor="#5046e6" duration={0.6}>
              <div className="bg-zinc-900/50 p-6 rounded-xl">
                <h2 className="text-2xl font-semibold text-white mb-4">Technical Skills</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    {['Java', 'JavaScript', 'Express JS', 'Node JS'].map((skill) => (
                      <div key={skill} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-gray-300">{skill}</span>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2">
                    {['SQL', 'Mongo DB','ReactJS', 'NextJS'].map((skill) => (
                      <div key={skill} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span className="text-gray-300">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </BoxReveal>

            <BoxReveal boxColor="#5046e6" duration={0.7}>
              <div className="bg-zinc-900/50 p-6 rounded-xl">
                <h2 className="text-2xl font-semibold text-white mb-4">My Approach</h2>
                <p className="text-gray-300">
                  I thrive on challenges and collaborative teamwork. My goal is to create 
                  innovative solutions that make a meaningful impact while continuously 
                  learning and exploring new technologies.
                </p>
              </div>
            </BoxReveal>
          </div>
        </div>
      </div>
    </div>
  );
}