export default function FleetHealthCard() {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-white p-6 shadow-sm">
      <div className="text-sm text-zinc-500">
        Fleet Health
      </div>

      <div className="mt-4 text-4xl font-bold text-cyan-600">
        98
      </div>

      <div className="mt-2 text-green-600">
        Excellent
      </div>
    </div>
  );
}