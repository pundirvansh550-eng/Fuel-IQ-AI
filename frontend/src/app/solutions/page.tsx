export default function SolutionsPage() {
  return (
    <main className="min-h-screen bg-white text-zinc-900">

      {/* Hero */}

      <section className="border-b border-zinc-200 py-24">

        <div className="mx-auto max-w-7xl px-8">

          <p className="mb-4 font-semibold text-cyan-600">
            FuelIQ Solutions
          </p>

          <h1 className="max-w-5xl text-6xl font-bold">
            Solutions Built For Modern Fleet Operations
          </h1>

          <p className="mt-8 max-w-4xl text-xl text-zinc-600">
            FuelIQ helps organizations reduce costs,
            improve sustainability, manage compliance
            and make better operational decisions.
          </p>

        </div>

      </section>

      {/* Solution Cards */}

      <section className="py-24">

        <div className="mx-auto max-w-7xl px-8">

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

            <div className="rounded-3xl border border-zinc-200 p-8">
              <h3 className="text-2xl font-bold">
                Fuel Cost Optimization
              </h3>

              <p className="mt-4 text-zinc-600">
                Identify inefficiencies and reduce fuel-related operating expenses.
              </p>
            </div>

            <div className="rounded-3xl border border-zinc-200 p-8">
              <h3 className="text-2xl font-bold">
                Emission Management
              </h3>

              <p className="mt-4 text-zinc-600">
                Analyze emissions, identify hotspots and forecast future impact.
              </p>
            </div>

            <div className="rounded-3xl border border-zinc-200 p-8">
              <h3 className="text-2xl font-bold">
                Sustainability Intelligence
              </h3>

              <p className="mt-4 text-zinc-600">
                Measure sustainability performance and readiness.
              </p>
            </div>

            <div className="rounded-3xl border border-zinc-200 p-8">
              <h3 className="text-2xl font-bold">
                Compliance Intelligence
              </h3>

              <p className="mt-4 text-zinc-600">
                Support regulatory readiness including BS6, BS7 and ESG initiatives.
              </p>
            </div>

            <div className="rounded-3xl border border-zinc-200 p-8">
              <h3 className="text-2xl font-bold">
                AI Decision Support
              </h3>

              <p className="mt-4 text-zinc-600">
                Receive intelligent recommendations and prioritized actions.
              </p>
            </div>

            <div className="rounded-3xl border border-cyan-200 bg-cyan-50 p-8">
              <h3 className="text-2xl font-bold text-cyan-700">
                Predictive Fleet Intelligence
              </h3>

              <p className="mt-4 text-zinc-700">
                Forecast risks, emissions and sustainability outcomes before they occur.
              </p>
            </div>

          </div>

        </div>

      </section>

    </main>
  );
}