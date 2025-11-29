"use client";
import React from "react";
import Link from "next/link";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Navbar() {
    const { theme, setTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const navItems = [
        { name: "Stack", link: "#skills" },
        { name: "Projects", link: "#projects" },
        { name: "Experience", link: "#experience" },
        { name: "Contact", link: "#contact" },
    ];

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
        e.preventDefault();
        setIsOpen(false);
        const targetId = link.replace("#", "");
        const elem = document.getElementById(targetId);
        if (elem) {
            elem.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="fixed top-6 inset-x-0 max-w-2xl mx-auto z-50 px-4">
            <div className="relative flex items-center justify-between space-x-4 px-6 py-3 rounded-full bg-black/40 backdrop-blur-md border border-white/[0.1] shadow-input">
                <Link
                    href="/"
                    onClick={(e) => {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="text-white font-bold text-lg font-heading tracking-wider"
                >
                    EKAM
                </Link>
                <div className="hidden md:flex items-center space-x-6">
                    {navItems.map((item, idx) => (
                        <Link
                            key={idx}
                            href={item.link}
                            onClick={(e) => scrollToSection(e, item.link)}
                            className="text-sm font-medium text-neutral-300 hover:text-white transition-colors"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className="p-2 rounded-full bg-white/5 text-white hover:bg-white/10 transition duration-200 border border-white/10 relative w-8 h-8 flex items-center justify-center"
                    >
                        <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 absolute" />
                        <Moon className="h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 absolute" />
                        <span className="sr-only">Toggle theme</span>
                    </button>
                    <a
                        href="/resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden md:block px-4 py-2 rounded-full bg-white/5 text-white text-xs font-bold hover:bg-white/10 transition duration-200 border border-white/10"
                    >
                        Resume
                    </a>
                    <button
                        className="md:hidden p-2 text-white"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="absolute top-full left-4 right-4 mt-2 p-4 rounded-2xl bg-black/90 backdrop-blur-xl border border-white/[0.1] flex flex-col gap-4 md:hidden">
                    {navItems.map((item, idx) => (
                        <Link
                            key={idx}
                            href={item.link}
                            onClick={(e) => scrollToSection(e, item.link)}
                            className="text-sm font-medium text-neutral-300 hover:text-white transition-colors p-2"
                        >
                            {item.name}
                        </Link>
                    ))}
                    <a
                        href="/resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-full bg-white/5 text-white text-xs font-bold hover:bg-white/10 transition duration-200 border border-white/10 text-center"
                    >
                        Resume
                    </a>
                </div>
            )}
        </div>
    );
}
