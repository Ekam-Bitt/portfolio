"use client";
import React from "react";
import { toast } from "sonner";
import { FaLinkedin, FaGithub, FaInstagram, FaDiscord } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export function Contact() {
    const handleVerify = () => {
        if (typeof window !== "undefined" && (window as unknown as { ethereum: unknown }).ethereum) {
            toast.success("Wallet detected! Verification feature coming soon.");
        } else {
            toast.error("No crypto wallet found. Please install Metamask.");
        }
    };

    return (
        <section id="contact" className="py-20 w-full relative z-20">
            <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
                <h2 className="text-3xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-heading mb-8">
                    Ready to build something amazing?
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto mb-12 text-lg">
                    Whether you have a project in mind or just want to verify my on-chain identity, let&apos;s connect.
                </p>
                <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                    <a href="mailto:ekambitt@gmail.com" className="px-8 py-4 rounded-full bg-blue-600 text-white font-bold hover:bg-blue-700 transition duration-200 shadow-lg shadow-blue-500/20">
                        Send me an email
                    </a>
                    <button onClick={handleVerify} className="px-8 py-4 rounded-full bg-neutral-900 text-white font-bold border border-neutral-800 hover:bg-neutral-800 transition duration-200">
                        Verify on Blockchain
                    </button>
                </div>

                <div className="mt-16 flex items-center justify-center gap-8">
                    <a href="https://www.linkedin.com/in/ekam-bitt/" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-blue-600 transition-colors">
                        <FaLinkedin className="h-6 w-6" />
                    </a>
                    <a href="https://x.com/BittEkam" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-black dark:hover:text-white transition-colors">
                        <FaXTwitter className="h-6 w-6" />
                    </a>
                    <a href="https://github.com/Ekam-Bitt" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-black dark:hover:text-white transition-colors">
                        <FaGithub className="h-6 w-6" />
                    </a>
                    <a href="https://www.instagram.com/ekam.bitt28/" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-pink-600 transition-colors">
                        <FaInstagram className="h-6 w-6" />
                    </a>
                    <div className="text-neutral-500 hover:text-indigo-500 transition-colors cursor-pointer" onClick={() => {
                        navigator.clipboard.writeText("ekam28");
                        toast.success("Discord username copied!");
                    }}>
                        <FaDiscord className="h-6 w-6" />
                    </div>
                </div>
            </div>
        </section>
    );
}
