"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Chart,
  ChartLine,
  ChartXAxis,
  ChartYAxis,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendItem,
} from "@/components/ui/chart"
import { cn } from "@/lib/utils"

// Sample data for the chart
const data = [
  { date: "Jan", AAPL: 150, MSFT: 310, GOOGL: 135 },
  { date: "Feb", AAPL: 155, MSFT: 320, GOOGL: 140 },
  { date: "Mar", AAPL: 160, MSFT: 330, GOOGL: 138 },
  { date: "Apr", AAPL: 158, MSFT: 325, GOOGL: 142 },
  { date: "May", AAPL: 162, MSFT: 335, GOOGL: 145 },
  { date: "Jun", AAPL: 165, MSFT: 340, GOOGL: 148 },
  { date: "Jul", AAPL: 170, MSFT: 345, GOOGL: 152 },
  { date: "Aug", AAPL: 175, MSFT: 350, GOOGL: 155 },
  { date: "Sep", AAPL: 180, MSFT: 355, GOOGL: 158 },
  { date: "Oct", AAPL: 185, MSFT: 360, GOOGL: 162 },
  { date: "Nov", AAPL: 190, MSFT: 365, GOOGL: 165 },
  { date: "Dec", AAPL: 187, MSFT: 370, GOOGL: 168 },
]

const timeRanges = [
  { label: "1D", value: "1d" },
  { label: "1W", value: "1w" },
  { label: "1M", value: "1m" },
  { label: "3M", value: "3m" },
  { label: "1Y", value: "1y" },
  { label: "All", value: "all" },
]

export default function StockChart() {
  const [activeRange, setActiveRange] = useState("1y")
  const [activeStocks, setActiveStocks] = useState({
    AAPL: true,
    MSFT: true,
    GOOGL: true,
  })

  const toggleStock = (stock: keyof typeof activeStocks) => {
    setActiveStocks((prev) => ({
      ...prev,
      [stock]: !prev[stock],
    }))
  }

  return (
    <div className="space-y-4">
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
        <div className="flex gap-2">
          <Button
            variant={activeStocks.AAPL ? "default" : "outline"}
            size="sm"
            className={cn(activeStocks.AAPL ? "bg-blue-500 hover:bg-blue-600" : "text-blue-500 border-blue-500")}
            onClick={() => toggleStock("AAPL")}
          >
            AAPL
          </Button>
          <Button
            variant={activeStocks.MSFT ? "default" : "outline"}
            size="sm"
            className={cn(activeStocks.MSFT ? "bg-green-500 hover:bg-green-600" : "text-green-500 border-green-500")}
            onClick={() => toggleStock("MSFT")}
          >
            MSFT
          </Button>
          <Button
            variant={activeStocks.GOOGL ? "default" : "outline"}
            size="sm"
            className={cn(
              activeStocks.GOOGL ? "bg-purple-500 hover:bg-purple-600" : "text-purple-500 border-purple-500",
            )}
            onClick={() => toggleStock("GOOGL")}
          >
            GOOGL
          </Button>
        </div>
      </div>

      <Card className="p-4">
        <Chart type="line" className="aspect-[4/3] sm:aspect-[16/9]" data={data}>
          <ChartXAxis dataKey="date" />
          <ChartYAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          {activeStocks.AAPL && (
            <ChartLine dataKey="AAPL" stroke="#3b82f6" strokeWidth={2} activeDot={{ r: 6, fill: "#3b82f6" }} />
          )}
          {activeStocks.MSFT && (
            <ChartLine dataKey="MSFT" stroke="#22c55e" strokeWidth={2} activeDot={{ r: 6, fill: "#22c55e" }} />
          )}
          {activeStocks.GOOGL && (
            <ChartLine dataKey="GOOGL" stroke="#a855f7" strokeWidth={2} activeDot={{ r: 6, fill: "#a855f7" }} />
          )}
          <ChartLegend
            content={
              <div className="flex flex-wrap gap-4 mt-2 text-sm">
                {activeStocks.AAPL && <ChartLegendItem name="AAPL" color="#3b82f6" />}
                {activeStocks.MSFT && <ChartLegendItem name="MSFT" color="#22c55e" />}
                {activeStocks.GOOGL && <ChartLegendItem name="GOOGL" color="#a855f7" />}
              </div>
            }
          />
        </Chart>
      </Card>
    </div>
  )
}

