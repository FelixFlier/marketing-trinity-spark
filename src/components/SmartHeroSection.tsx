import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import DemoModal from "./DemoModal";

const SmartHeroSection = () => {
  const navigate = useNavigate();
  const [isCheckingAuth, setIsCheckingAuth] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleStartJourney = async () => {
    setIsCheckingAuth(true);
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        // User is logged in, go to dashboard
        navigate("/dashboard");
      } else {
        // User is not logged in, go to auth
        navigate("/auth");
      }
    } catch (error) {
      console.error("Auth check error:", error);
      navigate("/auth");
    } finally {
      setIsCheckingAuth(false);
    }
  };

  return (
    <section className="min-h-screen hero-gradient flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center animate-fade-in">
        <div className="inline-flex items-center space-x-2 bg-white/70 backdrop-blur-sm rounded-full px-4 py-2 mb-8 border border-gray-200 hover:scale-105 transition-transform duration-300">
          <Sparkles className="w-4 h-4 text-primary animate-pulse" />
          <span className="text-sm font-medium text-gray-700">AI-Powered Marketing Intelligence</span>
        </div>
        
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-heading mb-6 leading-tight">
          Get Marketing Intelligence 
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent animate-pulse"> That Actually Works</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-body mb-8 max-w-3xl mx-auto leading-relaxed">
          Stop guessing with your marketing strategy. Our 3 specialized AI agents deliver research, 
          strategy, and content that drives real results for your business.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
          <Button 
            size="lg" 
            className="btn-gradient text-lg px-8 py-4 group shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1"
            onClick={handleStartJourney}
            disabled={isCheckingAuth}
          >
            {isCheckingAuth ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Checking...
              </>
            ) : (
              <>
                {user ? "Go to Dashboard" : "Start Your Intelligence Journey"}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </Button>
          
          <DemoModal>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-4 border-2 border-gray-300 hover:border-primary hover:bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-lg"
            >
              Watch Demo
            </Button>
          </DemoModal>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="glass-card p-6 hover:scale-105 hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl group">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <span className="text-2xl">🔍</span>
            </div>
            <h3 className="text-lg font-semibold text-heading mb-2">Research Agent</h3>
            <p className="text-body text-sm">Deep market analysis and competitor intelligence</p>
          </div>
          
          <div className="glass-card p-6 hover:scale-105 hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl group">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-glow rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <span className="text-2xl">📋</span>
            </div>
            <h3 className="text-lg font-semibold text-heading mb-2">Strategy Agent</h3>
            <p className="text-body text-sm">Data-driven marketing strategies and recommendations</p>
          </div>
          
          <div className="glass-card p-6 hover:scale-105 hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl group">
            <div className="w-12 h-12 bg-gradient-to-br from-secondary to-secondary-glow rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
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

export default SmartHeroSection;