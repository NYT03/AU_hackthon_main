import yfinance as yf

def fetch_commodity_prices():
    investable_commodities = {
        "Gold": "GC=F",
        "Silver": "SI=F",
        "Crude Oil (WTI)": "CL=F",
        "Brent Crude Oil": "BZ=F",
    }
    market_data = []
    
    for name, ticker in investable_commodities.items():
        try:
            data = yf.Ticker(ticker)
            price = data.history(period="1d")["Close"].iloc[-1]
            market_data.append({"commodity": name, "price": price})
        except Exception as e:
            print(f"Failed to fetch {name}: {str(e)}")
    
    return market_data
