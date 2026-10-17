from backend.services.validation_service import (
    validate_dataset
)

from backend.services.profile_service import (
    generate_dataset_profile
)

from backend.services.recommendation_service import (
    generate_recommendations
)

from backend.services.sustainability_service import (
    generate_sustainability_score
)

from backend.services.risk_service import (
    generate_risk_classification
)

from backend.services.schema_detection_service import (
    detect_schema
)


def generate_dataset_intelligence(
    file_path: str
):

    return {
        "validation":
            validate_dataset(file_path),

        "profile":
            generate_dataset_profile(
                file_path
            ),

        "recommendations":
            generate_recommendations(
                file_path
            ),

        "sustainability":
            generate_sustainability_score(
                file_path
            ),

        "risk":
            generate_risk_classification(
                file_path
            ),

        "schema":
            detect_schema(
                file_path
            ),
    }