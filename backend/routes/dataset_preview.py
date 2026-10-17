from fastapi import APIRouter

from backend.services.dataset_preview_service import (
    preview_dataset
)

router = APIRouter()


@router.get(
    "/dataset-preview/{dataset_name}"
)
def get_dataset_preview(
    dataset_name: str,
    page: int = 1,
    page_size: int = 20,
    search: str = ""
):
    file_path = (
        f"backend/uploads/{dataset_name}"
    )

    return preview_dataset(
        file_path=file_path,
        page=page,
        page_size=page_size,
        search=search,
    )
