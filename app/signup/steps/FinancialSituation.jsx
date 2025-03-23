import { CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function FinancialSituation({ formData, handleSelectChange }) {
  return (
    <>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Current Financial Situation</CardTitle>
        <CardDescription>
          Tell us about your current financial safeguards
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Do you have an emergency fund?</h3>
            <RadioGroup
              value={formData.hasEmergencyFund}
              onValueChange={(value) => handleSelectChange("hasEmergencyFund", value)}
              className="space-y-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="emergencyFundYes" />
                <Label htmlFor="emergencyFundYes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="emergencyFundNo" />
                <Label htmlFor="emergencyFundNo">No</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </CardContent>
    </>
  )
}