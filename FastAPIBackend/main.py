import web_scraper

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Depends, Request

from sqlalchemy.orm import Session
import models
from database import SessionLocal, engine

import sqlalchemy as sa

import json
from web_scraper import collect_desired_data


models.Base.metadata.create_all(bind=engine)


app = FastAPI()

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
)



@app.get("/")
async def root():
    return {}



@app.get("/{symbol:path}", name="path-convertor")
async def add_to_db(symbol, db: Session = Depends(get_db)):

    # check if ticker information has already been scraped

    table_names = sa.inspect(engine).get_table_names()

    if not "AAPL" in table_names:

        data = web_scraper.scrapedata(symbol)

        # convert json string to dict
        data = json.loads(data)

        # add a table to the database for the ticker supplied
        dates = data["date"]
        prices = data["price"]

        for i, date in enumerate(dates):
        
            row = models.HistoricFundamentals(date = date, price = prices[i])
            db.add(row)

        db.commit()

    else:

        # get the table from the database by tablename

        table = db.query(models.HistoricFundamentals).filter(models.HistoricFundamentals.__tablename__=="AAPL").all()
        
        dates = []
        prices = []
        
        for i in range(0,len(table)):

            row = table[i]
            dates.append(row.date)
            prices.append(row.price)

        # convert to appropriate JSON format 
       
        data = {}
        data["date"] = dates
        data["price"] = prices
        
        jsonString = json.dumps(data)

    return {jsonString}
