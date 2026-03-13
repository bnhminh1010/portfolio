import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ServerStatus } from "@/components/ServerStatus";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Footer } from "@/components/Footer";
import { GitOpsStatus } from "@/components/GitOpsStatus";

export default function Home() {
  return (
    <div id="top" className="min-h-screen bg-white text-black flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <ServerStatus />
        <Skills />
        <Experience />
        <Projects />
      </main>
      <GitOpsStatus />
      <Footer />
    </div>
  );
}
