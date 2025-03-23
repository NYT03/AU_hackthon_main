const express = require('express');
const cors = require('cors');
const axios = require('axios'); // Import axios for making requests
const yahooFinance = require('yahoo-finance2').default;

const app = express();
const PORT = 5000;

// Allow all origins (completely open CORS policy)
app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

// API endpoint to fetch stock data
app.get('/api/stock/:symbol', async (req, res) => {
    const { symbol } = req.params;
    try {
        const query = `${symbol}.NS`; // For NSE stocks
        const result = await yahooFinance.quote(query);
        res.json(result);
    } catch (error) {
        console.error('Error fetching stock data:', error);
        res.status(500).json({ error: 'Failed to fetch stock data' });
    }
});

// Proxy endpoint to communicate with the Python server
app.post('/api/chat', async (req, res) => {
    try {
        const response = await axios.post(
            "http://localhost:8000/chat",
            req.body,
            {
                headers: { "Content-Type": "application/json" },
            }
        );
        res.json(response.data);
    } catch (error) {
        console.error("Error calling Python server:", error);
        res.status(500).json({ error: 'Failed to communicate with Python server' });
    }
});

// Proxy endpoint to fetch investor insights
app.post('/api/get_investor_insights', async (req, res) => {
    try {
        const response = await axios.post(
            "http://localhost:8000/get_investor_insights",
            req.body,
            {
                headers: { "Content-Type": "application/json" },
            }
        );
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching insights from Python server:", error);
        res.status(500).json({ error: 'Failed to fetch insights from Python server' });
    }
});

// Start the Express server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
