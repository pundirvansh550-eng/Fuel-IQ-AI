export type DatasetStatus =
  | "Uploaded"
  | "Updated"
  | "Processing"
  | "Validated"
  | "Failed";

export interface Dataset {
  dataset_name: string;
  file_size: number;
  upload_time: string;
  status: DatasetStatus | string;
}

export interface UploadDatasetResponse {
  filename: string;
  message: string;
}

export interface DatasetValidation {
  dataset_name?: string;
  total_rows: number;
  total_columns: number;
  missing_values: number;
  duplicate_rows: number;
  health_score: number;
  health_status: string;
  column_names: string[];
  validated_at?: string;
  source_modified_at?: number;
}

export type DatasetPreviewRow = Record<
  string,
  string | number | boolean | null
>;

export interface DatasetPreview {
  columns: string[];
  rows: DatasetPreviewRow[];
  total_rows: number;
  total_columns: number;
  page: number;
  page_size: number;
  search: string;
}