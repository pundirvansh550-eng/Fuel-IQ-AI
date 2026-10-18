from fastapi import APIRouter
import pandas as pd

router = APIRouter()


@router.get(
    "/manufacturer-distribution/{dataset_name}"
)
def manufacturer_distribution(
    dataset_name: str
):
    file_path = (
        f"backend/uploads/{dataset_name}"
    )

    df = pd.read_csv(file_path)

    df.columns = df.columns.str.strip()

    make_column = None

    for column in df.columns:

        if (
            "make" in column.lower()
            or "manufacturer" in column.lower()
        ):
            make_column = column
            break

    if make_column is None:
        return []

    counts = (
        df[make_column]
        .value_counts()
        .head(10)
    )

    return [
        {
            "name": str(name),
            "count": int(count),
        }
        for name, count in counts.items()
    ]