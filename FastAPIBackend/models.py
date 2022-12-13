from sqlalchemy import Boolean, Column, Integer, String
from database import Base


class HistoricFundamentals(Base):
    __tablename__ = "AAPL"

    date = Column(String, primary_key=True, index=True)
    price = Column(String)
    #earnings = Column(String)
    #price_to_earnings_ratio = Column(String)
    #sales = Column(String)
    #price_to_sales_ratio = Column(String)
