import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { Skills } from "@/components/skills";
import { Projects } from "@/components/projects";
import { Experience } from "@/components/experience";
import { Contact } from "@/components/contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-background antialiased">
      <Navbar />
      <Hero />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
      <footer className="py-10 text-center text-neutral-500 text-sm relative z-20 border-t border-neutral-200 dark:border-neutral-900">
        <p>&copy; {new Date().getFullYear()} Ekam Bitt. All rights reserved.</p>
      </footer>
    </main>
  );
}
