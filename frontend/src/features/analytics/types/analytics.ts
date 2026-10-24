export interface DatasetAnalytics {
  dataset_name?: string;
  total_records: number;
  total_columns: number;
  manufacturers_count: number | null;
  vehicle_classes_count: number | null;
  max_fuel_consumption: number | null;
  min_fuel_consumption: number | null;
  average_fuel_consumption: number | null;
  average_emissions: number | null;
  analyzed_at?: string;
  source_modified_at?: number;
}