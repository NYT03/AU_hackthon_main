import os
from langchain_groq import ChatGroq
import sys

# Add project root to Python path
project_root = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
if project_root not in sys.path:
    sys.path.append(project_root)

from Data.Crypto.binance_crypto import fetch_crypto_prices

def analyze_crypto(state):
    """Simple cryptocurrency market analysis based on user preferences."""
    try:
        # Get basic user preferences
        risk_level = state.get("user_data", {}).get("risk_appetite", {}).get("comfort_level", ["Medium"])[0]
        
        # Fetch market data
        data = fetch_crypto_prices()
        if not data:
            return {"error": "No cryptocurrency data available", "market_type": "crypto"}
        
        # Initialize LLM
        llm = ChatGroq(
            model_name="llama3-70b-8192",
            temperature=0.7,
            api_key=os.getenv("GROQ_API_KEY")
        )
        
        # Simple prompt for analysis
        prompt = f"""
        Analyze these cryptocurrency trends for a {risk_level}-risk investor:
        {data[:5]}
        Provide clear investment recommendations.
        """
        
        # Get analysis
        response = llm.invoke([
            {"role": "user", "content": prompt}
        ])
        
        return {
            "market_type": "crypto",
            "analysis": response.content if hasattr(response, 'content') else str(response),
            "timestamp": "Current" # Crypto data is real-time
        }
        
    except Exception as e:
        return {"error": str(e), "market_type": "crypto"}
