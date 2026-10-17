from fastapi import APIRouter
from fastapi.responses import FileResponse

router = APIRouter()


@router.get("/export/{dataset_name}")
def export_dataset(
    dataset_name: str
):
    file_path = (
        f"backend/uploads/{dataset_name}"
    )

    return FileResponse(
        path=file_path,
        filename=dataset_name,
        media_type="text/csv"
    )