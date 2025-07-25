import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Sparkles, TrendingUp, Users, Target, Play, ArrowRight } from "lucide-react";

interface AgentPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  agentType: "research" | "strategy" | "content";
  onSignUp: () => void;
}

const AgentPreviewModal = ({ isOpen, onClose, agentType, onSignUp }: AgentPreviewModalProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState("");
  const [showResults, setShowResults] = useState(false);

  const agentConfig = {
    research: {
      title: "Research Agent in Action",
      subtitle: "Watch how our AI analyzes your market in real-time",
      icon: "🔍",
      color: "from-blue-500 to-blue-600",
      steps: [
        "Scanning 47+ data sources...",
        "Analyzing competitor strategies...",
        "Identifying market trends...",
        "Mapping opportunities...",
        "Generating insights..."
      ],
      demoResults: [
        { label: "Market Growth Rate", value: "+23.4%", trend: "up" },
        { label: "Competitors Found", value: "12", trend: "neutral" },
        { label: "Opportunities", value: "5", trend: "up" },
        { label: "Market Size", value: "$2.4B", trend: "up" }
      ],
      ctaText: "Sign Up to Analyze YOUR Market"
    },
    strategy: {
      title: "Strategy Agent Demo",
      subtitle: "See how we create custom marketing strategies",
      icon: "📋",
      color: "from-primary to-primary-glow",
      steps: [
        "Analyzing business goals...",
        "Calculating budget allocation...",
        "Mapping customer journey...",
        "Selecting optimal channels...",
        "Building strategy blueprint..."
      ],
      demoResults: [
        { label: "ROI Projection", value: "+340%", trend: "up" },
        { label: "Recommended Channels", value: "4", trend: "neutral" },
        { label: "Timeline", value: "12 weeks", trend: "neutral" },
        { label: "Budget Efficiency", value: "94%", trend: "up" }
      ],
      ctaText: "Get Your Custom Strategy"
    },
    content: {
      title: "Content Agent in Action",
      subtitle: "Watch AI create marketing content in seconds",
      icon: "✍️",
      color: "from-secondary to-secondary-glow",
      steps: [
        "Understanding brand voice...",
        "Analyzing target audience...",
        "Generating content ideas...",
        "Optimizing for platforms...",
        "Creating final content..."
      ],
      demoResults: [
        { label: "Content Pieces", value: "24", trend: "up" },
        { label: "Engagement Score", value: "92%", trend: "up" },
        { label: "Platforms", value: "5", trend: "neutral" },
        { label: "Time Saved", value: "15 hrs", trend: "up" }
      ],
      ctaText: "Create Content for YOUR Business"
    }
  };

  const config = agentConfig[agentType];

  const startDemo = async () => {
    setIsProcessing(true);
    setProgress(0);
    setShowResults(false);

    for (let i = 0; i < config.steps.length; i++) {
      setCurrentStep(config.steps[i]);
      
      // Simulate processing time
      for (let p = 0; p <= 100; p += 10) {
        await new Promise(resolve => setTimeout(resolve, 50));
        setProgress(((i * 100) + p) / config.steps.length);
      }
    }

    setIsProcessing(false);
    setShowResults(true);
  };

  useEffect(() => {
    if (isOpen) {
      setIsProcessing(false);
      setProgress(0);
      setCurrentStep("");
      setShowResults(false);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-16 h-16 bg-gradient-to-br ${config.color} rounded-2xl flex items-center justify-center text-3xl`}>
              {config.icon}
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold text-heading">{config.title}</DialogTitle>
              <p className="text-body">{config.subtitle}</p>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {!isProcessing && !showResults && (
            <div className="text-center py-8">
              <div className="glass-card p-8 mb-6">
                <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4">Ready to see AI in action?</h3>
                <p className="text-body mb-6">
                  This demo will show you exactly how our {agentType} agent works with real data and insights.
                </p>
                <Button 
                  onClick={startDemo}
                  className="btn-gradient"
                  size="lg"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Start Demo
                </Button>
              </div>
            </div>
          )}

          {isProcessing && (
            <div className="glass-card p-8 text-center">
              <div className={`w-20 h-20 bg-gradient-to-br ${config.color} rounded-full flex items-center justify-center text-4xl mx-auto mb-6 animate-pulse`}>
                {config.icon}
              </div>
              
              <h3 className="text-xl font-semibold mb-4">AI Processing...</h3>
              <p className="text-body mb-6">{currentStep}</p>
              
              <div className="space-y-3">
                <Progress value={progress} className="h-3" />
                <p className="text-sm text-muted-foreground">{Math.round(progress)}% complete</p>
              </div>
            </div>
          )}

          {showResults && (
            <div className="space-y-6">
              <div className="glass-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    ✅ Analysis Complete
                  </Badge>
                  <span className="text-sm text-muted-foreground">Generated in 3.2 seconds</span>
                </div>
                
                <h3 className="text-lg font-semibold mb-4">Demo Results Preview</h3>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {config.demoResults.map((result, index) => (
                    <div key={index} className="bg-white/60 rounded-lg p-4 border border-white/20">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-body">{result.label}</span>
                        {result.trend === "up" && <TrendingUp className="w-4 h-4 text-green-500" />}
                        {result.trend === "neutral" && <Target className="w-4 h-4 text-blue-500" />}
                      </div>
                      <p className="text-xl font-bold text-heading mt-1">{result.value}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 border-l-4 border-primary">
                  <p className="text-sm text-body">
                    <strong>This is just a preview!</strong> The full version provides detailed insights, 
                    actionable recommendations, and downloadable reports tailored to your business.
                  </p>
                </div>
              </div>

              <div className="text-center py-6 border-t border-border">
                <h3 className="text-xl font-semibold mb-4">Ready to analyze YOUR business?</h3>
                <p className="text-body mb-6">
                  Sign up now to get personalized insights for your actual market, competitors, and opportunities.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button 
                    onClick={onSignUp}
                    className="btn-gradient"
                    size="lg"
                  >
                    {config.ctaText}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={onClose}
                    size="lg"
                  >
                    Maybe Later
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AgentPreviewModal;