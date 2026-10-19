export default function RiskCard() {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-white p-6 shadow-sm">
      <div className="text-sm text-zinc-500">
        Risk Level
      </div>

      <div className="mt-4 text-3xl font-bold text-orange-500">
        Medium
      </div>

      <div className="mt-2 text-zinc-500">
        Attention Required
      </div>
    </div>
  );
}