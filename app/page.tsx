"use client";
import { CommandBar } from "@/components/custom/command-bar";
import { RegexCard } from "@/components/custom/RegexCard";
import { regexInfo } from "@/lib/regex_info";
import { motion } from "framer-motion";
import { Regex } from "lucide-react";
import { useState } from "react";

const container = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: {
			staggerChildren: 0.3,
		},
	},
};

export default function Home() {
	const [search, setSearch] = useState("");

	const filteredRegexInfo = search
		? regexInfo.filter(
			(info) =>
				info.regex.includes(search) ||
				info.title.toLowerCase().includes(search.toLowerCase()) ||
				info.description.toLowerCase().includes(search.toLowerCase())
		)
		: regexInfo;

	return (
		<main className="flex min-h-screen flex-col items-center justify-between md:p-24">
			<div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
				<div className="p-4 w-full">
					<div className="flex items-center justify-center gap-4 text-center font-bold mt-8 md:-mt-16 mb-8 w-full font-mono">
						<Regex className="w-8 h-8 text-black border-2 border-yellow-300 rounded-md p-0.5" />
						<h1 className="text-3xl">
							coolregex.
							<span className="underline underline-offset-4 decoration-wavy decoration-yellow-300">
								fyi
							</span>
						</h1>
					</div>
					<CommandBar
						search={search}
						setSearch={setSearch}
						filteredRegexInfo={filteredRegexInfo}
					/>
					<motion.div
						className="flex flex-col gap-8"
						variants={container}
						initial="hidden"
						animate="show"
					>
						{filteredRegexInfo.map((info) => (
							<RegexCard
								key={info.regex}
								regex={info.regex}
								title={info.title}
								description={info.description}
								icon={info.icon}
							/>
						))}
					</motion.div>
				</div>
			</div>
		</main>
	);
}
