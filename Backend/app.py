import streamlit as st
import requests
import pandas as pd

# Set page config
st.set_page_config(
    page_title="Magnetic Retail Investor Assistant",
    page_icon="📈",
    layout="wide"
)

# Title and description
st.title("📈 Magnetic Retail Investor Assistant")
st.markdown("""
This dashboard helps you analyze your investment portfolio using the Magnetic Retail Investor Assistant API.
Enter your user ID below to get started.
""")

# User input
user_id = st.text_input("Enter your User ID:", placeholder="Enter your user ID here")

# API endpoint (local Flask server)
API_URL = "http://127.0.0.1:5000/get_investor_insights"

if st.button("Get Insights") and user_id:
    try:
        # Make API request
        headers = {'Content-Type': 'application/json'}
        payload = {'user_id': user_id}
        
        response = requests.post(API_URL, json=payload, headers=headers)
        
        if response.status_code == 200:
            data = response.json()
            
            st.header("📊 Investment & Tax Insights")
            
            # Display investment insights
            if 'investment_insights' in data:
                st.subheader("📈 Investment Insights")
                st.markdown(f"""
                <div style="text-align: justify;">
                {data['investment_insights'].replace('\n', '<br>')}
                </div>
                """, unsafe_allow_html=True)
            
            # Display tax insights
            if 'tax_insights' in data:
                st.subheader("💰 Tax Insights")
                st.markdown(f"""
                <div style="text-align: justify;">
                {data['tax_insights'].replace('\n', '<br>')}
                </div>
                """, unsafe_allow_html=True)
            
        else:
            st.error(f"❌ API Error: {response.status_code} - {response.json().get('error', 'Unknown error')}")
            
    except Exception as e:
        st.error(f"⚠️ An error occurred: {str(e)}")
else:
    st.info("Please enter your User ID and click 'Get Insights' to view your analysis.")
