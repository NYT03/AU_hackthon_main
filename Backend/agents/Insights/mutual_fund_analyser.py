import os
from langchain_groq import ChatGroq 

# Initialize the LLM
llm = ChatGroq(model_name="llama3-70b-8192", temperature=0.7, api_key=os.getenv("GROQ_API_KEY"))

def analyze_mutual_funds(state):
    """
    Fetch and analyze mutual fund trends with expert insights, personalized for the user.
    
    Parameters:
        state (dict): State dictionary containing user data and analysis results.

    Returns:
        dict: Updated state with mutual fund analysis results.
    """

    user_data = state.get("user_data", {})

    # Extract user-specific data
    risk_appetite = user_data.get("risk_appetite", {}).get("comfort_level", ["Medium"])[0]
    investment_preferences = user_data.get("investment_preferences", {}).get("known_investments", [])
    market_knowledge = user_data.get("market_knowledge", {}).get("level", ["Intermediate"])[0]

    # Create a personalized analysis prompt
    prompt = f"""
    You are a mutual fund expert analyzing market trends and fund performance.

    Analyze the following mutual fund data, considering:
    1. Fund performance and risk metrics
    2. Asset allocation and diversification
    3. Expense ratios and management quality
    4. Market outlook and sector positioning

    User Profile:
    - Risk Appetite: {risk_appetite}
    - Preferred Investment Types: {', '.join(investment_preferences) if investment_preferences else 'Not specified'}
    - Market Knowledge Level: {market_knowledge}
    """

    # Invoke the LLM for mutual fund insights
    try:
        response = llm.invoke([
            {"role": "system", "content": "Provide personalized insights on Indian mutual funds."},
            {"role": "user", "content": prompt}
        ])
        
        # Ensure we're storing the analysis in a structured way
        if isinstance(response, str):
            analysis_content = response
        else:
            analysis_content = response.content if hasattr(response, 'content') else str(response)
            
        state["investment_insights"] = {
            "analysis": analysis_content,
            "data_timestamp": "Not available",  # Mutual funds don't have real-time data
            "market_type": "mutual_funds"
        }
    except Exception as e:
        state["investment_insights"] = {
            "error": str(e),
            "market_type": "mutual_funds"
        }

    return state  # Always return updated state


# Example execution
if __name__ == "__main__":
    result = analyze_mutual_funds()
    print("\n📊 Indian Mutual Fund Analysis:\n")
    print(result)
