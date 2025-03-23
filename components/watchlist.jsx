"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import axios from 'axios';
import { ArrowDown, ArrowUp } from "lucide-react";
import { useEffect, useState } from 'react';

const watchlistSymbols = ["AAPL", "MSFT", "GOOGL", "AMZN", "TSLA"]; // Define your watchlist symbols

export default function Watchlist() {
  const [watchlistItems, setWatchlistItems] = useState([]);

  useEffect(() => {
    const fetchWatchlistData = async () => {
      const items = await Promise.all(
        watchlistSymbols.map(async (symbol) => {
          try {
            const response = await axios.get(`http://localhost:5000/api/stock/${symbol}`);
            return {
              id: symbol, // Use symbol as id for simplicity
              symbol: response.data.symbol,
              name: response.data.longName || response.data.shortName, // Adjust based on the API response
              price: response.data.regularMarketPrice,
              change: response.data.regularMarketChange,
              changePercent: response.data.regularMarketChangePercent,
            };
          } catch (error) {
            console.error(`Error fetching data for ${symbol}:`, error);
            return null; // Return null for failed fetches
          }
        })
      );

      // Filter out any null items (failed fetches)
      setWatchlistItems(items.filter(item => item !== null));
    };

    fetchWatchlistData();
  }, []);

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
            <TableCell className="text-right">${item.price ? item.price.toFixed(2) : 'N/A'}</TableCell>
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
