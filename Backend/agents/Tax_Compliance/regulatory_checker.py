import os
from langchain_groq import ChatGroq

llm = ChatGroq(model_name="llama3-70b-8192", temperature=0.7, api_key=os.getenv("GROQ_API_KEY"))

def get_tax_regulations(investment_type):
    """
    Fetch and explain tax regulations for a given investment type.
    Supported Types: 'stocks', 'crypto', 'mutual_funds', 'forex', 'income_tax'
    """
    prompt = f"""
    You are a tax expert in India. Explain the tax regulations, exemptions, and compliance rules 
    for {investment_type} in the Indian financial system for FY 2024-25. Provide a detailed breakdown 
    including short-term and long-term tax implications.
    """

    response = llm.invoke([
        {"role": "system", "content": "You are an expert in Indian taxation laws."},
        {"role": "user", "content": prompt}
    ])
    
    return response.content

# Example Usage
if __name__ == "__main__":
    investment_types = ["stocks", "crypto", "mutual_funds", "forex", "income_tax"]
    for inv in investment_types:
        print(f"\n📌 Tax Regulations for {inv.upper()}:\n")
        print(get_tax_regulations(inv))
