import SmartHeader from "@/components/SmartHeader";
import SmartHeroSection from "@/components/SmartHeroSection";
import DemoModal from "@/components/DemoModal";
import ProblemSolutionSection from "@/components/ProblemSolutionSection";
import FeaturesSection from "@/components/FeaturesSection";
import PricingSection from "@/components/PricingSection";
import RegistrationModal from "@/components/RegistrationModal";
import BackgroundAnimation from "@/components/BackgroundAnimation";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <BackgroundAnimation />
      <div className="relative z-10">
        <SmartHeader />
      
      <main>
        <SmartHeroSection />
        <ProblemSolutionSection />
        <div id="features">
          <FeaturesSection />
        </div>
        <div id="pricing">
          <PricingSection />
        </div>
      </main>
      
      {/* Premium Footer */}
      <footer className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>
        <div className="relative z-10 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">M</span>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Marketing Intelligence Trinity</span>
              </div>
              <p className="text-gray-300 max-w-lg text-lg leading-relaxed">
                Transform your marketing with AI-powered intelligence. Three specialized agents 
                working together to deliver research, strategy, and content that drives results.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-6 text-white">Product</h4>
              <ul className="space-y-4 text-gray-300">
                <li>
                  <button
                    onClick={() => {
                      const element = document.getElementById("features");
                      element?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="hover:text-white transition-colors"
                  >
                    Features
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      const element = document.getElementById("pricing");
                      element?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="hover:text-white transition-colors"
                  >
                    Pricing
                  </button>
                </li>
                <li>
                  <DemoModal>
                    <button className="hover:text-white transition-colors">Demo</button>
                  </DemoModal>
                </li>
                <li>
                  <button
                    onClick={() => {
                      // Show coming soon toast here if needed
                      alert("Case Studies coming soon!");
                    }}
                    className="hover:text-white transition-colors"
                  >
                    Case Studies
                  </button>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-6 text-white">Company</h4>
              <ul className="space-y-4 text-gray-300">
                <li>
                  <button
                    onClick={() => alert("About page coming soon!")}
                    className="hover:text-white transition-colors"
                  >
                    About
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => alert("Blog coming soon!")}
                    className="hover:text-white transition-colors"
                  >
                    Blog
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => alert("Careers page coming soon!")}
                    className="hover:text-white transition-colors"
                  >
                    Careers
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => alert("Contact page coming soon!")}
                    className="hover:text-white transition-colors"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700/50 pt-12 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-lg">
              © 2024 Marketing Intelligence Trinity. All rights reserved.
            </p>
            <div className="flex items-center space-x-8 mt-6 md:mt-0">
              <RegistrationModal>
                <Button className="btn-gradient text-lg px-8 py-4">
                  Register
                </Button>
              </RegistrationModal>
            </div>
          </div>
        </div>
        </div>
      </footer>
      </div>
    </div>
  );
};

export default Index;
