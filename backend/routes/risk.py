from fastapi import APIRouter

from backend.services.risk_service import (
    generate_risk_classification
)

router = APIRouter()


@router.get("/risk/{dataset_name}")
def classify_risk(
    dataset_name: str
):

    file_path = (
        f"backend/uploads/{dataset_name}"
    )

    return generate_risk_classification(
        file_path
    )