import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Sparkles, 
  Download, 
  Share2, 
  RefreshCw, 
  Target, 
  TrendingUp, 
  Users, 
  DollarSign,
  Calendar,
  Lightbulb,
  BarChart3,
  FileText,
  Star
} from "lucide-react";

interface FullAgentExperienceProps {
  agentType: "research" | "strategy" | "content";
  userProfile?: {
    businessName: string;
    industry: string;
    targetAudience: string;
    brandVoice: string[];
  };
  onClose: () => void;
}

const FullAgentExperience = ({ agentType, userProfile, onClose }: FullAgentExperienceProps) => {
  const [currentPhase, setCurrentPhase] = useState<"input" | "processing" | "results">("input");
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState("");
  const [inputs, setInputs] = useState<any>({});

  const agentConfig = {
    research: {
      title: "Research Agent",
      subtitle: "Comprehensive Market Intelligence",
      icon: "🔍",
      color: "from-blue-500 to-blue-600",
      inputFields: [
        { type: "select", name: "competitors", label: "Analysis Focus", options: ["Auto-discover competitors", "Specific competitors", "Market overview only"] },
        { type: "select", name: "scope", label: "Geographic Scope", options: ["Local market", "National", "Global", "Custom region"] },
        { type: "select", name: "depth", label: "Research Depth", options: ["Quick insights (2-3 min)", "Standard analysis (5-8 min)", "Deep dive (10-15 min)"] }
      ],
      processingSteps: [
        "Scanning competitor websites and social media...",
        "Analyzing market trends and patterns...", 
        "Identifying customer sentiment and behavior...",
        "Mapping competitive landscape...",
        "Discovering untapped opportunities...",
        "Generating actionable insights..."
      ],
      mockResults: {
        marketGrowth: "+23.4%",
        competitorsAnalyzed: "12",
        opportunities: "5",
        marketSize: "$2.4B",
        insights: [
          "67% of competitors lack mobile-first strategy",
          "Content marketing opportunity gap of 40%", 
          "Social media engagement 3x below industry average",
          "Local SEO presents immediate growth opportunity"
        ]
      }
    },
    strategy: {
      title: "Strategy Agent", 
      subtitle: "Data-Driven Marketing Blueprint",
      icon: "📋",
      color: "from-primary to-primary-glow",
      inputFields: [
        { type: "select", name: "goals", label: "Primary Goal", options: ["Increase brand awareness", "Generate leads", "Drive sales", "Build community"] },
        { type: "slider", name: "budget", label: "Monthly Budget ($)", min: 500, max: 50000, step: 500 },
        { type: "select", name: "timeline", label: "Timeline", options: ["Quick wins (1-3 months)", "Growth phase (3-6 months)", "Long-term (6-12 months)"] },
        { type: "multi-select", name: "platforms", label: "Preferred Platforms", options: ["LinkedIn", "Facebook", "Instagram", "Twitter", "YouTube", "TikTok"] }
      ],
      processingSteps: [
        "Analyzing business goals and constraints...",
        "Calculating optimal budget allocation...",
        "Mapping customer journey touchpoints...",
        "Selecting high-impact channels...",
        "Building implementation timeline...",
        "Creating strategy blueprint..."
      ],
      mockResults: {
        roiProjection: "+340%",
        channels: "4",
        timeline: "12 weeks", 
        budgetEfficiency: "94%",
        strategy: {
          phase1: "Foundation & Content Creation (Weeks 1-4)",
          phase2: "Audience Building & Engagement (Weeks 5-8)", 
          phase3: "Conversion Optimization (Weeks 9-12)"
        }
      }
    },
    content: {
      title: "Content Agent",
      subtitle: "High-Converting Content Creation", 
      icon: "✍️",
      color: "from-secondary to-secondary-glow",
      inputFields: [
        { type: "select", name: "contentType", label: "Content Focus", options: ["Social media posts", "Blog articles", "Email campaigns", "Ad copy", "Mixed content"] },
        { type: "select", name: "tone", label: "Brand Voice", options: ["Professional", "Friendly", "Bold", "Inspirational", "Educational"] },
        { type: "slider", name: "volume", label: "Content Volume", min: 5, max: 50, step: 5 },
        { type: "select", name: "frequency", label: "Publishing Frequency", options: ["Daily", "3x per week", "Weekly", "Bi-weekly"] }
      ],
      processingSteps: [
        "Understanding brand voice and guidelines...",
        "Analyzing target audience preferences...",
        "Generating content ideas and themes...",
        "Creating platform-optimized content...",
        "Adding engagement hooks and CTAs...",
        "Finalizing content calendar..."
      ],
      mockResults: {
        contentPieces: "24",
        engagementScore: "92%",
        platforms: "5",
        timeSaved: "15 hrs",
        contentTypes: {
          posts: "16 social media posts",
          emails: "4 email campaigns",
          blogs: "2 blog articles", 
          ads: "8 ad variations"
        }
      }
    }
  };

  const config = agentConfig[agentType];

  const startProcessing = async () => {
    setCurrentPhase("processing");
    setProgress(0);

    for (let i = 0; i < config.processingSteps.length; i++) {
      setCurrentStep(config.processingSteps[i]);
      
      // Simulate realistic processing time
      const stepDuration = 2000 + Math.random() * 3000; // 2-5 seconds per step
      const steps = 20;
      
      for (let p = 0; p < steps; p++) {
        await new Promise(resolve => setTimeout(resolve, stepDuration / steps));
        setProgress(((i * steps) + p + 1) / (config.processingSteps.length * steps) * 100);
      }
    }

    setCurrentPhase("results");
  };

  const renderInputPhase = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className={`w-20 h-20 bg-gradient-to-br ${config.color} rounded-full flex items-center justify-center text-4xl mx-auto mb-4`}>
          {config.icon}
        </div>
        <h2 className="text-2xl font-bold mb-2">{config.title}</h2>
        <p className="text-body">{config.subtitle}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Configuration</CardTitle>
          <p className="text-sm text-muted-foreground">
            Customize the analysis for {userProfile?.businessName || "your business"}
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {config.inputFields.map((field, index) => (
            <div key={index}>
              <label className="text-sm font-medium mb-2 block">{field.label}</label>
              {field.type === "select" && (
                <Select onValueChange={(value) => setInputs({...inputs, [field.name]: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options?.map((option, i) => (
                      <SelectItem key={i} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              {field.type === "slider" && (
                <div className="space-y-2">
                  <Slider
                    defaultValue={[field.min || 0]}
                    max={field.max || 100}
                    min={field.min || 0}
                    step={field.step || 1}
                    onValueChange={(value) => setInputs({...inputs, [field.name]: value[0]})}
                  />
                  <p className="text-sm text-muted-foreground">
                    ${inputs[field.name] || field.min || 0} {field.max && `/ $${field.max}`}
                  </p>
                </div>
              )}
            </div>
          ))}
          
          <Button 
            onClick={startProcessing}
            className="btn-gradient w-full"
            size="lg"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Start {config.title}
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderProcessingPhase = () => (
    <div className="text-center space-y-6">
      <div className={`w-24 h-24 bg-gradient-to-br ${config.color} rounded-full flex items-center justify-center text-5xl mx-auto animate-pulse`}>
        {config.icon}
      </div>
      
      <div>
        <h2 className="text-2xl font-bold mb-2">AI Processing...</h2>
        <p className="text-body mb-6">{currentStep}</p>
      </div>
      
      <div className="max-w-md mx-auto space-y-3">
        <Progress value={progress} className="h-4" />
        <p className="text-sm text-muted-foreground">
          {Math.round(progress)}% complete • Est. {Math.max(1, Math.round((100-progress)/10))} min remaining
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
        {["Data Sources", "AI Models", "Quality Checks"].map((item, i) => (
          <div key={i} className="text-center p-3 bg-white/60 rounded-lg">
            <div className="w-8 h-8 bg-primary/20 rounded-full mx-auto mb-2 flex items-center justify-center">
              {progress > (i+1) * 30 ? "✓" : "⏳"}
            </div>
            <p className="text-xs text-muted-foreground">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderResultsPhase = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <Badge variant="secondary" className="bg-green-100 text-green-700 mb-4">
          ✅ Analysis Complete
        </Badge>
        <h2 className="text-2xl font-bold mb-2">{config.title} Results</h2>
        <p className="text-body">Generated in {Math.floor(Math.random() * 5) + 3}.{Math.floor(Math.random() * 9)} seconds</p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="actions">Actions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(config.mockResults).slice(0, 4).map(([key, value], index) => (
              <Card key={index}>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary mb-1">{value}</div>
                  <div className="text-xs text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {agentType === "research" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  Key Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {(config.mockResults as any).insights?.map((insight: string, index: number) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                      <Star className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm">{insight}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="details" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                This section would contain comprehensive detailed results including charts, 
                tables, and in-depth analysis specific to your business.
              </p>
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg">
                <p className="text-sm">
                  💡 <strong>Pro Tip:</strong> The full detailed analysis includes interactive charts, 
                  competitor deep-dives, and actionable recommendations tailored to your industry.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="actions" className="space-y-4">
          <div className="grid gap-4">
            <Button className="justify-start h-auto p-4" variant="outline">
              <Download className="w-5 h-5 mr-3" />
              <div className="text-left">
                <div className="font-medium">Download Full Report</div>
                <div className="text-sm text-muted-foreground">PDF with all insights and recommendations</div>
              </div>
            </Button>
            
            <Button className="justify-start h-auto p-4" variant="outline">
              <Share2 className="w-5 h-5 mr-3" />
              <div className="text-left">
                <div className="font-medium">Share Results</div>
                <div className="text-sm text-muted-foreground">Generate shareable link for your team</div>
              </div>
            </Button>
            
            <Button className="justify-start h-auto p-4" variant="outline">
              <RefreshCw className="w-5 h-5 mr-3" />
              <div className="text-left">
                <div className="font-medium">Run New Analysis</div>
                <div className="text-sm text-muted-foreground">Generate updated insights with new parameters</div>
              </div>
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex gap-3 pt-4 border-t">
        <Button onClick={onClose} variant="outline" className="flex-1">
          Close
        </Button>
        <Button className="btn-gradient flex-1">
          Generate New Report
        </Button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-6 overflow-y-auto max-h-[90vh]">
          {currentPhase === "input" && renderInputPhase()}
          {currentPhase === "processing" && renderProcessingPhase()}
          {currentPhase === "results" && renderResultsPhase()}
        </div>
      </div>
    </div>
  );
};

export default FullAgentExperience;