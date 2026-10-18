export default function DashboardPage() {
  return (
    <div>

      {/* Header */}

      <div className="mb-10">

        <h1 className="text-5xl font-bold">
          FuelIQ Command Center
        </h1>

        <p className="mt-3 text-zinc-400">
          Fleet Intelligence Operating System
        </p>

      </div>

      {/* Executive KPIs */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <div className="text-zinc-400">
            Fleet Health
          </div>

          <div className="mt-4 text-4xl font-bold text-cyan-400">
            98
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <div className="text-zinc-400">
            Sustainability
          </div>

          <div className="mt-4 text-4xl font-bold text-green-400">
            88
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <div className="text-zinc-400">
            Risk Level
          </div>

          <div className="mt-4 text-3xl font-bold text-orange-400">
            Medium
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <div className="text-zinc-400">
            Predicted Events
          </div>

          <div className="mt-4 text-4xl font-bold text-red-400">
            0
          </div>
        </div>

      </div>

      {/* Main Grid */}

      <div className="mt-10 grid gap-8 xl:grid-cols-2">

        {/* Critical Alerts */}

        <div className="rounded-2xl border border-red-900 bg-zinc-900 p-6">

          <h2 className="mb-6 text-2xl font-bold text-red-400">
            Critical Alerts
          </h2>

          <div className="space-y-3">

            <div className="rounded-lg bg-zinc-800 p-4">
              Duplicate records detected in fleet dataset.
            </div>

            <div className="rounded-lg bg-zinc-800 p-4">
              Sustainability score below ideal target.
            </div>

          </div>

        </div>

        {/* AI Recommendations */}

        <div className="rounded-2xl border border-cyan-900 bg-zinc-900 p-6">

          <h2 className="mb-6 text-2xl font-bold text-cyan-400">
            AI Recommended Actions
          </h2>

          <div className="space-y-3">

            <div className="rounded-lg bg-zinc-800 p-4">
              Review high emission vehicle segments.
            </div>

            <div className="rounded-lg bg-zinc-800 p-4">
              Run fleet sustainability assessment.
            </div>

            <div className="rounded-lg bg-zinc-800 p-4">
              Optimize fuel consumption patterns.
            </div>

          </div>

        </div>

      </div>

      {/* Intelligence Feed */}

      <div className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

        <h2 className="mb-6 text-2xl font-bold">
          Intelligence Feed
        </h2>

        <div className="space-y-3">

          <div className="rounded-lg bg-zinc-800 p-4">
            CHEVROLET is the dominant manufacturer.
          </div>

          <div className="rounded-lg bg-zinc-800 p-4">
            COMPACT is the primary fleet category.
          </div>

          <div className="rounded-lg bg-zinc-800 p-4">
            Fleet data quality remains excellent.
          </div>

        </div>

      </div>

    </div>
  );
}