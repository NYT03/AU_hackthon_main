import os
import sys
from langchain_groq import ChatGroq

# Add project root to Python path
project_root = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
if project_root not in sys.path:
    sys.path.append(project_root)

from Data.Stock_Market.yfinance_stock import fetch_stock_data

def analyze_stocks(state):
    """Simple stock market analysis based on user preferences."""
    try:
        # Get basic user preferences
        risk_level = state.get("user_data", {}).get("risk_appetite", {}).get("comfort_level", ["Medium"])[0]
        
        # Fetch market data
        stock_data = fetch_stock_data()
        if not stock_data:
            return {"error": "No stock market data available", "market_type": "stocks"}
        
        # Initialize LLM
        llm = ChatGroq(
            model_name="llama3-70b-8192",
            temperature=0.7,
            api_key=os.getenv("GROQ_API_KEY")
        )
        
        # Simple prompt for analysis
        prompt = f"""
        Analyze these stock market trends for a {risk_level}-risk investor:
        {stock_data}
        Provide clear investment recommendations.
        """
        
        # Get analysis
        response = llm.invoke([
            {"role": "user", "content": prompt}
        ])
        
        return {
            "market_type": "stocks",
            "analysis": response.content if hasattr(response, 'content') else str(response),
            "timestamp": "Current" # Stock data is real-time
        }
        
    except Exception as e:
        return {"error": str(e), "market_type": "stocks"}
