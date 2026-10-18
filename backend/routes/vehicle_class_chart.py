from fastapi import APIRouter
import pandas as pd

router = APIRouter()


@router.get(
    "/vehicle-class-distribution/{dataset_name}"
)
def vehicle_class_distribution(
    dataset_name: str
):
    file_path = (
        f"backend/uploads/{dataset_name}"
    )

    df = pd.read_csv(file_path)

    df.columns = df.columns.str.strip()

    vehicle_column = None

    for column in df.columns:

        if (
            "vehicle" in column.lower()
        ):
            vehicle_column = column
            break

    if vehicle_column is None:
        return []

    counts = (
        df[vehicle_column]
        .value_counts()
        .head(10)
    )

    return [
        {
            "name": str(name),
            "count": int(count),
        }
        for name, count
        in counts.items()
    ]