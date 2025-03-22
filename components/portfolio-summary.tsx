"use client"

import { Card, CardContent } from "@/components/ui/card"
import {
  Chart,
  ChartLine,
  ChartXAxis,
  ChartYAxis,
  ChartTooltip,
  ChartTooltipContent,
  ChartArea,
} from "@/components/ui/chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample data for the chart
const performanceData = [
  { date: "Jan", portfolio: 100, benchmark: 100 },
  { date: "Feb", portfolio: 105, benchmark: 102 },
  { date: "Mar", portfolio: 110, benchmark: 105 },
  { date: "Apr", portfolio: 108, benchmark: 104 },
  { date: "May", portfolio: 112, benchmark: 106 },
  { date: "Jun", portfolio: 115, benchmark: 108 },
  { date: "Jul", portfolio: 120, benchmark: 110 },
  { date: "Aug", portfolio: 125, benchmark: 112 },
  { date: "Sep", portfolio: 130, benchmark: 115 },
  { date: "Oct", portfolio: 135, benchmark: 118 },
  { date: "Nov", portfolio: 140, benchmark: 120 },
  { date: "Dec", portfolio: 145, benchmark: 122 },
]

const metricsData = [
  { name: "Total Return", value: "45.00%", benchmark: "22.00%", status: "positive" },
  { name: "Annualized Return", value: "15.00%", benchmark: "7.33%", status: "positive" },
  { name: "Sharpe Ratio", value: "1.8", benchmark: "1.2", status: "positive" },
  { name: "Volatility", value: "12.5%", benchmark: "15.2%", status: "positive" },
  { name: "Max Drawdown", value: "-8.2%", benchmark: "-12.5%", status: "positive" },
  { name: "Alpha", value: "7.67%", benchmark: "0.00%", status: "positive" },
]

export default function PortfolioSummary() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="performance" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="metrics">Metrics</TabsTrigger>
        </TabsList>
        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Portfolio Performance</h3>
              <Chart type="line" className="aspect-[4/3] sm:aspect-[16/9]" data={performanceData}>
                <ChartXAxis dataKey="date" />
                <ChartYAxis tickFormatter={(value) => `${value}%`} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLine
                  dataKey="portfolio"
                  stroke="#FFB22C"
                  strokeWidth={2}
                  activeDot={{ r: 6, fill: "#FFB22C" }}
                  name="Your Portfolio"
                />
                <ChartLine
                  dataKey="benchmark"
                  stroke="#854836"
                  strokeWidth={2}
                  activeDot={{ r: 6, fill: "#854836" }}
                  name="Benchmark (S&P 500)"
                  strokeDasharray="5 5"
                />
                <ChartArea dataKey="portfolio" fill="#FFB22C" fillOpacity={0.1} />
              </Chart>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-sm font-medium text-muted-foreground">YTD Return</h3>
                <p className="text-2xl font-bold text-green-500">+45.00%</p>
                <p className="text-xs text-muted-foreground">vs Benchmark +22.00%</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-sm font-medium text-muted-foreground">1Y Return</h3>
                <p className="text-2xl font-bold text-green-500">+45.00%</p>
                <p className="text-xs text-muted-foreground">vs Benchmark +22.00%</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-sm font-medium text-muted-foreground">Since Inception</h3>
                <p className="text-2xl font-bold text-green-500">+45.00%</p>
                <p className="text-xs text-muted-foreground">vs Benchmark +22.00%</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="metrics">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Portfolio Metrics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {metricsData.map((metric, index) => (
                  <div key={index} className="flex justify-between p-3 border rounded-lg">
                    <div>
                      <p className="text-sm font-medium">{metric.name}</p>
                      <p
                        className={`text-lg font-bold ${
                          metric.status === "positive" ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {metric.value}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Benchmark</p>
                      <p className="text-sm">{metric.benchmark}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

