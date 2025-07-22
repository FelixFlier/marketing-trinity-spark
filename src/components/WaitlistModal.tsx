import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { X, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface WaitlistModalProps {
  children: React.ReactNode;
}

const WaitlistModal = ({ children }: WaitlistModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    businessType: "",
    marketingChallenge: "",
    budgetRange: "",
    priorityFeatures: [] as string[]
  });
  const { toast } = useToast();

  const businessTypes = [
    "E-commerce",
    "SaaS/Software", 
    "Consulting/Services",
    "Healthcare",
    "Real Estate",
    "Manufacturing",
    "Education",
    "Non-profit",
    "Other"
  ];

  const budgetRanges = [
    "Under $1,000/month",
    "$1,000 - $5,000/month",
    "$5,000 - $15,000/month", 
    "$15,000 - $50,000/month",
    "Over $50,000/month"
  ];

  const features = [
    "Market Research & Analysis",
    "Competitor Intelligence", 
    "Content Generation",
    "Strategy Planning",
    "Analytics & Reporting",
    "Custom AI Training"
  ];

  const handleFeatureChange = (feature: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      priorityFeatures: checked 
        ? [...prev.priorityFeatures, feature]
        : prev.priorityFeatures.filter(f => f !== feature)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitted(true);
    toast({
      title: "Welcome to the waitlist!",
      description: "We'll notify you when Marketing Intelligence Trinity launches.",
    });
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setFormData({
      email: "",
      businessType: "",
      marketingChallenge: "",
      budgetRange: "",
      priorityFeatures: []
    });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-heading flex items-center space-x-2">
            {isSubmitted ? (
              <>
                <CheckCircle className="w-6 h-6 text-secondary" />
                <span>You're on the list!</span>
              </>
            ) : (
              <span>Join the Marketing Intelligence Trinity Waitlist</span>
            )}
          </DialogTitle>
        </DialogHeader>

        {isSubmitted ? (
          <div className="text-center py-8 animate-slide-up">
            <div className="w-20 h-20 bg-gradient-to-br from-secondary to-secondary-glow rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-heading mb-4">Welcome to the Future of Marketing!</h3>
            <p className="text-body mb-6 max-w-md mx-auto">
              You're among the first to experience AI-powered marketing intelligence. 
              We'll send you exclusive updates and early access when we launch.
            </p>
            <Button onClick={resetForm} className="btn-gradient">
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="your@email.com"
                  className="focus:ring-primary"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="businessType">Business Type</Label>
                <Select onValueChange={(value) => setFormData(prev => ({ ...prev, businessType: value }))}>
                  <SelectTrigger className="focus:ring-primary">
                    <SelectValue placeholder="Select your industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {businessTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="challenge">What's your biggest marketing challenge?</Label>
              <Textarea
                id="challenge"
                value={formData.marketingChallenge}
                onChange={(e) => setFormData(prev => ({ ...prev, marketingChallenge: e.target.value }))}
                placeholder="Tell us about your current marketing struggles..."
                className="focus:ring-primary min-h-20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="budget">Monthly Marketing Budget</Label>
              <Select onValueChange={(value) => setFormData(prev => ({ ...prev, budgetRange: value }))}>
                <SelectTrigger className="focus:ring-primary">
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent>
                  {budgetRanges.map((range) => (
                    <SelectItem key={range} value={range}>{range}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label>Which features are most important to you? (Select all that apply)</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {features.map((feature) => (
                  <div key={feature} className="flex items-center space-x-2">
                    <Checkbox
                      id={feature}
                      checked={formData.priorityFeatures.includes(feature)}
                      onCheckedChange={(checked) => handleFeatureChange(feature, !!checked)}
                    />
                    <Label htmlFor={feature} className="text-sm font-normal">{feature}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex space-x-3 pt-4">
              <Button type="submit" className="btn-gradient flex-1">
                Join Waitlist
              </Button>
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default WaitlistModal;