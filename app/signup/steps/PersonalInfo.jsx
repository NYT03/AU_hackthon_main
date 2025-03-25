import { CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function PersonalInfo({ formData, handleChange, handleSelectChange }) {
  return (
    <>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Personal Information</CardTitle>
        <CardDescription>
          Tell us about yourself and your current financial status
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="John Doe"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              name="age"
              type="number"
              placeholder="30"
              required
              value={formData.age}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="occupation">Occupation</Label>
            <Input
              id="occupation"
              name="occupation"
              placeholder="Software Engineer"
              value={formData.occupation}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="maritalStatus">Marital Status</Label>
            <Select
              value={formData.maritalStatus}
              onValueChange={(value) => handleSelectChange("maritalStatus", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="single">Single</SelectItem>
                <SelectItem value="married">Married</SelectItem>
                <SelectItem value="divorced">Divorced</SelectItem>
                <SelectItem value="widowed">Widowed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="dependents">Number of Dependents</Label>
            <Input
              id="dependents"
              name="dependents"
              type="number"
              placeholder="0"
              value={formData.dependents}
              onChange={handleChange}
              min="0"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="monthlyIncome">Monthly Income ($)</Label>
            <Input
              id="monthlyIncome"
              name="monthlyIncome"
              type="number"
              placeholder="5000"
              value={formData.monthlyIncome}
              onChange={handleChange}
              min="0"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="monthlyExpenses">Monthly Expenses ($)</Label>
            <Input
              id="monthlyExpenses"
              name="monthlyExpenses"
              type="number"
              placeholder="3000"
              value={formData.monthlyExpenses}
              onChange={handleChange}
              min="0"
            />
          </div>
        </div>
      </CardContent>
    </>
  )
}