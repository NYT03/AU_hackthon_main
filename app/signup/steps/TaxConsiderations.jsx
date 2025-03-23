import { CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function TaxConsiderations({ formData, handleSelectChange }) {
  return (
    <>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Tax Considerations</CardTitle>
        <CardDescription>
          Tell us about your tax situation and preferences
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">What is your tax bracket?</h3>
            <RadioGroup
              value={formData.taxBracket}
              onValueChange={(value) => handleSelectChange("taxBracket", value)}
              className="space-y-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="low" id="taxLow" />
                <Label htmlFor="taxLow">Low</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="taxMedium" />
                <Label htmlFor="taxMedium">Medium</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="high" id="taxHigh" />
                <Label htmlFor="taxHigh">High</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </CardContent>
    </>
  )
}