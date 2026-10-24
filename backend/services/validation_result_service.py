import json
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

VALIDATION_RESULTS_FILE = Path(
    "backend/uploads/validation_results.json"
)


def ensure_validation_results_file() -> None:
    VALIDATION_RESULTS_FILE.parent.mkdir(
        parents=True,
        exist_ok=True,
    )

    if not VALIDATION_RESULTS_FILE.exists():
        VALIDATION_RESULTS_FILE.write_text(
            "{}",
            encoding="utf-8",
        )


def load_validation_results() -> dict[str, Any]:
    ensure_validation_results_file()

    try:
        content = VALIDATION_RESULTS_FILE.read_text(
            encoding="utf-8",
        )

        data = json.loads(content)

        if isinstance(data, dict):
            return data

    except (
        json.JSONDecodeError,
        OSError,
    ):
        pass

    return {}


def save_validation_result(
    dataset_name: str,
    result: dict[str, Any],
    source_modified_at: float,
) -> dict[str, Any]:
    validation_results = load_validation_results()

    stored_result = {
        **result,
        "dataset_name": dataset_name,
        "validated_at": datetime.now(timezone.utc).isoformat(),
        "source_modified_at": source_modified_at,
    }

    validation_results[dataset_name] = stored_result

    VALIDATION_RESULTS_FILE.write_text(
        json.dumps(validation_results, indent=4),
        encoding="utf-8",
    )

    return stored_result


def get_validation_result(
    dataset_name: str,
    source_modified_at: float,
) -> dict[str, Any] | None:
    validation_results = load_validation_results()
    stored_result = validation_results.get(dataset_name)

    if not stored_result:
        return None

    stored_modified_at = stored_result.get("source_modified_at")

    if stored_modified_at != source_modified_at:
        return None

    return stored_result