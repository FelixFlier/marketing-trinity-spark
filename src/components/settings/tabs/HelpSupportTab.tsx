import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  HelpCircle, 
  MessageCircle, 
  Calendar,
  BookOpen,
  Users,
  FileText,
  Search,
  Send,
  ExternalLink,
  Download,
  Trash2,
  AlertTriangle
} from "lucide-react";

const HelpSupportTab = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [supportTicket, setSupportTicket] = useState({
    category: "",
    subject: "",
    description: "",
    priority: "medium"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const faqItems = [
    {
      question: "How do I generate my first marketing report?",
      answer: "To generate your first report, navigate to the Dashboard and click on 'Generate New Report'. Follow the AI-guided setup to input your business details, and our system will create a comprehensive marketing intelligence report within minutes."
    },
    {
      question: "What's included in the content calendar?",
      answer: "The content calendar includes optimized posts for your selected platforms, strategic hashtags, optimal posting times, content variations, and performance predictions. Each piece is tailored to your brand voice and target audience."
    },
    {
      question: "How accurate are the market intelligence insights?",
      answer: "Our AI analyzes data from over 50 sources including social media platforms, industry publications, and market research databases. Insights have a 92% accuracy rate based on historical validation studies."
    },
    {
      question: "Can I export my data and reports?",
      answer: "Yes! You can export all your data in multiple formats (PDF, CSV, JSON) from the Settings page. This includes reports, content calendars, and usage analytics."
    },
    {
      question: "How do I upgrade or downgrade my plan?",
      answer: "Go to Settings > Billing & Usage to view plan options. You can upgrade immediately or schedule a downgrade for your next billing cycle. Changes are prorated automatically."
    },
    {
      question: "What happens if I exceed my usage limits?",
      answer: "You'll receive warnings at 80% and 95% of your limit. If exceeded, you can either upgrade your plan or wait until the next billing cycle. Critical features remain accessible."
    }
  ];

  const supportCategories = [
    "Technical Issue",
    "Billing Question",
    "Feature Request",
    "Account Access",
    "Data Export",
    "Integration Help",
    "Other"
  ];

  const handleTicketSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Support ticket submitted",
        description: "We'll respond within 24 hours based on your plan level.",
      });

      setSupportTicket({
        category: "",
        subject: "",
        description: "",
        priority: "medium"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit support ticket. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredFAQ = faqItems.filter(item =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-heading mb-2">Help & Support</h2>
        <p className="text-muted-foreground">
          Find answers, get help, and access community resources
        </p>
      </div>

      {/* Quick Help Search */}
      <Card className="glass-card border-0 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5 text-primary" />
            Search Help Articles
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search for help articles, tutorials, or features..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Knowledge Base */}
      <Card className="glass-card border-0 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            Frequently Asked Questions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {filteredFAQ.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left hover:text-primary transition-colors">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {filteredFAQ.length === 0 && searchQuery && (
            <div className="text-center py-8">
              <HelpCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                No articles found for "{searchQuery}". Try a different search term or contact support.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Support Resources */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-card border-0 shadow-card hover:scale-105 transition-transform cursor-pointer">
          <CardContent className="p-6 text-center">
            <FileText className="w-8 h-8 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Documentation</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Comprehensive guides and API documentation
            </p>
            <Button variant="outline" size="sm" className="w-full">
              <ExternalLink className="w-4 h-4 mr-2" />
              View Docs
            </Button>
          </CardContent>
        </Card>

        <Card className="glass-card border-0 shadow-card hover:scale-105 transition-transform cursor-pointer">
          <CardContent className="p-6 text-center">
            <Users className="w-8 h-8 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Community</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Join our Discord community for tips and support
            </p>
            <Button variant="outline" size="sm" className="w-full">
              <ExternalLink className="w-4 h-4 mr-2" />
              Join Discord
            </Button>
          </CardContent>
        </Card>

        <Card className="glass-card border-0 shadow-card hover:scale-105 transition-transform cursor-pointer">
          <CardContent className="p-6 text-center">
            <Calendar className="w-8 h-8 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Book a Call</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Schedule a 1-on-1 session with our team
            </p>
            <Button variant="outline" size="sm" className="w-full">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Call
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Contact Support */}
      <Card className="glass-card border-0 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-primary" />
            Contact Support
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleTicketSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={supportTicket.category}
                  onValueChange={(value) => setSupportTicket(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {supportCategories.map((category) => (
                      <SelectItem key={category} value={category.toLowerCase().replace(' ', '-')}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="priority">Priority</Label>
                <Select
                  value={supportTicket.priority}
                  onValueChange={(value) => setSupportTicket(prev => ({ ...prev, priority: value }))}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={supportTicket.subject}
                onChange={(e) => setSupportTicket(prev => ({ ...prev, subject: e.target.value }))}
                placeholder="Brief description of your issue"
                className="mt-2"
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={supportTicket.description}
                onChange={(e) => setSupportTicket(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Please provide detailed information about your issue..."
                className="mt-2 min-h-32"
                required
              />
              <p className="text-sm text-muted-foreground mt-1">
                {supportTicket.description.length}/1000 characters
              </p>
            </div>

            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-primary hover:bg-primary/90 shadow-button hover:scale-105 transition-all"
            >
              <Send className="w-4 h-4 mr-2" />
              {isSubmitting ? "Submitting..." : "Submit Ticket"}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-3">
              <HelpCircle className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900 mb-1">Response Times</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Starter: Within 48 hours</li>
                  <li>• Professional: Within 24 hours</li>
                  <li>• Enterprise: Within 4 hours</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Actions */}
      <Card className="glass-card border-0 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-primary" />
            Account Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="justify-start hover:scale-105 transition-transform">
              <Download className="w-4 h-4 mr-2" />
              Export All Data
            </Button>
            
            <Button variant="outline" className="justify-start hover:scale-105 transition-transform">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Deactivate Account
            </Button>
            
            <Button 
              variant="outline" 
              className="justify-start hover:scale-105 transition-transform text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Account
            </Button>
          </div>
          
          <div className="text-sm text-muted-foreground">
            <p className="mb-2">
              <strong>Export Data:</strong> Download all your reports, content, and settings (GDPR compliant)
            </p>
            <p className="mb-2">
              <strong>Deactivate:</strong> Temporarily pause your account while preserving data
            </p>
            <p>
              <strong>Delete:</strong> Permanently remove all data and cancel subscription
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HelpSupportTab;