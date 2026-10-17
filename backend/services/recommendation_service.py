from backend.services.validation_service import (
    validate_dataset
)

from backend.services.schema_detection_service import (
    get_detected_fields
)


def generate_recommendations(file_path: str):

    validation = validate_dataset(file_path)

    detected_fields = get_detected_fields(file_path)

    recommendations = []

    if validation["missing_values"] > 0:
        recommendations.append(
            "Clean missing values before analysis."
        )

    if validation["duplicate_rows"] > 0:
        recommendations.append(
            "Remove duplicate records to improve data quality."
        )

    if validation["health_score"] >= 90:
        recommendations.append(
            "Dataset quality is excellent and ready for AI analysis."
        )

    if detected_fields["emissions"]:
        recommendations.append(
            "Run emission forecasting analysis."
        )

    if detected_fields["fuel_consumption"]:
        recommendations.append(
            "Run fuel efficiency optimization analysis."
        )

    if not recommendations:
        recommendations.append(
            "No recommendations available."
        )

    return {
        "health_score": validation["health_score"],
        "recommendations": recommendations
    }