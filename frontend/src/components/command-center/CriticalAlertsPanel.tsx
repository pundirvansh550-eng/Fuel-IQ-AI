export default function CriticalAlertsPanel() {
  return (
    <div className="rounded-2xl border border-red-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-red-600">
        Critical Alerts
      </h2>

      <div className="mt-4 space-y-3">

        <div className="rounded-lg bg-red-50 p-4">
          Sustainability score below target.
        </div>

        <div className="rounded-lg bg-red-50 p-4">
          Duplicate records detected.
        </div>

      </div>
    </div>
  );
}