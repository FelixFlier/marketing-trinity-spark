import { Button } from "@/components/ui/button";
import { Check, Star, Zap } from "lucide-react";

const PricingSection = () => {
  const plans = [
    {
      name: "Starter",
      price: "97",
      period: "month",
      description: "Perfect for small businesses testing AI marketing",
      badge: null,
      features: [
        "5 Research Reports/month",
        "10 Strategy Blueprints/month", 
        "50 Content Pieces/month",
        "Basic Analytics Dashboard",
        "Email Support",
        "Industry Templates"
      ],
      buttonText: "Register",
      buttonVariant: "outline" as const,
      popular: false
    },
    {
      name: "Growth", 
      price: "297",
      period: "month",
      description: "For growing companies serious about marketing ROI",
      badge: "Most Popular",
      features: [
        "25 Research Reports/month",
        "50 Strategy Blueprints/month",
        "200 Content Pieces/month", 
        "Advanced Analytics & Insights",
        "Priority Support",
        "Custom Brand Guidelines",
        "A/B Testing Framework",
        "Competitor Monitoring"
      ],
      buttonText: "Register",
      buttonVariant: "default" as const,
      popular: true
    },
    {
      name: "Scale",
      price: "797", 
      period: "month",
      description: "Enterprise-grade intelligence for market leaders",
      badge: "Best Value",
      features: [
        "Unlimited Research Reports",
        "Unlimited Strategy Blueprints",
        "Unlimited Content Generation",
        "White-label Dashboard",
        "Dedicated Success Manager",
        "Custom AI Model Training",
        "API Access",
        "Advanced Integrations",
        "Custom Reporting"
      ],
      buttonText: "Register",
      buttonVariant: "outline" as const,
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-32 px-4 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-heading-lg mb-8 animate-fade-in">
            Choose Your Intelligence Level
          </h2>
          <p className="text-body-lg max-w-4xl mx-auto animate-slide-up">
            Start with our free trial, then scale up as your marketing intelligence needs grow. 
            All plans include our complete AI trinity working for your success.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-20">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`glass-card p-10 hover:scale-105 transition-all duration-500 relative group ${
                plan.popular ? 'ring-2 ring-primary shadow-button scale-105' : ''
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {plan.badge && (
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-2 rounded-full text-sm font-bold flex items-center space-x-2 shadow-lg">
                    <Star className="w-4 h-4" />
                    <span>{plan.badge}</span>
                  </div>
                </div>
              )}

              <div className="text-center mb-10">
                <h3 className="text-3xl font-bold text-heading mb-3">{plan.name}</h3>
                <p className="text-body mb-8">{plan.description}</p>
                
                <div className="flex items-end justify-center mb-8">
                  <span className="text-6xl font-bold text-heading">${plan.price}</span>
                  <span className="text-body ml-3 text-lg">/{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-5 mb-10">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-body">
                    <Check className="w-6 h-6 text-secondary mr-4 flex-shrink-0" />
                    <span className="text-base">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                className={plan.popular ? "btn-gradient w-full text-lg py-4" : "w-full text-lg py-4"} 
                variant={plan.buttonVariant}
                size="lg"
              >
                {plan.buttonText}
              </Button>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-3 bg-white/70 backdrop-blur-sm rounded-full px-8 py-4 border border-gray-200 mb-8 hover:scale-105 transition-transform duration-300">
            <Zap className="w-6 h-6 text-primary" />
            <span className="text-base font-semibold text-gray-700">14-day free trial • No credit card required • Cancel anytime</span>
          </div>
          
          <p className="text-body-lg max-w-3xl mx-auto">
            Join thousands of businesses already using AI to transform their marketing. 
            Start your intelligence journey today with our risk-free trial.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;