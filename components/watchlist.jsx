"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useState } from 'react';

const initialWatchlistItems = [
  {
    id: "AAPL",
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 150.00,
    change: 1.50,
    changePercent: 1.01,
  },
  {
    id: "MSFT",
    symbol: "MSFT",
    name: "Microsoft Corporation",
    price: 300.00,
    change: -2.00,
    changePercent: -0.67,
  },
  {
    id: "GOOGL",
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    price: 2800.00,
    change: 20.00,
    changePercent: 0.72,
  },
  {
    id: "AMZN",
    symbol: "AMZN",
    name: "Amazon.com, Inc.",
    price: 3400.00,
    change: -15.00,
    changePercent: -0.44,
  },
  {
    id: "TSLA",
    symbol: "TSLA",
    name: "Tesla, Inc.",
    price: 700.00,
    change: 5.00,
    changePercent: 0.72,
  },
];

export default function Watchlist() {
  const [watchlistItems, setWatchlistItems] = useState(initialWatchlistItems);
  const [newSymbol, setNewSymbol] = useState("");

  const handleAddStock = () => {
    // Example of adding a new stock (static data for demonstration)
    const newStock = {
      id: newSymbol,
      symbol: newSymbol,
      name: `${newSymbol} Company`, // Placeholder name
      price: 100.00, // Placeholder price
      change: 0.00,
      changePercent: 0.00,
    };
    setWatchlistItems((prevItems) => [...prevItems, newStock]);
    setNewSymbol(""); // Clear input after adding
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex items-center mb-4">
        <input
          type="text"
          value={newSymbol}
          onChange={(e) => setNewSymbol(e.target.value)}
          placeholder="Enter stock symbol"
          className="border rounded p-2 mr-2"
        />
        <button onClick={handleAddStock} className="bg-blue-500 text-white rounded p-2">
          Add Stock
        </button>
      </div>

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
            <TableRow key={item.id} className="hover:bg-gray-100 transition-colors duration-200">
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
    </div>
  );
}
