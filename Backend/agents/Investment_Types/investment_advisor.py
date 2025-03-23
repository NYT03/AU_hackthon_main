import os
import sys
from dotenv import load_dotenv
from langgraph.graph import Graph, END

# Add project root to Python path
project_root = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
if project_root not in sys.path:
    sys.path.append(project_root)

# Import necessary agents and functions
from agents.Insights.stock_market_analyser import analyze_stocks
from agents.Insights.crypto_analyser import analyze_crypto
from agents.Insights.mutual_fund_analyser import analyze_mutual_funds
from agents.Insights.commodity_analyser import analyze_commodities
from agents.Insights.forex_analyser import analyze_forex
from agents.Tax_Compliance.regulatory_checker import get_tax_regulations
from agents.Tax_Compliance.tax_calculator import analyze_tax_with_llm, calculate_tax
from agents.User_Choices.user_choice import extract_user_insights

# Load environment variables
load_dotenv()

# Fetch user insights using LLM
user_data = extract_user_insights(1)

# Ensure user_data is available
if not user_data or "investment_preferences" not in user_data:
    print("❌ No user data found or investment preferences missing. Exiting...")
    sys.exit(1)

# Extract investment preferences
investment_preferences = set(user_data["investment_preferences"])  # Convert to set for easy lookup

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
        workflow.add_node(node_name, globals()[node_name])  # Dynamically map function

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

# Execute the pipeline
if __name__ == "__main__":
    try:
        print(f"\n🔍 Starting Investment Analysis Workflow\n")

        # Execute the workflow with initialized state
        final_state = investment_graph.invoke(init_state())

        # Perform AI-powered tax analysis
        tax_insights = analyze_tax_with_llm(user_data)

        # Print investment insights
        print("\n🚀 Investment Portfolio Insights:")
        print(final_state if final_state else "No investment insights available")

        # Print AI-powered tax insights
        print("\n🤖 AI-Powered Tax Insights:")
        print(tax_insights.get("AI_Insights", "No AI-powered insights available"))

    except Exception as e:
        print(f"⚠️ Error during execution: {str(e)}")
