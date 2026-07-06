"use client";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { PropsWithChildren } from "react";

export const Card: React.FC<PropsWithChildren> = ({ children }) => {
  const mouseX = useSpring(useMotionValue(0), { stiffness: 350, damping: 40 });
  const mouseY = useSpring(useMotionValue(0), { stiffness: 350, damping: 40 });

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  // Spotlight gradient masks
  const spotlightMask = useMotionTemplate`radial-gradient(350px circle at ${mouseX}px ${mouseY}px, rgba(120, 119, 198, 0.15), transparent 80%)`;
  const borderMask = useMotionTemplate`radial-gradient(280px circle at ${mouseX}px ${mouseY}px, rgba(59, 130, 246, 0.4), transparent 80%)`;

  return (
    <div
      onMouseMove={onMouseMove}
      className="relative overflow-hidden rounded-3xl border border-zinc-800/80 bg-zinc-900/30 backdrop-blur-md hover:border-zinc-700/80 transition-all duration-300 group"
    >
      {/* Background spotlight overlay */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: spotlightMask,
        }}
      />

      {/* Border spotlight overlay */}
      <motion.div
        className="pointer-events-none absolute -inset-px z-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 border border-transparent"
        style={{
          background: borderMask,
          WebkitMaskImage: useMotionTemplate`radial-gradient(280px circle at ${mouseX}px ${mouseY}px, black, transparent)`,
          maskImage: useMotionTemplate`radial-gradient(280px circle at ${mouseX}px ${mouseY}px, black, transparent)`,
        }}
      />

      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </div>
  );
};

export default Card;
