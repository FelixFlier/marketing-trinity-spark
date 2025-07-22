import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { LogOut, User, Settings } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-lg border-b border-gray-200 p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">M</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Marketing Intelligence Trinity</span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Welcome, {userProfile?.business_name || user?.email}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSignOut}
              className="flex items-center"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto py-8 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to your Marketing Intelligence Dashboard
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your AI-powered marketing agents are ready to transform your business. 
            Start generating insights, strategies, and content that drives results.
          </p>
        </div>

        {/* Profile Summary */}
        <div className="bg-white/80 backdrop-blur-lg border border-gray-100 rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Your Business Profile</h2>
            <Button
              variant="outline"
              onClick={() => navigate("/onboarding")}
              className="flex items-center"
            >
              <Settings className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900">Business</h3>
              <p className="text-gray-600">{userProfile?.business_name}</p>
              <p className="text-sm text-gray-500">{userProfile?.industry}</p>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900">Target Market</h3>
              <p className="text-gray-600">{userProfile?.target_audience?.slice(0, 100)}...</p>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900">Plan</h3>
              <p className="text-gray-600 capitalize">{userProfile?.plan_type}</p>
              <div className="text-sm text-gray-500">
                <p>Reports: {userProfile?.monthly_usage?.reports || 0}/10</p>
                <p>Content: {userProfile?.monthly_usage?.content_pieces || 0}/20</p>
              </div>
            </div>
          </div>
        </div>

        {/* AI Agents */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[
            {
              icon: "🔍",
              title: "Research Agent",
              description: "Analyzing market trends, competitor insights, and audience behavior to inform your strategy.",
              status: "Ready",
              color: "from-blue-500 to-blue-600"
            },
            {
              icon: "📋",
              title: "Strategy Agent",
              description: "Creating comprehensive marketing plans tailored to your business goals and target audience.",
              status: "Ready",
              color: "from-green-500 to-green-600"
            },
            {
              icon: "✍️",
              title: "Content Agent",
              description: "Generating engaging content across all your marketing channels with your brand voice.",
              status: "Ready",
              color: "from-purple-500 to-purple-600"
            }
          ].map((agent, index) => (
            <div key={index} className="bg-white/80 backdrop-blur-lg border border-gray-100 rounded-2xl shadow-xl p-6">
              <div className="text-center mb-4">
                <div className={`w-16 h-16 bg-gradient-to-br ${agent.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <span className="text-2xl">{agent.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{agent.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{agent.description}</p>
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-green-600">{agent.status}</span>
                </div>
              </div>
              <Button className="w-full btn-gradient">
                Start Working
              </Button>
            </div>
          ))}
        </div>

        {/* Coming Soon */}
        <div className="bg-white/80 backdrop-blur-lg border border-gray-100 rounded-2xl shadow-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">More Features Coming Soon</h2>
          <p className="text-gray-600 mb-6">
            We're working hard to bring you advanced analytics, automated workflows, 
            and integration with your favorite marketing tools.
          </p>
          <Button variant="outline">
            Join Our Updates List
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;