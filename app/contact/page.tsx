"use client";
import React from "react";
import { Github, Mail, Twitter, Phone } from "lucide-react";
import Link from "next/link";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import Particles from "../components/particles"; // Import the Particles component

const socials = [
	{
		icon: <Twitter size={20} />,
		href: "https://x.com/Venkatprabhanj2",
		label: "Twitter",
		handle: "@Venkatprabhanj2",
	},
	{
		icon: <Mail size={20} />,
		href: "mailto:namakal.is22@bmsce.ac.in",
		label: "Email",
		handle: "namakal.is22@bmsce.ac.in",
	},
	{
		icon: <Github size={20} />,
		href: "https://github.com/NVVPrabhanjan",
		label: "Github",
		handle: "Prabhanjan",
	},
	{
		icon: <Phone size={20} />,
		href: "tel:7893152309",
		label: "Phone",
		handle: "7893152309",
	},
];

export default function Example() {
	return (
		<div className="my-16 relative bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0">
			<h1 className="text-center text-5xl md:text-7xl lg:text-8xl font-bold mb-16 tracking-tight text-white">
      Contact  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">Me</span>
        </h1>
			<Particles className="absolute inset-0 z-0" quantity={50} staticity={60} ease={60} refresh={false} /> {/* Added Particles component */}
			<Navigation />
			<div className="container flex items-center justify-center min-h-screen px-4 mx-auto mt-32">
				<div className="grid w-full grid-cols-1 gap-8 mx-auto sm:grid-cols-3 lg:gap-16">
					{socials.map((s) => (
						<Card key={s.label}>
							<Link
								href={s.href}
								target="_blank"
								className="p-4 relative flex flex-col items-center gap-4 duration-700 group md:gap-8 md:py-24 lg:pb-48 md:p-16"
							>
								<span
									className="absolute w-px h-2/3 bg-gradient-to-b from-zinc-500 via-zinc-500/50 to-transparent"
									aria-hidden="true"
								/>
								<span className="relative z-10 flex items-center justify-center w-12 h-12 text-sm duration-1000 border rounded-full text-zinc-200 group-hover:text-white group-hover:bg-zinc-900 border-zinc-500 bg-zinc-900 group-hover:border-zinc-200 drop-shadow-orange">
									{s.icon}
								</span>
								<div className="z-10 flex flex-col items-center">
									<span className="lg:text-xl font-medium duration-150 xl:text-3xl text-zinc-200 group-hover:text-white font-display">
										{s.handle}
									</span>
									<span className="mt-4 text-sm text-center duration-1000 text-zinc-400 group-hover:text-zinc-200">
										{s.label}
									</span>
								</div>
							</Link>
						</Card>
					))}
				</div>
			</div>
		</div>
	);
}
