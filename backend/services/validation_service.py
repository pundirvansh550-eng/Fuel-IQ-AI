import pandas as pd


def calculate_health_score(
    missing_values: int,
    duplicate_rows: int
):

    score = 100

    score -= min(missing_values, 50)

    score -= min(duplicate_rows * 2, 30)

    return max(score, 0)


def get_health_status(score: int):

    if score >= 90:
        return "Excellent"

    if score >= 75:
        return "Good"

    if score >= 50:
        return "Average"

    return "Poor"


def validate_dataset(file_path: str):

    df = pd.read_csv(file_path)

    missing_values = int(df.isnull().sum().sum())

    duplicate_rows = int(df.duplicated().sum())

    health_score = calculate_health_score(
        missing_values,
        duplicate_rows
    )

    validation_report = {
        "total_rows": len(df),
        "total_columns": len(df.columns),
        "missing_values": missing_values,
        "duplicate_rows": duplicate_rows,
        "health_score": health_score,
        "health_status": get_health_status(
            health_score
        ),
        "column_names": list(df.columns)
    }

    return validation_report