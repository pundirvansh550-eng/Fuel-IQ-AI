from fastapi import APIRouter

from backend.services.profile_service import (
    generate_dataset_profile
)

router = APIRouter()


@router.get("/profile/{dataset_name}")
def dataset_profile(dataset_name: str):

    file_path = f"backend/uploads/{dataset_name}"

    return generate_dataset_profile(
        file_path
    )