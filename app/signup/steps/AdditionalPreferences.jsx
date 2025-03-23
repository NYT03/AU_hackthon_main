import { CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function AdditionalPreferences({ formData, handleSelectChange }) {
  return (
    <>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Additional Preferences</CardTitle>
        <CardDescription>
          Tell us about your preferences for portfolio management
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Do you prefer automated (robo-advisor) or human financial advice?</h3>
            <RadioGroup
              value={formData.advisorPreference}
              onValueChange={(value) => handleSelectChange("advisorPreference", value)}
              className="space-y-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="automated" id="advisorAutomated" />
                <Label htmlFor="advisorAutomated">Automated</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="human" id="advisorHuman" />
                <Label htmlFor="advisorHuman">Human</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="both" id="advisorBoth" />
                <Label htmlFor="advisorBoth">Both</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </CardContent>
    </>
  )
}