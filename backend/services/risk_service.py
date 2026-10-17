from backend.services.sustainability_service import (
    generate_sustainability_score
)


def generate_risk_classification(
    file_path: str
):

    sustainability = (
        generate_sustainability_score(
            file_path
        )
    )

    score = sustainability[
        "sustainability_score"
    ]

    if score >= 90:
        risk = "Low Risk"

    elif score >= 75:
        risk = "Medium Risk"

    else:
        risk = "High Risk"

    return {
        "sustainability_score": score,
        "risk_level": risk
    }