from fastapi import APIRouter

from backend.services.recommendation_service import (
    generate_recommendations
)

router = APIRouter()


@router.get("/recommendations/{dataset_name}")
def dataset_recommendations(
    dataset_name: str
):

    file_path = f"backend/uploads/{dataset_name}"

    return generate_recommendations(
        file_path
    )