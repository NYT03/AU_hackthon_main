import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PortfolioSituation from "@/components/portfolio-situation"
import PortfolioRecommendation from "@/components/portfolio-recommendation"
import PortfolioSummary from "@/components/portfolio-summary"
import '../globals.css'
export default function PortfolioAnalysis() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary-foreground">Portfolio Analysis</h1>

      <Tabs defaultValue="situation" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="situation">Situation</TabsTrigger>
          <TabsTrigger value="recommendation">Recommendation</TabsTrigger>
          <TabsTrigger value="summary">Summary</TabsTrigger>
        </TabsList>
        <TabsContent value="situation">
          <Card>
            <CardHeader>
              <CardTitle className="text-primary-foreground">Portfolio Situation</CardTitle>
            </CardHeader>
            <CardContent>
              <PortfolioSituation />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="recommendation">
          <Card>
            <CardHeader>
              <CardTitle className="text-primary-foreground">Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <PortfolioRecommendation />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="summary">
          <Card>
            <CardHeader>
              <CardTitle className="text-primary-foreground">Portfolio Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <PortfolioSummary />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

