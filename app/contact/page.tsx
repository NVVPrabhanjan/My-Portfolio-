"use client";
import React from "react";
import { Github, Mail, Twitter, Phone, Linkedin } from "lucide-react";
import Link from "next/link";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import Particles from "../components/particles";

const socials = [
  {
    icon: <Twitter size={24} />,
    href: "https://x.com/Venkatprabhanj2",
    label: "Twitter",
    handle: "@Venkatprabhanj2",
    color: "hover:text-blue-400",
  },
  {
    icon: <Mail size={24} />,
    href: "mailto:nvvenkatprabhanjan@gmail.com",
    label: "Email",
    handle: "nvvenkatprabhanjan@gmail.com",
    color: "hover:text-red-500",
  },
  {
    icon: <Github size={24} />,
    href: "https://github.com/NVVPrabhanjan",
    label: "Github",
    handle: "NVVPrabhanjan",
    color: "hover:text-purple-500",
  },
  {
    icon: <Phone size={24} />,
    href: "tel:7893152309",
    label: "Phone",
    handle: "7893152309",
    color: "hover:text-green-500",
  },
  {
    icon: <Linkedin size={24} />,
    href: "https://www.linkedin.com/in/n-v-venkata-prabhanjan-740213248/",
    label: "LinkedIn",
    handle: "Prabhanjan NV",
    color: "hover:text-blue-700",
  }
];

export default function ContactMe() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-tl from-black via-zinc-900 to-black overflow-hidden">
      <Navigation />
      <Particles 
        className="absolute inset-0 z-0" 
        quantity={50} 
        staticity={60} 
        ease={60} 
        refresh={false} 
      />

<div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl pt-20 md:pt-32">
        <h1 className="text-center text-5xl md:text-7xl lg:text-8xl font-bold mb-16 tracking-tight text-white">
          Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">Me</span>
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {socials.map((social) => (
            <Card key={social.label}>
              <Link
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 group"
              >
                <div className="flex flex-col items-center space-y-4">
                  <div className={`
                    w-16 h-16 rounded-full flex items-center justify-center 
                    bg-white/10 group-hover:bg-white/20 transition-all duration-300
                    ${social.color}
                  `}>
                    {social.icon}
                  </div>
                  
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
                      {social.label}
                    </h3>
                    <p className="text-sm text-gray-400 group-hover:text-white transition-colors">
                      {social.handle}
                    </p>
                  </div>
                </div>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}