import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <nav className="border-b border-zinc-200">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-6">
          <div className="text-3xl font-bold">
            Fuel<span className="text-cyan-600">IQ</span>
          </div>

          <div className="flex items-center gap-8">
            <Link href="/platform">
              Platform
            </Link>

            <Link href="/solutions">
              Solutions
            </Link>

            <Link href="/command-center">
              Command Center
            </Link>
          </div>
        </div>
      </nav>

      <section className="mx-auto max-w-7xl px-8 py-28">
        <div className="max-w-4xl">
          <p className="mb-6 font-semibold text-cyan-600">
            AI Fleet Intelligence Operating System
          </p>

          <h1 className="text-7xl font-bold leading-tight">
            Understand.
            <br />
            Predict.
            <br />
            Decide.
          </h1>

          <p className="mt-8 max-w-3xl text-xl text-zinc-600">
            FuelIQ combines fleet intelligence,
            sustainability intelligence,
            compliance intelligence,
            forecasting and AI-driven decision support
            into one platform.
          </p>

          <div className="mt-10 flex gap-4">
            <Link
              href="/command-center"
              className="rounded-xl bg-cyan-600 px-6 py-3 text-white"
            >
              Open Command Center
            </Link>

            <Link
              href="/platform"
              className="rounded-xl border border-zinc-300 px-6 py-3"
            >
              Explore Platform
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-8 pb-24">
        <h2 className="mb-10 text-4xl font-bold">
          Why FuelIQ
        </h2>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-zinc-200 p-6">
            <h3 className="text-xl font-bold">
              Fleet Intelligence
            </h3>

            <p className="mt-3 text-zinc-600">
              Understand fleet performance and operational efficiency.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 p-6">
            <h3 className="text-xl font-bold">
              Emission Intelligence
            </h3>

            <p className="mt-3 text-zinc-600">
              Monitor emissions, identify hotspots and forecast impact.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 p-6">
            <h3 className="text-xl font-bold">
              Sustainability Intelligence
            </h3>

            <p className="mt-3 text-zinc-600">
              Track sustainability performance and readiness.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 p-6">
            <h3 className="text-xl font-bold">
              Decision Intelligence
            </h3>

            <p className="mt-3 text-zinc-600">
              Transform analytics into actionable decisions.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
