import os
import sys
from langchain_groq import ChatGroq
import json
from bson import ObjectId

from agents.User_Choices.user_preference import get_latest_user_data_by_id

# Load API key
api_key = os.getenv("GROQ_API_KEY")
if not api_key:
    raise ValueError("🚨 Error: GROQ_API_KEY is missing. Please set it in your environment variables.")

# Initialize LLM
llm = ChatGroq(model_name="llama3-70b-8192", temperature=0.7, api_key=api_key)

def convert_mongo_data(data):
    """Convert MongoDB ObjectId fields to strings."""
    if isinstance(data, dict):
        return {key: convert_mongo_data(value) for key, value in data.items()}
    elif isinstance(data, list):
        return [convert_mongo_data(item) for item in data]
    elif isinstance(data, ObjectId):
        return str(data)
    return data

def extract_user_insights(user_id):
    """Fetch user data and extract financial insights using LLM."""
    
    print(f"📌 [DEBUG] Extracting insights for user_id: {user_id}")

    user_data = get_latest_user_data_by_id(user_id)
    if not user_data:
        print("❌ [DEBUG] No user data found, returning error.")
        return {"error": "No user data found."}

    user_data = convert_mongo_data(user_data)

    prompt = f"""
    You are a financial expert analyzing a user's investment profile.
    
    Extract the following details and return ONLY valid JSON:
    {{
        "risk_appetite": "Low / Medium / High",
        "investment_preferences": ["Stocks", "Crypto", "Mutual Funds", "Commodities", "Forex", ...],
        "liquidity_needs": "Immediate / Short-Term / Long-Term",
        "short_term_goals": "string",
        "long_term_goals": "string",
        "market_knowledge": "Beginner / Intermediate / Expert"
    }}

    User Data:
    {json.dumps(user_data, indent=2)}

    IMPORTANT:
    - Return only JSON. No extra text.
    - Ensure valid JSON formatting.
    """

    try:
        response = llm.invoke([
            {"role": "system", "content": "You are an AI that extracts financial insights."},
            {"role": "user", "content": prompt}
        ])

        json_response = response.content.strip()
        if not json_response.startswith("{") or not json_response.endswith("}"):
            print("⚠️ [DEBUG] Invalid LLM response format.")
            return {"error": "⚠️ LLM returned invalid JSON format."}

        return json.loads(json_response)

    except json.JSONDecodeError:
        print("⚠️ [DEBUG] Failed to parse JSON from LLM.")
        return {"error": "⚠️ Failed to parse LLM response."}

    except Exception as e:
        print(f"⚠️ [DEBUG] LLM error: {e}")
        return {"error": f"⚠️ LLM extraction failed: {str(e)}"}

# Example Usage
if __name__ == "__main__":
    user_id = 1
    insights = extract_user_insights(user_id)
    print("\n✅ Extracted User Insights:\n", insights)
