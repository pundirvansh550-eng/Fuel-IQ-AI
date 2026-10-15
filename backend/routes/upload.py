from pathlib import Path
import shutil
from backend.services.dataset_registry import register_dataset

from fastapi import APIRouter, UploadFile, File

from backend.schemas.file_schema import FileUploadResponse

router = APIRouter()

# Upload directory
UPLOAD_DIR = Path("backend/uploads")

# Create directory if it doesn't exist
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

    # Register the uploaded dataset
    register_dataset(filename=file.filename, file_size=file.size)
    file_size = file_path.stat().st_size

    register_dataset(
    filename=file.filename,
    file_size=file_size
)
    return FileUploadResponse(
        filename=file.filename,
        message="File uploaded successfully"
    )