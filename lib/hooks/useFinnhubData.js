"use client";

import { useEffect, useState } from 'react';

export function useFinnhubData(timeRange) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Get API key from environment variables
      // const apiKey = process.env.FINHUB;
      const apiKey = "cvfgbcpr01qtu9s4m230cvfgbcpr01qtu9s4m23g";
      
      if (!apiKey) {
        throw new Error('Finnhub API key not found in environment variables');
      }
      
      // In a real implementation, you would fetch data from Finnhub API
      // For now, we'll simulate API calls with mock data
      
      // Short delay to simulate network request
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Generate mock data based on time range
      const mockData = generateMockPortfolioData(timeRange);
      setData(mockData);
    } catch (err) {
      console.error('Error fetching Finnhub data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  // Initial data fetch and when timeRange changes
  useEffect(() => {
    fetchData();
  }, [timeRange]);
  
  // Function to manually refresh data
  const refreshData = () => {
    fetchData();
  };
  
  return { data, loading, error, refreshData };
}

// Generate mock data for demonstration purposes
// In a real implementation, this would be replaced with actual API data
function generateMockPortfolioData(timeRange) {
  // Logic to generate different data based on timeRange
  const dates = generateDateLabels(timeRange);
  
  return {
    portfolioValue: {
      dates: dates,
      values: generateGrowingValues(dates.length, 100000, 200000)
    },
    assetAllocation: {
      labels: ['Stocks', 'Bonds', 'Real Estate', 'Crypto', 'Cash'],
      values: [125000, 50000, 40000, 15000, 20000]
    },
    portfolioGrowth: {
      dates: dates,
      percentages: generateCumulativeGrowth(dates.length, -5, 30)
    },
    investmentPerformance: {
      labels: ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'BRK.B', 'JPM', 'V'],
      returns: [23.5, 15.2, -8.3, 12.7, -15.8, 7.2, 9.1, 5.6]
    },
    benchmarkComparison: {
      dates: dates,
      portfolio: generateCumulativeGrowth(dates.length, -10, 25),
      sp500: generateCumulativeGrowth(dates.length, -7, 20)
    },
    riskLevel: 45, // Scale of 0-100
    goals: [
      { name: 'Retirement', target: 1500000, current: 650000 },
      { name: 'Home Purchase', target: 300000, current: 240000 },
      { name: 'College Fund', target: 180000, current: 75000 }
    ],
    projectedGrowth: {
      dates: [...dates, ...generateFutureDates(timeRange, 5)],
      actual: [...generateGrowingValues(dates.length, 100000, 200000), ...Array(5).fill(null)],
      conservative: [...generateGrowingValues(dates.length, 100000, 200000), ...generateGrowingValues(5, 200000, 300000)],
      aggressive: [...generateGrowingValues(dates.length, 100000, 200000), ...generateGrowingValues(5, 200000, 350000)]
    },
    marketTrends: {
      dates: dates,
      sectors: [
        { name: 'Technology', performance: generateCumulativeGrowth(dates.length, -15, 30) },
        { name: 'Healthcare', performance: generateCumulativeGrowth(dates.length, -10, 20) },
        { name: 'Financials', performance: generateCumulativeGrowth(dates.length, -20, 15) },
        { name: 'Energy', performance: generateCumulativeGrowth(dates.length, -25, 35) },
        { name: 'Consumer', performance: generateCumulativeGrowth(dates.length, -12, 18) }
      ]
    },
    recommendedInvestments: [
      { symbol: 'VTI', name: 'Vanguard Total Stock Market ETF', reason: 'Low-cost broad market exposure' },
      { symbol: 'AAPL', name: 'Apple Inc.', reason: 'Strong growth potential in services' },
      { symbol: 'MSFT', name: 'Microsoft Corporation', reason: 'Cloud computing leadership' },
      { symbol: 'BRK.B', name: 'Berkshire Hathaway', reason: 'Value investment with strong management' }
    ]
  };
}

// Helper functions for generating mock data
function generateDateLabels(timeRange) {
  const dates = [];
  let numPoints;
  let interval;
  
  switch(timeRange) {
    case '1w':
      numPoints = 7;
      interval = { days: 1 };
      break;
    case '1m':
      numPoints = 30;
      interval = { days: 1 };
      break;
    case '3m':
      numPoints = 12;
      interval = { weeks: 1 };
      break;
    case '6m':
      numPoints = 24;
      interval = { weeks: 1 };
      break;
    case '1y':
      numPoints = 12;
      interval = { months: 1 };
      break;
    default: // 'all'
      numPoints = 24;
      interval = { months: 3 };
  }
  
  const now = new Date();
  for (let i = numPoints - 1; i >= 0; i--) {
    const date = new Date(now);
    if (interval.days) date.setDate(date.getDate() - i * interval.days);
    else if (interval.weeks) date.setDate(date.getDate() - i * 7 * interval.weeks);
    else if (interval.months) date.setMonth(date.getMonth() - i * interval.months);
    
    dates.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
  }
  
  return dates;
}

function generateFutureDates(timeRange, numPoints) {
  const dates = [];
  let interval;
  
  switch(timeRange) {
    case '1w':
    case '1m':
      interval = { days: 7 };
      break;
    case '3m':
    case '6m':
      interval = { months: 1 };
      break;
    default: // '1y', 'all'
      interval = { months: 3 };
  }
  
  const now = new Date();
  for (let i = 1; i <= numPoints; i++) {
    const date = new Date(now);
    if (interval.days) date.setDate(date.getDate() + i * interval.days);
    else if (interval.months) date.setMonth(date.getMonth() + i * interval.months);
    
    dates.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
  }
  
  return dates;
}

function generateGrowingValues(numPoints, min, max) {
  const values = [];
  const startValue = min + Math.random() * (max - min) * 0.2;
  let currentValue = startValue;
  
  for (let i = 0; i < numPoints; i++) {
    // Random walk with upward bias
    const change = (Math.random() - 0.4) * (max - min) * 0.03;
    currentValue = Math.max(min, Math.min(max, currentValue + change));
    values.push(Math.round(currentValue));
  }
  
  return values;
}

function generateCumulativeGrowth(numPoints, minChange, maxChange) {
  const values = [];
  let cumulativeGrowth = 0;
  
  for (let i = 0; i < numPoints; i++) {
    const change = (Math.random() * (maxChange - minChange) + minChange) / (numPoints * 2);
    cumulativeGrowth += change;
    values.push(parseFloat(cumulativeGrowth.toFixed(2)));
  }
  
  return values;
} 