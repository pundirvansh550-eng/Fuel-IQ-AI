export default function HowItWorksSection() {
  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-8">

        <h2 className="mb-4 text-5xl font-bold">
          How FuelIQ Works
        </h2>

        <p className="mb-12 max-w-3xl text-lg text-slate-600">
          FuelIQ transforms raw operational data into intelligence,
          predictions and actionable decisions.
        </p>

        <div className="grid gap-6 md:grid-cols-5">

          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <div className="mb-4 text-4xl font-bold text-cyan-600">
              1
            </div>

            <h3 className="font-bold">
              Connect
            </h3>

            <p className="mt-3 text-sm text-slate-600">
              Upload fleet, fuel and operational data.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <div className="mb-4 text-4xl font-bold text-cyan-600">
              2
            </div>

            <h3 className="font-bold">
              Understand
            </h3>

            <p className="mt-3 text-sm text-slate-600">
              AI identifies patterns and risks.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <div className="mb-4 text-4xl font-bold text-cyan-600">
              3
            </div>

            <h3 className="font-bold">
              Predict
            </h3>

            <p className="mt-3 text-sm text-slate-600">
              Forecast future outcomes and risks.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <div className="mb-4 text-4xl font-bold text-cyan-600">
              4
            </div>

            <h3 className="font-bold">
              Recommend
            </h3>

            <p className="mt-3 text-sm text-slate-600">
              Generate AI-powered actions.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <div className="mb-4 text-4xl font-bold text-cyan-600">
              5
            </div>

            <h3 className="font-bold">
              Decide
            </h3>

            <p className="mt-3 text-sm text-slate-600">
              Drive smarter fleet decisions.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}