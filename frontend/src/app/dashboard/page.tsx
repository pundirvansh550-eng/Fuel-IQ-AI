import FleetHealthCard from "@/components/command-center/FleetHealthCard";
import SustainabilityCard from "@/components/command-center/SustainabilityCard";
import RiskCard from "@/components/command-center/RiskCard";

import CriticalAlertsPanel from "@/components/command-center/CriticalAlertsPanel";
import DecisionQueuePanel from "@/components/command-center/DecisionQueuePanel";
import PredictionPreviewPanel from "@/components/command-center/PredictionPreviewPanel";
import IntelligenceFeedPanel from "@/components/command-center/IntelligenceFeedPanel";

export default function DashboardPage() {
  return (
    <div className="space-y-8">

      {/* Header */}

      <div>

        <h1 className="text-5xl font-bold text-zinc-900">
          Command Center
        </h1>

        <p className="mt-3 text-lg text-zinc-500">
          Fleet Intelligence Operating System
        </p>

      </div>

      {/* Executive KPIs */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        <FleetHealthCard />

        <SustainabilityCard />

        <RiskCard />

      </div>

      {/* Main Panels */}

      <div className="grid gap-8 xl:grid-cols-2">

        <CriticalAlertsPanel />

        <DecisionQueuePanel />

      </div>

      {/* Prediction Preview */}

      <PredictionPreviewPanel />

      {/* Intelligence Feed */}

      <IntelligenceFeedPanel />

    </div>
  );
}