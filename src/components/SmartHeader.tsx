import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Bell, User, LogOut, Home, Settings, HelpCircle, Plus, Menu, X } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import WaitlistModal from "./WaitlistModal";

const SmartHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);

      if (session?.user) {
        // Fetch user profile
        const { data: profile } = await supabase
          .from("users")
          .select("*")
          .eq("id", session.user.id)
          .single();
        setUserProfile(profile);
      }

      setIsLoading(false);
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
      if (!session?.user) {
        setUserProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

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

  const getBreadcrumb = () => {
    if (location.pathname === "/dashboard") return "Dashboard";
    if (location.pathname === "/settings") return "Settings";
    return "";
  };

  const getUserInitials = () => {
    if (userProfile?.name) {
      return userProfile.name.split(' ').map((n: string) => n[0]).join('').toUpperCase();
    }
    if (user?.email) {
      return user.email.substring(0, 2).toUpperCase();
    }
    return "U";
  };

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: sectionId } });
    } else {
      const element = document.getElementById(sectionId);
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const showComingSoon = (feature: string) => {
    toast({
      title: "Coming Soon",
      description: `${feature} feature will be available soon!`,
    });
  };

  if (isLoading) {
    return (
      <header className="floating-header">
        <div className="flex items-center justify-between w-full max-w-6xl mx-auto">
          <div className="w-64 h-8 bg-gray-200 rounded animate-pulse"></div>
          <div className="w-32 h-8 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </header>
    );
  }

  // Logged-in user header
  if (user) {
    return (
      <header className="floating-header">
        <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
          {/* Logo and Breadcrumb */}
          <div className="flex items-center space-x-6">
            <button
              onClick={() => navigate("/")}
              className="flex items-center space-x-3 hover:scale-105 transition-transform duration-200"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className="text-heading text-xl font-bold hidden md:block">MIT</span>
            </button>
            
            {getBreadcrumb() && (
              <div className="flex items-center space-x-2 text-muted-foreground">
                <span>/</span>
                <span className="text-heading font-medium">{getBreadcrumb()}</span>
              </div>
            )}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              onClick={() => showComingSoon("Generate New Report")}
              className="btn-gradient shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Plus className="w-4 h-4 mr-2" />
              Generate Report
            </Button>

            {/* Notifications */}
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-white/20 backdrop-blur-sm"
              onClick={() => showComingSoon("Notifications")}
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </Button>

            {/* User Avatar Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:scale-105 transition-transform">
                  <Avatar className="h-10 w-10 border-2 border-white/20">
                    <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white font-semibold">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 glass-card border-white/20" align="end">
                <div className="px-3 py-2">
                  <p className="text-sm font-medium">{userProfile?.name || "User"}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
                <DropdownMenuSeparator className="bg-white/20" />
                <DropdownMenuItem onClick={() => navigate("/dashboard")} className="cursor-pointer">
                  <User className="w-4 h-4 mr-2" />
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/settings")} className="cursor-pointer">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/")} className="cursor-pointer">
                  <Home className="w-4 h-4 mr-2" />
                  Back to Home
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => showComingSoon("Help & Support")} className="cursor-pointer">
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Help & Support
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/20" />
                <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-600">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white/80 backdrop-blur-xl border border-white/20 rounded-b-2xl shadow-2xl mx-4 mt-2 p-4 space-y-3">
            <Button
              onClick={() => {
                showComingSoon("Generate New Report");
                setIsMobileMenuOpen(false);
              }}
              className="w-full btn-gradient"
            >
              <Plus className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
            
            <div className="space-y-2">
              <Button
                variant="ghost"
                onClick={() => {
                  navigate("/dashboard");
                  setIsMobileMenuOpen(false);
                }}
                className="w-full justify-start"
              >
                <User className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  navigate("/settings");
                  setIsMobileMenuOpen(false);
                }}
                className="w-full justify-start"
              >
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  navigate("/");
                  setIsMobileMenuOpen(false);
                }}
                className="w-full justify-start"
              >
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  showComingSoon("Help & Support");
                  setIsMobileMenuOpen(false);
                }}
                className="w-full justify-start"
              >
                <HelpCircle className="w-4 h-4 mr-2" />
                Help & Support
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  handleSignOut();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full justify-start text-red-600"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        )}
      </header>
    );
  }

  // Visitor header
  return (
    <header className="floating-header">
      <div className="flex items-center justify-between w-full max-w-6xl mx-auto">
        <button
          onClick={() => navigate("/")}
          className="flex items-center space-x-3 hover:scale-105 transition-transform duration-200"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">M</span>
          </div>
          <span className="text-heading text-xl font-bold">Marketing Intelligence Trinity</span>
        </button>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <button
            onClick={() => scrollToSection("features")}
            className="text-body hover:text-primary transition-all duration-300 relative group"
          >
            Features
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </button>
          <button
            onClick={() => scrollToSection("pricing")}
            className="text-body hover:text-primary transition-all duration-300 relative group"
          >
            Pricing
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </button>
          <button
            onClick={() => showComingSoon("Demo")}
            className="text-body hover:text-primary transition-all duration-300 relative group"
          >
            Demo
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </button>
        </nav>
        
        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          <Button 
            variant="ghost"
            onClick={() => navigate("/auth")}
            className="text-gray-700 hover:text-gray-900 hover:bg-white/20 backdrop-blur-sm transition-all duration-300"
          >
            Sign In
          </Button>
          <WaitlistModal>
            <Button className="btn-gradient shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              Join Waitlist
            </Button>
          </WaitlistModal>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/80 backdrop-blur-xl border border-white/20 rounded-b-2xl shadow-2xl mx-4 mt-2 p-4 space-y-3">
          <div className="space-y-2">
            <Button
              variant="ghost"
              onClick={() => {
                scrollToSection("features");
                setIsMobileMenuOpen(false);
              }}
              className="w-full justify-start"
            >
              Features
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                scrollToSection("pricing");
                setIsMobileMenuOpen(false);
              }}
              className="w-full justify-start"
            >
              Pricing
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                showComingSoon("Demo");
                setIsMobileMenuOpen(false);
              }}
              className="w-full justify-start"
            >
              Demo
            </Button>
          </div>
          
          <div className="border-t border-white/20 pt-3 space-y-2">
            <Button
              variant="ghost"
              onClick={() => {
                navigate("/auth");
                setIsMobileMenuOpen(false);
              }}
              className="w-full justify-start"
            >
              Sign In
            </Button>
            <WaitlistModal>
              <Button 
                className="w-full btn-gradient"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Join Waitlist
              </Button>
            </WaitlistModal>
          </div>
        </div>
      )}
    </header>
  );
};

export default SmartHeader;