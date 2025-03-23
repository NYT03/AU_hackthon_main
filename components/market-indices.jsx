import { Card, CardContent } from "@/components/ui/card"
import { ArrowDown, ArrowUp } from "lucide-react"

const indices = [
  {
    id: 1,
    name: "NIFTY 50",
    value: 22345.35,
    change: 156.35,
    changePercent: 0.72,
  },
  {
    id: 2,
    name: "SENSEX",
    value: 73567.82,
    change: 487.23,
    changePercent: 0.67,
  },
  {
    id: 3,
    name: "NIKKEI 225",
    value: 38487.24,
    change: -234.56,
    changePercent: -0.61,
  },
  {
    id: 4,
    name: "S&P 500",
    value: 5234.12,
    change: 23.45,
    changePercent: 0.45,
  },
  {
    id: 5,
    name: "NASDAQ",
    value: 16345.67,
    change: 78.34,
    changePercent: 0.48,
  },
  {
    id: 6,
    name: "DOW JONES",
    value: 38765.43,
    change: -123.45,
    changePercent: -0.32,
  },
]

export default function MarketIndices() {
  return (
    <div className="space-y-3">
      {indices.map((index) => (
        <Card key={index.id} className="overflow-hidden">
          <CardContent className="p-3">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium text-sm">{index.name}</h3>
                <p className="text-lg font-semibold">{index.value.toString()}</p>
              </div>
              <div className={`flex items-center gap-1 ${index.change > 0 ? "text-green-500" : "text-red-500"}`}>
                {index.change > 0 ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                <div className="text-right">
                  <p className="text-sm font-medium">{Math.abs(index.change).toFixed(2)}</p>
                  <p className="text-xs">({Math.abs(index.changePercent).toFixed(2)}%)</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

