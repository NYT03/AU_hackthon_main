import os
from langchain_groq import ChatGroq
import sys

# Add project root to Python path
project_root = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
if project_root not in sys.path:
    sys.path.append(project_root)

from Data.Forex.forex_changes import fetch_forex_rates

def analyze_forex(state):
    """Simple forex market analysis based on user preferences."""
    try:
        # Get basic user preferences
        risk_level = state.get("user_data", {}).get("risk_appetite", {}).get("comfort_level", ["Medium"])[0]
        
        # Fetch market data
        data = fetch_forex_rates()
        if not data:
            return {"error": "No forex data available", "market_type": "forex"}
        
        # Initialize LLM
        llm = ChatGroq(
            model_name="llama3-70b-8192",
            temperature=0.7,
            api_key=os.getenv("GROQ_API_KEY")
        )
        
        # Simple prompt for analysis
        prompt = f"""
        Analyze these forex market trends for a {risk_level}-risk investor:
        {data}
        Provide clear investment recommendations.
        """
        
        # Get analysis
        response = llm.invoke([
            {"role": "user", "content": prompt}
        ])
        
        return {
            "market_type": "forex",
            "analysis": response.content if hasattr(response, 'content') else str(response),
            "timestamp": "Current" # Forex data is real-time
        }
        
    except Exception as e:
        return {"error": str(e), "market_type": "forex"}
