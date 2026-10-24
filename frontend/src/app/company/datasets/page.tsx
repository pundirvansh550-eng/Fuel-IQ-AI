import DatasetHub from "@/features/datasets/components/DatasetHub";

export default function CompanyDatasetsPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-cyan-700">
            FuelIQ Company Platform
          </p>

          <h1 className="mt-2 text-4xl font-bold">
            Dataset Hub
          </h1>

          <p className="mt-3 text-slate-600">
            Upload and manage company fleet datasets.
          </p>
        </header>

        <DatasetHub />
      </div>
    </main>
  );
}