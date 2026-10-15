import pandas as pd


def validate_dataset(file_path: str):

    df = pd.read_csv(file_path)

    validation_report = {
        "total_rows": len(df),
        "total_columns": len(df.columns),
        "missing_values": int(df.isnull().sum().sum()),
        "duplicate_rows": int(df.duplicated().sum()),
        "column_names": list(df.columns)
    }

    return validation_report