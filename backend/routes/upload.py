from pathlib import Path
import shutil

from fastapi import APIRouter, UploadFile, File

from backend.schemas.file_schema import FileUploadResponse
from backend.services.dataset_registry import (
    register_dataset,
    get_all_datasets,
    get_dataset_by_name,
    delete_dataset_by_name
)

router = APIRouter()

# Upload directory
UPLOAD_DIR = Path("backend/uploads")

# Create upload directory if it doesn't exist
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)


@router.post(
    "/upload",
    response_model=FileUploadResponse
)
async def upload_file(
    file: UploadFile = File(...)
):
    """
    Upload and store dataset files
    """

    file_path = UPLOAD_DIR / file.filename

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    file_size = file_path.stat().st_size

    register_dataset(
        filename=file.filename,
        file_size=file_size
    )

    return FileUploadResponse(
        filename=file.filename,
        message="File uploaded successfully"
    )


@router.get("/datasets")
def list_datasets():
    """
    Return all datasets
    """
    return get_all_datasets()


@router.get("/datasets/{dataset_name}")
def get_dataset(dataset_name: str):
    """
    Return dataset details
    """
    return get_dataset_by_name(dataset_name)


@router.delete("/datasets/{dataset_name}")
def delete_dataset(dataset_name: str):
    """
    Delete dataset file and registry entry
    """

    file_path = UPLOAD_DIR / dataset_name

    if file_path.exists():
        file_path.unlink()

    deleted = delete_dataset_by_name(dataset_name)

    if deleted:
        return {
            "message": f"{dataset_name} deleted successfully"
        }

    return {
        "message": f"{dataset_name} not found"
    }