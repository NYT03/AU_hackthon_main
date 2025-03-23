# Initialize LangGraph workflow
workflow = StateGraph(dict)

# Adding analysis nodes
workflow.add_node("analyze_stocks", analyze_stocks)
workflow.add_node("analyze_crypto", analyze_crypto)
workflow.add_node("analyze_mutual_funds", analyze_mutual_funds)
workflow.add_node("analyze_commodities", analyze_commodities)
workflow.add_node("analyze_forex", analyze_forex)
workflow.add_node("compute_tax", calculate_tax)  # ✅ Using tax computation
workflow.add_node("check_regulatory_compliance", get_tax_regulations)

# Define execution flow
workflow.set_entry_point("analyze_stocks")
workflow.add_edge("analyze_stocks", "analyze_crypto")
workflow.add_edge("analyze_crypto", "analyze_mutual_funds")
workflow.add_edge("analyze_mutual_funds", "analyze_commodities")
workflow.add_edge("analyze_commodities", "analyze_forex")
workflow.add_edge("analyze_forex", "compute_tax")
workflow.add_edge("compute_tax", "check_regulatory_compliance")
workflow.add_edge("check_regulatory_compliance", END)

# Compile the workflow
investment_graph = workflow.compile()

# Execute the pipeline
if __name__ == "__main__":
    try:
        print(f"\n🔍 Starting Investment Analysis Workflow for user_id: {USER_ID}...\n")
        final_state = investment_graph.invoke(user_data)  
        
        # Perform AI-based tax analysis
        tax_insights = analyze_tax_with_llm(user_data)  
        
        # Print investment insights
        print("\n🚀 Investment Portfolio Insights:")
        print(final_state.get("investment_insights", "No investment insights available"))

        # Print AI-powered tax insights
        print("\n🤖 AI-Powered Tax Insights:")
        print(tax_insights.get("AI_Insights", "No AI-powered insights available"))

    except Exception as e:
        print(f"⚠️ Error during execution: {str(e)}")
