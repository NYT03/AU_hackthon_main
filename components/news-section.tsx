import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

const newsItems = [
  {
    id: 1,
    title: "Fed Signals Potential Rate Cut in Coming Months",
    description:
      "Federal Reserve officials indicated they could begin cutting interest rates in the coming months if inflation continues to cool.",
    source: "Financial Times",
    time: "2 hours ago",
    category: "Economy",
  },
  {
    id: 2,
    title: "Tech Stocks Rally on Strong Earnings Reports",
    description:
      "Major technology companies reported better-than-expected quarterly earnings, driving a rally in the sector.",
    source: "Wall Street Journal",
    time: "4 hours ago",
    category: "Markets",
  },
  {
    id: 3,
    title: "Oil Prices Surge Amid Middle East Tensions",
    description:
      "Crude oil prices jumped 3% as geopolitical tensions in the Middle East raised concerns about supply disruptions.",
    source: "Bloomberg",
    time: "6 hours ago",
    category: "Commodities",
  },
  {
    id: 4,
    title: "New Regulations for Cryptocurrency Exchanges Announced",
    description:
      "Regulatory authorities unveiled new compliance requirements for cryptocurrency exchanges, aiming to enhance investor protection.",
    source: "Reuters",
    time: "8 hours ago",
    category: "Crypto",
  },
]

export default function NewsSection() {
  return (
    <ScrollArea className="h-[400px]">
      <div className="space-y-4">
        {newsItems.map((item) => (
          <Card key={item.id} className="border-l-4 border-l-primary">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-base">{item.title}</CardTitle>
                <Badge variant="outline" className="ml-2">
                  {item.category}
                </Badge>
              </div>
              <CardDescription className="flex items-center gap-2 text-xs">
                <span>{item.source}</span>
                <span>•</span>
                <span>{item.time}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </CardContent>
            <CardFooter className="pt-0">
              <a href="#" className="text-xs text-primary hover:underline">
                Read more
              </a>
            </CardFooter>
          </Card>
        ))}
      </div>
    </ScrollArea>
  )
}

