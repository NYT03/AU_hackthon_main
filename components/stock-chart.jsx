"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFinnhubData } from "@/lib/hooks/useFinnhubData";
import { useState } from "react";
import AssetAllocationChart from "./charts/AssetAllocationChart";
import BenchmarkComparisonChart from "./charts/BenchmarkComparisonChart";
import InvestmentPerformanceChart from "./charts/InvestmentPerformanceChart";
import MarketTrendsChart from "./charts/MarketTrendsChart";
import PortfolioGrowthChart from "./charts/PortfolioGrowthChart";
import PortfolioValueChart from "./charts/PortfolioValueChart";
import ProjectedGrowthChart from "./charts/ProjectedGrowthChart";
import RiskIndicatorChart from "./charts/RiskIndicatorChart";
import GoalsProgressList from "./portfolio/GoalsProgressList";
import RecommendationsList from "./portfolio/RecommendationsList";

// Time range options
const timeRanges = [
  { label: "1W", value: "1w" },
  { label: "1M", value: "1m" },
  { label: "3M", value: "3m" },
  { label: "6M", value: "6m" },
  { label: "1Y", value: "1y" },
  { label: "All", value: "all" },
];

export default function StockChart() {
  const [activeRange, setActiveRange] = useState("1m");
  const [activeTab, setActiveTab] = useState("overview");
  
  // Use custom hook to fetch and manage portfolio data
  const { 
    data: portfolioData,
    loading, 
    error,
    refreshData 
  } = useFinnhubData(activeRange);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading portfolio data...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <Card className="p-6">
        <div className="text-center text-red-500">
          <h3 className="text-lg font-medium mb-2">Error Loading Portfolio Data</h3>
          <p>{error}</p>
          <Button className="mt-4" onClick={refreshData}>Retry</Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Time range selector */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          {timeRanges.map((range) => (
            <Button
              key={range.value}
              variant={activeRange === range.value ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveRange(range.value)}
            >
              {range.label}
            </Button>
          ))}
        </div>
      </div>
      
      {/* Dashboard tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} >
        <TabsList className="flex">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="goals">Goals & Forecasts</TabsTrigger>
          <TabsTrigger value="insights">Market Insights</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-8">
          <div className="flex flex-col gap-5 m-10 p-5">
            <Card className="md:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle>Total Portfolio Value</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <PortfolioValueChart data={portfolioData?.portfolioValue} />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Asset Allocation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <AssetAllocationChart data={portfolioData?.assetAllocation} />
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <RecommendationsList recommendations={portfolioData?.recommendedInvestments} />
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-8">
          <div className="flex flex-col p-5 gap-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Portfolio Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <PortfolioGrowthChart data={portfolioData?.portfolioGrowth} />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Benchmark Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <BenchmarkComparisonChart data={portfolioData?.benchmarkComparison} />
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Individual Investment Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <InvestmentPerformanceChart data={portfolioData?.investmentPerformance} />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Risk Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-60">
                <RiskIndicatorChart riskLevel={portfolioData?.riskLevel} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Goals Tab */}
        <TabsContent value="goals" className="space-y-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Progress Towards Financial Goals</CardTitle>
            </CardHeader>
            <CardContent>
              <GoalsProgressList goals={portfolioData?.goals} />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Projected Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ProjectedGrowthChart data={portfolioData?.projectedGrowth} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Market Insights Tab */}
        <TabsContent value="insights" className="space-y-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Market Sector Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <MarketTrendsChart data={portfolioData?.marketTrends} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
