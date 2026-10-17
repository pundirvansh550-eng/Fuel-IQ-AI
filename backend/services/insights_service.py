import pandas as pd

from backend.services.schema_detection_service import (
    get_detected_fields
)


def generate_dataset_insights(file_path: str):

    df = pd.read_csv(file_path)

    df.columns = df.columns.str.strip()

    detected_fields = get_detected_fields(file_path)

    fuel_column = detected_fields["fuel_consumption"]
    emission_column = detected_fields["emissions"]
    manufacturer_column = detected_fields["manufacturer"]
    vehicle_class_column = detected_fields["vehicle_class"]

    insights = {
        "total_records": len(df),
        "total_columns": len(df.columns),
        "average_fuel_consumption": None,
        "average_emissions": None,
        "total_manufacturers": None,
        "total_vehicle_classes": None
    }

    if fuel_column:
        insights["average_fuel_consumption"] = round(
            float(df[fuel_column].mean()),
            2
        )

    if emission_column:
        insights["average_emissions"] = round(
            float(df[emission_column].mean()),
            2
        )

    if manufacturer_column:
        insights["total_manufacturers"] = int(
            df[manufacturer_column].nunique()
        )

    if vehicle_class_column:
        insights["total_vehicle_classes"] = int(
            df[vehicle_class_column].nunique()
        )

    return insights