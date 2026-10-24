from pathlib import Path
from typing import Any

import pandas as pd

from backend.services.dataset_registry import (
    register_dataset,
)


def create_deduplicated_dataset(
    source_file_path: Path,
    output_directory: Path,
) -> dict[str, Any]:
    if not source_file_path.exists():
        raise FileNotFoundError(
            "Source dataset was not found."
        )

    if source_file_path.suffix.lower() != ".csv":
        raise ValueError(
            "Only CSV datasets are supported."
        )

    dataframe = pd.read_csv(source_file_path)

    original_row_count = len(dataframe)

    duplicate_row_count = int(
        dataframe.duplicated().sum()
    )

    cleaned_dataframe = (
        dataframe.drop_duplicates()
        .reset_index(drop=True)
    )

    cleaned_row_count = len(cleaned_dataframe)

    source_stem = source_file_path.stem

    if source_stem.endswith("_cleaned"):
        source_stem = source_stem.removesuffix(
            "_cleaned"
        )

    output_filename = (
        f"{source_stem}_deduplicated.csv"
    )

    output_file_path = (
        output_directory / output_filename
    )

    cleaned_dataframe.to_csv(
        output_file_path,
        index=False,
    )

    file_size = output_file_path.stat().st_size

    register_dataset(
        filename=output_filename,
        file_size=file_size,
    )

    return {
        "source_dataset": source_file_path.name,
        "cleaned_dataset": output_filename,
        "original_rows": original_row_count,
        "duplicate_rows_removed": (
            duplicate_row_count
        ),
        "cleaned_rows": cleaned_row_count,
        "file_size": file_size,
        "message": (
            "Deduplicated dataset created "
            "successfully."
        ),
    }