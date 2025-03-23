import requests
import re
import pandas as pd

# URL for Indian Mutual Fund NAV Data
url = "https://www.amfiindia.com/spages/NAVAll.txt"

# Fetch Data from AMFI
response = requests.get(url)
data = response.text

# Save raw data to a text file (optional for debugging)
with open("nav_data_raw.txt", "w", encoding="utf-8") as file:
    file.write(data)

# Regular Expression to Match Valid Data Rows (6 columns)
pattern = re.compile(r"^(\d+);([\w\d\-]+|);([\w\d\-]+|);([^;]+);([\d\.]+);(\d{2}-[A-Za-z]{3}-\d{4})$", re.MULTILINE)

# Find all matches
matches = pattern.findall(data)

# Convert Matches to DataFrame
df = pd.DataFrame(matches, columns=[
    "Scheme Code", "ISIN Div Payout/ ISIN Growth", "ISIN Div Reinvestment", 
    "Scheme Name", "Net Asset Value (NAV)", "Date"
])

# Save Cleaned Data to CSV
df.to_csv("mutual_funds_nav.csv", index=False, encoding="utf-8")

print("✅ Data successfully saved as `mutual_funds_nav.csv`")
