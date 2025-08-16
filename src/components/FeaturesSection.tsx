import { useState, useEffect } from "react";
import { Brain, FileText, BarChart3, Zap, Shield, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import InteractiveAgentCard from "./agents/InteractiveAgentCard";
import AgentPreviewModal from "./agents/AgentPreviewModal";
import FullAgentExperience from "./agents/FullAgentExperience";

const FeaturesSection = () => {
  const [selectedAgent, setSelectedAgent] = useState<"research" | "strategy" | "content" | null>(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showFullExperience, setShowFullExperience] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);

  // Check authentication status on component mount
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
      if (session) {
        // Fetch user profile if needed
        setUserProfile({
          businessName: "Your Business",
          industry: "Technology",
          targetAudience: "SMB",
          brandVoice: ["Professional", "Innovative"]
        });
      }
    };
    checkAuth();
  }, []);

  const agents = [
    {
      icon: "🔍",
      name: "Research Agent",
      tagline: "Deep Market Intelligence",
      description: "Analyzes your market, competitors, and customer behavior to uncover hidden opportunities",
      features: [
        "Competitor strategy analysis",
        "Market trend identification", 
        "Customer sentiment analysis",
        "Opportunity mapping"
      ],
      gradient: "from-blue-500 to-blue-600",
      type: "research" as const
    },
    {
      icon: "📋", 
      name: "Strategy Agent",
      tagline: "Data-Driven Planning",
      description: "Creates comprehensive marketing strategies based on research insights and proven frameworks",
      features: [
        "Custom strategy blueprints",
        "Channel recommendations",
        "Budget allocation plans",
        "Timeline & milestones"
      ],
      gradient: "from-primary to-primary-glow",
      type: "strategy" as const
    },
    {
      icon: "✍️",
      name: "Content Agent", 
      tagline: "High-Converting Content",
      description: "Generates compelling copy, visuals, and campaigns optimized for your specific audience",
      features: [
        "Landing page copy",
        "Email sequences", 
        "Social media content",
        "Ad creatives"
      ],
      gradient: "from-secondary to-secondary-glow",
      type: "content" as const
    }
  ];

  const benefits = [
    {
      icon: Brain,
      title: "AI-Powered Intelligence",
      description: "Advanced machine learning models trained on marketing data"
    },
    {
      icon: Zap,
      title: "Lightning Fast Results", 
      description: "Get comprehensive insights and content in minutes"
    },
    {
      icon: Shield,
      title: "Proven Methodologies",
      description: "Based on strategies used by successful companies"
    },
    {
      icon: Users,
      title: "Industry Specific",
      description: "Tailored approaches for your business sector"
    }
  ];

  const handleAgentClick = (agentType: "research" | "strategy" | "content") => {
    setSelectedAgent(agentType);
    if (isLoggedIn) {
      setShowFullExperience(true);
    } else {
      setShowPreviewModal(true);
    }
  };

  const handleSignUp = () => {
    window.location.href = "/auth";
  };

  return (
    <section id="features" className="py-32 px-4 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-heading-lg mb-8 animate-fade-in">
            Meet Your AI Marketing Trinity
          </h2>
          <p className="text-body-lg max-w-4xl mx-auto animate-slide-up">
            Three specialized agents working together to transform your marketing 
            from guesswork into a precise, data-driven growth engine.
          </p>
          
          {/* Live Activity Indicator */}
          <div className="mt-12 flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-3 glass-card px-4 py-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-medium">{Math.floor(Math.random() * 50) + 25} users active now</span>
            </div>
            <div className="flex items-center gap-3 glass-card px-4 py-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="font-medium">{Math.floor(Math.random() * 200) + 150} reports generated today</span>
            </div>
          </div>
        </div>

        {/* AI Agents Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-24">
          {agents.map((agent, index) => (
            <div
              key={index}
              className="transform hover:scale-105 transition-all duration-500"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <InteractiveAgentCard
                icon={agent.icon}
                name={agent.name}
                tagline={agent.tagline}
                description={agent.description}
                features={agent.features}
                gradient={agent.gradient}
                isLoggedIn={isLoggedIn}
                onTryAgent={() => handleAgentClick(agent.type)}
              />
            </div>
          ))}
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="text-center p-8 rounded-2xl hover:bg-gray-50 transition-all duration-300 group cursor-pointer hover:scale-105 hover:-translate-y-2"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-primary/10 group-hover:to-secondary/10 transition-all duration-300">
                <benefit.icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h4 className="text-xl font-bold text-heading mb-3">{benefit.title}</h4>
              <p className="text-body">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      {showPreviewModal && selectedAgent && (
        <AgentPreviewModal
          isOpen={showPreviewModal}
          onClose={() => {
            setShowPreviewModal(false);
            setSelectedAgent(null);
          }}
          agentType={selectedAgent}
          onSignUp={handleSignUp}
        />
      )}

      {showFullExperience && selectedAgent && (
        <FullAgentExperience
          agentType={selectedAgent}
          userProfile={userProfile}
          onClose={() => {
            setShowFullExperience(false);
            setSelectedAgent(null);
          }}
        />
      )}
    </section>
  );
};

export default FeaturesSection;