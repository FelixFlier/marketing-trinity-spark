import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Upload, Save, X } from "lucide-react";

interface ProfileBusinessTabProps {
  userProfile: any;
  setUserProfile: (profile: any) => void;
}

const ProfileBusinessTab = ({ userProfile, setUserProfile }: ProfileBusinessTabProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [formData, setFormData] = useState({
    business_name: userProfile?.business_name || "",
    business_description: userProfile?.business_description || "",
    industry: userProfile?.industry || "",
    target_audience: userProfile?.target_audience || "",
    brand_voice: userProfile?.brand_voice || {},
  });

  const brandVoiceTags = [
    "Professional", "Casual", "Friendly", "Authoritative", "Playful",
    "Innovative", "Trustworthy", "Educational", "Inspiring", "Bold"
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const toggleBrandVoiceTag = (tag: string) => {
    const currentTags = formData.brand_voice?.personality || [];
    const newTags = currentTags.includes(tag)
      ? currentTags.filter((t: string) => t !== tag)
      : [...currentTags, tag];
    
    handleInputChange("brand_voice", {
      ...formData.brand_voice,
      personality: newTags
    });
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from("users")
        .update(formData)
        .eq("id", userProfile.id);

      if (error) throw error;

      setUserProfile({ ...userProfile, ...formData });
      setHasChanges(false);
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update profile.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDiscard = () => {
    setFormData({
      business_name: userProfile?.business_name || "",
      business_description: userProfile?.business_description || "",
      industry: userProfile?.industry || "",
      target_audience: userProfile?.target_audience || "",
      brand_voice: userProfile?.brand_voice || {},
    });
    setHasChanges(false);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-heading mb-2">Profile & Business</h2>
        <p className="text-muted-foreground">
          Manage your personal information and business details
        </p>
      </div>

      {/* Profile Information */}
      <Card className="glass-card border-0 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Profile Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center group cursor-pointer hover:bg-primary/20 transition-colors">
              <span className="text-2xl font-bold text-primary">
                {formData.business_name?.charAt(0) || "U"}
              </span>
              <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Upload className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <Label htmlFor="business_name">Business Name</Label>
              <Input
                id="business_name"
                value={formData.business_name}
                onChange={(e) => handleInputChange("business_name", e.target.value)}
                placeholder="Enter your business name"
                className="mt-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Business Details */}
      <Card className="glass-card border-0 shadow-card">
        <CardHeader>
          <CardTitle>Business Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="business_description">Business Description</Label>
            <Textarea
              id="business_description"
              value={formData.business_description}
              onChange={(e) => handleInputChange("business_description", e.target.value)}
              placeholder="Describe your business, products, or services..."
              className="mt-1 min-h-24"
            />
            <p className="text-sm text-muted-foreground mt-1">
              {formData.business_description?.length || 0}/500 characters
            </p>
          </div>

          <div>
            <Label htmlFor="industry">Industry</Label>
            <Input
              id="industry"
              value={formData.industry}
              onChange={(e) => handleInputChange("industry", e.target.value)}
              placeholder="e.g., Technology, Healthcare, Finance"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="target_audience">Target Audience</Label>
            <Textarea
              id="target_audience"
              value={formData.target_audience}
              onChange={(e) => handleInputChange("target_audience", e.target.value)}
              placeholder="Describe your ideal customers and target market..."
              className="mt-1 min-h-20"
            />
          </div>
        </CardContent>
      </Card>

      {/* Brand Voice */}
      <Card className="glass-card border-0 shadow-card">
        <CardHeader>
          <CardTitle>Brand Voice & Personality</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label>Brand Personality Tags</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {brandVoiceTags.map((tag) => {
                const isSelected = formData.brand_voice?.personality?.includes(tag);
                return (
                  <Badge
                    key={tag}
                    variant={isSelected ? "default" : "outline"}
                    className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                      isSelected 
                        ? "bg-primary text-primary-foreground shadow-button" 
                        : "hover:bg-muted"
                    }`}
                    onClick={() => toggleBrandVoiceTag(tag)}
                  >
                    {tag}
                  </Badge>
                );
              })}
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

export default ProfileBusinessTab;