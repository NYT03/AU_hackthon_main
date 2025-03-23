import requests
import json
import os
from langchain_groq import ChatGroq

# Load API Key
llm = ChatGroq(model_name="llama3-70b-8192", temperature=0.7, api_key=os.getenv("GROQ_API_KEY"))

TAX_API_URL = "https://api.incometaxindia.gov.in/tax-rates"  

def fetch_latest_tax_rates():
    """Fetch latest tax rates from API, fallback to predefined values if API fails."""
    try:
        response = requests.get(TAX_API_URL, timeout=10)
        if response.status_code == 200:
            return response.json()
    except requests.exceptions.RequestException:
        pass

    return {  # Fallback tax rules
        "capital_gains": {
            "stocks": {"short_term": 15, "long_term": 10},  
            "crypto": {"flat": 30},  
            "mutual_funds": {"equity": {"short_term": 15, "long_term": 10}, "debt": {"short_term": "income_tax", "long_term": 20}},
            "forex": {"flat": 20}  
        },
        "income_tax_slabs": [
            {"min": 0, "max": 250000, "rate": 0},
            {"min": 250001, "max": 500000, "rate": 5},
            {"min": 500001, "max": 1000000, "rate": 20},
            {"min": 1000001, "max": None, "rate": 30}
        ]
    }

def calculate_tax(investment_data):
    """
    Compute total tax liability based on different investments.

    investment_data = {
        "stocks": {"profit": 120000, "holding_period": "long_term"},
        "crypto": {"profit": 50000},
        "mutual_funds": {"profit": 70000, "type": "equity", "holding_period": "short_term"},
        "forex": {"profit": 25000},
        "annual_income": 900000
    }
    """
    tax_rates = fetch_latest_tax_rates()
    total_tax = 0
    breakdown = {}

    for asset, details in investment_data.items():
        if asset in tax_rates["capital_gains"]:
            rules = tax_rates["capital_gains"][asset]

            if asset == "crypto" or asset == "forex":
                tax_rate = rules["flat"]
                tax_amount = (details["profit"] * tax_rate) / 100
            elif asset == "mutual_funds":
                category = details["type"]
                tax_rate = rules[category][details["holding_period"]]
                if tax_rate == "income_tax":
                    tax_rate = get_income_tax_rate(investment_data["annual_income"])
                tax_amount = (details["profit"] * tax_rate) / 100
            else:  # Stocks
                tax_rate = rules[details["holding_period"]]
                taxable_profit = max(0, details["profit"] - 100000) if details["holding_period"] == "long_term" else details["profit"]
                tax_amount = (taxable_profit * tax_rate) / 100

            breakdown[asset] = {"profit": details["profit"], "tax_rate": tax_rate, "tax_amount": tax_amount}
            total_tax += tax_amount

    # Income Tax Calculation
    annual_income = investment_data.get("annual_income", 0)
    income_tax = calculate_income_tax(annual_income, tax_rates["income_tax_slabs"])
    total_tax += income_tax
    breakdown["income_tax"] = {"taxable_income": annual_income, "tax_amount": income_tax}

    return {"total_tax_liability": total_tax, "detailed_breakdown": breakdown}

def calculate_income_tax(income, slabs):
    """Compute tax liability based on Indian income tax slabs."""
    tax = 0
    for slab in slabs:
        if slab["max"] is None or income > slab["min"]:
            taxable = min(income, slab["max"]) - slab["min"] if slab["max"] else income - slab["min"]
            tax += (taxable * slab["rate"]) / 100
    return tax

def get_income_tax_rate(income):
    """Fetch the applicable income tax rate."""
    tax_rules = fetch_latest_tax_rates()
    for slab in tax_rules["income_tax_slabs"]:
        if slab["max"] is None or income <= slab["max"]:
            return slab["rate"]
    return 30  # Default highest tax slab

def analyze_tax_with_llm(investment_data):
    """
    Uses LLM to provide insights on tax savings, deductions, and compliance.
    """
    tax_result = calculate_tax(investment_data)

    prompt = f"""
    You are a tax advisor in India. Analyze the following tax breakdown:
    
    {json.dumps(tax_result, indent=4)}

    Provide insights on:
    1. Potential tax-saving strategies
    2. Deductions applicable under sections 80C, 80D, etc.
    3. Compliance risks and audit likelihood
    """

    response = llm.invoke([
        {"role": "system", "content": "Provide expert financial insights on Indian taxation."},
        {"role": "user", "content": prompt}
    ])
    
    tax_result["AI_Insights"] = response.content
    return tax_result

# Example Usage
if __name__ == "__main__":
    investment_data = {
        "stocks": {"profit": 120000, "holding_period": "long_term"},
        "crypto": {"profit": 50000},
        "mutual_funds": {"profit": 70000, "type": "equity", "holding_period": "short_term"},
        "forex": {"profit": 25000},
        "annual_income": 900000
    }

    print("\n💰 Tax Calculation:")
    print(json.dumps(calculate_tax(investment_data), indent=4))

    print("\n🤖 AI Tax Analysis:")
    print(json.dumps(analyze_tax_with_llm(investment_data), indent=4))
