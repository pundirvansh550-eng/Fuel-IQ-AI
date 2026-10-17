from fastapi import APIRouter

from backend.services.dashboard_service import (
    generate_dashboard_summary
)

router = APIRouter()


@router.get("/dashboard/{dataset_name}")
def dashboard_summary(
    dataset_name: str
):

    file_path = (
        f"backend/uploads/{dataset_name}"
    )

    return generate_dashboard_summary(
        file_path
    )