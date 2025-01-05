'use client';
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Particles from "./components/particles";
import IconCloud from "@/app/components/magicui/icon-cloud";
const slugs = [
  "typescript", "javascript", "dart", "java", "python",
  "react", "flutter", "nextdotjs", "nodejs", "tailwindcss",
  "redux", "graphql", "mongodb", "postgresql", "prisma",
  "docker", "kubernetes", "aws", "firebase", "vercel",
  "git", "github", "gitlab", "jest", "cypress",
  "figma", "storybook", "tensorflow", "webpack", "sass"
];
const navigation = [
  { name: "About", href: "/aboutme", icon: "👤" },
  { name: "Projects", href: "/projects", icon: "💻" },
  { name: "Skills", href: "/skills", icon: "🚀" },
  { name: "Experience", href: "/Experience", icon: "📋" },
  { name: "Education", href: "/Education", icon: "🎓" },
  { name: "Contact", href: "/contact", icon: "📬" },
  { name: "Resume", href: "/resume.pdf", icon: "📄" }
];

export default function Home() {
  const [hasVisited, setHasVisited] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Check if we're on the client side
    setIsClient(true);
    
    // Check visit status
    const visited = localStorage.getItem("hasVisited");
    if (visited) {
      setHasVisited(true);
    }
  }, []);

  const handleAnimationEnd = () => {
    localStorage.setItem("hasVisited", "true");
    setHasVisited(true);
  };

  // Animation variants for smoother transitions
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black">
      {/* Animated Particles Background */}
      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={100}
      />

      {/* Navigation with Framer Motion */}
      <AnimatePresence>
        {isClient && (
          <motion.nav 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className={`my-8 md:my-16 ${!hasVisited ? 'animate-fade-in' : ''}`}
          >
            <motion.ul 
              className="flex flex-col md:flex-row items-center justify-center gap-4"
              variants={containerVariants}
            >
              {navigation.map((item) => (
                <motion.li 
                  key={item.href}
                  variants={itemVariants}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={item.href}
                    className="flex items-center gap-2 text-sm md:text-base duration-500 text-zinc-500 hover:text-zinc-300"
                  >
                    <span>{item.icon}</span>
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Decorative Dividers */}
      <div className="hidden md:block w-screen h-px animate-glow bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0 animate-fade-left" />

      {/* Name Title with Enhanced Animation */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          duration: 0.8,
          type: "spring",
          stiffness: 120 
        }}
        className={`py-3 px-1 z-10 text-3xl sm:text-4xl md:text-6xl lg:text-9xl text-transparent bg-white cursor-default text-edge-outline ${
          !hasVisited ? "animate-title" : ""
        } font-display whitespace-nowrap bg-clip-text duration-1000`}
        onAnimationEnd={handleAnimationEnd}
      >
        Prabhanjan
      </motion.h1>

      {/* Decorative Dividers */}
      <div className="hidden md:block w-screen h-px animate-glow bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0 animate-fade-right" />

      {/* Tech Stack Icon Cloud */}
      {isClient && (
        <IconCloud 
          iconSlugs={slugs} 
          width="200px" 
        />
      )}
    </div>
  );
}
