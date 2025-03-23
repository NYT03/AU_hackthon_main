import yfinance as yf

def fetch_stock_data():
    company_symbols = ["RELIANCE.NS", "TCS.NS", "INFY.NS"]
    stock_summaries = {}

    for company in company_symbols:
        try:
            stock_data = yf.download(company, period="6mo", interval="1d", progress=False)
            if not stock_data.empty:
                stock_summaries[company] = {
                    "start_price": stock_data["Close"].iloc[0],
                    "end_price": stock_data["Close"].iloc[-1],
                    "change": ((stock_data["Close"].iloc[-1] - stock_data["Close"].iloc[0]) / stock_data["Close"].iloc[0]) * 100,
                }
        except Exception as e:
            print(f"Error fetching data for {company}: {e}")
    
    return stock_summaries
