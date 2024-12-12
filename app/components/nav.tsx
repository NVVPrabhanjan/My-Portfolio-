"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

export const Navigation: React.FC = () => {
	const ref = useRef<HTMLElement>(null);
	const [isIntersecting, setIntersecting] = useState(true);
	const [isMenuOpen, setIsMenuOpen] = useState(false); // state for mobile menu toggle

	useEffect(() => {
		if (!ref.current) return;
		const observer = new IntersectionObserver(([entry]) =>
			setIntersecting(entry.isIntersecting),
		);

		observer.observe(ref.current);
		return () => observer.disconnect();
	}, []);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
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
					{/* Back Arrow */}
					<Link href="/" className="duration-200 text-zinc-300 hover:text-zinc-100">
						<ArrowLeft className="w-6 h-6" />
					</Link>

					{/* Hamburger Icon for mobile */}
					<div className="block md:hidden">
						<button onClick={toggleMenu} className="text-zinc-400 hover:text-zinc-100">
							{/* Hamburger icon here */}
							{isMenuOpen ? (
								<span>&#x2715;</span> // Close icon (X)
							) : (
								<span>&#x2630;</span> // Hamburger icon (three lines)
							)}
						</button>
					</div>

					{/* Links for desktop */}
					<div className={`hidden md:flex gap-8`}>
						<Link href="/aboutme" className="duration-200 text-zinc-400 hover:text-zinc-100">
							About Me
						</Link>
						<Link href="/contact" className="duration-200 text-zinc-400 hover:text-zinc-100">
							Contact
						</Link>
						<Link href="/Education" className="duration-200 text-zinc-400 hover:text-zinc-100">
							Education
						</Link>
						<Link href="/skills" className="duration-200 text-zinc-400 hover:text-zinc-100">
							Skills
						</Link>
						<Link href="/projects" className="duration-200 text-zinc-400 hover:text-zinc-100">
							Projects
						</Link>
						<Link href="/Experience" className="duration-200 text-zinc-400 hover:text-zinc-100">
							Experience
						</Link>
						<Link href="/resume.pdf" className="duration-200 text-zinc-400 hover:text-zinc-100">
							Resume
						</Link>
					</div>

					{/* Mobile Menu */}
					{isMenuOpen && (
						<div className="absolute top-16 left-0 w-full bg-zinc-900 border-t border-zinc-800 md:hidden">
							<nav className="flex flex-col items-start p-4">
								<Link href="/aboutme" className="block py-2 text-zinc-400 hover:text-zinc-100">
									About Me
								</Link>
								<Link href="/contact" className="block py-2 text-zinc-400 hover:text-zinc-100">
									Contact
								</Link>
								<Link href="/Education" className="block py-2 text-zinc-400 hover:text-zinc-100">
									Education
								</Link>
								<Link href="/skills" className="block py-2 text-zinc-400 hover:text-zinc-100">
									Skills
								</Link>
								<Link href="/projects" className="block py-2 text-zinc-400 hover:text-zinc-100">
									Projects
								</Link>
								<Link href="/achievements" className="block py-2 text-zinc-400 hover:text-zinc-100">
									Achievements and Certifications
								</Link>
								<Link href="/resume.pdf" className="block py-2 text-zinc-400 hover:text-zinc-100">
									Resume
								</Link>
							</nav>
						</div>
					)}
				</div>
			</div>
		</header>
	);
};
