from fastapi import APIRouter

from backend.services.validation_service import validate_dataset

router = APIRouter()


@router.post("/validate/{dataset_name}")
def validate_uploaded_dataset(dataset_name: str):

    file_path = f"backend/uploads/{dataset_name}"

    report = validate_dataset(file_path)

    return report