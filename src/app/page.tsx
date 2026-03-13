import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ServerStatus } from "@/components/ServerStatus";
import { Skills } from "@/components/Skills";
import { PipelineFlow } from "@/components/PipelineFlow";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Footer } from "@/components/Footer";
import { GitOpsStatus } from "@/components/GitOpsStatus";
import { KubeVisualizer } from "@/components/KubeVisualizer";
import { GrafanaDashboard } from "@/components/GrafanaDashboard";
import { ScrollFadeIn } from "@/components/ScrollFadeIn";

export default function Home() {
  return (
    <div id="top" className="min-h-screen bg-white text-black flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        
        <ScrollFadeIn>
          <ServerStatus />
        </ScrollFadeIn>
        
        <ScrollFadeIn>
          <Skills />
        </ScrollFadeIn>
        
        <ScrollFadeIn delay={100}>
          <PipelineFlow />
        </ScrollFadeIn>
        
        {/* System Observability Section */}
        <ScrollFadeIn delay={100}>
          <section className="border-b border-black">
            <div className="mx-auto max-w-6xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-black border-l border-r border-black mx-4 sm:mx-6">
                <div className="p-4 sm:p-6 lg:p-8">
                  <KubeVisualizer />
                </div>
                <div className="p-4 sm:p-6 lg:p-8 bg-[#181B1F]">
                  <GrafanaDashboard />
                </div>
              </div>
            </div>
          </section>
        </ScrollFadeIn>

        <ScrollFadeIn delay={100}>
          <Experience />
        </ScrollFadeIn>
        
        <ScrollFadeIn delay={100}>
          <Projects />
        </ScrollFadeIn>
      </main>
      <GitOpsStatus />
      <Footer />
    </div>
  );
}
