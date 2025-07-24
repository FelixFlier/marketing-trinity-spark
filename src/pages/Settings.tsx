import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { LogOut, Bell, User, Settings as SettingsIcon } from "lucide-react";
import SmartHeader from "@/components/SmartHeader";
import SettingsSidebar from "@/components/settings/SettingsSidebar";
import ProfileBusinessTab from "@/components/settings/tabs/ProfileBusinessTab";
import BillingUsageTab from "@/components/settings/tabs/BillingUsageTab";
import PreferencesTab from "@/components/settings/tabs/PreferencesTab";
import NotificationsTab from "@/components/settings/tabs/NotificationsTab";
import HelpSupportTab from "@/components/settings/tabs/HelpSupportTab";

const Settings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }

      setUser(session.user);

      // Fetch user profile
      const { data: profile, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (error) {
        if (error.code === "PGRST116") {
          navigate("/onboarding");
          return;
        }
        toast({
          title: "Error",
          description: "Failed to load your profile.",
          variant: "destructive",
        });
      } else {
        setUserProfile(profile);
      }

      setIsLoading(false);
    };

    checkAuth();
  }, [navigate, toast]);

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
      
      navigate("/");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to sign out.",
        variant: "destructive",
      });
    }
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileBusinessTab userProfile={userProfile} setUserProfile={setUserProfile} />;
      case "billing":
        return <BillingUsageTab userProfile={userProfile} />;
      case "preferences":
        return <PreferencesTab userProfile={userProfile} setUserProfile={setUserProfile} />;
      case "notifications":
        return <NotificationsTab />;
      case "help":
        return <HelpSupportTab />;
      default:
        return <ProfileBusinessTab userProfile={userProfile} setUserProfile={setUserProfile} />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-white font-bold text-xl">M</span>
          </div>
          <p className="text-gray-600">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SmartHeader />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8 mt-20">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <SettingsSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>

          {/* Main Settings Content */}
          <div className="flex-1 max-w-4xl">
            <div className="glass-card p-8 animate-slide-up">
              {renderActiveTab()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;