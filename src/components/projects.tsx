"use client";
import React from "react";
import NextImage from "next/image";

const projects = [
    {
        title: "Dermacure.AI",
        description: "AI-powered platform identifying skin problems using GPT-3.5 Turbo API. Features telemedicine for sharing reports with doctors.",
        tags: ["Next.js", "TypeScript", "Tailwind CSS"],
        color: "from-purple-500 to-indigo-500",
        link: "https://dermacure-ai.vercel.app",
    },
    {
        title: "ELD Trip Planner",
        description: "Full-stack ELD and Trip Planning app for truck drivers. Automates route generation and HOS logging with FMCSA compliance.",
        tags: ["Django", "React.js", "PostgreSQL", "Docker"],
        color: "from-blue-500 to-cyan-500",
        link: "https://ekam-bitt.github.io/eld-trip-planner-public/",
    },
    {
        title: "Realtor Website",
        description: "Fully functional replica of realtor.com with Firebase authentication and property management capabilities.",
        tags: ["React.js", "Tailwind CSS", "Firebase"],
        color: "from-orange-500 to-red-500",
        link: "https://realtor-clone-react-ekam.vercel.app",
    },
    {
        title: "Emotion Detection Extension",
        description: "Chrome extension analyzing audience feedback on social media using Cardiff NLP sentiment model.",
        tags: ["HTML", "CSS", "JavaScript", "NLP"],
        color: "from-emerald-500 to-green-500",
        link: "https://github.com/Ekam-Bitt/emotion-detector-extension",
    },
];

import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";

import { HyperText } from "@/components/ui/hyper-text";

export function Projects() {
    return (
        <section id="projects" className="py-20 w-full bg-neutral-50 dark:bg-neutral-950/50 relative z-20">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <h2 className="text-3xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-heading mb-16">
                    <HyperText text="Selected Work" />
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project, idx) => (
                        <CardContainer key={idx} className="inter-var">
                            <CardBody className="bg-white dark:bg-neutral-900 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:border-white/[0.2] border-black/[0.1] w-full h-auto rounded-xl p-6 border">
                                <CardItem
                                    translateZ="50"
                                    className="text-xl font-bold text-neutral-600 dark:text-white"
                                >
                                    {project.title}
                                </CardItem>
                                <CardItem
                                    as="p"
                                    translateZ="60"
                                    className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                                >
                                    {project.description}
                                </CardItem>
                                <CardItem translateZ="100" className="w-full mt-4">
                                    <div className="h-60 w-full rounded-xl group-hover/card:shadow-xl overflow-hidden relative bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                                        {/* Browser Toolbar */}
                                        <div className="h-6 w-full bg-neutral-200 dark:bg-neutral-800 flex items-center px-4 gap-1.5 border-b border-neutral-300 dark:border-neutral-700">
                                            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                                        </div>
                                        {/* Content Placeholder */}
                                        <div className="w-full h-[calc(100%-1.5rem)] bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center relative overflow-hidden">
                                            <NextImage
                                                src={`https://api.microlink.io/?url=${encodeURIComponent(project.link)}&screenshot=true&meta=false&embed=screenshot.url`}
                                                alt={project.title}
                                                fill
                                                className="object-cover object-top"
                                                loading="lazy"
                                                unoptimized
                                            />
                                        </div>
                                    </div>
                                </CardItem>
                                <div className="flex justify-between items-center mt-8">
                                    <CardItem
                                        translateZ={20}
                                        as="a"
                                        href={project.link}
                                        target="__blank"
                                        className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                                    >
                                        Visit →
                                    </CardItem>
                                    <CardItem
                                        translateZ={20}
                                        as="div"
                                        className="flex flex-wrap gap-2"
                                    >
                                        {project.tags.map((tag, i) => (
                                            <span key={i} className="px-2 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 text-[10px] font-bold">
                                                {tag}
                                            </span>
                                        ))}
                                    </CardItem>
                                </div>
                            </CardBody>
                        </CardContainer>
                    ))}
                </div>
            </div>
        </section>
    );
}
