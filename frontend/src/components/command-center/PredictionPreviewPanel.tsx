export default function PredictionPreviewPanel() {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold">
        Prediction Preview
      </h2>

      <div className="mt-4 space-y-3">

        <div>
          Emission Forecast
        </div>

        <div>
          Sustainability Forecast
        </div>

        <div>
          Risk Forecast
        </div>

      </div>
    </div>
  );
}