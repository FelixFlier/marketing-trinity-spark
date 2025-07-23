import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, FileText, Calendar, Rocket } from "lucide-react";
import MarketIntelligenceTab from "./tabs/MarketIntelligenceTab";
import StrategicBlueprintTab from "./tabs/StrategicBlueprintTab";
import ContentCalendarTab from "./tabs/ContentCalendarTab";
import ImplementationTab from "./tabs/ImplementationTab";

const DashboardTabs = () => {
  const [activeTab, setActiveTab] = useState("market");

  const tabs = [
    {
      id: "market",
      label: "Market Intelligence",
      icon: Search,
      component: MarketIntelligenceTab
    },
    {
      id: "strategy",
      label: "Strategic Blueprint",
      icon: FileText,
      component: StrategicBlueprintTab
    },
    {
      id: "content",
      label: "Content Calendar",
      icon: Calendar,
      component: ContentCalendarTab
    },
    {
      id: "implementation",
      label: "Implementation",
      icon: Rocket,
      component: ImplementationTab
    }
  ];

  return (
    <div className="bg-white/80 backdrop-blur-lg border border-gray-100 rounded-2xl shadow-xl overflow-hidden">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-gray-50/50 p-1 h-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="flex items-center space-x-2 py-3 px-4 data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-primary transition-all duration-300"
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline font-medium">{tab.label}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {tabs.map((tab) => {
          const Component = tab.component;
          return (
            <TabsContent key={tab.id} value={tab.id} className="p-6 animate-fade-in">
              <Component />
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
};

export default DashboardTabs;