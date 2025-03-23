"use client"

import { Button } from "@/components/ui/button"
import { Card, CardFooter } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import '../globals.css'
import AccountSetup from "./steps/AccountSetup"
import AdditionalPreferences from "./steps/AdditionalPreferences"
import FinancialGoals from "./steps/FinancialGoals"
import FinancialSituation from "./steps/FinancialSituation"
import InvestmentPreferences from "./steps/InvestmentPreferences"
import LiquidityNeeds from "./steps/LiquidityNeeds"
import MarketKnowledge from "./steps/MarketKnowledge"
import OpenQuestions from "./steps/OpenQuestions"
import PersonalInfo from "./steps/PersonalInfo"
import RiskAppetite from "./steps/RiskAppetite"
import TaxConsiderations from "./steps/TaxConsiderations"

// Replace the current questionnaire with this updated version
// This should be placed where your current questionnaire rendering happens
const questions = {
  "Personal Information": [
    { id: "name", label: "Name", type: "text" },
    { id: "age", label: "Age", type: "number" },
    { id: "job", label: "Job", type: "text" },
    { id: "maritalStatus", label: "Marital Status", type: "select", 
      options: ["Single", "Married", "Divorced", "Widowed"] },
    { id: "dependents", label: "Number of People Who Depend on You Financially", type: "number" },
    { id: "monthlyIncome", label: "Monthly Income", type: "number" },
    { id: "monthlyExpenses", label: "Monthly Expenses", type: "number" },
    { id: "currentSavingsAmount", label: "Current Savings and Investments - Amount", type: "number" },
    { id: "currentSavingsTypes", label: "Current Savings and Investments - Types", type: "text" },
    { id: "loansType", label: "Loans or Debts - Type", type: "text" },
    { id: "loansAmount", label: "Loans or Debts - Amount", type: "number" },
    { id: "loansEMI", label: "Loans or Debts - Monthly EMI", type: "number" },
  ],
  "Financial Goals": [
    { id: "shortTermGoals", label: "Short-Term Goals (1-3 years)", type: "text" },
    { id: "shortTermAmount", label: "Amount Needed", type: "number" },
    { id: "shortTermTimeframe", label: "Timeframe", type: "text" },
    { id: "mediumTermGoals", label: "Medium-Term Goals (3-7 years)", type: "text" },
    { id: "mediumTermAmount", label: "Amount Needed", type: "number" },
    { id: "mediumTermTimeframe", label: "Timeframe", type: "text" },
    { id: "longTermGoals", label: "Long-Term Goals (7+ years)", type: "text" },
    { id: "longTermAmount", label: "Amount Needed", type: "number" },
    { id: "longTermTimeframe", label: "Timeframe", type: "text" },
  ],
  "Risk Appetite": [
    { id: "riskComfort", label: "How much risk are you comfortable taking?", type: "radio",
      options: [
        "Low risk (prefer safe and steady returns)",
        "Medium risk (balance of safety and growth)",
        "High risk (okay with ups and downs for higher returns)"
      ]
    },
    { id: "investmentLossReaction", label: "What would you do if your investment lost 20% of its value in a year?", type: "radio",
      options: [
        "Sell everything immediately",
        "Wait for it to recover",
        "Invest more to lower your average cost"
      ]
    },
  ],
  "Investment Preferences": [
    { id: "knownInvestments", label: "What types of investments do you know about?", type: "checkbox",
      options: ["Stocks", "Bonds", "Mutual Funds", "ETFs", "Real Estate", "Gold", "Cryptocurrencies", "Others"]
    },
    { id: "investmentStyle", label: "Do you like to actively manage your investments or leave them to grow on their own?", type: "radio",
      options: [
        "Active (buy/sell often to try and beat the market)",
        "Passive (invest in index funds/ETFs for steady growth)"
      ]
    },
    { id: "ethicalInvesting", label: "Do you want your investments to align with your values?", type: "radio",
      options: ["Yes", "No"]
    },
    { id: "ethicalDetails", label: "If yes, please specify", type: "text", conditional: "ethicalInvesting" },
  ],
  // ... remaining categories
  "Current Financial Situation": [
    { id: "emergencyFund", label: "Do you have an emergency fund?", type: "radio", options: ["Yes", "No"] },
    { id: "emergencyAmount", label: "Amount", type: "number", conditional: "emergencyFund" },
    { id: "insurance", label: "Do you have health or life insurance?", type: "radio", options: ["Yes", "No"] },
    { id: "insuranceAmount", label: "Coverage Amount", type: "number", conditional: "insurance" },
    { id: "retirementPlan", label: "Do you have a retirement plan?", type: "radio", options: ["Yes", "No"] },
    { id: "retirementDetails", label: "Details", type: "text", conditional: "retirementPlan" },
  ],
  "Tax Considerations": [
    { id: "taxBracket", label: "What is your tax bracket?", type: "radio", options: ["Low", "Medium", "High"] },
    { id: "taxSavingInvestments", label: "Do you want investments that help you save on taxes?", type: "radio", options: ["Yes", "No"] },
    { id: "existingTaxInvestments", label: "Do you already have any tax-saving investments?", type: "radio", options: ["Yes", "No"] },
    { id: "taxInvestmentDetails", label: "If yes, please specify", type: "text", conditional: "existingTaxInvestments" },
  ],
  "Liquidity Needs": [
    { id: "accessNeeds", label: "How soon might you need to access your invested money?", type: "radio", 
      options: ["Immediately (within 1 month)", "Soon (1-6 months)", "Not for a long time (6+ months)"] },
    { id: "upcomingExpenses", label: "Do you have any big expenses coming up?", type: "radio", options: ["Yes", "No"] },
    { id: "expensesDetails", label: "If yes, please specify", type: "text", conditional: "upcomingExpenses" },
  ],
  "Market Knowledge and Experience": [
    { id: "investmentKnowledge", label: "How much do you know about investing?", type: "radio", 
      options: ["Beginner", "Intermediate", "Advanced"] },
    { id: "priorInvestment", label: "Have you invested before?", type: "radio", options: ["Yes", "No"] },
    { id: "investmentExperience", label: "If yes, what was your experience?", type: "text", conditional: "priorInvestment" },
  ],
  "Additional Preferences": [
    { id: "advicePreference", label: "Do you prefer using apps/robots or talking to a person for financial advice?", type: "radio",
      options: ["Apps/Robots", "Human Advisor", "Both"] },
    { id: "checkFrequency", label: "How often would you like to check your investments?", type: "radio",
      options: ["Monthly", "Every 3 months", "Once a year"] },
    { id: "platformPreferences", label: "Do you have any specific preferences for investment platforms?", type: "radio", options: ["Yes", "No"] },
    { id: "platformDetails", label: "If yes, please specify", type: "text", conditional: "platformPreferences" },
  ],
  "Open-Ended Questions": [
    { id: "financialWorries", label: "What worries you the most about your finances?", type: "textarea" },
    { id: "investmentGoals", label: "What do you want to achieve with your investments?", type: "textarea" },
    { id: "additionalInfo", label: "Is there anything else you'd like us to know about your money or goals?", type: "textarea" },
  ],
};

export default function SignupPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState("accountSetup")
  const [isLoading, setIsLoading] = useState(false)

  // Initialize form data state
  const [formData, setFormData] = useState({
    // Account Setup
    email: "",
    password: "",
    confirmPassword: "",

    // Personal Information
    name: "",
    age: "",
    occupation: "",
    maritalStatus: "",
    dependents: "",
    monthlyIncome: "",
    monthlyExpenses: "",
    existingSavingsAmount: "",
    existingInvestmentTypes: "",
    liabilityType: "",
    liabilityAmount: "",
    monthlyEMI: "",

    // Financial Goals
    shortTermGoals: "",
    shortTermAmount: "",
    shortTermTimeframe: "",
    mediumTermGoals: "",
    mediumTermAmount: "",
    mediumTermTimeframe: "",
    longTermGoals: "",
    longTermAmount: "",
    longTermTimeframe: "",

    // Risk Appetite
    riskTolerance: "",
    marketDownReaction: "",
    investmentHorizon: "",

    // Investment Preferences
    familiarInvestments: [],
    otherInvestments: "",
    investingStyle: "",
    ethicalPreferences: "",
    ethicalDetails: "",

    // Current Financial Situation
    hasEmergencyFund: "",
    emergencyFundAmount: "",
    hasInsurance: "",
    insuranceCoverage: "",
    hasRetirementPlan: "",
    retirementPlanDetails: "",

    // Tax Considerations
    taxBracket: "",
    wantsTaxEfficient: "",
    hasTaxSavingInvestments: "",
    taxSavingDetails: "",

    // Liquidity Needs
    liquidityTimeframe: "",
    hasUpcomingExpenses: "",
    upcomingExpensesDetails: "",

    // Market Knowledge
    marketKnowledge: "",
    pastInvestingExperience: "",
    investingExperienceDetails: "",

    // Additional Preferences
    advisorPreference: "",
    portfolioReviewFrequency: "",
    platformPreferences: "",
    platformPreferenceDetails: "",

    // Open Questions
    financialConcerns: "",
    investmentGoals: "",
    additionalInfo: "",

    // New fields for the updated form
    financial_goals: {
      short_term: {
        goal: '',
        amount_needed: '',
        timeframe: ''
      },
      medium_term: {
        goal: '',
        amount_needed: '',
        timeframe: ''
      },
      long_term: {
        goal: '',
        amount_needed: '',
        timeframe: ''
      }
    },
    risk_appetite: {
      comfort_level: '',
      reaction_to_loss: ''
    },
    investment_preferences: {
      known_investments: [],
      management_style: '',
      values_aligned: ''
    },
    current_financial_situation: {
      emergency_fund: {
        exists: '',
        amount: ''
      },
      insurance: {
        health: '',
        coverage: ''
      },
      retirement_plan: {
        exists: '',
        details: ''
      }
    },
    tax_considerations: {
      tax_bracket: '',
      tax_saving_investments: []
    },
    liquidity_needs: {
      access_timeframe: '',
      big_expenses_upcoming: ''
    },
    market_knowledge: {
      level: '',
      previous_experience: ''
    }
  })

  // Handle input change for text fields and textareas
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle select change for dropdowns
  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle checkbox change for multiple selections
  const handleCheckboxChange = (name, value, checked) => {
    setFormData((prev) => {
      const currentValues = prev[name]
      if (checked) {
        return { ...prev, [name]: [...currentValues, value] }
      } else {
        return { ...prev, [name]: currentValues.filter((item) => item !== value) }
      }
    })
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Format the data according to your MongoDB schema
      const formattedData = {
        user_id: 152, // Assuming you have a user object
        financial_goals: {
          short_term: {
            goal: formData.financial_goals.short_term.goal,
            amount_needed: parseInt(formData.financial_goals.short_term.amount_needed) || 0,
            timeframe: formData.financial_goals.short_term.timeframe
          },
          medium_term: {
            goal: formData.financial_goals.medium_term.goal,
            amount_needed: parseInt(formData.financial_goals.medium_term.amount_needed) || 0,
            timeframe: formData.financial_goals.medium_term.timeframe
          },
          long_term: {
            goal: formData.financial_goals.long_term.goal,
            amount_needed: parseInt(formData.financial_goals.long_term.amount_needed) || 0,
            timeframe: formData.financial_goals.long_term.timeframe
          }
        },
        risk_appetite: {
          comfort_level: formData.risk_appetite.comfort_level,
          reaction_to_loss: formData.risk_appetite.reaction_to_loss
        },
        investment_preferences: {
          known_investments: formData.investment_preferences.known_investments,
          management_style: formData.investment_preferences.management_style,
          values_aligned: formData.investment_preferences.values_aligned === 'true'
        },
        current_financial_situation: {
          emergency_fund: {
            exists: formData.current_financial_situation.emergency_fund.exists === 'true',
            amount: parseInt(formData.current_financial_situation.emergency_fund.amount) || 0
          },
          insurance: {
            health: formData.current_financial_situation.insurance.health === 'true',
            coverage: parseInt(formData.current_financial_situation.insurance.coverage) || 0
          },
          retirement_plan: {
            exists: formData.current_financial_situation.retirement_plan.exists === 'true',
            details: formData.current_financial_situation.retirement_plan.details
          }
        },
        tax_considerations: {
          tax_bracket: formData.tax_considerations.tax_bracket,
          tax_saving_investments: formData.tax_considerations.tax_saving_investments
        },
        liquidity_needs: {
          access_timeframe: formData.liquidity_needs.access_timeframe,
          big_expenses_upcoming: formData.liquidity_needs.big_expenses_upcoming === 'true'
        },
        market_knowledge: {
          level: formData.market_knowledge.level,
          previous_experience: formData.market_knowledge.previous_experience
        }
      };
      
      // Submit the formatted data to your API
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      });
      
      if (response.ok) {
        // Handle successful signup
        console.log("Form submitted successfully to MongoDB!");
        toast({
          title: "Profile completed successfully!",
          description: "Redirecting to dashboard...",
        })
        setTimeout(() => {
          router.push("/")
        }, 1000)
      } else {
        // Handle error
        const data = await response.json();
        console.error("Error submitting form:", data.message || 'Failed to sign up. Please try again.');
        toast({
          variant: "destructive",
          title: "Registration failed",
          description: data.message || 'Failed to sign up. Please try again.',
        })
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: "An unexpected error occurred. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Navigate to the next step
  const nextStep = () => {
    switch (currentStep) {
      case "accountSetup":
        if (!formData.email || !formData.password || !formData.confirmPassword) {
          toast({
            variant: "destructive",
            title: "Missing information",
            description: "Please fill in all fields to continue.",
          })
          return
        }
        if (formData.password !== formData.confirmPassword) {
          toast({
            variant: "destructive",
            title: "Passwords don't match",
            description: "Please make sure your passwords match.",
          })
          return
        }
        setCurrentStep("personalInfo")
        break

      case "personalInfo":
        if (!formData.name || !formData.age) {
          toast({
            variant: "destructive",
            title: "Missing information",
            description: "Please at least provide your name and age to continue.",
          })
          return
        }
        setCurrentStep("financialGoals")
        break

      case "financialGoals":
        setCurrentStep("riskAppetite")
        break

      case "riskAppetite":
        if (!formData.riskTolerance) {
          toast({
            variant: "destructive",
            title: "Missing information",
            description: "Please select your risk tolerance to continue.",
          })
          return
        }
        setCurrentStep("investmentPreferences")
        break

      case "investmentPreferences":
        setCurrentStep("financialSituation")
        break

      case "financialSituation":
        setCurrentStep("taxConsiderations")
        break

      case "taxConsiderations":
        setCurrentStep("liquidityNeeds")
        break

      case "liquidityNeeds":
        setCurrentStep("marketKnowledge")
        break

      case "marketKnowledge":
        setCurrentStep("additionalPreferences")
        break

      case "additionalPreferences":
        setCurrentStep("openQuestions")
        break

      case "openQuestions":
        handleSubmit(e)
        break

      default:
        break
    }
  }

  // Navigate to the previous step
  const prevStep = () => {
    switch (currentStep) {
      case "personalInfo":
        setCurrentStep("accountSetup")
        break
      case "financialGoals":
        setCurrentStep("personalInfo")
        break
      case "riskAppetite":
        setCurrentStep("financialGoals")
        break
      case "investmentPreferences":
        setCurrentStep("riskAppetite")
        break
      case "financialSituation":
        setCurrentStep("investmentPreferences")
        break
      case "taxConsiderations":
        setCurrentStep("financialSituation")
        break
      case "liquidityNeeds":
        setCurrentStep("taxConsiderations")
        break
      case "marketKnowledge":
        setCurrentStep("liquidityNeeds")
        break
      case "additionalPreferences":
        setCurrentStep("marketKnowledge")
        break
      case "openQuestions":
        setCurrentStep("additionalPreferences")
        break
      default:
        break
    }
  }

  // Progress indicator
  const totalSteps = 11
  const currentStepIndex = [
    "accountSetup",
    "personalInfo",
    "financialGoals",
    "riskAppetite",
    "investmentPreferences",
    "financialSituation",
    "taxConsiderations",
    "liquidityNeeds",
    "marketKnowledge",
    "additionalPreferences",
    "openQuestions"
  ].indexOf(currentStep) + 1

  // Render the current step content
  const renderStepContent = () => {
    switch (currentStep) {
      case "accountSetup":
        return <AccountSetup formData={formData} handleChange={handleChange} />
      case "personalInfo":
        return <PersonalInfo formData={formData} handleChange={handleChange} handleSelectChange={handleSelectChange} />
      case "financialGoals":
        return <FinancialGoals formData={formData} handleChange={handleChange} />
      case "riskAppetite":
        return <RiskAppetite formData={formData} handleSelectChange={handleSelectChange} />
      case "investmentPreferences":
        return <InvestmentPreferences formData={formData} handleCheckboxChange={handleCheckboxChange} handleSelectChange={handleSelectChange} />
      case "financialSituation":
        return <FinancialSituation formData={formData} handleSelectChange={handleSelectChange} />
      case "taxConsiderations":
        return <TaxConsiderations formData={formData} handleSelectChange={handleSelectChange} />
      case "liquidityNeeds":
        return <LiquidityNeeds formData={formData} handleSelectChange={handleSelectChange} />
      case "marketKnowledge":
        return <MarketKnowledge formData={formData} handleSelectChange={handleSelectChange} />
      case "additionalPreferences":
        return <AdditionalPreferences formData={formData} handleSelectChange={handleSelectChange} />
      case "openQuestions":
        return <OpenQuestions formData={formData} handleChange={handleChange} />
      default:
        return null
    }
  }

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <Card className="w-full max-w-3xl shadow-lg ">
        <div className="px-6 pt-6 mt-0 m-5">
          <div className="flex items-center justify-between space-x-5 mb-6">
            {Array.from({ length: totalSteps }).map((_, index) => (
              <div 
                key={index}
                className={`h-2 flex-1 rounded-full ${
                  index < currentStepIndex ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">
              {currentStep === "accountSetup" ? "Create Your Account" :
               currentStep === "personalInfo" ? "Personal Information" :
               currentStep === "financialGoals" ? "Financial Goals" :
               currentStep === "riskAppetite" ? "Risk Assessment" :
               currentStep === "investmentPreferences" ? "Investment Preferences" :
               currentStep === "financialSituation" ? "Current Financial Situation" :
               currentStep === "taxConsiderations" ? "Tax Considerations" :
               currentStep === "liquidityNeeds" ? "Liquidity Needs" :
               currentStep === "marketKnowledge" ? "Market Knowledge" :
               currentStep === "additionalPreferences" ? "Additional Preferences" :
               "Final Questions"}
            </h2>
            <div className="text-sm text-muted-foreground font-medium">
              Step {currentStepIndex} of {totalSteps}
            </div>
          </div>
        </div>

        <div className="px-6 pb-6">
          {renderStepContent()}
        </div>

        <CardFooter className="flex justify-between border-t p-6">
          {currentStep !== "accountSetup" ? (
            <Button variant="outline" onClick={prevStep} className="px-8">
              Back
            </Button>
          ) : (
            <Link href="/login">
              <Button variant="outline" className="px-8">
                Cancel
              </Button>
            </Link>
          )}
          <Button 
            onClick={currentStep === "openQuestions" ? handleSubmit : nextStep}
            disabled={isLoading}
            className="px-8"
          >
            {currentStep === "openQuestions" 
              ? (isLoading ? "Completing Profile..." : "Complete Profile") 
              : "Next"
            }
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}