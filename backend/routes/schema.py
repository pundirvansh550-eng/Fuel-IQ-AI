from fastapi import APIRouter

from backend.services.schema_detection_service import (
    detect_schema
)

router = APIRouter()


@router.get("/schema/{dataset_name}")
def get_schema(dataset_name: str):

    file_path = f"backend/uploads/{dataset_name}"

    return detect_schema(file_path)