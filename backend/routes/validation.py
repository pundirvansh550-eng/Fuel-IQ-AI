from pathlib import Path

from fastapi import APIRouter, HTTPException
from backend.services.validation_result_service import (
    get_validation_result,
    save_validation_result,
)
from backend.services.validation_service import validate_dataset

router = APIRouter()

UPLOAD_DIR = Path("backend/uploads").resolve()


def get_dataset_path(dataset_name: str) -> Path:
    safe_name = Path(dataset_name).name

    if safe_name != dataset_name:
        raise HTTPException(
            status_code=400,
            detail="Invalid dataset name.",
        )

    file_path = (UPLOAD_DIR / safe_name).resolve()

    if file_path.parent != UPLOAD_DIR:
        raise HTTPException(
            status_code=400,
            detail="Invalid dataset path.",
        )

    if not file_path.exists():
        raise HTTPException(
            status_code=404,
            detail="Dataset not found.",
        )

    if not file_path.is_file():
        raise HTTPException(
            status_code=400,
            detail="Invalid dataset.",
        )

    return file_path


@router.get("/validate/{dataset_name}")
def get_saved_validation(dataset_name: str):
    file_path = get_dataset_path(dataset_name)

    result = get_validation_result(
        dataset_name=dataset_name,
        source_modified_at=file_path.stat().st_mtime,
    )

    if result is None:
        raise HTTPException(
            status_code=404,
            detail=(
                "No current validation result "
                "exists for this dataset."
            ),
        )

    return result


@router.post("/validate/{dataset_name}")
def run_dataset_validation(dataset_name: str):
    file_path = get_dataset_path(dataset_name)

    result = validate_dataset(str(file_path))

    return save_validation_result(
        dataset_name=dataset_name,
        result=result,
        source_modified_at=file_path.stat().st_mtime,
    )