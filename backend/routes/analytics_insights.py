from fastapi import APIRouter
import pandas as pd

router = APIRouter()


@router.get(
    "/analytics-insights/{dataset_name}"
)
def analytics_insights(
    dataset_name: str
):
    file_path = (
        f"backend/uploads/{dataset_name}"
    )

    df = pd.read_csv(file_path)

    df.columns = df.columns.str.strip()

    insights = []

    # Manufacturer Insight
    make_column = None

    for column in df.columns:
        if (
            "make" in column.lower()
            or "manufacturer" in column.lower()
        ):
            make_column = column
            break

    if make_column:

        top_manufacturer = (
            df[make_column]
            .value_counts()
            .idxmax()
        )

        top_count = (
            df[make_column]
            .value_counts()
            .max()
        )

        insights.append(
            f"{top_manufacturer} is the dominant manufacturer with {top_count} vehicles."
        )

    # Vehicle Class Insight
    vehicle_column = None

    for column in df.columns:
        if "vehicle" in column.lower():
            vehicle_column = column
            break

    if vehicle_column:

        top_class = (
            df[vehicle_column]
            .value_counts()
            .idxmax()
        )

        insights.append(
            f"{top_class} is the most common vehicle category in the fleet."
        )

    # Dataset Size Insight
    insights.append(
        f"The dataset contains {len(df)} records available for analysis."
    )

    return {
        "insights": insights
    }