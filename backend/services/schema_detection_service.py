import pandas as pd


def detect_schema(file_path: str):

    df = pd.read_csv(file_path)

    df.columns = df.columns.str.strip()

    detected_fields = {
        "manufacturer": None,
        "vehicle_class": None,
        "fuel_consumption": None,
        "emissions": None
    }

    for column in df.columns:

        column_lower = column.lower()

        if "make" in column_lower or "manufacturer" in column_lower:
            detected_fields["manufacturer"] = column

        if "vehicle" in column_lower:
            detected_fields["vehicle_class"] = column

        if "fuel" in column_lower and "consumption" in column_lower:
            detected_fields["fuel_consumption"] = column

        if (
            "emission" in column_lower
            or "co2" in column_lower
        ):
            detected_fields["emissions"] = column

    return {
        "columns": list(df.columns),
        "total_columns": len(df.columns),
        "detected_fields": detected_fields
    }


def get_detected_fields(file_path: str):

    schema = detect_schema(file_path)

    return schema["detected_fields"]