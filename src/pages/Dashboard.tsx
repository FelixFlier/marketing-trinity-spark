import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { LogOut, Bell, User } from "lucide-react";
import SmartHeader from "@/components/SmartHeader";
import ExecutiveSummaryCards from "@/components/dashboard/ExecutiveSummaryCards";
import DashboardTabs from "@/components/dashboard/DashboardTabs";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

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
          // No profile found, redirect to onboarding
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-white font-bold text-xl">M</span>
          </div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SmartHeader />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8 pt-32">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-heading mb-2">
            Welcome back, {userProfile?.business_name?.split(' ')[0] || user?.email?.split('@')[0]}! 👋
          </h1>
          <p className="text-body max-w-3xl">
            Your AI-powered marketing intelligence is ready. Here's what your agents have discovered and created for your business.
          </p>
        </div>

        {/* Executive Summary Cards */}
        <ExecutiveSummaryCards />

        {/* Tabbed Results Interface */}
        <DashboardTabs />
      </main>
    </div>
  );
};

export default Dashboard;