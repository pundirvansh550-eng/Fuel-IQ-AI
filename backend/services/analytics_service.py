import pandas as pd

from backend.services.schema_detection_service import (
    get_detected_fields
)


def generate_analytics(file_path: str):

    df = pd.read_csv(file_path)

    df.columns = df.columns.str.strip()

    detected_fields = get_detected_fields(file_path)

    fuel_column = detected_fields["fuel_consumption"]
    emission_column = detected_fields["emissions"]
    manufacturer_column = detected_fields["manufacturer"]
    vehicle_class_column = detected_fields["vehicle_class"]

    analytics = {
        "total_records": len(df),
        "total_columns": len(df.columns),
        "manufacturers_count": None,
        "vehicle_classes_count": None,
        "max_fuel_consumption": None,
        "min_fuel_consumption": None,
        "average_fuel_consumption": None,
        "average_emissions": None
    }

    if manufacturer_column:
        analytics["manufacturers_count"] = int(
            df[manufacturer_column].nunique()
        )

    if vehicle_class_column:
        analytics["vehicle_classes_count"] = int(
            df[vehicle_class_column].nunique()
        )

    if fuel_column:
        analytics["max_fuel_consumption"] = float(
            df[fuel_column].max()
        )

        analytics["min_fuel_consumption"] = float(
            df[fuel_column].min()
        )

        analytics["average_fuel_consumption"] = round(
            float(df[fuel_column].mean()),
            2
        )

    if emission_column:
        analytics["average_emissions"] = round(
            float(df[emission_column].mean()),
            2
        )

    return analytics