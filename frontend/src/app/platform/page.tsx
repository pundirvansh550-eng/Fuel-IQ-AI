export default function PlatformPage() {
  return (
    <main className="min-h-screen bg-white text-zinc-900">

      {/* Hero */}

      <section className="border-b border-zinc-200 py-24">

        <div className="mx-auto max-w-7xl px-8">

          <p className="mb-4 font-semibold text-cyan-600">
            FuelIQ Platform
          </p>

          <h1 className="max-w-5xl text-6xl font-bold">
            The Fleet Intelligence Operating System
          </h1>

          <p className="mt-8 max-w-3xl text-xl text-zinc-600">
            FuelIQ connects intelligence,
            forecasting, sustainability,
            compliance and AI decision support
            into one unified platform.
          </p>

        </div>

      </section>

      {/* Platform Flow */}

      <section className="py-24">

        <div className="mx-auto max-w-4xl px-8">

          <div className="space-y-6">

            <div className="rounded-3xl border border-cyan-200 bg-cyan-50 p-8 text-center">
              <h2 className="text-3xl font-bold">
                Command Center
              </h2>
            </div>

            <div className="text-center text-4xl">
              ↓
            </div>

            <div className="rounded-3xl border border-zinc-200 p-8 text-center">
              Fleet Intelligence
            </div>

            <div className="text-center text-4xl">
              ↓
            </div>

            <div className="rounded-3xl border border-zinc-200 p-8 text-center">
              Emission Intelligence
            </div>

            <div className="text-center text-4xl">
              ↓
            </div>

            <div className="rounded-3xl border border-zinc-200 p-8 text-center">
              Sustainability Intelligence
            </div>

            <div className="text-center text-4xl">
              ↓
            </div>

            <div className="rounded-3xl border border-zinc-200 p-8 text-center">
              Compliance Intelligence
            </div>

            <div className="text-center text-4xl">
              ↓
            </div>

            <div className="rounded-3xl border border-zinc-200 p-8 text-center">
              Decision Intelligence
            </div>

            <div className="text-center text-4xl">
              ↓
            </div>

            <div className="rounded-3xl border border-cyan-200 bg-cyan-50 p-8 text-center">
              AI Copilot
            </div>

          </div>

        </div>

      </section>

    </main>
  );
}