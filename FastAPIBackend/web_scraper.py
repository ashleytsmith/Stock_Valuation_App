import httpx
from bs4 import BeautifulSoup
import re
import json

source = 'https://www.macrotrends.net/stocks/charts/'
descriptor_list = ['/pe-ratio','/price-sales']
descriptor_labels = [['date','price','earnings','price_to_earnings_ratio'],['date','price','sales','price_to_sales_ratio']]

data = {}

def scrapedata(ticker):

    for i in range(0,len(descriptor_list)):

        response = scrape_raw_html(ticker,descriptor_list[i])
        table_data = extract_table_data(response,descriptor_labels[i]) 
        collect_desired_data(table_data)  

    jsonString = json.dumps(data)
        
    return jsonString
        
        
def scrape_raw_html(ticker,descriptor):

    url = source + ticker + descriptor
    response = httpx.get(url)

    return response


def extract_table_data(response,descriptor_labels):

    soup = BeautifulSoup(response.text, 'html.parser')
    html_table = soup.find('table',{'class': 'table'})
        
    table_data = [[x.text for x in row.select('td')] for row in html_table.select('tr')] #extract via list comprehension
    table_data = table_data[2:] # remove column titles
    table_data = [[re.sub('[$]', '', x) for x in y] for y in table_data] # remove dollar signs

    values = map(list, zip(*table_data)) # split into sepearate lists
    keys = descriptor_labels

    table_data = dict(zip(keys,values))
    
    return table_data
    

def collect_desired_data(table_data):

    for key in table_data:

        if not key in data:

            data[key] = table_data[key]



