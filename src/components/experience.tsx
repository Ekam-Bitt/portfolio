"use client";
import React from "react";

const experiences = [
    {
        company: "Freelance",
        role: "Fullstack Freelance Developer",
        period: "June 2023 - Present",
        description: "Create fullstack & responsive business websites. Delivered custom web solutions for various clients, specializing in e-commerce and portfolio sites.",
    },
    {
        company: "Timechain Labs",
        role: "Project Lead Intern",
        period: "May 2023 - August 2023",
        description: "Designed project White Paper & Webpages in Figma. Worked on MetaMask wallet integration with Node.js backend. Built frontend using Svelte.js & Tailwind CSS.",
    },
    {
        company: "Ezage.ai",
        role: "Frontend Tech Intern",
        period: "February 2023 - April 2023",
        description: "Designed webpages in Figma and created them using HTML, Tailwind CSS & JavaScript. Participated in strategy planning and social media marketing.",
    },
];

import { HyperText } from "@/components/ui/hyper-text";

export function Experience() {
    return (
        <section id="experience" className="py-20 w-full relative z-20">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <h2 className="text-3xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-heading mb-12">
                    <HyperText text="Experience" />
                </h2>
                <div className="space-y-12">
                    {experiences.map((exp, idx) => (
                        <div
                            key={idx}
                            className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8 border-l-2 border-neutral-200 dark:border-neutral-800 pl-8 relative"
                        >
                            <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white dark:bg-neutral-900 border-2 border-blue-500" />
                            <div className="md:w-1/4">
                                <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">{exp.company}</h3>
                                <p className="text-neutral-500 text-sm mt-1">{exp.period}</p>
                            </div>
                            <div className="md:w-3/4">
                                <h4 className="text-lg font-semibold text-neutral-700 dark:text-neutral-300 mb-2">{exp.role}</h4>
                                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                                    {exp.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
