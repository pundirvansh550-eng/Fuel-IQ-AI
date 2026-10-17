from backend.services.validation_service import (
    validate_dataset
)

from backend.services.sustainability_service import (
    generate_sustainability_score
)

from backend.services.risk_service import (
    generate_risk_classification
)

from backend.services.recommendation_service import (
    generate_recommendations
)


def generate_dashboard_summary(
    file_path: str
):

    validation = validate_dataset(
        file_path
    )

    sustainability = (
        generate_sustainability_score(
            file_path
        )
    )

    risk = (
        generate_risk_classification(
            file_path
        )
    )

    recommendations = (
        generate_recommendations(
            file_path
        )
    )

    return {
        "dataset_health_score":
            validation["health_score"],

        "dataset_health_status":
            validation["health_status"],

        "sustainability_score":
            sustainability[
                "sustainability_score"
            ],

        "sustainability_rating":
            sustainability[
                "rating"
            ],

        "risk_level":
            risk["risk_level"],

        "recommendations":
            recommendations[
                "recommendations"
            ]
    }