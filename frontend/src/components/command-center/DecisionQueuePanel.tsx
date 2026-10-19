export default function DecisionQueuePanel() {
  return (
    <div className="rounded-2xl border border-amber-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold">
        Decision Queue
      </h2>

      <div className="mt-4 space-y-3">

        <div className="rounded-lg bg-amber-50 p-4">
          Review high-emission vehicles.
        </div>

        <div className="rounded-lg bg-amber-50 p-4">
          Run sustainability assessment.
        </div>

      </div>
    </div>
  );
}