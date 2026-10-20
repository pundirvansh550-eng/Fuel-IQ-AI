export default function WhyFuelIQSection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-8">

        <h2 className="mb-4 text-5xl font-bold text-zinc-900">
          Why FuelIQ
        </h2>

        <p className="mb-12 max-w-3xl text-lg text-zinc-600">
          Most fleet platforms show information.
          FuelIQ focuses on helping organizations
          understand risks, predict outcomes and
          make better decisions.
        </p>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
            <h3 className="text-xl font-bold">
              Fleet Intelligence
            </h3>

            <p className="mt-4 text-zinc-600">
              Understand fleet performance and operational efficiency.
            </p>
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
            <h3 className="text-xl font-bold">
              Emission Intelligence
            </h3>

            <p className="mt-4 text-zinc-600">
              Monitor emissions and identify improvement opportunities.
            </p>
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
            <h3 className="text-xl font-bold">
              Sustainability Intelligence
            </h3>

            <p className="mt-4 text-zinc-600">
              Track readiness for future sustainability goals.
            </p>
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
            <h3 className="text-xl font-bold">
              Decision Intelligence
            </h3>

            <p className="mt-4 text-zinc-600">
              Turn insights into actions with AI guidance.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}