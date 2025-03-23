"use client"

import { Card, CardContent } from "@/components/ui/card"
import {
  Chart,
  ChartPie,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendItem,
  Cell,
} from "@/components/ui/chart"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowDown, ArrowUp } from "lucide-react"

const portfolioData = [
  { name: "Technology", value: 45, color: "#3b82f6" },
  { name: "Healthcare", value: 20, color: "#22c55e" },
  { name: "Finance", value: 15, color: "#a855f7" },
  { name: "Consumer", value: 10, color: "#f59e0b" },
  { name: "Energy", value: 10, color: "#ef4444" },
]

const holdingsData = [
  {
    id: 1,
    symbol: "AAPL",
    name: "Apple Inc.",
    sector: "Technology",
    shares: 25,
    avgPrice: 150.25,
    currentPrice: 187.32,
    value: 4683.0,
    gain: 37.07,
    gainPercent: 24.67,
  },
  {
    id: 2,
    symbol: "MSFT",
    name: "Microsoft Corp.",
    sector: "Technology",
    shares: 15,
    avgPrice: 320.5,
    currentPrice: 402.56,
    value: 6038.4,
    gain: 82.06,
    gainPercent: 25.6,
  },
  {
    id: 3,
    symbol: "JNJ",
    name: "Johnson & Johnson",
    sector: "Healthcare",
    shares: 20,
    avgPrice: 165.75,
    currentPrice: 152.3,
    value: 3046.0,
    gain: -13.45,
    gainPercent: -8.11,
  },
  {
    id: 4,
    symbol: "JPM",
    name: "JPMorgan Chase & Co.",
    sector: "Finance",
    shares: 18,
    avgPrice: 140.2,
    currentPrice: 198.45,
    value: 3572.1,
    gain: 58.25,
    gainPercent: 41.55,
  },
  {
    id: 5,
    symbol: "XOM",
    name: "Exxon Mobil Corp.",
    sector: "Energy",
    shares: 30,
    avgPrice: 95.4,
    currentPrice: 113.25,
    value: 3397.5,
    gain: 17.85,
    gainPercent: 18.71,
  },
]

export default function PortfolioSituation() {
  const totalValue = holdingsData.reduce((sum, item) => sum + item.value, 0)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Portfolio Allocation</h3>
            <Chart type="pie" className="h-[300px]" data={portfolioData}>
              <ChartPie
                data={portfolioData}
                dataKey="value"
                nameKey="name"
                innerRadius={70}
                outerRadius={90}
                paddingAngle={2}
              >
                {portfolioData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </ChartPie>
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend
                content={
                  <div className="flex flex-col gap-2 mt-4">
                    {portfolioData.map((entry) => (
                      <ChartLegendItem key={entry.name} name={`${entry.name} (${entry.value}%)`} color={entry.color} />
                    ))}
                  </div>
                }
              />
            </Chart>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Portfolio Summary</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">Total Value</p>
                  <p className="text-2xl font-bold">${totalValue.toLocaleString()}</p>
                </div>
                <div className="bg-muted rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">Total Gain/Loss</p>
                  <p className="text-2xl font-bold text-green-500">+$4,521.32</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">Day Change</p>
                  <p className="text-xl font-bold text-green-500">+$235.67 (+1.2%)</p>
                </div>
                <div className="bg-muted rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">YTD Return</p>
                  <p className="text-xl font-bold text-green-500">+15.4%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Holdings</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Symbol</TableHead>
              <TableHead className="hidden md:table-cell">Name</TableHead>
              <TableHead className="hidden md:table-cell">Sector</TableHead>
              <TableHead className="text-right">Shares</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Value</TableHead>
              <TableHead className="text-right">Gain/Loss</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {holdingsData.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.symbol}</TableCell>
                <TableCell className="hidden md:table-cell">{item.name}</TableCell>
                <TableCell className="hidden md:table-cell">{item.sector}</TableCell>
                <TableCell className="text-right">{item.shares}</TableCell>
                <TableCell className="text-right">${item.currentPrice.toFixed(2)}</TableCell>
                <TableCell className="text-right">${item.value.toLocaleString()}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    {item.gain > 0 ? (
                      <>
                        <ArrowUp className="h-3 w-3 text-green-500" />
                        <span className="text-green-500">{item.gainPercent.toFixed(2)}%</span>
                      </>
                    ) : (
                      <>
                        <ArrowDown className="h-3 w-3 text-red-500" />
                        <span className="text-red-500">{Math.abs(item.gainPercent).toFixed(2)}%</span>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

