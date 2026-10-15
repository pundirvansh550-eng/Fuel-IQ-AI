from fastapi import APIRouter, UploadFile, File

from backend.schemas.file_schema import FileUploadResponse

router = APIRouter()


@router.post(
    "/upload",
    response_model=FileUploadResponse
)
async def upload_file(
    file: UploadFile = File(...)
):
    return FileUploadResponse(
        filename=file.filename,
        message="File uploaded successfully"
    )