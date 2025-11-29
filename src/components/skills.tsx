"use client";

import React from "react";
import { motion } from "framer-motion";
import { HyperText } from "@/components/ui/hyper-text";

const skills = [
    { name: "Next.js", category: "Frontend" },
    { name: "React.js", category: "Frontend" },
    { name: "Svelte.js", category: "Frontend" },
    { name: "Tailwind CSS", category: "Styling" },
    { name: "Node.js", category: "Backend" },
    { name: "Python", category: "Backend" },
    { name: "Go", category: "Backend" },
    { name: "Django", category: "Backend" },
    { name: "Solidity", category: "Blockchain" },
    { name: "Rust", category: "Blockchain" },
    { name: "Cairo", category: "Blockchain" },
    { name: "PostgreSQL", category: "Database" },
    { name: "MongoDB", category: "Database" },
    { name: "Redis", category: "Database" },
    { name: "Docker", category: "DevOps" },
];

export function Skills() {
    return (
        <section id="skills" className="py-20 w-full relative z-20">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <h2 className="text-3xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-heading mb-12 text-center">
                    <HyperText text="Tech Stack & Skills" />
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {skills.map((skill, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ scale: 1.05 }}
                            className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 hover:border-blue-500/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition duration-300 flex flex-col items-center justify-center gap-2 group cursor-pointer"
                        >
                            <span className="text-neutral-500 group-hover:text-neutral-700 dark:group-hover:text-neutral-400 text-xs uppercase tracking-wider transition-colors">
                                {skill.category}
                            </span>
                            <span className="text-neutral-700 dark:text-neutral-300 group-hover:text-black dark:group-hover:text-white font-semibold text-lg transition-colors">
                                {skill.name}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
