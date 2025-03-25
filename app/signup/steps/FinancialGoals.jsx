import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import CustomInput from "../CustomInput";

export default function FinancialGoals() {
  const [formData, setFormData] = useState({
    financial_goals: {
      short_term: { goal: "", amount_needed: "", timeframe: "" },
      medium_term: { goal: "", amount_needed: "", timeframe: "" },
      long_term: { goal: "", amount_needed: "", timeframe: "" }
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const keys = name.split("."); // Convert 'financial_goals.short_term.goal' to array
      let updatedData = { ...prev };

      let temp = updatedData;
      for (let i = 0; i < keys.length - 1; i++) {
        temp = temp[keys[i]];
      }
      temp[keys[keys.length - 1]] = value;
      return { ...updatedData };
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 mb-6">
        <p className="text-sm text-gray-500 mb-0">
          Define your financial goals over different time horizons to help us recommend appropriate investment strategies.
        </p>
      </div>

      <div className="space-y-6">
        {/* Short Term Goals Section */}
        <div className="p-4 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium mb-4">Short-Term Goals (1-3 years)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CustomInput
              label="What are your short-term financial goals?"
              placeholder="E.g., Buy a car, Vacation, Emergency fund"
              name="financial_goals.short_term.goal"
              value={formData.financial_goals.short_term.goal}
              onChange={handleChange}
            />
            <CustomInput
              label="Amount needed"
              placeholder="E.g., 5000"
              name="financial_goals.short_term.amount_needed"
              value={formData.financial_goals.short_term.amount_needed}
              onChange={handleChange}
              type="number"
            />
          </div>
          <div className="mt-4">
            <CustomInput
              label="Timeframe"
              placeholder="E.g., 2 years"
              name="financial_goals.short_term.timeframe"
              value={formData.financial_goals.short_term.timeframe}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Medium Term Goals Section */}
        <div className="p-4 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium mb-4">Medium-Term Goals (3-7 years)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CustomInput
              label="What are your medium-term financial goals?"
              placeholder="E.g., Buy a house, Child's education"
              name="financial_goals.medium_term.goal"
              value={formData.financial_goals.medium_term.goal}
              onChange={handleChange}
            />
            <CustomInput
              label="Amount needed"
              placeholder="E.g., 50000"
              name="financial_goals.medium_term.amount_needed"
              value={formData.financial_goals.medium_term.amount_needed}
              onChange={handleChange}
              type="number"
            />
          </div>
          <div className="mt-4">
            <CustomInput
              label="Timeframe"
              placeholder="E.g., 5 years"
              name="financial_goals.medium_term.timeframe"
              value={formData.financial_goals.medium_term.timeframe}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Long Term Goals Section */}
        <div className="p-4 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium mb-4">Long-Term Goals (7+ years)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CustomInput
              label="What are your long-term financial goals?"
              placeholder="E.g., Retirement, Building wealth"
              name="financial_goals.long_term.goal"
              value={formData.financial_goals.long_term.goal}
              onChange={handleChange}
            />
            <CustomInput
              label="Amount needed"
              placeholder="E.g., 200000"
              name="financial_goals.long_term.amount_needed"
              value={formData.financial_goals.long_term.amount_needed}
              onChange={handleChange}
              type="number"
            />
          </div>
          <div className="mt-4">
            <CustomInput
              label="Timeframe"
              placeholder="E.g., 20 years"
              name="financial_goals.long_term.timeframe"
              value={formData.financial_goals.long_term.timeframe}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      
      {/* Debugging: Display form data */}
      {/* <pre className="mt-6 p-4 bg-gray-100 rounded-lg text-sm">{JSON.stringify(formData, null, 2)}</pre> */}
    </div>
  );
}
