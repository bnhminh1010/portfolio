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
import { IaCShowcase } from "@/components/IaCShowcase";
import { SecurityScan } from "@/components/SecurityScan";
import { IncidentDemo } from "@/components/IncidentDemo";
import { CostBreakdown } from "@/components/CostBreakdown";
import { NetworkTopology } from "@/components/NetworkTopology";
import { SkillRadar } from "@/components/SkillRadar";
import { LearningTimeline } from "@/components/LearningTimeline";
import { ActivityHeatmap } from "@/components/ActivityHeatmap";
import { ProjectTimeline } from "@/components/ProjectTimeline";
import { FloatingParticles } from "@/components/FloatingParticles";
import { CodeComparison } from "@/components/CodeComparison";
import { FloatingTOC } from "@/components/FloatingTOC";
import { PrometheusMetrics } from "@/components/PrometheusMetrics";
import { LokiLogs } from "@/components/LokiLogs";
import { KafkaTopics } from "@/components/KafkaTopics";
import { SecretManager } from "@/components/SecretManager";
import { ZeroTrust } from "@/components/ZeroTrust";
import { DistributedTracing } from "@/components/DistributedTracing";
import { BackupStatus } from "@/components/BackupStatus";
import { RuntimeSecurity } from "@/components/RuntimeSecurity";

export default function Home() {
  return (
    <div id="top" className="min-h-screen bg-white text-black flex flex-col">
      <FloatingParticles />
      <FloatingTOC />
      <Header />
      <main className="flex-1 relative">
        <Hero />

        <ScrollFadeIn>
          <section id="about"><ServerStatus /></section>
        </ScrollFadeIn>

        <ScrollFadeIn>
          <section id="skills"><Skills /></section>
        </ScrollFadeIn>

        <ScrollFadeIn delay={100}>
          <section id="skill-radar"><SkillRadar /></section>
        </ScrollFadeIn>

        <ScrollFadeIn delay={100}>
          <section id="timeline"><LearningTimeline /></section>
        </ScrollFadeIn>

        <ScrollFadeIn delay={100}>
          <section id="activity"><ActivityHeatmap /></section>
        </ScrollFadeIn>

        <ScrollFadeIn delay={100}>
          <section id="projects-timeline"><ProjectTimeline /></section>
        </ScrollFadeIn>

        <ScrollFadeIn delay={100}>
          <section id="comparison"><CodeComparison /></section>
        </ScrollFadeIn>

        <ScrollFadeIn delay={100}>
          <section id="iac"><IaCShowcase /></section>
        </ScrollFadeIn>

        <ScrollFadeIn delay={100}>
          <section id="security"><SecurityScan /></section>
        </ScrollFadeIn>

        <ScrollFadeIn delay={100}>
          <section id="monitoring"><PrometheusMetrics /></section>
        </ScrollFadeIn>

        <ScrollFadeIn delay={100}>
          <LokiLogs />
        </ScrollFadeIn>

        <ScrollFadeIn delay={100}>
          <section id="pipeline"><PipelineFlow /></section>
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
          <section id="network"><NetworkTopology /></section>
        </ScrollFadeIn>

        <ScrollFadeIn delay={100}>
          <section id="incidents"><IncidentDemo /></section>
        </ScrollFadeIn>

        <ScrollFadeIn delay={100}>
          <section id="backup"><BackupStatus /></section>
        </ScrollFadeIn>

        <ScrollFadeIn delay={100}>
          <section id="security-runtime"><RuntimeSecurity /></section>
        </ScrollFadeIn>

        <ScrollFadeIn delay={100}>
          <section id="kafka"><KafkaTopics /></section>
        </ScrollFadeIn>

        <ScrollFadeIn delay={100}>
          <section id="secrets"><SecretManager /></section>
        </ScrollFadeIn>

        <ScrollFadeIn delay={100}>
          <section id="zerotrust"><ZeroTrust /></section>
        </ScrollFadeIn>

        <ScrollFadeIn delay={100}>
          <section id="tracing"><DistributedTracing /></section>
        </ScrollFadeIn>

        <ScrollFadeIn delay={100}>
          <section id="cost"><CostBreakdown /></section>
        </ScrollFadeIn>

        <ScrollFadeIn delay={100}>
          <section id="experience"><Experience /></section>
        </ScrollFadeIn>

        <ScrollFadeIn delay={100}>
          <section id="projects"><Projects /></section>
        </ScrollFadeIn>
      </main>
      <GitOpsStatus />
      <Footer />
    </div>
  );
}
