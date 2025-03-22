"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

// Step types
type SignupStep = 
  | "accountSetup"  
  | "personalInfo"
  | "financialGoals"
  | "riskAppetite"
  | "investmentPreferences"
  | "financialSituation"
  | "taxConsiderations"
  | "liquidityNeeds"
  | "marketKnowledge"
  | "additionalPreferences"
  | "openQuestions"

export default function SignupPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState<SignupStep>("accountSetup")
  const [isLoading, setIsLoading] = useState(false)
  
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
    familiarInvestments: [] as string[],
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
    additionalInfo: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (name: string, value: string, checked: boolean) => {
    setFormData(prev => {
      const currentValues = prev[name as keyof typeof prev] as string[]
      if (checked) {
        return { ...prev, [name]: [...currentValues, value] }
      } else {
        return { ...prev, [name]: currentValues.filter((item) => item !== value) }
      }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Registration logic would go here
      toast({
        title: "Profile completed successfully!",
        description: "Redirecting to dashboard...",
      })
      
      // Simulate delay before redirecting
      setTimeout(() => {
        router.push("/")
      }, 1000)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: "Please check your information and try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const nextStep = () => {
    switch (currentStep) {
      case "accountSetup":
        if (!formData.email || !formData.password || !formData.confirmPassword) {
          toast({
            variant: "destructive",
            title: "Missing information",
            description: "Please fill in all fields to continue."
          })
          return
        }
        if (formData.password !== formData.confirmPassword) {
          toast({
            variant: "destructive",
            title: "Passwords don't match",
            description: "Please make sure your passwords match."
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
            description: "Please at least provide your name and age to continue."
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
            description: "Please select your risk tolerance to continue."
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
        handleSubmit(new Event('submit') as any)
        break
    }
  }

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

  const renderStepContent = () => {
    switch (currentStep) {
      case "accountSetup":
        return (
          <>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Create your account</CardTitle>
              <CardDescription>
                Enter your email and password to get started
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    required
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </CardContent>
          </>
        )
      
      case "personalInfo":
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
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="existingSavingsAmount">Existing Savings and Investments - Amount ($)</Label>
                  <Input
                    id="existingSavingsAmount"
                    name="existingSavingsAmount"
                    type="number"
                    placeholder="10000"
                    value={formData.existingSavingsAmount}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="existingInvestmentTypes">Types of Investments</Label>
                  <Input
                    id="existingInvestmentTypes"
                    name="existingInvestmentTypes"
                    placeholder="Stocks, bonds, real estate"
                    value={formData.existingInvestmentTypes}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="liabilityType">Liabilities - Type</Label>
                  <Input
                    id="liabilityType"
                    name="liabilityType"
                    placeholder="Home loan, credit card debt"
                    value={formData.liabilityType}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="liabilityAmount">Liabilities - Amount ($)</Label>
                  <Input
                    id="liabilityAmount"
                    name="liabilityAmount"
                    type="number"
                    placeholder="50000"
                    value={formData.liabilityAmount}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="monthlyEMI">Liabilities - Monthly EMI ($)</Label>
                  <Input
                    id="monthlyEMI"
                    name="monthlyEMI"
                    type="number"
                    placeholder="500"
                    value={formData.monthlyEMI}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </CardContent>
          </>
        )
      
      case "financialGoals":
        return (
          <>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Financial Goals</CardTitle>
              <CardDescription>
                Tell us about your short, medium, and long-term financial goals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Short-Term Goals (1-3 years)</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="shortTermGoals">Examples: Buying a car, vacation, emergency fund</Label>
                    <Input
                      id="shortTermGoals"
                      name="shortTermGoals"
                      placeholder="Describe your short-term goals"
                      value={formData.shortTermGoals}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="shortTermAmount">Amount Required ($)</Label>
                    <Input
                      id="shortTermAmount"
                      name="shortTermAmount"
                      type="number"
                      placeholder="10000"
                      value={formData.shortTermAmount}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="shortTermTimeframe">Timeframe (years)</Label>
                    <Input
                      id="shortTermTimeframe"
                      name="shortTermTimeframe"
                      type="number"
                      placeholder="2"
                      value={formData.shortTermTimeframe}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Medium-Term Goals (3-7 years)</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="mediumTermGoals">Examples: Buying a house, child's education</Label>
                    <Input
                      id="mediumTermGoals"
                      name="mediumTermGoals"
                      placeholder="Describe your medium-term goals"
                      value={formData.mediumTermGoals}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="mediumTermAmount">Amount Required ($)</Label>
                    <Input
                      id="mediumTermAmount"
                      name="mediumTermAmount"
                      type="number"
                      placeholder="100000"
                      value={formData.mediumTermAmount}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="mediumTermTimeframe">Timeframe (years)</Label>
                    <Input
                      id="mediumTermTimeframe"
                      name="mediumTermTimeframe"
                      type="number"
                      placeholder="5"
                      value={formData.mediumTermTimeframe}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Long-Term Goals (7+ years)</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="longTermGoals">Examples: Retirement, wealth creation</Label>
                    <Input
                      id="longTermGoals"
                      name="longTermGoals"
                      placeholder="Describe your long-term goals"
                      value={formData.longTermGoals}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="longTermAmount">Amount Required ($)</Label>
                    <Input
                      id="longTermAmount"
                      name="longTermAmount"
                      type="number"
                      placeholder="1000000"
                      value={formData.longTermAmount}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="longTermTimeframe">Timeframe (years)</Label>
                    <Input
                      id="longTermTimeframe"
                      name="longTermTimeframe"
                      type="number"
                      placeholder="25"
                      value={formData.longTermTimeframe}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </>
        )
      
      case "riskAppetite":
        return (
          <>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Risk Appetite</CardTitle>
              <CardDescription>
                Help us understand your comfort level with investment risk
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">How would you describe your risk tolerance?</h3>
                  <RadioGroup 
                    value={formData.riskTolerance} 
                    onValueChange={(value) => handleSelectChange("riskTolerance", value)}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="conservative" id="conservative" />
                      <Label htmlFor="conservative">Conservative (prefer low risk and stable returns)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="moderate" id="moderate" />
                      <Label htmlFor="moderate">Moderate (balance of risk and return)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="aggressive" id="aggressive" />
                      <Label htmlFor="aggressive">Aggressive (seek high returns, willing to take high risk)</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">How would you react if your investment lost 20% of its value in a year?</h3>
                  <RadioGroup 
                    value={formData.marketDownReaction} 
                    onValueChange={(value) => handleSelectChange("marketDownReaction", value)}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="panic" id="panic" />
                      <Label htmlFor="panic">Panic and sell immediately</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="hold" id="hold" />
                      <Label htmlFor="hold">Hold and wait for recovery</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="buyMore" id="buyMore" />
                      <Label htmlFor="buyMore">Invest more to average down</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">What is your investment horizon?</h3>
                  <RadioGroup 
                    value={formData.investmentHorizon} 
                    onValueChange={(value) => handleSelectChange("investmentHorizon", value)}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="shortTerm" id="shortTerm" />
                      <Label htmlFor="shortTerm">Short-Term (1-3 years)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="mediumTerm" id="mediumTerm" />
                      <Label htmlFor="mediumTerm">Medium-Term (3-7 years)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="longTerm" id="longTerm" />
                      <Label htmlFor="longTerm">Long-Term (7+ years)</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </CardContent>
          </>
        )
      
      case "investmentPreferences":
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
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="stocks" 
                        checked={formData.familiarInvestments.includes('stocks')}
                        onCheckedChange={(checked) => 
                          handleCheckboxChange("familiarInvestments", "stocks", checked as boolean)
                        } 
                      />
                      <Label htmlFor="stocks">Stocks</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="bonds" 
                        checked={formData.familiarInvestments.includes('bonds')}
                        onCheckedChange={(checked) => 
                          handleCheckboxChange("familiarInvestments", "bonds", checked as boolean)
                        } 
                      />
                      <Label htmlFor="bonds">Bonds</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="mutualFunds" 
                        checked={formData.familiarInvestments.includes('mutualFunds')}
                        onCheckedChange={(checked) => 
                          handleCheckboxChange("familiarInvestments", "mutualFunds", checked as boolean)
                        } 
                      />
                      <Label htmlFor="mutualFunds">Mutual Funds</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="etfs" 
                        checked={formData.familiarInvestments.includes('etfs')}
                        onCheckedChange={(checked) => 
                          handleCheckboxChange("familiarInvestments", "etfs", checked as boolean)
                        } 
                      />
                      <Label htmlFor="etfs">ETFs</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="realEstate" 
                        checked={formData.familiarInvestments.includes('realEstate')}
                        onCheckedChange={(checked) => 
                          handleCheckboxChange("familiarInvestments", "realEstate", checked as boolean)
                        } 
                      />
                      <Label htmlFor="realEstate">Real Estate</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="gold" 
                        checked={formData.familiarInvestments.includes('gold')}
                        onCheckedChange={(checked) => 
                          handleCheckboxChange("familiarInvestments", "gold", checked as boolean)
                        } 
                      />
                      <Label htmlFor="gold">Gold</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="crypto" 
                        checked={formData.familiarInvestments.includes('crypto')}
                        onCheckedChange={(checked) => 
                          handleCheckboxChange("familiarInvestments", "crypto", checked as boolean)
                        } 
                      />
                      <Label htmlFor="crypto">Cryptocurrencies</Label>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="otherInvestments">Others (please specify)</Label>
                    <Input
                      id="otherInvestments"
                      name="otherInvestments"
                      placeholder="Other investment types"
                      value={formData.otherInvestments}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Do you prefer active or passive investing?</h3>
                  <RadioGroup 
                    value={formData.investingStyle} 
                    onValueChange={(value) => handleSelectChange("investingStyle", value)}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="active" id="active" />
                      <Label htmlFor="active">Active (frequent buying/selling to outperform the market)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="passive" id="passive" />
                      <Label htmlFor="passive">Passive (investing in index funds/ETFs for steady returns)</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Do you have any ethical or social preferences for investments?</h3>
                  <RadioGroup 
                    value={formData.ethicalPreferences} 
                    onValueChange={(value) => handleSelectChange("ethicalPreferences", value)}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="ethicalYes" />
                      <Label htmlFor="ethicalYes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="ethicalNo" />
                      <Label htmlFor="ethicalNo">No</Label>
                    </div>
                  </RadioGroup>
                  
                  {formData.ethicalPreferences === "yes" && (
                    <div className="space-y-2">
                      <Label htmlFor="ethicalDetails">Please specify your preferences</Label>
                      <Input
                        id="ethicalDetails"
                        name="ethicalDetails"
                        placeholder="E.g., ESG investing, avoiding specific industries"
                        value={formData.ethicalDetails}
                        onChange={handleChange}
                      />
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </>
        )
      
      case "financialSituation":
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
                  
                  {formData.hasEmergencyFund === "yes" && (
                    <div className="space-y-2">
                      <Label htmlFor="emergencyFundAmount">Amount ($)</Label>
                      <Input
                        id="emergencyFundAmount"
                        name="emergencyFundAmount"
                        type="number"
                        placeholder="10000"
                        value={formData.emergencyFundAmount}
                        onChange={handleChange}
                      />
                    </div>
                  )}
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Do you have health/life insurance?</h3>
                  <RadioGroup 
                    value={formData.hasInsurance} 
                    onValueChange={(value) => handleSelectChange("hasInsurance", value)}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="insuranceYes" />
                      <Label htmlFor="insuranceYes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="insuranceNo" />
                      <Label htmlFor="insuranceNo">No</Label>
                    </div>
                  </RadioGroup>
                  
                  {formData.hasInsurance === "yes" && (
                    <div className="space-y-2">
                      <Label htmlFor="insuranceCoverage">Coverage Amount ($)</Label>
                      <Input
                        id="insuranceCoverage"
                        name="insuranceCoverage"
                        type="number"
                        placeholder="500000"
                        value={formData.insuranceCoverage}
                        onChange={handleChange}
                      />
                    </div>
                  )}
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Do you have a retirement plan?</h3>
                  <RadioGroup 
                    value={formData.hasRetirementPlan} 
                    onValueChange={(value) => handleSelectChange("hasRetirementPlan", value)}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="retirementYes" />
                      <Label htmlFor="retirementYes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="retirementNo" />
                      <Label htmlFor="retirementNo">No</Label>
                    </div>
                  </RadioGroup>
                  
                  {formData.hasRetirementPlan === "yes" && (
                    <div className="space-y-2">
                      <Label htmlFor="retirementPlanDetails">Details (e.g., 401(k), pension)</Label>
                      <Input
                        id="retirementPlanDetails"
                        name="retirementPlanDetails"
                        placeholder="401(k), pension, etc."
                        value={formData.retirementPlanDetails}
                        onChange={handleChange}
                      />
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </>
        )
      
      case "taxConsiderations":
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
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Are you looking for tax-efficient investments?</h3>
                  <RadioGroup 
                    value={formData.wantsTaxEfficient} 
                    onValueChange={(value) => handleSelectChange("wantsTaxEfficient", value)}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="taxEfficientYes" />
                      <Label htmlFor="taxEfficientYes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="taxEfficientNo" />
                      <Label htmlFor="taxEfficientNo">No</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Do you have any tax-saving investments?</h3>
                  <RadioGroup 
                    value={formData.hasTaxSavingInvestments} 
                    onValueChange={(value) => handleSelectChange("hasTaxSavingInvestments", value)}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="taxSavingYes" />
                      <Label htmlFor="taxSavingYes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="taxSavingNo" />
                      <Label htmlFor="taxSavingNo">No</Label>
                    </div>
                  </RadioGroup>
                  
                  {formData.hasTaxSavingInvestments === "yes" && (
                    <div className="space-y-2">
                      <Label htmlFor="taxSavingDetails">Please specify</Label>
                      <Input
                        id="taxSavingDetails"
                        name="taxSavingDetails"
                        placeholder="ELSS, PPF, 401(k), etc."
                        value={formData.taxSavingDetails}
                        onChange={handleChange}
                      />
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </>
        )
      
      case "liquidityNeeds":
        return (
          <>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Liquidity Needs</CardTitle>
              <CardDescription>
                Tell us about your potential need for cash access
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">How quickly might you need access to your invested funds?</h3>
                  <RadioGroup 
                    value={formData.liquidityTimeframe} 
                    onValueChange={(value) => handleSelectChange("liquidityTimeframe", value)}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="immediate" id="liquidityImmediate" />
                      <Label htmlFor="liquidityImmediate">Immediately (within 1 month)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="shortTerm" id="liquidityShortTerm" />
                      <Label htmlFor="liquidityShortTerm">Short-Term (1-6 months)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="longTerm" id="liquidityLongTerm" />
                      <Label htmlFor="liquidityLongTerm">Long-Term (6+ months)</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Do you have any upcoming large expenses?</h3>
                  <RadioGroup 
                    value={formData.hasUpcomingExpenses} 
                    onValueChange={(value) => handleSelectChange("hasUpcomingExpenses", value)}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="upcomingExpensesYes" />
                      <Label htmlFor="upcomingExpensesYes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="upcomingExpensesNo" />
                      <Label htmlFor="upcomingExpensesNo">No</Label>
                    </div>
                  </RadioGroup>
                  
                  {formData.hasUpcomingExpenses === "yes" && (
                    <div className="space-y-2">
                      <Label htmlFor="upcomingExpensesDetails">Please specify</Label>
                      <Input
                        id="upcomingExpensesDetails"
                        name="upcomingExpensesDetails"
                        placeholder="Amount, timeframe, and purpose"
                        value={formData.upcomingExpensesDetails}
                        onChange={handleChange}
                      />
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </>
        )
      
      case "marketKnowledge":
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
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Have you invested in the past?</h3>
                  <RadioGroup 
                    value={formData.pastInvestingExperience} 
                    onValueChange={(value) => handleSelectChange("pastInvestingExperience", value)}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="pastInvestingYes" />
                      <Label htmlFor="pastInvestingYes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="pastInvestingNo" />
                      <Label htmlFor="pastInvestingNo">No</Label>
                    </div>
                  </RadioGroup>
                  
                  {formData.pastInvestingExperience === "yes" && (
                    <div className="space-y-2">
                      <Label htmlFor="investingExperienceDetails">What was your experience? (e.g., gains, losses)</Label>
                      <Textarea
                        id="investingExperienceDetails"
                        name="investingExperienceDetails"
                        placeholder="Describe your past investing experience and outcomes"
                        value={formData.investingExperienceDetails}
                        onChange={handleChange}
                      />
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </>
        )
      
      case "additionalPreferences":
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
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">How often would you like to review your portfolio?</h3>
                  <RadioGroup 
                    value={formData.portfolioReviewFrequency} 
                    onValueChange={(value) => handleSelectChange("portfolioReviewFrequency", value)}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="monthly" id="reviewMonthly" />
                      <Label htmlFor="reviewMonthly">Monthly</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="quarterly" id="reviewQuarterly" />
                      <Label htmlFor="reviewQuarterly">Quarterly</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="annually" id="reviewAnnually" />
                      <Label htmlFor="reviewAnnually">Annually</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Do you have any specific preferences for investment platforms?</h3>
                  <RadioGroup 
                    value={formData.platformPreferences} 
                    onValueChange={(value) => handleSelectChange("platformPreferences", value)}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="platformPreferencesYes" />
                      <Label htmlFor="platformPreferencesYes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="platformPreferencesNo" />
                      <Label htmlFor="platformPreferencesNo">No</Label>
                    </div>
                  </RadioGroup>
                  
                  {formData.platformPreferences === "yes" && (
                    <div className="space-y-2">
                      <Label htmlFor="platformPreferenceDetails">Please specify</Label>
                      <Input
                        id="platformPreferenceDetails"
                        name="platformPreferenceDetails"
                        placeholder="E.g., low fees, user-friendly interface"
                        value={formData.platformPreferenceDetails}
                        onChange={handleChange}
                      />
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </>
        )
      
      case "openQuestions":
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
                
                <div className="space-y-2">
                  <Label htmlFor="additionalInfo">Is there anything else you'd like us to know about your financial situation or goals?</Label>
                  <Textarea
                    id="additionalInfo"
                    name="additionalInfo"
                    placeholder="Any additional information you'd like to share"
                    value={formData.additionalInfo}
                    onChange={handleChange}
                    className="min-h-24"
                  />
                </div>
              </div>
            </CardContent>
          </>
        )
    }
  }

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <Card className="w-full max-w-md">
        <div className="px-6 pt-6">
          <div className="flex items-center space-x-2 mb-4">
            {Array.from({ length: totalSteps }).map((_, index) => (
              <div 
                key={index}
                className={`h-1 flex-1 rounded ${
                  index < currentStepIndex ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>
          <div className="text-sm text-muted-foreground mb-4">
            Step {currentStepIndex} of {totalSteps}
          </div>
        </div>

        {renderStepContent()}

        <CardFooter className="flex justify-between border-t p-4">
          {currentStep !== "accountSetup" ? (
            <Button variant="outline" onClick={prevStep}>
              Back
            </Button>
          ) : (
            <Link href="/login">
              <Button variant="outline">
                Cancel
              </Button>
            </Link>
          )}
          <Button 
            onClick={currentStep === "openQuestions" ? () => nextStep() : nextStep}
            disabled={isLoading}
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