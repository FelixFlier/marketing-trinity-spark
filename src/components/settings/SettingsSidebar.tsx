import { Button } from "@/components/ui/button";
import { 
  User, 
  CreditCard, 
  Settings, 
  Link, 
  Bell, 
  HelpCircle 
} from "lucide-react";

interface SettingsSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const SettingsSidebar = ({ activeTab, setActiveTab }: SettingsSidebarProps) => {
  const tabs = [
    { id: "profile", label: "Profile & Business", icon: User },
    { id: "billing", label: "Billing & Usage", icon: CreditCard },
    { id: "preferences", label: "Preferences", icon: Settings },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "help", label: "Help & Support", icon: HelpCircle },
  ];

  return (
    <div className="glass-card p-6 sticky top-28">
      <h3 className="text-lg font-semibold text-heading mb-4">Settings</h3>
      
      <nav className="space-y-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <Button
              key={tab.id}
              variant={isActive ? "default" : "ghost"}
              className={`w-full justify-start transition-all duration-300 ${
                isActive 
                  ? "bg-primary text-primary-foreground shadow-button" 
                  : "hover:bg-muted/50 hover:scale-105"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon className="w-4 h-4 mr-3" />
              {tab.label}
            </Button>
          );
        })}
      </nav>
    </div>
  );
};

export default SettingsSidebar;