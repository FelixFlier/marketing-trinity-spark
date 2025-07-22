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
      buttonText: "Join Waitlist",
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
      buttonText: "Join Waitlist",
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
      buttonText: "Join Waitlist",
      buttonVariant: "outline" as const,
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-24 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-heading mb-6">
            Choose Your Intelligence Level
          </h2>
          <p className="text-xl text-body max-w-3xl mx-auto">
            Start with our free trial, then scale up as your marketing intelligence needs grow. 
            All plans include our complete AI trinity working for your success.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`glass-card p-8 hover:scale-105 transition-all duration-300 relative ${
                plan.popular ? 'ring-2 ring-primary shadow-button' : ''
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
                    <Star className="w-4 h-4" />
                    <span>{plan.badge}</span>
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-heading mb-2">{plan.name}</h3>
                <p className="text-body mb-6">{plan.description}</p>
                
                <div className="flex items-end justify-center mb-6">
                  <span className="text-5xl font-bold text-heading">${plan.price}</span>
                  <span className="text-body ml-2">/{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-body">
                    <Check className="w-5 h-5 text-secondary mr-3 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button 
                className={plan.popular ? "btn-gradient w-full" : "w-full"} 
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
          <div className="inline-flex items-center space-x-2 bg-white/70 backdrop-blur-sm rounded-full px-6 py-3 border border-gray-200 mb-6">
            <Zap className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-gray-700">14-day free trial • No credit card required • Cancel anytime</span>
          </div>
          
          <p className="text-body max-w-2xl mx-auto">
            Join thousands of businesses already using AI to transform their marketing. 
            Start your intelligence journey today with our risk-free trial.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;