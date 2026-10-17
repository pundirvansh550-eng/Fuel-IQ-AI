from fastapi import APIRouter

from backend.services.sustainability_service import (
    generate_sustainability_score
)

router = APIRouter()


@router.get(
    "/sustainability/{dataset_name}"
)
def sustainability_score(
    dataset_name: str
):

    file_path = (
        f"backend/uploads/{dataset_name}"
    )

    return generate_sustainability_score(
        file_path
    )