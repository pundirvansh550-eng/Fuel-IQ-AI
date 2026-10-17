from backend.services.validation_service import (
    validate_dataset
)

from backend.services.schema_detection_service import (
    get_detected_fields
)

import pandas as pd


def generate_sustainability_score(
    file_path: str
):

    validation = validate_dataset(
        file_path
    )

    detected_fields = get_detected_fields(
        file_path
    )

    df = pd.read_csv(file_path)

    df.columns = df.columns.str.strip()

    score = validation["health_score"]

    emission_column = detected_fields["emissions"]

    if emission_column:

        average_emission = (
            df[emission_column]
            .mean()
        )

        if average_emission > 300:
            score -= 20

        elif average_emission > 250:
            score -= 10

        elif average_emission > 200:
            score -= 5

    score = max(score, 0)

    if score >= 90:
        rating = "Excellent"

    elif score >= 75:
        rating = "Good"

    elif score >= 50:
        rating = "Average"

    else:
        rating = "Poor"

    return {
        "sustainability_score": score,
        "rating": rating
    }