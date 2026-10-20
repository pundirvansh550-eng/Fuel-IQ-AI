export default function PlatformOverviewSection() {
  return (
    <section className="bg-slate-50 py-24">

      <div className="mx-auto max-w-7xl px-8">

        <h2 className="mb-4 text-5xl font-bold">
          One Platform.
          Multiple Intelligence Layers.
        </h2>

        <p className="mb-14 max-w-4xl text-lg text-slate-600">
          FuelIQ unifies operational intelligence,
          sustainability intelligence and decision support
          into a single connected platform.
        </p>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <h3 className="text-xl font-bold">
              Fleet Intelligence
            </h3>

            <p className="mt-4 text-slate-600">
              Fleet performance, utilization and operational visibility.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <h3 className="text-xl font-bold">
              Emission Intelligence
            </h3>

            <p className="mt-4 text-slate-600">
              Emission analysis, forecasting and reduction opportunities.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <h3 className="text-xl font-bold">
              Sustainability Intelligence
            </h3>

            <p className="mt-4 text-slate-600">
              Sustainability performance, ESG readiness and impact tracking.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <h3 className="text-xl font-bold">
              Compliance Intelligence
            </h3>

            <p className="mt-4 text-slate-600">
              BS6, BS7, regulatory compliance and readiness assessment.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <h3 className="text-xl font-bold">
              AI Decision Engine
            </h3>

            <p className="mt-4 text-slate-600">
              Risk analysis, optimization opportunities and decision support.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <h3 className="text-xl font-bold">
              AI Copilot
            </h3>

            <p className="mt-4 text-slate-600">
              Natural language interaction with fleet intelligence and insights.
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}