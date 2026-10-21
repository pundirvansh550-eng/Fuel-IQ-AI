import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="border-b border-zinc-200">

      {/* Navbar */}

      <nav>

        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-6">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 text-white font-bold">
              N
            </div>

            <div className="text-3xl font-bold">
              Fuel<span className="text-cyan-600">IQ</span>
            </div>

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

      {/* Hero Content */}

      <div className="mx-auto grid max-w-7xl gap-16 px-8 py-24 lg:grid-cols-2">

        {/* Left */}

        <div>

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

          <p className="mt-8 max-w-2xl text-xl text-zinc-600">
            FuelIQ combines fleet intelligence,
            sustainability intelligence,
            compliance intelligence,
            forecasting and AI-powered decision support
            into one platform.
          </p>

          <div className="mt-10 flex gap-4">

            <Link
              href="/command-center"
              className="rounded-2xl bg-cyan-600 px-8 py-4 text-white"
            >
              Open Command Center
            </Link>

            <Link
              href="/platform"
              className="rounded-2xl border border-zinc-300 px-8 py-4"
            >
              Explore Platform
            </Link>

          </div>

        </div>

        {/* Right */}

        <div className="flex items-center justify-center">

          <div className="w-full max-w-md rounded-3xl border border-zinc-200 bg-white p-8 shadow-xl">

            <div className="mb-6 flex items-center justify-between">

              <div>
                <div className="text-sm text-zinc-500">
                  Fleet Health
                </div>

                <div className="text-4xl font-bold text-cyan-600">
                  98
                </div>
              </div>

              <div className="rounded-full bg-green-100 px-4 py-2 text-green-700">
                Healthy
              </div>

            </div>

            <div className="space-y-4">

              <div className="rounded-2xl bg-slate-50 p-4">
                Sustainability Score
                <div className="mt-2 text-2xl font-bold text-green-600">
                  88
                </div>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                Risk Level
                <div className="mt-2 text-xl font-bold text-orange-500">
                  Medium
                </div>
              </div>

              <div className="rounded-2xl bg-cyan-50 p-4">
                AI Insight

                <div className="mt-2 text-sm text-zinc-700">
                  Emission trend remains stable.
                  Sustainability readiness improving.
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}