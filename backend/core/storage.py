import json
import os

DATA_PATH = os.path.join(os.path.dirname(__file__), "..", "data")

def load_json(filename: str):
    """
    Loads JSON file from /data directory and returns Python object.
    If file missing or invalid, returns [].
    """
    path = os.path.join(DATA_PATH, filename)

    if not os.path.exists(path):
        with open(path, "w") as f:
            json.dump([], f)

    try:
        with open(path, "r") as f:
            return json.load(f)
    except json.JSONDecodeError:
        return []


def save_json(filename: str, data):
    """
    Saves Python object (list or dict) as JSON into /data directory.
    """
    path = os.path.join(DATA_PATH, filename)
    with open(path, "w") as f:
        json.dump(data, f, indent=2)
