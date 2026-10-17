import pandas as pd

from backend.services.schema_detection_service import (
    get_detected_fields
)
from backend.services.validation_service import (
    validate_dataset
)


def generate_dataset_profile(file_path: str):

    df = pd.read_csv(file_path)

    detected_fields = get_detected_fields(file_path)

    validation = validate_dataset(file_path)

    recommendations = []

    if detected_fields["emissions"]:
        recommendations.append(
            "Emission Analysis"
        )

    if detected_fields["fuel_consumption"]:
        recommendations.append(
            "Fuel Efficiency Analysis"
        )

    if validation["health_score"] >= 90:
        dataset_quality = "Excellent"

    elif validation["health_score"] >= 75:
        dataset_quality = "Good"

    else:
        dataset_quality = "Needs Improvement"

    profile = {
        "dataset_type": "Fleet Sustainability Dataset",
        "dataset_quality": dataset_quality,
        "health_score": validation["health_score"],
        "total_records": len(df),
        "total_columns": len(df.columns),
        "detected_fields": detected_fields,
        "recommended_analysis": recommendations
    }

    return profile