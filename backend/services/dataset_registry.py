import json
from pathlib import Path
from datetime import datetime

REGISTRY_FILE = Path("backend/uploads/dataset_registry.json")


def register_dataset(filename: str, file_size: int):

    dataset_entry = {
        "dataset_name": filename,
        "file_size": file_size,
        "upload_time": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "status": "Uploaded"
    }

    with open(REGISTRY_FILE, "r") as file:
        datasets = json.load(file)

    # Check if dataset already exists
    for dataset in datasets:
        if dataset["dataset_name"] == filename:
            dataset["file_size"] = file_size
            dataset["upload_time"] = dataset_entry["upload_time"]
            dataset["status"] = "Updated"

            with open(REGISTRY_FILE, "w") as file:
                json.dump(datasets, file, indent=4)

            return dataset

    # New dataset
    datasets.append(dataset_entry)

    with open(REGISTRY_FILE, "w") as file:
        json.dump(datasets, file, indent=4)

    return dataset_entry