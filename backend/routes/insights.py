from fastapi import APIRouter

from backend.services.insights_service import (
    generate_dataset_insights
)

router = APIRouter()


@router.get("/insights/{dataset_name}")
def dataset_insights(dataset_name: str):

    file_path = f"backend/uploads/{dataset_name}"

    return generate_dataset_insights(
        file_path
    )