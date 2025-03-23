from pymongo import MongoClient
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# MongoDB Connection
CONNECTION_STRING = os.getenv("CONNECTION_STRING")
DATABASE = os.getenv("DATABASE")
COLLECTION_NAME = os.getenv("COLLECTION_NAME")  # Single collection for user preferences

# Establish Connection
client = MongoClient(CONNECTION_STRING)
db = client[DATABASE]
user_preference_collection = db[COLLECTION_NAME]

# Function to insert user preferences
def insert_user_preference(data):
    """Insert a new user preference document into MongoDB."""
    try:
        # Convert user_id to integer
        data['user_id'] = int(data['user_id'])
        user_preference_collection.insert_one(data)
        print("✅ User preference inserted successfully.")
    except Exception as e:
        print(f"⚠️ Error inserting user preference: {e}")

# Function to get user preferences
def get_user_preferences(query={}):
    """Fetch user preferences based on a query."""
    try:
        return list(user_preference_collection.find(query, {"_id": 0}))  # Excluding MongoDB _id for clarity
    except Exception as e:
        print(f"⚠️ Error fetching user preferences: {e}")
        return []

# Function to update user preferences
def update_user_preference(query, new_values):
    """Update user preferences based on a query."""
    try:
        result = user_preference_collection.update_one(query, {"$set": new_values})
        if result.modified_count > 0:
            print("✅ User preference updated successfully.")
        else:
            print("⚠️ No matching user preference found.")
    except Exception as e:
        print(f"⚠️ Error updating user preference: {e}")

# Function to delete user preferences
def delete_user_preference(query):
    """Delete a user preference document."""
    try:
        result = user_preference_collection.delete_one(query)
        if result.deleted_count > 0:
            print("✅ User preference deleted successfully.")
        else:
            print("⚠️ No matching user preference found.")
    except Exception as e:
        print(f"⚠️ Error deleting user preference: {e}")

# Sample User Data for Questionnaire
sample_questionnaire = {
    "user_id": 1,
    "financial_goals": {
        "short_term": {"examples": ["Buy a car", "Vacation", "Emergency fund"], "amount_needed": 5000, "timeframe": "2 years"},
        "medium_term": {"examples": ["Buy a house", "Child’s education"], "amount_needed": 50000, "timeframe": "5 years"},
        "long_term": {"examples": ["Retirement", "Building wealth"], "amount_needed": 200000, "timeframe": "20 years"}
    },
    "risk_appetite": {
        "comfort_level": "Medium",
        "reaction_to_loss": "Wait for it to recover"
    },
    "investment_preferences": {
        "known_investments": ["Stocks", "Mutual Funds", "Gold", "Cryptocurrencies"],
        "management_style": "Passive",
        "values_aligned": True
    },
    "current_financial_situation": {
        "emergency_fund": {"exists": True, "amount": 10000},
        "insurance": {"health": True, "coverage": 50000},
        "retirement_plan": {"exists": True, "details": ["401(k)", "Pension"]}
    },
    "tax_considerations": {
        "tax_bracket": "Medium",
        "tax_saving_investments": ["ELSS", "PPF"]
    },
    "liquidity_needs": {
        "access_timeframe": "1-6 months",
        "big_expenses_upcoming": False
    },
    "market_knowledge": {
        "level": "Intermediate",
        "previous_experience": "Made money"
    }
}

# Execute CRUD Operations
if __name__ == "__main__":
    # Insert Sample Data (if not exists)
    if not get_user_preferences({"user_id": sample_questionnaire["user_id"]}):
        insert_user_preference(sample_questionnaire)

    # Fetch and print user preferences
    user_prefs = get_user_preferences({"user_id": 1})
    print("\n📊 User Preferences Retrieved:")
    for pref in user_prefs:
        print(pref)

    # Example: Updating user's tax bracket
    update_user_preference({"user_id": 1}, {"tax_considerations.tax_bracket": "High"})

    # Example: Deleting user preference
    # delete_user_preference({"user_id": 1})  # Uncomment to delete

# Close MongoDB connection when script ends
client.close()
