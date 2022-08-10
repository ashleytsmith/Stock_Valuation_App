import WebScraper
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
)

#webscraper = WebScraper()


@app.get("/")
async def root():
    return {}


@app.get("/{symbol:path}", name="path-convertor")
async def call_scraper(symbol):
    data = WebScraper.scrapedata(symbol)
    return {data}
