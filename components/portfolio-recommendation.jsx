"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { AlertTriangle, ArrowRight, BarChart3, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

const userId = 1;

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
        console.log(response);
        setInvestmentInsights(response.data.data.investment_insights);
        setTaxInsights(response.data.data.tax_insights);
      } catch (error) {
        console.log("Error fetching insights:", error);
        setError("Failed to fetch insights. CORS issue detected.");
      }
    };

    if (userId) {
      fetchInsights();
    }
  }, []);

  const formatInsights = (text) => {
    return text.split("\n\n").map((section, index) => (
      <div key={index} className="mb-4">
        {section.includes("**") ? (
          <h4 className="font-semibold text-md mb-2">{section.replace(/\*\*/g, "")}</h4>
        ) : (
          <p className="text-sm text-muted-foreground">{section}</p>
        )}
      </div>
    ));
  };

  return (
    <div className="space-y-6">
      <div className="bg-muted rounded-lg p-4">
        <h3 className="text-lg font-medium mb-2">Investment Insights</h3>
        {error ? (
          <p className="text-red-500 text-sm">{error}</p>
        ) : investmentInsights ? (
          formatInsights(investmentInsights)
        ) : (
          <p className="text-sm text-muted-foreground">Loading...</p>
        )}
      </div>

      <div className="bg-muted rounded-lg p-4">
        <h3 className="text-lg font-medium mb-2">Tax Insights</h3>
        {taxInsights ? formatInsights(taxInsights) : <p className="text-sm text-muted-foreground">Loading...</p>}
      </div>
    </div>
  );
}
