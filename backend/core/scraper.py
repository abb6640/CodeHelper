import requests
from core.storage import save_json

RAPIDAPI_KEY = "YOUR_RAPIDAPI_KEY_HERE"
RAPIDAPI_HOST = "pinterest-api.p.rapidapi.com"  # depends on chosen API

def scrape_pinterest(keyword: str, limit: int = 10):
    url = f"https://{RAPIDAPI_HOST}/search"
    headers = {
        "x-rapidapi-key": RAPIDAPI_KEY,
        "x-rapidapi-host": RAPIDAPI_HOST
    }
    params = {"query": keyword, "limit": limit}

    response = requests.get(url, headers=headers, params=params)
    if response.status_code != 200:
        print("Error:", response.text)
        return []

    data = response.json()
    
    # Adjust this depending on your API’s JSON response shape
    items = []
    for result in data.get("results", []):
        items.append({
            "title": result.get("title", ""),
            "image": result.get("image", ""),
            "link": result.get("link", "")
        })

    save_json("items.json", items)
    return items
