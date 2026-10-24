import json
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

ANALYTICS_RESULTS_FILE = Path(
    "backend/uploads/analytics_results.json"
)


def ensure_analytics_results_file() -> None:
    ANALYTICS_RESULTS_FILE.parent.mkdir(
        parents=True,
        exist_ok=True,
    )

    if not ANALYTICS_RESULTS_FILE.exists():
        ANALYTICS_RESULTS_FILE.write_text(
            "{}",
            encoding="utf-8",
        )


def load_analytics_results() -> dict[str, Any]:
    ensure_analytics_results_file()

    try:
        content = ANALYTICS_RESULTS_FILE.read_text(
            encoding="utf-8",
        )

        data = json.loads(content)

        if isinstance(data, dict):
            return data

    except (json.JSONDecodeError, OSError):
        return {}

    return {}


def save_analytics_result(
    dataset_name: str,
    result: dict[str, Any],
    source_modified_at: float,
) -> dict[str, Any]:
    analytics_results = load_analytics_results()

    stored_result = {
        **result,
        "dataset_name": dataset_name,
        "analyzed_at": datetime.now(
            timezone.utc
        ).isoformat(),
        "source_modified_at": source_modified_at,
    }

    analytics_results[dataset_name] = stored_result

    ANALYTICS_RESULTS_FILE.write_text(
        json.dumps(
            analytics_results,
            indent=4,
        ),
        encoding="utf-8",
    )

    return stored_result


def get_analytics_result(
    dataset_name: str,
    source_modified_at: float,
) -> dict[str, Any] | None:
    analytics_results = load_analytics_results()

    stored_result = analytics_results.get(
        dataset_name
    )

    if stored_result is None:
        return None

    stored_modified_at = stored_result.get(
        "source_modified_at"
    )

    if stored_modified_at != source_modified_at:
        return None

    return stored_result


def delete_analytics_result(
    dataset_name: str,
) -> bool:
    analytics_results = load_analytics_results()

    if dataset_name not in analytics_results:
        return False

    del analytics_results[dataset_name]

    ANALYTICS_RESULTS_FILE.write_text(
        json.dumps(
            analytics_results,
            indent=4,
        ),
        encoding="utf-8",
    )

    return True