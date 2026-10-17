interface PageProps {
  params: Promise<{
    datasetName: string;
  }>;
}

export default async function SchemaPage({
  params,
}: PageProps) {
  const { datasetName } =
    await params;

  return (
    <div>
      <h1 className="text-4xl font-bold">
        Schema Workspace
      </h1>

      <p className="mt-2 text-zinc-400">
        {datasetName}
      </p>
    </div>
  );
}