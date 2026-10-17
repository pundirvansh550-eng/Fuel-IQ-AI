from fastapi import APIRouter

from backend.services.analytics_service import (
    generate_analytics
)

router = APIRouter()


@router.get("/analytics/{dataset_name}")
def analytics(dataset_name: str):

    file_path = f"backend/uploads/{dataset_name}"

    return generate_analytics(
        file_path
    )