from fastapi import FastAPI, Body
from core.scraper import scrape_pinterest
from core.storage import load_json

app = FastAPI(title="Pinterest API Demo")

@app.post("/scrape")
def scrape_items(payload: dict = Body(...)):
    keyword = payload.get("keyword", "vintage streetwear")
    items = scrape_pinterest(keyword)
    return {"count": len(items), "items": items}

@app.get("/items")
def get_items():
    return load_json("items.json")
