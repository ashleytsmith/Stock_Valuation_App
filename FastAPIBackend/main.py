from WebScraper import WebScraper
from fastapi import FastAPI

app = FastAPI()

webscraper = WebScraper() 

r = webscraper.scrapedata('sales')

@app.get("/")
async def root():
    return {r}