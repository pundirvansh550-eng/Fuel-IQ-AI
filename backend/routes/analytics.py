from pathlib import Path

from fastapi import APIRouter, HTTPException

from backend.services.analytics_result_service import (
    get_analytics_result,
    save_analytics_result,
)
from backend.services.analytics_service import (
    generate_analytics,
)
from backend.services.validation_service import (
    validate_dataset,
)

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


def check_analytics_readiness(
    file_path: Path,
) -> None:
    validation = validate_dataset(
        str(file_path)
    )

    duplicate_rows = validation.get(
        "duplicate_rows",
        0,
    )

    if duplicate_rows > 0:
        raise HTTPException(
            status_code=409,
            detail={
                "code": "DUPLICATE_ROWS_FOUND",
                "message": (
                    "Analytics cannot run because "
                    "duplicate records were found."
                ),
                "duplicate_rows": duplicate_rows,
                "recommended_action": (
                    "Remove duplicate records or use "
                    "a cleaned dataset before running "
                    "analytics."
                ),
            },
        )


@router.get(
    "/analytics/{dataset_name}/saved"
)
def get_saved_analytics(
    dataset_name: str,
):
    file_path = get_dataset_path(
        dataset_name
    )

    result = get_analytics_result(
        dataset_name=dataset_name,
        source_modified_at=(
            file_path.stat().st_mtime
        ),
    )

    if result is None:
        raise HTTPException(
            status_code=404,
            detail=(
                "No current analytics result "
                "exists for this dataset."
            ),
        )

    return result


@router.get("/analytics/{dataset_name}")
def run_dataset_analytics(
    dataset_name: str,
):
    file_path = get_dataset_path(
        dataset_name
    )

    check_analytics_readiness(file_path)

    result = generate_analytics(
        str(file_path)
    )

    return save_analytics_result(
        dataset_name=dataset_name,
        result=result,
        source_modified_at=(
            file_path.stat().st_mtime
        ),
    )