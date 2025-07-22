import { Brain, FileText, BarChart3, Zap, Shield, Users } from "lucide-react";

const FeaturesSection = () => {
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
      gradient: "from-blue-500 to-blue-600"
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
      gradient: "from-primary to-primary-glow"
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
      gradient: "from-secondary to-secondary-glow"
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

  return (
    <section id="features" className="py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-heading mb-6">
            Meet Your AI Marketing Trinity
          </h2>
          <p className="text-xl text-body max-w-3xl mx-auto">
            Three specialized agents working together to transform your marketing 
            from guesswork into a precise, data-driven growth engine.
          </p>
        </div>

        {/* AI Agents Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {agents.map((agent, index) => (
            <div key={index} className="glass-card p-8 hover:scale-105 transition-transform duration-300 group">
              <div className={`w-16 h-16 bg-gradient-to-br ${agent.gradient} rounded-2xl flex items-center justify-center mb-6 text-3xl group-hover:animate-float`}>
                {agent.icon}
              </div>
              
              <h3 className="text-2xl font-bold text-heading mb-2">{agent.name}</h3>
              <p className="text-primary font-semibold mb-4">{agent.tagline}</p>
              <p className="text-body mb-6">{agent.description}</p>
              
              <ul className="space-y-3">
                {agent.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm text-body">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center p-6 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center mx-auto mb-4">
                <benefit.icon className="w-6 h-6 text-primary" />
              </div>
              <h4 className="text-lg font-semibold text-heading mb-2">{benefit.title}</h4>
              <p className="text-body text-sm">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;