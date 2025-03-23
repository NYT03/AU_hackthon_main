import MarketIndices from "@/components/market-indices"
import NewsSection from "@/components/news-section"
import StockChart from "@/components/stock-chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Watchlist from "@/components/watchlist"
const { createProxyMiddleware } = require('http-proxy-middleware');
export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary-foreground">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-primary-foreground">Market Overview</CardTitle>
          </CardHeader>
          <CardContent >
            <StockChart />
          </CardContent>
        </Card>

        <Card >
          <CardHeader className="pb-2">
            <CardTitle className="text-primary-foreground">Watchlist</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <Watchlist />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 ">
          <CardHeader className="pb-2">
            <CardTitle className="text-primary-foreground">Latest News</CardTitle>
          </CardHeader>
          <CardContent >
            <NewsSection />
          </CardContent>
        </Card>

        <Card >
          <CardHeader className="bg-2">
            <CardTitle className="text-primary-foreground">Market Indices</CardTitle>
          </CardHeader>
          <CardContent>
            <MarketIndices />
          </CardContent>
        </Card>
      </div>
      
      <footer className="mt-12 py-4 text-center text-sm text-muted-foreground border-t">
        <p>© {new Date().getFullYear()} Financial Dashboard. Market data provided by Alpha Vantage.</p>
      </footer>
    </div>
  )
}

