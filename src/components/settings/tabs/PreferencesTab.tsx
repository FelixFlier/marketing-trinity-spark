import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  Settings, 
  Palette, 
  Clock, 
  Download,
  Shield,
  Save,
  X
} from "lucide-react";

interface PreferencesTabProps {
  userProfile: any;
  setUserProfile: (profile: any) => void;
}

const PreferencesTab = ({ userProfile, setUserProfile }: PreferencesTabProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  
  const [preferences, setPreferences] = useState({
    contentLength: "medium",
    defaultPlatforms: ["linkedin", "twitter"],
    hashtagStrategy: "growth",
    contentTone: 50,
    aiCreativity: 70,
    contentSafety: 80,
    researchDepth: 60,
    autoApproval: false,
    defaultDashboardTab: "market-intelligence",
    metricDisplay: "percentages",
    chartType: "line",
    timezone: "UTC",
    exportFormat: "pdf",
    dataRetention: "1year",
    emailPreferences: true,
    dataSharing: false,
    cookiePreferences: true,
    marketingEmails: false
  });

  const platforms = [
    { id: "linkedin", name: "LinkedIn" },
    { id: "twitter", name: "Twitter" },
    { id: "facebook", name: "Facebook" },
    { id: "instagram", name: "Instagram" },
    { id: "youtube", name: "YouTube" }
  ];

  const handlePreferenceChange = (key: string, value: any) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const togglePlatform = (platformId: string) => {
    const newPlatforms = preferences.defaultPlatforms.includes(platformId)
      ? preferences.defaultPlatforms.filter(p => p !== platformId)
      : [...preferences.defaultPlatforms, platformId];
    
    handlePreferenceChange("defaultPlatforms", newPlatforms);
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Simulate saving preferences
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setHasChanges(false);
      toast({
        title: "Preferences saved",
        description: "Your preferences have been successfully updated.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to save preferences.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDiscard = () => {
    // Reset to original preferences
    setHasChanges(false);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-heading mb-2">Preferences</h2>
        <p className="text-muted-foreground">
          Customize your experience and default settings
        </p>
      </div>

      {/* Content & AI Preferences */}
      <Card className="glass-card border-0 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-primary" />
            Content & AI Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label>Preferred Content Length</Label>
              <Select 
                value={preferences.contentLength} 
                onValueChange={(value) => handlePreferenceChange("contentLength", value)}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="short">Short (50-100 words)</SelectItem>
                  <SelectItem value="medium">Medium (100-200 words)</SelectItem>
                  <SelectItem value="long">Long (200+ words)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Hashtag Strategy</Label>
              <Select 
                value={preferences.hashtagStrategy} 
                onValueChange={(value) => handlePreferenceChange("hashtagStrategy", value)}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="growth">Growth-focused</SelectItem>
                  <SelectItem value="niche">Niche-specific</SelectItem>
                  <SelectItem value="trending">Trending topics</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>Default Platforms for New Content</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {platforms.map((platform) => (
                <Badge
                  key={platform.id}
                  variant={preferences.defaultPlatforms.includes(platform.id) ? "default" : "outline"}
                  className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                    preferences.defaultPlatforms.includes(platform.id)
                      ? "bg-primary text-primary-foreground shadow-button"
                      : "hover:bg-muted"
                  }`}
                  onClick={() => togglePlatform(platform.id)}
                >
                  {platform.name}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label>Content Tone (Formal ← → Casual)</Label>
              <div className="mt-2 px-3">
                <Slider
                  value={[preferences.contentTone]}
                  onValueChange={(value) => handlePreferenceChange("contentTone", value[0])}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Formal</span>
                  <span>Casual</span>
                </div>
              </div>
            </div>

            <div>
              <Label>AI Creativity Level (Conservative ← → Innovative)</Label>
              <div className="mt-2 px-3">
                <Slider
                  value={[preferences.aiCreativity]}
                  onValueChange={(value) => handlePreferenceChange("aiCreativity", value[0])}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Conservative</span>
                  <span>Innovative</span>
                </div>
              </div>
            </div>

            <div>
              <Label>Content Safety Level (Brand-safe ← → Edgy)</Label>
              <div className="mt-2 px-3">
                <Slider
                  value={[preferences.contentSafety]}
                  onValueChange={(value) => handlePreferenceChange("contentSafety", value[0])}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Brand-safe</span>
                  <span>Edgy</span>
                </div>
              </div>
            </div>

            <div>
              <Label>Research Depth (Quick insights ← → Deep analysis)</Label>
              <div className="mt-2 px-3">
                <Slider
                  value={[preferences.researchDepth]}
                  onValueChange={(value) => handlePreferenceChange("researchDepth", value[0])}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Quick</span>
                  <span>Deep</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Auto-approve content</Label>
              <p className="text-sm text-muted-foreground">
                Automatically publish content without manual review
              </p>
            </div>
            <Switch
              checked={preferences.autoApproval}
              onCheckedChange={(checked) => handlePreferenceChange("autoApproval", checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Dashboard Preferences */}
      <Card className="glass-card border-0 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-primary" />
            Dashboard Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label>Default Dashboard Tab</Label>
              <Select 
                value={preferences.defaultDashboardTab} 
                onValueChange={(value) => handlePreferenceChange("defaultDashboardTab", value)}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="market-intelligence">Market Intelligence</SelectItem>
                  <SelectItem value="strategic-blueprint">Strategic Blueprint</SelectItem>
                  <SelectItem value="content-calendar">Content Calendar</SelectItem>
                  <SelectItem value="implementation">Implementation</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Metric Display</Label>
              <Select 
                value={preferences.metricDisplay} 
                onValueChange={(value) => handlePreferenceChange("metricDisplay", value)}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percentages">Percentages</SelectItem>
                  <SelectItem value="raw-numbers">Raw Numbers</SelectItem>
                  <SelectItem value="both">Both</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Preferred Chart Type</Label>
              <Select 
                value={preferences.chartType} 
                onValueChange={(value) => handlePreferenceChange("chartType", value)}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="line">Line Charts</SelectItem>
                  <SelectItem value="bar">Bar Charts</SelectItem>
                  <SelectItem value="area">Area Charts</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Time Zone</Label>
              <Select 
                value={preferences.timezone} 
                onValueChange={(value) => handlePreferenceChange("timezone", value)}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UTC">UTC</SelectItem>
                  <SelectItem value="EST">Eastern Time</SelectItem>
                  <SelectItem value="PST">Pacific Time</SelectItem>
                  <SelectItem value="GMT">GMT</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Export & Data */}
      <Card className="glass-card border-0 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="w-5 h-5 text-primary" />
            Export & Data
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label>Default Export Format</Label>
              <Select 
                value={preferences.exportFormat} 
                onValueChange={(value) => handlePreferenceChange("exportFormat", value)}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="json">JSON</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Data Retention</Label>
              <Select 
                value={preferences.dataRetention} 
                onValueChange={(value) => handlePreferenceChange("dataRetention", value)}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6months">6 Months</SelectItem>
                  <SelectItem value="1year">1 Year</SelectItem>
                  <SelectItem value="2years">2 Years</SelectItem>
                  <SelectItem value="forever">Forever</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <Button variant="outline" className="w-full hover:scale-105 transition-transform">
              <Download className="w-4 h-4 mr-2" />
              Download My Data (GDPR)
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Privacy Settings */}
      <Card className="glass-card border-0 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Privacy Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Email Preferences</Label>
                <p className="text-sm text-muted-foreground">
                  Receive important account notifications
                </p>
              </div>
              <Switch
                checked={preferences.emailPreferences}
                onCheckedChange={(checked) => handlePreferenceChange("emailPreferences", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Data Sharing for Product Improvement</Label>
                <p className="text-sm text-muted-foreground">
                  Help us improve our AI models (anonymized)
                </p>
              </div>
              <Switch
                checked={preferences.dataSharing}
                onCheckedChange={(checked) => handlePreferenceChange("dataSharing", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Cookie Preferences</Label>
                <p className="text-sm text-muted-foreground">
                  Allow analytics and performance cookies
                </p>
              </div>
              <Switch
                checked={preferences.cookiePreferences}
                onCheckedChange={(checked) => handlePreferenceChange("cookiePreferences", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Marketing Communications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive product updates and marketing emails
                </p>
              </div>
              <Switch
                checked={preferences.marketingEmails}
                onCheckedChange={(checked) => handlePreferenceChange("marketingEmails", checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Changes Bar */}
      {hasChanges && (
        <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-border p-4 z-50">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              You have unsaved changes
            </p>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={handleDiscard}
                className="hover:scale-105 transition-transform"
              >
                <X className="w-4 h-4 mr-2" />
                Discard
              </Button>
              <Button
                onClick={handleSave}
                disabled={isLoading}
                className="bg-primary hover:bg-primary/90 shadow-button hover:scale-105 transition-all"
              >
                <Save className="w-4 h-4 mr-2" />
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PreferencesTab;