import axios from "axios";

import api from "@/lib/api";

import type { DatasetAnalytics } from "../types/analytics";

export async function runDatasetAnalytics(
  datasetName: string,
): Promise<DatasetAnalytics> {
  const encodedDatasetName =
    encodeURIComponent(datasetName);

  const response = await api.get<DatasetAnalytics>(
    `/analytics/${encodedDatasetName}`,
  );

  return response.data;
}

export async function getSavedDatasetAnalytics(
  datasetName: string,
): Promise<DatasetAnalytics | null> {
  const encodedDatasetName =
    encodeURIComponent(datasetName);

  try {
    const response =
      await api.get<DatasetAnalytics>(
        `/analytics/${encodedDatasetName}/saved`,
      );

    return response.data;
  } catch (error: unknown) {
    if (
      axios.isAxiosError(error) &&
      error.response?.status === 404
    ) {
      return null;
    }

    throw error;
  }
}