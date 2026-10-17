import pandas as pd


def preview_dataset(file_path: str):

    df = pd.read_csv(file_path)

    df.columns = df.columns.str.strip()

    return {
        "columns": list(df.columns),
        "rows": df.head(20).to_dict(
            orient="records"
        )
    }