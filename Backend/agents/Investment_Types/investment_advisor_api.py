import os
import sys
from dotenv import load_dotenv
from langgraph.graph import Graph, END

project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))

# Ensure project root is in Python's path
if project_root not in sys.path:
    sys.path.append(project_root)

from Insights.stock_market_analyser import analyze_stocks
from Insights.crypto_analyser import analyze_crypto
from Insights.mutual_fund_analyser import analyze_mutual_funds
from Insights.commodity_analyser import analyze_commodities
from Insights.forex_analyser import analyze_forex
from Tax_Compliance.regulatory_checker import get_tax_regulations
from Tax_Compliance.tax_calculator import analyze_tax_with_llm, calculate_tax
from User_Choices.user_choice import extract_user_insights

load_dotenv()

def run_investment_workflow(user_id):
    print(f"📌 [DEBUG] Calling run_investment_workflow for user_id: {user_id}")

    # Fetch user insights using LLM
    user_data = extract_user_insights(user_id)

    print(f"✅ [DEBUG] Insights received: {user_data}")

    # Ensure valid user data is retrieved
    if "error" in user_data or not user_data:
        print("❌ [DEBUG] No valid user insights found.")
        return {"error": "No valid user data available for processing."}

    # Extract investment preferences
    investment_preferences = set(user_data.get("investment_preferences", []))  # Ensure it's a set

    if not investment_preferences:
        print("❌ [DEBUG] No investment preferences found.")
        return {"error": "User has no investment preferences set."}

    # Initialize LangGraph workflow
    workflow = Graph()

    # Initialize state with user data
    def init_state():
        return {"user_data": user_data}

    # Mapping of investment preferences to their corresponding nodes
    investment_nodes = {
        "Stocks": "analyze_stocks",
        "Cryptocurrencies": "analyze_crypto",
        "Mutual Funds": "analyze_mutual_funds",
        "Commodities": "analyze_commodities",
        "Forex": "analyze_forex",
    }

    # Add relevant analysis nodes dynamically
    for preference, node_name in investment_nodes.items():
        if preference in investment_preferences:
            workflow.add_node(node_name, globals().get(node_name, None))

    # Add tax and compliance nodes (always executed)
    workflow.add_node("compute_tax", calculate_tax)
    workflow.add_node("check_regulatory_compliance", get_tax_regulations)

    # Set dynamic execution flow
    previous_node = None
    for preference, node_name in investment_nodes.items():
        if preference in investment_preferences:
            if previous_node:
                workflow.add_edge(previous_node, node_name)
            else:
                workflow.set_entry_point(node_name)  # First node
            previous_node = node_name

    # Ensure tax & regulatory analysis always runs last
    if previous_node:
        workflow.add_edge(previous_node, "compute_tax")
    else:
        workflow.set_entry_point("compute_tax")  # If no investments, start with tax

    workflow.add_edge("compute_tax", "check_regulatory_compliance")
    workflow.add_edge("check_regulatory_compliance", END)

    # Compile the workflow
    investment_graph = workflow.compile()

    try:
        final_state = investment_graph.invoke(init_state())

        # Perform AI-powered tax analysis
        tax_insights = analyze_tax_with_llm(user_data)

        return {
            "investment_insights": final_state if final_state else "No investment insights available",
            "tax_insights": tax_insights.get("AI_Insights", "No AI-powered insights available"),
        }

    except Exception as e:
        return {"error": f"⚠️ Error during execution: {str(e)}"}
