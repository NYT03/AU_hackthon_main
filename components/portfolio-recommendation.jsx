"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { AlertTriangle, ArrowRight, BarChart3, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

const userId = 7; // Define the user_id variable here

const recommendations = [
  {
    id: 1,
    type: "Buy",
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    price: 950.32,
    reason: "Strong growth in AI and data center segments, expanding market share in GPU technology.",
    confidence: "High",
    sector: "Technology",
    targetPrice: 1100.0,
    icon: TrendingUp,
  },
  {
    id: 2,
    type: "Sell",
    symbol: "KO",
    name: "The Coca-Cola Company",
    price: 62.45,
    reason: "Declining growth prospects, increasing competition in beverage market, and high valuation.",
    confidence: "Medium",
    sector: "Consumer Staples",
    targetPrice: 55.0,
    icon: AlertTriangle,
  },
  {
    id: 3,
    type: "Rebalance",
    symbol: "Portfolio",
    name: "Sector Allocation",
    price: null,
    reason: "Your technology allocation is 10% above target. Consider rebalancing to reduce risk.",
    confidence: "High",
    sector: "All",
    targetPrice: null,
    icon: BarChart3,
  },
];

export default function PortfolioRecommendation() {
  const [investmentInsights, setInvestmentInsights] = useState("");
  const [taxInsights, setTaxInsights] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/get_investor_insights",
          { user_id: userId },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: false,
          }
        );
        console.log(response)
        setInvestmentInsights(response.data.data.investment_insights);
        setTaxInsights(response.data.data.tax_insights);
      } catch (error) {

        console.log("Error fetching insights:", error);
        console.error("Error fetching insights:", error);
        setError("Failed to fetch insights. CORS issue detected.");
      }
    };

    if (userId) {
      fetchInsights();
    }
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-muted rounded-lg p-4">
        <h3 className="text-lg font-medium mb-2">Investment Insights</h3>
        {error ? (
          <p className="text-red-500 text-sm">{error}</p>
        ) : (
          <>
            <p className="text-sm text-muted-foreground">{investmentInsights}</p>
            <h3 className="text-lg font-medium mt-4 mb-2">Tax Insights</h3>
            <p className="text-sm text-muted-foreground">{taxInsights}</p>
          </>
        )}
      </div>

      <div className="bg-muted rounded-lg p-4">
        <h3 className="text-lg font-medium mb-2">Recommendation Summary</h3>
        <p className="text-sm text-muted-foreground">
          Based on your investment goals, risk tolerance, and current market conditions, we've generated the following
          recommendations to optimize your portfolio.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {recommendations.map((rec) => (
          <Card
            key={rec.id}
            className={`border-l-4 ${
              rec.type === "Buy"
                ? "border-l-green-500"
                : rec.type === "Sell"
                ? "border-l-red-500"
                : "border-l-amber-500"
            }`}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <div
                    className={`p-2 rounded-full ${
                      rec.type === "Buy"
                        ? "bg-green-100 text-green-500"
                        : rec.type === "Sell"
                        ? "bg-red-100 text-red-500"
                        : "bg-amber-100 text-amber-500"
                    }`}
                  >
                    <rec.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <CardTitle className="text-base">
                      {rec.type}: {rec.symbol}
                    </CardTitle>
                    <CardDescription>{rec.name}</CardDescription>
                  </div>
                </div>
                <Badge variant="outline">{rec.confidence} Confidence</Badge>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-sm text-muted-foreground">{rec.reason}</p>

              {rec.price && (
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Current Price</p>
                    <p className="font-medium">${rec.price.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Target Price</p>
                    <p className="font-medium">${rec.targetPrice?.toFixed(2)}</p>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="pt-0">
              <Button variant="ghost" size="sm" className="gap-1">
                View Details <ArrowRight className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
