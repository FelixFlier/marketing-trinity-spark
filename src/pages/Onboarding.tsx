import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft, 
  ArrowRight, 
  Building, 
  Target, 
  TrendingUp, 
  Sparkles,
  CheckCircle,
  ChevronDown
} from "lucide-react";

interface FormData {
  businessName: string;
  businessDescription: string;
  industry: string;
  businessStage: string;
  companySize: string;
  targetAudience: string;
  targetMarket: string;
  customerPainPoints: string;
  currentFeedback: string;
  marketingChannels: string[];
  monthlyBudget: string;
  primaryGoal: string;
  successTimeline: string;
  biggestChallenge: string;
  brandVoice: string[];
  communicationStyle: string;
  toneLevel: number;
  jargonLevel: string;
  contentPriorities: string[];
  platformPriorities: string[];
}

const Onboarding = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showExamples, setShowExamples] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    businessName: "",
    businessDescription: "",
    industry: "",
    businessStage: "",
    companySize: "",
    targetAudience: "",
    targetMarket: "",
    customerPainPoints: "",
    currentFeedback: "",
    marketingChannels: [],
    monthlyBudget: "",
    primaryGoal: "",
    successTimeline: "",
    biggestChallenge: "",
    brandVoice: [],
    communicationStyle: "",
    toneLevel: 50,
    jargonLevel: "",
    contentPriorities: [
      "How-to guides",
      "Industry insights", 
      "Behind-the-scenes",
      "Case studies",
      "Quick tips",
      "Thought leadership"
    ],
    platformPriorities: []
  });

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
      }
    };
    checkAuth();

    // Auto-save progress
    const savedData = localStorage.getItem("onboarding-progress");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setFormData(parsed.formData);
      setCurrentStep(parsed.currentStep);
    }
  }, [navigate]);

  // Auto-save progress
  useEffect(() => {
    localStorage.setItem("onboarding-progress", JSON.stringify({
      formData,
      currentStep
    }));
  }, [formData, currentStep]);

  const industries = [
    { value: "technology", label: "💻 Technology", icon: "💻" },
    { value: "ecommerce", label: "🛒 E-commerce", icon: "🛒" },
    { value: "healthcare", label: "🏥 Healthcare", icon: "🏥" },
    { value: "finance", label: "💰 Finance", icon: "💰" },
    { value: "education", label: "📚 Education", icon: "📚" },
    { value: "other", label: "🎯 Other", icon: "🎯" }
  ];

  const businessStages = [
    { value: "prelaunch", label: "🌱 Pre-launch", icon: "🌱" },
    { value: "startup", label: "🚀 Startup", icon: "🚀" },
    { value: "growth", label: "📈 Growth", icon: "📈" },
    { value: "established", label: "🏢 Established", icon: "🏢" }
  ];

  const companySizes = [
    { value: "solo", label: "👤 Solo", icon: "👤" },
    { value: "2-10", label: "👥 2-10", icon: "👥" },
    { value: "11-50", label: "🏢 11-50", icon: "🏢" },
    { value: "51-200", label: "🏭 51-200", icon: "🏭" },
    { value: "200+", label: "🏗️ 200+", icon: "🏗️" }
  ];

  const marketingChannels = [
    { value: "linkedin", label: "💼 LinkedIn", color: "bg-blue-600" },
    { value: "twitter", label: "🐦 Twitter", color: "bg-blue-400" },
    { value: "facebook", label: "📘 Facebook", color: "bg-blue-700" },
    { value: "instagram", label: "📸 Instagram", color: "bg-pink-600" },
    { value: "youtube", label: "📺 YouTube", color: "bg-red-600" },
    { value: "tiktok", label: "🎵 TikTok", color: "bg-black" },
    { value: "email", label: "📧 Email", color: "bg-green-600" },
    { value: "blog", label: "📝 Blog", color: "bg-orange-600" },
    { value: "paid-ads", label: "💰 Paid Ads", color: "bg-purple-600" },
    { value: "none", label: "❌ None", color: "bg-gray-500" }
  ];

  const primaryGoals = [
    { value: "brand-awareness", label: "🎯 Brand Awareness", icon: "🎯" },
    { value: "lead-generation", label: "📈 Lead Generation", icon: "📈" },
    { value: "sales-growth", label: "💰 Sales Growth", icon: "💰" },
    { value: "thought-leadership", label: "👑 Thought Leadership", icon: "👑" },
    { value: "community", label: "🤝 Community", icon: "🤝" }
  ];

  const brandVoices = [
    { value: "professional", label: "Professional 👔", icon: "👔" },
    { value: "friendly", label: "Friendly 😊", icon: "😊" },
    { value: "expert", label: "Expert 🧠", icon: "🧠" },
    { value: "innovative", label: "Innovative 🚀", icon: "🚀" },
    { value: "bold", label: "Bold ⚡", icon: "⚡" },
    { value: "helpful", label: "Helpful 🤝", icon: "🤝" }
  ];

  const validateStep = () => {
    switch (currentStep) {
      case 1:
        if (!formData.businessName || !formData.businessDescription || !formData.industry) {
          toast({
            title: "Missing information",
            description: "Please fill in all required fields.",
            variant: "destructive",
          });
          return false;
        }
        break;
      case 2:
        if (!formData.targetAudience || !formData.targetMarket) {
          toast({
            title: "Missing information", 
            description: "Please describe your target audience and market.",
            variant: "destructive",
          });
          return false;
        }
        break;
      case 3:
        if (!formData.monthlyBudget || !formData.primaryGoal || !formData.successTimeline) {
          toast({
            title: "Missing information",
            description: "Please complete your marketing goals and budget.",
            variant: "destructive",
          });
          return false;
        }
        break;
      case 4:
        if (formData.brandVoice.length === 0 || !formData.communicationStyle || !formData.jargonLevel) {
          toast({
            title: "Missing information",
            description: "Please define your brand voice and preferences.",
            variant: "destructive",
          });
          return false;
        }
        break;
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep()) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;

    setIsLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Not authenticated");

      // Create user profile
      const { error } = await supabase
        .from("users")
        .insert({
          id: session.user.id,
          email: session.user.email!,
          business_name: formData.businessName,
          business_description: formData.businessDescription,
          industry: formData.industry,
          target_audience: formData.targetAudience,
          brand_voice: {
            voices: formData.brandVoice,
            communicationStyle: formData.communicationStyle,
            toneLevel: formData.toneLevel,
            jargonLevel: formData.jargonLevel,
            contentPriorities: formData.contentPriorities,
            platformPriorities: formData.platformPriorities,
            businessStage: formData.businessStage,
            companySize: formData.companySize,
            targetMarket: formData.targetMarket,
            customerPainPoints: formData.customerPainPoints,
            marketingChannels: formData.marketingChannels,
            monthlyBudget: formData.monthlyBudget,
            primaryGoal: formData.primaryGoal,
            successTimeline: formData.successTimeline,
            biggestChallenge: formData.biggestChallenge
          }
        });

      if (error) throw error;

      // Clear saved progress
      localStorage.removeItem("onboarding-progress");

      toast({
        title: "Welcome aboard! 🚀",
        description: "Your profile has been created successfully.",
      });

      // Navigate to dashboard
      navigate("/dashboard");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save your profile.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleArrayValue = (array: string[], value: string, setter: (newArray: string[]) => void) => {
    if (array.includes(value)) {
      setter(array.filter(item => item !== value));
    } else {
      setter([...array, value]);
    }
  };

  const moveItem = (array: string[], fromIndex: number, toIndex: number) => {
    const newArray = [...array];
    const [removed] = newArray.splice(fromIndex, 1);
    newArray.splice(toIndex, 0, removed);
    return newArray;
  };

  const renderProgressBar = () => (
    <div className="w-full max-w-md mx-auto mb-8">
      <div className="flex items-center justify-between mb-2">
        {[1, 2, 3, 4].map((step) => (
          <div
            key={step}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
              step < currentStep
                ? "bg-green-500 text-white"
                : step === currentStep
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            {step < currentStep ? <CheckCircle className="w-4 h-4" /> : step}
          </div>
        ))}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-500"
          style={{ width: `${(currentStep / 4) * 100}%` }}
        />
      </div>
      <p className="text-center text-sm text-gray-600 mt-2">Step {currentStep} of 4</p>
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Building className="w-12 h-12 text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Tell us about your business</h2>
        <p className="text-gray-600">Step 1 of 4</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="businessName">Business Name *</Label>
          <Input
            id="businessName"
            value={formData.businessName}
            onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
            placeholder="Enter your business name"
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="businessDescription">Business Description *</Label>
          <Textarea
            id="businessDescription"
            value={formData.businessDescription}
            onChange={(e) => setFormData({ ...formData, businessDescription: e.target.value })}
            placeholder="Describe what your business does in 2-3 sentences"
            className="mt-1 min-h-[100px]"
            maxLength={500}
          />
          <p className="text-sm text-gray-500 mt-1">{formData.businessDescription.length}/500</p>
        </div>

        <div>
          <Label>Industry *</Label>
          <div className="grid grid-cols-2 gap-3 mt-2">
            {industries.map((industry) => (
              <button
                key={industry.value}
                type="button"
                onClick={() => setFormData({ ...formData, industry: industry.value })}
                className={`p-3 text-left rounded-lg border transition-all duration-200 ${
                  formData.industry === industry.value
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <span className="text-lg mr-2">{industry.icon}</span>
                {industry.label.replace(industry.icon + " ", "")}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Business Stage</Label>
            <select
              value={formData.businessStage}
              onChange={(e) => setFormData({ ...formData, businessStage: e.target.value })}
              className="w-full mt-1 p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <option value="">Select stage</option>
              {businessStages.map((stage) => (
                <option key={stage.value} value={stage.value}>
                  {stage.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label>Company Size</Label>
            <select
              value={formData.companySize}
              onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
              className="w-full mt-1 p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <option value="">Select size</option>
              {companySizes.map((size) => (
                <option key={size.value} value={size.value}>
                  {size.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Target className="w-12 h-12 text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Who do you want to reach?</h2>
        <p className="text-gray-600">Step 2 of 4</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="targetAudience">Primary Target Audience *</Label>
          <Textarea
            id="targetAudience"
            value={formData.targetAudience}
            onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
            placeholder="Describe your ideal customers - demographics, behaviors, interests, pain points..."
            className="mt-1 min-h-[120px]"
            maxLength={1000}
          />
          <p className="text-sm text-gray-500 mt-1">{formData.targetAudience.length}/1000</p>
          
          <button
            type="button"
            onClick={() => setShowExamples(!showExamples)}
            className="text-sm text-primary hover:text-primary/80 mt-2 flex items-center"
          >
            See Examples <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${showExamples ? 'rotate-180' : ''}`} />
          </button>
          
          {showExamples && (
            <div className="mt-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
              <h4 className="font-medium text-blue-900 mb-2">Good Examples:</h4>
              <ul className="space-y-2 text-sm text-blue-800">
                <li>• "Small business owners (5-50 employees) in tech industry who struggle with manual processes and want to automate their workflows to save 10+ hours per week."</li>
                <li>• "Marketing managers at mid-size companies ($10M-100M revenue) who need to prove ROI on campaigns and are frustrated with disconnected data sources."</li>
                <li>• "Solo entrepreneurs and freelancers in creative fields who want to grow their personal brand but don't have time for consistent content creation."</li>
              </ul>
            </div>
          )}
        </div>

        <div>
          <Label>Target Market *</Label>
          <div className="grid grid-cols-2 gap-3 mt-2">
            {[
              { value: "local", label: "📍 Local", icon: "📍" },
              { value: "regional", label: "🌍 Regional", icon: "🌍" },
              { value: "national", label: "🌎 National", icon: "🌎" },
              { value: "global", label: "🌐 Global", icon: "🌐" }
            ].map((market) => (
              <button
                key={market.value}
                type="button"
                onClick={() => setFormData({ ...formData, targetMarket: market.value })}
                className={`p-3 text-left rounded-lg border transition-all duration-200 ${
                  formData.targetMarket === market.value
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <span className="text-lg mr-2">{market.icon}</span>
                {market.label.replace(market.icon + " ", "")}
              </button>
            ))}
          </div>
        </div>

        <div>
          <Label htmlFor="customerPainPoints">Customer Pain Points</Label>
          <Textarea
            id="customerPainPoints"
            value={formData.customerPainPoints}
            onChange={(e) => setFormData({ ...formData, customerPainPoints: e.target.value })}
            placeholder="What challenges do your customers face that your business solves?"
            className="mt-1 min-h-[80px]"
            maxLength={500}
          />
        </div>

        <div>
          <div className="flex items-center space-x-2 mb-2">
            <input
              type="checkbox"
              id="showFeedback"
              className="rounded border-gray-300 text-primary focus:ring-primary"
            />
            <Label htmlFor="showFeedback" className="text-sm">I have current customer feedback to share</Label>
          </div>
          <Textarea
            value={formData.currentFeedback}
            onChange={(e) => setFormData({ ...formData, currentFeedback: e.target.value })}
            placeholder="Share any recent customer feedback, reviews, or testimonials..."
            className="min-h-[80px]"
            maxLength={500}
          />
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">What are your marketing goals?</h2>
        <p className="text-gray-600">Step 3 of 4</p>
      </div>

      <div className="space-y-6">
        <div>
          <Label>Current Marketing Channels</Label>
          <div className="grid grid-cols-2 gap-3 mt-2">
            {marketingChannels.map((channel) => (
              <button
                key={channel.value}
                type="button"
                onClick={() => toggleArrayValue(
                  formData.marketingChannels,
                  channel.value,
                  (newArray) => setFormData({ ...formData, marketingChannels: newArray })
                )}
                className={`p-3 text-left rounded-lg border transition-all duration-200 ${
                  formData.marketingChannels.includes(channel.value)
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                {channel.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <Label>Monthly Budget *</Label>
          <div className="mt-2">
            <input
              type="range"
              min="0"
              max="3"
              value={["$0-500", "$500-2K", "$2K-5K", "$5K+"].indexOf(formData.monthlyBudget)}
              onChange={(e) => {
                const budgets = ["$0-500", "$500-2K", "$2K-5K", "$5K+"];
                setFormData({ ...formData, monthlyBudget: budgets[parseInt(e.target.value)] });
              }}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>$0-500</span>
              <span>$500-2K</span>
              <span>$2K-5K</span>
              <span>$5K+</span>
            </div>
            <p className="text-center mt-2 font-medium text-primary">{formData.monthlyBudget || "Select budget range"}</p>
          </div>
        </div>

        <div>
          <Label>Primary Goal *</Label>
          <div className="grid grid-cols-1 gap-3 mt-2">
            {primaryGoals.map((goal) => (
              <button
                key={goal.value}
                type="button"
                onClick={() => setFormData({ ...formData, primaryGoal: goal.value })}
                className={`p-4 text-left rounded-lg border transition-all duration-200 ${
                  formData.primaryGoal === goal.value
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <span className="text-lg mr-3">{goal.icon}</span>
                {goal.label.replace(goal.icon + " ", "")}
              </button>
            ))}
          </div>
        </div>

        <div>
          <Label>Success Timeline *</Label>
          <select
            value={formData.successTimeline}
            onChange={(e) => setFormData({ ...formData, successTimeline: e.target.value })}
            className="w-full mt-2 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          >
            <option value="">Select timeline</option>
            <option value="30-days">⚡ 30 days</option>
            <option value="60-days">📅 60 days</option>
            <option value="90-days">🎯 90 days</option>
            <option value="6-months">🗓️ 6+ months</option>
          </select>
        </div>

        <div>
          <Label>Biggest Challenge</Label>
          <select
            value={formData.biggestChallenge}
            onChange={(e) => setFormData({ ...formData, biggestChallenge: e.target.value })}
            className="w-full mt-2 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          >
            <option value="">Select your biggest challenge</option>
            <option value="content-creation">Creating consistent, quality content</option>
            <option value="audience-growth">Growing audience and reach</option>
            <option value="lead-generation">Generating qualified leads</option>
            <option value="roi-measurement">Measuring marketing ROI</option>
            <option value="time-management">Finding time for marketing activities</option>
            <option value="strategy-planning">Developing effective marketing strategy</option>
            <option value="budget-optimization">Optimizing marketing budget</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Define your brand personality</h2>
        <p className="text-gray-600">Step 4 of 4</p>
      </div>

      <div className="space-y-6">
        <div>
          <Label>Brand Voice (select multiple) *</Label>
          <div className="grid grid-cols-2 gap-3 mt-2">
            {brandVoices.map((voice) => (
              <button
                key={voice.value}
                type="button"
                onClick={() => toggleArrayValue(
                  formData.brandVoice,
                  voice.value,
                  (newArray) => setFormData({ ...formData, brandVoice: newArray })
                )}
                className={`p-3 text-left rounded-lg border transition-all duration-200 ${
                  formData.brandVoice.includes(voice.value)
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                {voice.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <Label>Communication Style *</Label>
          <div className="grid grid-cols-1 gap-3 mt-2">
            {[
              { value: "direct", label: "Direct & Concise" },
              { value: "story-driven", label: "Story-driven" },
              { value: "educational", label: "Educational" },
              { value: "conversational", label: "Conversational" }
            ].map((style) => (
              <button
                key={style.value}
                type="button"
                onClick={() => setFormData({ ...formData, communicationStyle: style.value })}
                className={`p-3 text-left rounded-lg border transition-all duration-200 ${
                  formData.communicationStyle === style.value
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                {style.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <Label>Tone Level</Label>
          <div className="mt-2">
            <input
              type="range"
              min="0"
              max="100"
              value={formData.toneLevel}
              onChange={(e) => setFormData({ ...formData, toneLevel: parseInt(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>🎩 Formal</span>
              <span>😊 Casual</span>
            </div>
            <p className="text-center mt-2 font-medium text-primary">
              {formData.toneLevel < 25 ? "Very Formal" : 
               formData.toneLevel < 50 ? "Somewhat Formal" :
               formData.toneLevel < 75 ? "Somewhat Casual" : "Very Casual"}
            </p>
          </div>
        </div>

        <div>
          <Label>Jargon Level *</Label>
          <div className="grid grid-cols-1 gap-3 mt-2">
            {[
              { value: "minimal", label: "Minimize jargon - Keep it simple" },
              { value: "some", label: "Some technical terms - Industry familiar" },
              { value: "expert", label: "Industry-expert level - Full technical depth" }
            ].map((level) => (
              <button
                key={level.value}
                type="button"
                onClick={() => setFormData({ ...formData, jargonLevel: level.value })}
                className={`p-3 text-left rounded-lg border transition-all duration-200 ${
                  formData.jargonLevel === level.value
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                {level.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <Label>Content Priorities (drag to reorder)</Label>
          <div className="mt-2 space-y-2">
            {formData.contentPriorities.map((item, index) => (
              <div
                key={item}
                className="p-3 bg-gray-50 rounded-lg border border-gray-200 cursor-move hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center">
                  <span className="text-gray-400 mr-3">⋮⋮</span>
                  <span className="font-medium text-gray-700">#{index + 1}</span>
                  <span className="ml-3">{item}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {formData.marketingChannels.length > 0 && (
          <div>
            <Label>Platform Priorities (drag to reorder)</Label>
            <div className="mt-2 space-y-2">
              {formData.marketingChannels.map((channel, index) => {
                const channelData = marketingChannels.find(c => c.value === channel);
                return (
                  <div
                    key={channel}
                    className="p-3 bg-gray-50 rounded-lg border border-gray-200 cursor-move hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center">
                      <span className="text-gray-400 mr-3">⋮⋮</span>
                      <span className="font-medium text-gray-700">#{index + 1}</span>
                      <span className="ml-3">{channelData?.label}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-green-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {renderProgressBar()}

        <div className="bg-white/80 backdrop-blur-lg border border-gray-100 rounded-2xl shadow-xl p-8">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
            <div>
              {currentStep > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  className="flex items-center"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              )}
              {currentStep === 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => navigate("/")}
                  className="text-gray-600"
                >
                  Skip this step
                </Button>
              )}
            </div>

            <div>
              {currentStep < 4 ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="btn-gradient flex items-center"
                >
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="btn-gradient flex items-center"
                >
                  {isLoading ? "Creating your profile..." : "🚀 Generate My Strategy"}
                  {!isLoading && <Sparkles className="w-4 h-4 ml-2" />}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;