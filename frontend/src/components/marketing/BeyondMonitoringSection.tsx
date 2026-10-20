export default function BeyondMonitoringSection() {
  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-8">

        <h2 className="mb-4 text-5xl font-bold text-zinc-900">
          Beyond Fleet Monitoring
        </h2>

        <p className="mb-14 max-w-4xl text-lg text-zinc-600">
          Traditional fleet platforms help organizations
          monitor operations. FuelIQ goes further by
          helping teams understand, predict and decide.
        </p>

        <div className="grid gap-8 lg:grid-cols-2">

          {/* Traditional Platforms */}

          <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-8">

            <h3 className="mb-6 text-2xl font-bold">
              Traditional Fleet Platforms
            </h3>

            <div className="space-y-4 text-zinc-600">

              <div>
                ✅ Vehicle Tracking
              </div>

              <div>
                ✅ Fleet Monitoring
              </div>

              <div>
                ✅ Historical Reports
              </div>

              <div>
                ✅ Operational Visibility
              </div>

            </div>

          </div>

          {/* FuelIQ */}

          <div className="rounded-3xl border border-cyan-200 bg-cyan-50 p-8">

            <h3 className="mb-6 text-2xl font-bold text-cyan-700">
              FuelIQ Intelligence Platform
            </h3>

            <div className="space-y-4">

              <div>
                ✅ Predict Future Risks
              </div>

              <div>
                ✅ Forecast Emissions
              </div>

              <div>
                ✅ Sustainability Intelligence
              </div>

              <div>
                ✅ Compliance Intelligence
              </div>

              <div>
                ✅ AI Recommendations
              </div>

              <div>
                ✅ Decision Support Engine
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}