import HeroSection from "@/components/marketing/HeroSection";
import IndustryChallengesSection from "@/components/marketing/IndustryChallengesSection";
import WhyFuelIQSection from "@/components/marketing/WhyFuelIQSection";
import HowItWorksSection from "@/components/marketing/HowItWorksSection";
import BeyondMonitoringSection from "@/components/marketing/BeyondMonitoringSection";
import PlatformOverviewSection from "@/components/marketing/PlatformOverviewSection";
import CallToActionSection from "@/components/marketing/CallToActionSection";

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

      {/* Footer */}

      <footer className="bg-slate-950 text-white">

        <div className="mx-auto max-w-7xl px-8 py-20">

          <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-5">

            {/* Brand */}

            <div>

              <h2 className="text-3xl font-bold">
                FuelIQ
              </h2>

              <p className="mt-4 text-slate-400">
                Fleet Intelligence Operating System
              </p>

            </div>

            {/* Platform */}

            <div>

              <h3 className="mb-4 font-semibold">
                Platform
              </h3>

              <div className="space-y-3 text-slate-400">

                <div>Command Center</div>
                <div>Fleet Intelligence</div>
                <div>Emission Intelligence</div>
                <div>Sustainability Intelligence</div>
                <div>AI Copilot</div>

              </div>

            </div>

            {/* Solutions */}

            <div>

              <h3 className="mb-4 font-semibold">
                Solutions
              </h3>

              <div className="space-y-3 text-slate-400">

                <div>Fleet Optimization</div>
                <div>Emission Forecasting</div>
                <div>Sustainability Management</div>
                <div>Compliance Intelligence</div>

              </div>

            </div>

            {/* Resources */}

            <div>

              <h3 className="mb-4 font-semibold">
                Resources
              </h3>

              <div className="space-y-3 text-slate-400">

                <div>Documentation</div>
                <div>Blog</div>
                <div>Release Notes</div>
                <div>Product Roadmap</div>

              </div>

            </div>

            {/* Contact */}

            <div>

              <h3 className="mb-4 font-semibold">
                Contact
              </h3>

              <div className="space-y-3 text-slate-400">

                <div>Email: Coming Soon</div>

                <div>Phone: Coming Soon</div>

                <div>Location: Coming Soon</div>

              </div>

            </div>

          </div>

          <div className="mt-16 border-t border-slate-800 pt-8 text-sm text-slate-500">

            © 2026 FuelIQ AI.
            Fleet Intelligence Operating System.

          </div>

        </div>

      </footer>

    </main>
  );
}