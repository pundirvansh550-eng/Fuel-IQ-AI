import pandas as pd


def generate_dataset_insights(file_path: str):

    df = pd.read_csv(file_path)

    # Clean column names
    df.columns = df.columns.str.strip()

    insights = {
        "total_records": len(df),
        "total_columns": len(df.columns),
        "average_fuel_consumption": round(
            df["FUEL CONSUMPTION"].mean(),
            2
        ),
        "average_co2_emissions": round(
            df["COEMISSIONS"].mean(),
            2
        ),
        "total_manufacturers": int(
            df["MAKE"].nunique()
        ),
        "total_vehicle_classes": int(
            df["VEHICLE CLASS"].nunique()
        )
    }

    return insights