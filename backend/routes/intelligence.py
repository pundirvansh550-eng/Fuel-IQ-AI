from fastapi import APIRouter

from backend.services.intelligence_service import (
    generate_dataset_intelligence
)

router = APIRouter()


@router.get(
    "/dataset-intelligence/{dataset_name}"
)
def dataset_intelligence(
    dataset_name: str
):

    file_path = (
        f"backend/uploads/{dataset_name}"
    )

    return generate_dataset_intelligence(
        file_path
    )