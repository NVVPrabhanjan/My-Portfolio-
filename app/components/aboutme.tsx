"use client";
import React from "react";
import { Navigation } from "./nav";
import Particles from "./particles";
import BoxReveal from "./magicui/box-reveal";
import Image from "next/image";
import Link from "next/link";
import {
  TextRevealCard,
  TextRevealCardDescription,
  TextRevealCardTitle,
} from "../components/magicui/text-reveal-card";
import { Linkedin } from "lucide-react";

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

      <div className="relative z-10 container mx-auto px-4 py-12 md:py-24 lg:py-32">
        {/* Header Section - Mobile First */}
        <div className="flex flex-col items-center mb-12 md:hidden">
          <div className="relative aspect-square w-64 mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl transform rotate-3"></div>
            <div className="absolute inset-0 bg-black rounded-xl transform -rotate-3">
              <Image
                src="/profile.jpg"
                alt="Prabhanjan"
                fill
                className="object-cover rounded-xl"
                priority
              />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white text-center">Prabhanjan</h1>
          <p className="text-xl text-gray-400 mt-1 mb-3">Information Science Student</p>
          <Link 
            href="https://www.linkedin.com/in/n-v-venkata-prabhanjan-740213248/" 
            target="_blank" 
            className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
          >
            <Linkedin className="mr-1 h-5 w-5" />
            <span className="font-medium">LinkedIn</span>
          </Link>
        </div>

        {/* Main Content - Responsive Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start max-w-6xl mx-auto">
          {/* Left Column - Image and Name (Hidden on Mobile, Visible on Desktop) */}
          <div className="relative hidden md:block">
            <div className="sticky top-24">
              <div className="relative aspect-[4/5] w-full max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl transform rotate-2 shadow-lg"></div>
                <div className="absolute inset-0 bg-black rounded-2xl transform -rotate-2 shadow-xl">
                  <Image
                    src="/profile.jpg"
                    alt="Prabhanjan"
                    fill
                    className="object-cover rounded-2xl"
                    priority
                  />
                </div>
              </div>
              <div className="mt-8 text-center">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">Prabhanjan</h1>
                <p className="text-xl text-gray-400 mt-2 mb-4">Information Science Student</p>
                <Link 
                  href="https://www.linkedin.com/in/n-v-venkata-prabhanjan-740213248/" 
                  target="_blank" 
                  className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <Linkedin className="mr-2 h-5 w-5" />
                  <span className="font-medium">Connect on LinkedIn</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="space-y-6 md:space-y-8">
            <BoxReveal boxColor="#5046e6" duration={0.8}>
              <div className="bg-zinc-900/80 backdrop-blur-sm p-6 rounded-xl border border-zinc-800 shadow-lg hover:shadow-blue-900/20 transition-shadow">
                <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                  <span className="h-6 w-1 bg-blue-500 rounded-full mr-3"></span>
                  About Me
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  Hi, I'm passionate about technology and innovation. With a strong foundation 
                  in programming, data structures, and problem-solving, I'm constantly pushing 
                  the boundaries of what's possible in tech.
                </p>
              </div>
            </BoxReveal>

            <BoxReveal boxColor="#5046e6" duration={0.6}>
              <div className="bg-zinc-900/80 backdrop-blur-sm p-6 rounded-xl border border-zinc-800 shadow-lg hover:shadow-purple-900/20 transition-shadow">
                <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                  <span className="h-6 w-1 bg-purple-500 rounded-full mr-3"></span>
                  Technical Skills
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    {['Java', 'JavaScript', 'Express JS', 'Node JS'].map((skill) => (
                      <div key={skill} className="flex items-center space-x-2 group">
                        <div className="w-2 h-2 bg-blue-500 rounded-full group-hover:scale-125 transition-transform"></div>
                        <span className="text-gray-300 group-hover:text-white transition-colors">{skill}</span>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-3">
                    {['SQL', 'Mongo DB','ReactJS', 'NextJS'].map((skill) => (
                      <div key={skill} className="flex items-center space-x-2 group">
                        <div className="w-2 h-2 bg-purple-500 rounded-full group-hover:scale-125 transition-transform"></div>
                        <span className="text-gray-300 group-hover:text-white transition-colors">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </BoxReveal>

            <BoxReveal boxColor="#5046e6" duration={0.7}>
              <div className="bg-zinc-900/80 backdrop-blur-sm p-6 rounded-xl border border-zinc-800 shadow-lg hover:shadow-blue-900/20 transition-shadow">
                <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                  <span className="h-6 w-1 bg-blue-500 rounded-full mr-3"></span>
                  My Approach
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  I thrive on challenges and collaborative teamwork. My goal is to create 
                  innovative solutions that make a meaningful impact while continuously 
                  learning and exploring new technologies.
                </p>
              </div>
            </BoxReveal>

            {/* Development Section with TextRevealCard */}
            <div className="mt-8">
              <div className="overflow-hidden rounded-3xl shadow-xl shadow-blue-900/10">
                <TextRevealCard
                  text="Code. Create. &"
                  revealText="Conquer."
                  className="w-full"
                >
                  <TextRevealCardTitle>
                    Development Journey
                  </TextRevealCardTitle>
                  <TextRevealCardDescription>
                    Specializing in modern development. I create seamless digital experiences 
                    that combine aesthetics with functionality.
                  </TextRevealCardDescription>
                </TextRevealCard>
              </div>
            </div>
            
            {/* Projects Section */}
            <BoxReveal boxColor="#5046e6" duration={0.9}>
              <div className="bg-zinc-900/80 backdrop-blur-sm p-6 rounded-xl border border-zinc-800 shadow-lg hover:shadow-purple-900/20 transition-shadow">
                <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                  <span className="h-6 w-1 bg-purple-500 rounded-full mr-3"></span>
                  Featured Projects
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-zinc-800/50 p-4 rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer">
                    <h3 className="text-lg font-medium text-blue-400">Project Alpha</h3>
                    <p className="text-gray-400 text-sm mt-2">A full-stack web application built with the MERN stack.</p>
                  </div>
                  <div className="bg-zinc-800/50 p-4 rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer">
                    <h3 className="text-lg font-medium text-purple-400">Project Beta</h3>
                    <p className="text-gray-400 text-sm mt-2">An NextJS app with modern UI animations and components.</p>
                  </div>
                </div>
              </div>
            </BoxReveal>
          </div>
        </div>
      </div>
    </div>
  );
}