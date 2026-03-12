import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ServerStatus } from "@/components/ServerStatus";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div id="top" className="min-h-screen bg-white text-black">
      <Header />
      <main>
        <Hero />
        <ServerStatus />
        <Skills />
        <Experience />
        <Projects />
      </main>
      <Footer />
    </div>
  );
}
