import api from "@/lib/api";

export type Dataset = {
  dataset_name: string;
  file_size: number;
  upload_time: string;
  status: string;
};

export async function getDatasets(): Promise<
  Dataset[]
> {
  const response = await api.get<Dataset[]>(
    "/datasets",
  );

  return response.data;
}

export async function uploadDataset(
  file: File,
): Promise<void> {
  const formData = new FormData();

  formData.append("file", file);

  await api.post("/upload", formData);
}

export async function deleteDataset(
  datasetName: string,
): Promise<void> {
  await api.delete(
    `/datasets/${encodeURIComponent(
      datasetName,
    )}`,
  );
}