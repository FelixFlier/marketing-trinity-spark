import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="min-h-screen hero-gradient flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center animate-slide-up">
        <div className="inline-flex items-center space-x-2 bg-white/70 backdrop-blur-sm rounded-full px-4 py-2 mb-8 border border-gray-200">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-gray-700">AI-Powered Marketing Intelligence</span>
        </div>
        
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-heading mb-6 leading-tight">
          Get Marketing Intelligence 
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"> That Actually Works</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-body mb-8 max-w-3xl mx-auto leading-relaxed">
          Stop guessing with your marketing strategy. Our 3 specialized AI agents deliver research, 
          strategy, and content that drives real results for your business.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
          <Button size="lg" className="btn-gradient text-lg px-8 py-4 group">
            Start Your Intelligence Journey
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-2 border-gray-300 hover:border-primary">
            Watch Demo
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="glass-card p-6 hover:scale-105 transition-transform duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <span className="text-2xl">🔍</span>
            </div>
            <h3 className="text-lg font-semibold text-heading mb-2">Research Agent</h3>
            <p className="text-body text-sm">Deep market analysis and competitor intelligence</p>
          </div>
          
          <div className="glass-card p-6 hover:scale-105 transition-transform duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-glow rounded-xl flex items-center justify-center mb-4 mx-auto">
              <span className="text-2xl">📋</span>
            </div>
            <h3 className="text-lg font-semibold text-heading mb-2">Strategy Agent</h3>
            <p className="text-body text-sm">Data-driven marketing strategies and recommendations</p>
          </div>
          
          <div className="glass-card p-6 hover:scale-105 transition-transform duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-secondary to-secondary-glow rounded-xl flex items-center justify-center mb-4 mx-auto">
              <span className="text-2xl">✍️</span>
            </div>
            <h3 className="text-lg font-semibold text-heading mb-2">Content Agent</h3>
            <p className="text-body text-sm">High-converting content tailored to your audience</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;