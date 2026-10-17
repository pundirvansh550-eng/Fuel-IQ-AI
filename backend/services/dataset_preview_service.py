import pandas as pd


def preview_dataset(
    file_path: str,
    page: int = 1,
    page_size: int = 20,
    search: str = ""
):

    df = pd.read_csv(file_path)

    df.columns = df.columns.str.strip()

    if search:
        mask = df.astype(str).apply(
            lambda row: row.str.contains(
                search,
                case=False,
                na=False,
            ).any(),
            axis=1,
        )

        df = df[mask]

    total_rows = len(df)
    total_columns = len(df.columns)

    start = (page - 1) * page_size
    end = start + page_size

    page_df = df.iloc[start:end]

    return {
        "columns": list(df.columns),
        "rows": page_df.to_dict(
            orient="records"
        ),
        "total_rows": total_rows,
        "total_columns": total_columns,
        "page": page,
        "page_size": page_size,
        "search": search,
    }