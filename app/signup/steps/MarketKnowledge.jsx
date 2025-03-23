import { CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function MarketKnowledge({ formData, handleSelectChange }) {
  return (
    <>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Market Knowledge and Experience</CardTitle>
        <CardDescription>
          Tell us about your investment knowledge and past experience
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">How would you rate your knowledge of financial markets?</h3>
            <RadioGroup
              value={formData.marketKnowledge}
              onValueChange={(value) => handleSelectChange("marketKnowledge", value)}
              className="space-y-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="beginner" id="knowledgeBeginner" />
                <Label htmlFor="knowledgeBeginner">Beginner</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="intermediate" id="knowledgeIntermediate" />
                <Label htmlFor="knowledgeIntermediate">Intermediate</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="advanced" id="knowledgeAdvanced" />
                <Label htmlFor="knowledgeAdvanced">Advanced</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </CardContent>
    </>
  )
}