import HeroSection from "@/components/marketing/HeroSection";
import IndustryChallengesSection from "@/components/marketing/IndustryChallengesSection";
import WhyFuelIQSection from "@/components/marketing/WhyFuelIQSection";
import HowItWorksSection from "@/components/marketing/HowItWorksSection";
import BeyondMonitoringSection from "@/components/marketing/BeyondMonitoringSection";
import PlatformOverviewSection from "@/components/marketing/PlatformOverviewSection";
import CallToActionSection from "@/components/marketing/CallToActionSection";
import AskFuelIQ from "@/components/marketing/AskFuelIQ";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">

      <HeroSection />

      <IndustryChallengesSection />

      <WhyFuelIQSection />

      <HowItWorksSection />

      <BeyondMonitoringSection />

      <PlatformOverviewSection />

      <CallToActionSection />

      <AskFuelIQ />

    </main>
  );
}