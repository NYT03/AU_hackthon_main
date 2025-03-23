import { CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function OpenQuestions({ formData, handleChange }) {
  return (
    <>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Final Questions</CardTitle>
        <CardDescription>
          Please share any additional information about your financial goals
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="financialConcerns">What are your biggest financial concerns?</Label>
            <Textarea
              id="financialConcerns"
              name="financialConcerns"
              placeholder="Share your major financial concerns"
              value={formData.financialConcerns}
              onChange={handleChange}
              className="min-h-24"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="investmentGoals">What do you hope to achieve with your investments?</Label>
            <Textarea
              id="investmentGoals"
              name="investmentGoals"
              placeholder="Describe your investment objectives"
              value={formData.investmentGoals}
              onChange={handleChange}
              className="min-h-24"
            />
          </div>
        </div>
      </CardContent>
    </>
  )
}