import DatasetDetails from "@/features/datasets/components/DatasetDetails";

interface DatasetDetailsPageProps {
  params: Promise<{
    datasetName: string;
  }>;
}

export default async function DatasetDetailsPage({
  params,
}: DatasetDetailsPageProps) {
  const { datasetName } = await params;

  const decodedDatasetName =
    decodeURIComponent(datasetName);

  return (
    <main className="px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-cyan-700">
            Datasets / Dataset Overview
          </p>

          <h1 className="mt-2 break-words text-4xl font-bold">
            {decodedDatasetName}
          </h1>

          <p className="mt-3 text-slate-600">
            Review dataset information,
            validation results and fleet
            intelligence.
          </p>
        </header>

        <DatasetDetails
          datasetName={decodedDatasetName}
        />
      </div>
    </main>
  );
}