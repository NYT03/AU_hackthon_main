import { CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function InvestmentPreferences({ formData, handleCheckboxChange, handleSelectChange }) {
  return (
    <>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Investment Preferences</CardTitle>
        <CardDescription>
          Tell us about your investment preferences and experience
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">What types of investments are you familiar with?</h3>
            <div className="space-y-2">
              {["stocks", "bonds", "mutualFunds", "etfs", "realEstate", "gold", "crypto"].map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                    id={type}
                    checked={formData.familiarInvestments.includes(type)}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange("familiarInvestments", type, checked)
                    }
                  />
                  <Label htmlFor={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</Label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </>
  )
}