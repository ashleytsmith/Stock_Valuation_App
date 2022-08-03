from WebScraper import WebScraper
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

webscraper = WebScraper() 

data = webscraper.scrapedata('sales')

@app.get("/")
async def root():
    return {data}