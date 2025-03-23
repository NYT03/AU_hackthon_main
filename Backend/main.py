import os
import sys

from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS
from langchain_groq import ChatGroq

load_dotenv()
# Add project root to Python path
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if project_root not in sys.path:
    sys.path.append(project_root)

from agents.Investment_Types.investment_advisor_api import \
    run_investment_workflow  # Import workflow function

# Load environment variables

# Initialize Flask app
app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)


@app.after_request
def add_security_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'  # Allow all origins (use specific domains in production)
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'  # Allowed HTTP methods
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'  # Allowed headers
    response.headers['Access-Control-Allow-Credentials'] = 'true'  # Allow cookies if needed

    # Fix Content Security Policy (CSP) error
    response.headers['Content-Security-Policy'] = "default-src 'self' https://agnetic-retail-investor-assistant.onrender.com; connect-src *"

    return response


# Initialize LLM
api_key = os.getenv("GROQ_API_KEY")
if not api_key:
    raise ValueError("🚨 Error: Missing GROQ_API_KEY in environment variables.")

llm = ChatGroq(
    model_name="llama3-70b-8192",
    temperature=0.7,
    api_key=api_key
)


@app.route('/get_investor_insights', methods=['OPTIONS', 'POST'])
def investor_analytics():
    """Fetch user insights based on user_id and run the investment workflow dynamically."""
    if request.method == 'OPTIONS':
        return jsonify({"message": "CORS preflight check successful"}), 200  # Respond to preflight requests

    try:
        data = request.get_json()
        if not data or "user_id" not in data:
            return jsonify({"status": "error", "message": "Missing 'user_id' in request body"}), 400

        user_id = int(data["user_id"])
        print(f"📌 [DEBUG] Received user_id: {user_id} (Type: {type(user_id)})")
        print(f"📌 [DEBUG] Calling run_investment_workflow for user_id: {user_id}")
        insights = run_investment_workflow(user_id)
        print(f"✅ [DEBUG] Insights received: {insights}")


        if "error" in insights:
            return jsonify({"status": "error", "message": insights["error"]}), 500

        return jsonify({"status": "success", "message": "Investment insights retrieved successfully", "data": insights}), 200

    except Exception as e:
        return jsonify({"status": "error", "message": "⚠️ Server error occurred", "details": str(e)}), 500

@app.route('/chat', methods=['POST'])
def chat():
    """Chat endpoint that optionally retrieves user investment insights."""
    try:
        data = request.get_json()
        user_prompt = data.get("prompt")
        user_id = data.get("user_id")  # Optional user ID

        if not user_prompt:
            return jsonify({"status": "error", "message": "Missing 'prompt' in request body"}), 400

        # Fetch investment insights if user_id is provided
        investment_insights = None
        if user_id:
            investment_insights = run_investment_workflow(user_id)

        # Generate response using LLM
        chat_response = llm.invoke([
            {"role": "system", "content": "You are a financial AI assistant."},
            {"role": "user", "content": user_prompt}
        ])

        # Construct response
        response_data = {
            "status": "success",
            "chat_response": chat_response.content,
            "investment_insights": investment_insights if investment_insights else "No user insights provided"
        }

        return jsonify(response_data), 200

    except Exception as e:
        return jsonify({"status": "error", "message": "⚠️ Chat generation failed", "details": str(e)}), 500



# Run Flask App
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8000)