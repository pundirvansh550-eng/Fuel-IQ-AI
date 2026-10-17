export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6">

        <p className="mb-4 rounded-full border border-cyan-500/30 px-4 py-2 text-sm text-cyan-400">
          Agentic Fleet Sustainability Intelligence
        </p>

        <h1 className="text-center text-6xl font-bold tracking-tight">
          Fuel<span className="text-cyan-400">IQ</span> AI
        </h1>

        <p className="mt-6 max-w-3xl text-center text-xl text-zinc-400">
          Enterprise Fleet Sustainability, Emission Intelligence,
          Compliance Readiness and AI-Powered Decision Support Platform.
        </p>

        <div className="mt-10 flex gap-4">
          <button className="rounded-xl bg-cyan-500 px-6 py-3 font-medium text-black">
            Get Started
          </button>

          <button className="rounded-xl border border-zinc-700 px-6 py-3">
            Login
          </button>
        </div>

        <div className="mt-20 grid w-full max-w-5xl gap-6 md:grid-cols-3">

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h3 className="mb-2 text-cyan-400">AI Intelligence</h3>
            <p className="text-zinc-400">
              Intelligent insights powered by multiple AI agents.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h3 className="mb-2 text-cyan-400">Sustainability</h3>
            <p className="text-zinc-400">
              Measure fleet sustainability and environmental impact.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h3 className="mb-2 text-cyan-400">Compliance</h3>
            <p className="text-zinc-400">
              Track readiness for future regulations and standards.
            </p>
          </div>

        </div>

      </div>
    </main>
  );
}