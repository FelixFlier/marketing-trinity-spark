import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Play, Brain, Target, PenTool, CheckCircle } from "lucide-react";

interface DemoModalProps {
  children: React.ReactNode;
}

const DemoModal = ({ children }: DemoModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const demoSteps = [
    {
      title: "🔍 Research Agent Analyzes Your Market",
      description: "Our AI scans thousands of data points to understand your competitive landscape.",
      details: [
        "Competitor content analysis across all platforms",
        "Market trend identification and validation",
        "Audience behavior pattern recognition",
        "Gap analysis for positioning opportunities"
      ],
      icon: Brain,
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "📋 Strategy Agent Creates Your Blueprint",
      description: "Based on research insights, we generate a comprehensive marketing strategy.",
      details: [
        "Platform-specific strategy recommendations",
        "Content pillar development and positioning",
        "Optimal posting schedule and frequency",
        "ROI-focused campaign roadmap creation"
      ],
      icon: Target,
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "✍️ Content Agent Produces Ready-to-Post Content",
      description: "High-converting content optimized for each platform and your brand voice.",
      details: [
        "Platform-native content in your brand voice",
        "Performance-optimized headlines and copy",
        "Strategic hashtag recommendations",
        "Engagement-driving call-to-action suggestions"
      ],
      icon: PenTool,
      color: "from-green-500 to-green-600"
    }
  ];

  const resetDemo = () => {
    setCurrentStep(0);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto glass-card border-white/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            See the AI Agents in Action
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress indicator */}
          <div className="flex items-center justify-center space-x-4">
            {demoSteps.map((_, index) => (
              <div key={index} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                    index <= currentStep
                      ? "bg-primary text-white"
                      : "bg-gray-200 text-gray-400"
                  }`}
                >
                  {index < currentStep ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                </div>
                {index < demoSteps.length - 1 && (
                  <div
                    className={`w-12 h-0.5 mx-2 transition-all duration-300 ${
                      index < currentStep ? "bg-primary" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Current step content */}
          <div className="glass-card p-6 border border-white/20">
            <div className="flex items-start space-x-4">
              <div className={`w-16 h-16 bg-gradient-to-br ${demoSteps[currentStep].color} rounded-xl flex items-center justify-center shadow-lg`}>
                {(() => {
                  const IconComponent = demoSteps[currentStep].icon;
                  return <IconComponent className="w-8 h-8 text-white" />;
                })()}
              </div>
              
              <div className="flex-1">
                <h3 className="text-xl font-bold text-heading mb-2">
                  {demoSteps[currentStep].title}
                </h3>
                <p className="text-body mb-4">
                  {demoSteps[currentStep].description}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {demoSteps[currentStep].details.map((detail, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-body">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Demo simulation */}
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <div className="flex items-center space-x-2 mb-4">
              <Play className="w-5 h-5 text-primary" />
              <span className="font-medium text-heading">Live Demo Simulation</span>
              <Badge variant="secondary">Processing...</Badge>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-body">
                  {currentStep === 0 && "Analyzing 2,847 competitor posts..."}
                  {currentStep === 1 && "Generating strategic recommendations..."}
                  {currentStep === 2 && "Creating platform-optimized content..."}
                </span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${((currentStep + 1) / demoSteps.length) * 100}%` }}
                />
              </div>
              
              <div className="text-xs text-muted-foreground">
                {currentStep === 0 && "Estimated completion: 2 minutes"}
                {currentStep === 1 && "Building your custom strategy..."}
                {currentStep === 2 && "Finalizing content recommendations..."}
              </div>
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="flex items-center justify-between pt-4">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className="hover:bg-white/20"
            >
              Previous
            </Button>

            <div className="flex items-center space-x-3">
              {currentStep < demoSteps.length - 1 ? (
                <Button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="btn-gradient"
                >
                  Next Step
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={resetDemo}
                  className="btn-gradient"
                >
                  Try It Free Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>

            <Button
              variant="ghost"
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20"
            >
              Close
            </Button>
          </div>

          {/* Call to action */}
          <div className="glass-card p-6 border border-white/20 text-center">
            <h4 className="text-lg font-bold text-heading mb-2">
              Ready to Get Your Marketing Intelligence?
            </h4>
            <p className="text-body mb-4">
              Join thousands of marketers already using AI to transform their results.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4">
              <Button 
                onClick={resetDemo}
                className="btn-gradient"
              >
                Start Free Analysis
              </Button>
              <Button 
                variant="outline"
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20"
              >
                Schedule Demo Call
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DemoModal;