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
        
        <h1 className="text-heading-xl mb-8">
          Get Marketing Intelligence 
          <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent"> That Actually Works</span>
        </h1>
        
        <p className="text-body-lg mb-12 max-w-4xl mx-auto">
          Stop guessing with your marketing strategy. Our 3 specialized AI agents deliver research, 
          strategy, and content that drives real results for your business.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
          <Button size="lg" className="btn-gradient text-lg px-10 py-5 group">
            Start Your Intelligence Journey
            <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-all duration-300" />
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="text-lg px-10 py-5 border-2 rounded-2xl backdrop-blur-sm bg-white/10 border-white/30 hover:bg-white/20 hover:border-white/50 transition-all duration-300"
          >
            Watch Demo
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <div className="glass-card p-8 group cursor-pointer">
            <div className="w-16 h-16 bg-gradient-to-br from-accent via-accent to-blue-600 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-all duration-500 shadow-lg">
              <span className="text-3xl">🔍</span>
            </div>
            <h3 className="text-xl font-bold text-heading mb-3">Research Agent</h3>
            <p className="text-body">Deep market analysis and competitor intelligence with AI-powered insights</p>
          </div>
          
          <div className="glass-card p-8 group cursor-pointer">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-purple-600 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-all duration-500 shadow-lg">
              <span className="text-3xl">📋</span>
            </div>
            <h3 className="text-xl font-bold text-heading mb-3">Strategy Agent</h3>
            <p className="text-body">Data-driven marketing strategies and personalized recommendations</p>
          </div>
          
          <div className="glass-card p-8 group cursor-pointer">
            <div className="w-16 h-16 bg-gradient-to-br from-secondary to-green-600 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-all duration-500 shadow-lg">
              <span className="text-3xl">✍️</span>
            </div>
            <h3 className="text-xl font-bold text-heading mb-3">Content Agent</h3>
            <p className="text-body">High-converting content tailored perfectly to your audience</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;