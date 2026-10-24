import axios from "axios";
import api from "@/lib/api";

import type {
  Dataset,
  DatasetPreview,
  DatasetValidation,
  UploadDatasetResponse,
} from "../types/dataset";

export async function getDatasets(): Promise<Dataset[]> {
  const response = await api.get<Dataset[]>("/datasets");
  return response.data;
}

export async function getDataset(
  datasetName: string,
): Promise<Dataset> {
  const encodedName = encodeURIComponent(datasetName);
  const response = await api.get<Dataset>(`/datasets/${encodedName}`);

  return response.data;
}

export async function uploadDataset(
  file: File,
): Promise<UploadDatasetResponse> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post<UploadDatasetResponse>("/upload", formData);

  return response.data;
}

export async function deleteDataset(
  datasetName: string,
): Promise<void> {
  const encodedName = encodeURIComponent(datasetName);
  await api.delete(`/datasets/${encodedName}`);
}

export async function runDatasetValidation(
  datasetName: string,
): Promise<DatasetValidation> {
  const encodedName = encodeURIComponent(datasetName);
  const response = await api.post<DatasetValidation>(`/validate/${encodedName}`);

  return response.data;
}

export async function getSavedValidation(
  datasetName: string,
): Promise<DatasetValidation | null> {
  const encodedName = encodeURIComponent(datasetName);

  try {
    const response = await api.get<DatasetValidation>(`/validate/${encodedName}`);

    return response.data;
  } catch (error) {
    if (
      axios.isAxiosError(error) &&
      error.response?.status === 404
    ) {
      return null;
    }

    throw error;
  }
}

export async function getDatasetPreview(
  datasetName: string,
  page: number,
  pageSize: number,
  search: string,
): Promise<DatasetPreview> {
  const encodedName = encodeURIComponent(datasetName);
  const response = await api.get<DatasetPreview>(`/dataset-preview/${encodedName}`, {
    params: {
      page,
      page_size: pageSize,
      search,
    },
  });

  return response.data;
}
