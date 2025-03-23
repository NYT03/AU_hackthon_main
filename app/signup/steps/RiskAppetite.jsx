import CustomRadioGroup from "../CustomRadioGroup";

const RiskAppetite = ({ formData, handleSelectChange }) => {
  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 mb-6">
        <p className="text-sm text-gray-500 mb-0">
          Understanding your comfort with risk helps us tailor investment recommendations that align with your risk tolerance.
        </p>
      </div>
      
      <div className="space-y-8">
        <CustomRadioGroup
          label="What is your comfort level with investment risk?"
          options={["Low", "Medium", "High"]}
          name="risk_appetite.comfort_level"
          value={formData.risk_appetite.comfort_level}
          onChange={(e) => handleSelectChange("risk_appetite.comfort_level", e.target.value)}
        />
        
        <CustomRadioGroup
          label="How would you react if your investment lost 20% of its value in a year?"
          options={["Sell everything immediately", "Wait for it to recover", "Invest more"]}
          name="risk_appetite.reaction_to_loss"
          value={formData.risk_appetite.reaction_to_loss}
          onChange={(e) => handleSelectChange("risk_appetite.reaction_to_loss", e.target.value)}
        />
      </div>
    </div>
  );
};

export default RiskAppetite;