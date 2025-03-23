import requests

def fetch_forex_rates():
    url = "https://api.exchangerate-api.com/v4/latest/USD"
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        data = response.json()
        return {k: v for k, v in data["rates"].items() if k in ["INR", "EUR", "GBP", "JPY"]}
    except requests.exceptions.RequestException as e:
        print(f"Error fetching forex data: {e}")
        return None
