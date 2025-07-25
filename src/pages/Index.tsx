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
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">M</span>
                </div>
                <span className="text-xl font-bold">Marketing Intelligence Trinity</span>
              </div>
              <p className="text-gray-400 max-w-md">
                Transform your marketing with AI-powered intelligence. Three specialized agents 
                working together to deliver research, strategy, and content that drives results.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
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
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
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
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Marketing Intelligence Trinity. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <RegistrationModal>
                <Button className="btn-gradient">
                  Register
                </Button>
              </RegistrationModal>
            </div>
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
};

export default Index;
