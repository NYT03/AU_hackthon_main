from pymongo import MongoClient
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# MongoDB Connection Details
CONNECTION_STRING = os.getenv("CONNECTION_STRING")
DATABASE = os.getenv("DATABASE")
COLLECTION_NAME = os.getenv("COLLECTION1_NAME")

if not CONNECTION_STRING or not DATABASE or not COLLECTION_NAME:
    raise ValueError("🚨 MongoDB environment variables are missing. Please check your .env file.")

def get_latest_user_data_by_id(user_id):
    """Fetch the latest entry for a specific user_id, ensuring MongoClient is closed after response processing."""
    client = None
    try:
        print(f"📌 [DEBUG] Attempting MongoDB connection with string: {CONNECTION_STRING[:20]}...")
        client = MongoClient(CONNECTION_STRING, serverSelectionTimeoutMS=5000)
        
        # Verify connection
        client.admin.command('ping')
        print("✅ [DEBUG] MongoDB connection successful")
        
        db = client[DATABASE]
        user_preference_collection = db[COLLECTION_NAME]
        print(f"📌 [DEBUG] Using database: {DATABASE}, collection: {COLLECTION_NAME}")

        # Query user data, ensuring both int and string ID lookup
        query = {"$or": [{"user_id": user_id}, {"user_id": str(user_id)}]}
        print(f"📌 [DEBUG] Executing query: {query}")
        
        latest_user = user_preference_collection.find_one(query, sort=[("_id", -1)])

        if latest_user:
            print(f"✅ [DEBUG] Found user data for user_id: {user_id}")
            return latest_user
        
        print(f"❌ [DEBUG] No user data found for user_id: {user_id}")
        return None

    except Exception as e:
        print(f"⚠️ [ERROR] MongoDB Query Failed: {str(e)}")
        if "ServerSelectionTimeoutError" in str(e):
            print("⚠️ [ERROR] Could not connect to MongoDB server. Please check your connection string and network.")
        return None

    finally:
        if client:
            client.close()
            print("📌 [DEBUG] MongoDB connection closed")

# Example Usage:
if __name__ == "__main__":
    user_id_to_find = 1  # Change this value to test
    user_data = get_latest_user_data_by_id(user_id_to_find)

    if user_data:
        print("✅ Latest Entry for User:", user_data)
    else:
        print("❌ No matching user found.")
