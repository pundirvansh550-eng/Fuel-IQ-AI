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

    # Update existing dataset
    for dataset in datasets:
        if dataset["dataset_name"] == filename:
            dataset["file_size"] = file_size
            dataset["upload_time"] = dataset_entry["upload_time"]
            dataset["status"] = "Updated"

            with open(REGISTRY_FILE, "w") as file:
                json.dump(datasets, file, indent=4)

            return dataset

    # Register new dataset
    datasets.append(dataset_entry)

    with open(REGISTRY_FILE, "w") as file:
        json.dump(datasets, file, indent=4)

    return dataset_entry


def get_all_datasets():

    with open(REGISTRY_FILE, "r") as file:
        datasets = json.load(file)

    return datasets


def get_dataset_by_name(dataset_name: str):

    with open(REGISTRY_FILE, "r") as file:
        datasets = json.load(file)

    for dataset in datasets:
        if dataset["dataset_name"] == dataset_name:
            return dataset

    return None


def delete_dataset_by_name(dataset_name: str):

    with open(REGISTRY_FILE, "r") as file:
        datasets = json.load(file)

    updated_datasets = [
        dataset
        for dataset in datasets
        if dataset["dataset_name"] != dataset_name
    ]

    if len(updated_datasets) == len(datasets):
        return False

    with open(REGISTRY_FILE, "w") as file:
        json.dump(updated_datasets, file, indent=4)

    return True