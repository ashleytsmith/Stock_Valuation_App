import httpx
from bs4 import BeautifulSoup
import re
import json
class WebScraper():

    def scrapedata(self, ticker):

        response = httpx.get('https://www.macrotrends.net/stocks/charts/AAPL/apple/price-sales')
       
        soup = BeautifulSoup(response.text, 'html.parser')
        html_table = soup.find('table',{'class': 'table'})
        
        table_data = [[x.text for x in row.select('td')] for row in html_table.select('tr')] #extract via list comprehension
        table_data = table_data[2:] # remove column titles
        table_data = [[re.sub('[$]', '', x) for x in y] for y in table_data] # remove dollar signs

        jsonString = json.dumps(table_data)
        
        return jsonString



    
   