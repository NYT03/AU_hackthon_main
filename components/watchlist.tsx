import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowDown, ArrowUp } from "lucide-react"

const watchlistItems = [
  {
    id: 1,
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 187.32,
    change: 1.25,
    changePercent: 0.67,
  },
  {
    id: 2,
    symbol: "MSFT",
    name: "Microsoft Corp.",
    price: 402.56,
    change: -3.44,
    changePercent: -0.85,
  },
  {
    id: 3,
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    price: 142.17,
    change: 0.87,
    changePercent: 0.62,
  },
  {
    id: 4,
    symbol: "AMZN",
    name: "Amazon.com Inc.",
    price: 178.35,
    change: -1.23,
    changePercent: -0.68,
  },
  {
    id: 5,
    symbol: "TSLA",
    name: "Tesla Inc.",
    price: 193.57,
    change: 5.32,
    changePercent: 2.83,
  },
]

export default function Watchlist() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Symbol</TableHead>
          <TableHead className="hidden md:table-cell">Name</TableHead>
          <TableHead className="text-right">Price</TableHead>
          <TableHead className="text-right">Change</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {watchlistItems.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.symbol}</TableCell>
            <TableCell className="hidden md:table-cell">{item.name}</TableCell>
            <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
            <TableCell className="text-right">
              <div className="flex items-center justify-end gap-1">
                {item.change > 0 ? (
                  <>
                    <ArrowUp className="h-3 w-3 text-green-500" />
                    <span className="text-green-500">
                      {item.change.toFixed(2)} ({item.changePercent.toFixed(2)}%)
                    </span>
                  </>
                ) : (
                  <>
                    <ArrowDown className="h-3 w-3 text-red-500" />
                    <span className="text-red-500">
                      {Math.abs(item.change).toFixed(2)} ({Math.abs(item.changePercent).toFixed(2)}%)
                    </span>
                  </>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

