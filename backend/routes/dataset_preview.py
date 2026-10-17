from fastapi import APIRouter

from backend.services.dataset_preview_service import (
    preview_dataset
)

router = APIRouter()


@router.get("/dataset-preview/{dataset_name}")
def get_dataset_preview(
    dataset_name: str
):
    file_path = (
        f"backend/uploads/{dataset_name}"
    )

    return preview_dataset(
        file_path
    )