import requests

def fetch_crypto_prices():
    url = "https://api.binance.com/api/v3/ticker/price"
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error fetching crypto data: {e}")
        return None
