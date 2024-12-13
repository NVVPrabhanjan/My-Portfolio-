'use client';
import { ArrowLeft, Menu, X } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

// Navigation links with additional metadata
const NAV_LINKS = [
  { href: "/aboutme", label: "About Me", icon: "👤" },
  { href: "/projects", label: "Projects", icon: "💻" },
  { href: "/skills", label: "Skills", icon: "🚀" },
  { href: "/Experience", label: "Experience", icon: "📋" },
  { href: "/Education", label: "Education", icon: "🎓" },
  { href: "/contact", label: "Contact", icon: "📬" },
  { href: "/resume.pdf", label: "Resume", icon: "📄" },
];

export const Navigation: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const [isIntersecting, setIntersecting] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      { threshold: 0.1 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Close menu when pathname changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Framer Motion variants for mobile menu
  const menuVariants = {
    hidden: { 
      opacity: 0, 
      y: -20,
      transition: { 
        duration: 0.3 
      }
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 120,
        damping: 15
      }
    }
  };

  const linkVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        type: "spring", 
        stiffness: 100 
      }
    }
  };

  return (
    <header ref={ref}>
      <div
        className={`fixed inset-x-0 top-0 z-50 backdrop-blur duration-200 border-b ${
          isIntersecting
            ? "bg-zinc-900/0 border-transparent"
            : "bg-zinc-900/500 border-zinc-800"
        }`}
      >
        <div className="container flex items-center justify-between p-4 mx-auto md:p-6">
          {/* Back Arrow with Hover Effect */}
          <Link 
            href="/" 
            aria-label="Go to Home"
            className="duration-200 text-zinc-300 hover:text-zinc-100 hover:scale-110 transition-transform"
          >
            <ArrowLeft className="w-6 h-6" />
          </Link>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={toggleMenu} 
            className="block md:hidden text-zinc-400 hover:text-zinc-100"
            aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`
                  duration-200 flex items-center gap-1 
                  ${pathname === link.href 
                    ? 'text-zinc-100 font-semibold' 
                    : 'text-zinc-400 hover:text-zinc-100'}
                `}
              >
                <span>{link.icon}</span>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Overlay */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div 
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={menuVariants}
                className="absolute top-full left-0 w-full bg-zinc-900/95 border-t border-zinc-800 md:hidden shadow-2xl"
              >
                <motion.nav 
                  className="flex flex-col items-start p-4 space-y-2"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { 
                      opacity: 1,
                      transition: { 
                        staggerChildren: 0.1 
                      }
                    }
                  }}
                >
                  {NAV_LINKS.map((link) => (
                    <motion.div 
                      key={link.href} 
                      variants={linkVariants}
                    >
                      <Link 
                        href={link.href}
                        className={`
                          flex items-center gap-2 py-2 w-full
                          ${pathname === link.href 
                            ? 'text-zinc-100 font-semibold' 
                            : 'text-zinc-400 hover:text-zinc-100'}
                        `}
                      >
                        <span>{link.icon}</span>
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </motion.nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default Navigation;