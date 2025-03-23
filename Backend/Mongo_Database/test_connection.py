from pymongo import MongoClient
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# MongoDB Connection Details
CONNECTION_STRING = os.getenv("CONNECTION_STRING")
DATABASE = os.getenv("DATABASE")
COLLECTION_NAME = os.getenv("COLLECTION_NAME")

def test_connection_and_insert():
    """Test MongoDB connection and insert sample data."""
    try:
        # Create MongoDB client
        client = MongoClient(CONNECTION_STRING)
        
        # Test connection
        client.admin.command('ping')
        print("✅ MongoDB connection successful!")
        
        # Access database and collection
        db = client[DATABASE]
        collection = db[COLLECTION_NAME]
        
        # Sample user data
        test_user = {
            "user_id": 1,
            "risk_appetite": {
                "comfort_level": ["Medium"],
                "loss_tolerance": "Moderate"
            },
            "investment_preferences": {
                "known_investments": ["Stocks", "Mutual Funds"],
                "preferred_sectors": ["Technology", "Healthcare"]
            },
            "market_knowledge": {
                "level": ["Intermediate"],
                "experience_years": 2
            }
        }
        
        # Insert test data
        result = collection.insert_one(test_user)
        print(f"✅ Test data inserted with ID: {result.inserted_id}")
        
        # Verify data insertion
        inserted_data = collection.find_one({"user_id": 1})
        if inserted_data:
            print("✅ Data verification successful!")
            print("📌 Inserted Data:", inserted_data)
        else:
            print("❌ Data verification failed!")
            
    except Exception as e:
        print(f"❌ Error: {str(e)}")
    finally:
        client.close()
        print("📌 MongoDB connection closed.")

if __name__ == "__main__":
    test_connection_and_insert()