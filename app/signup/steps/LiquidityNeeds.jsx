import { CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function LiquidityNeeds({ formData, handleSelectChange }) {
  return (
    <>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Liquidity Needs</CardTitle>
        <CardDescription>
          Tell us about your potential need for cash access
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">How quickly might you need access to your invested funds?</h3>
            <RadioGroup
              value={formData.liquidityTimeframe}
              onValueChange={(value) => handleSelectChange("liquidityTimeframe", value)}
              className="space-y-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="immediate" id="liquidityImmediate" />
                <Label htmlFor="liquidityImmediate">Immediately (within 1 month)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="shortTerm" id="liquidityShortTerm" />
                <Label htmlFor="liquidityShortTerm">Short-Term (1-6 months)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="longTerm" id="liquidityLongTerm" />
                <Label htmlFor="liquidityLongTerm">Long-Term (6+ months)</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </CardContent>
    </>
  )
}