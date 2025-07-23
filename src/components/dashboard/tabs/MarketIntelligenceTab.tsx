import { TrendingUp, Users, Target, Clock } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Button } from "@/components/ui/button";

const MarketIntelligenceTab = () => {
  // Sample data for charts
  const trendData = [
    { month: 'Jan', productivity: 85, collaboration: 92, automation: 78 },
    { month: 'Feb', productivity: 88, collaboration: 95, automation: 82 },
    { month: 'Mar', productivity: 92, collaboration: 98, automation: 85 },
    { month: 'Apr', productivity: 95, collaboration: 102, automation: 88 },
    { month: 'May', productivity: 98, collaboration: 105, automation: 92 },
    { month: 'Jun', productivity: 102, collaboration: 108, automation: 95 }
  ];

  const audienceData = [
    { name: 'Enterprise', value: 45, color: '#8B5CF6' },
    { name: 'SMBs', value: 35, color: '#06B6D4' },
    { name: 'Startups', value: 20, color: '#10B981' }
  ];

  const opportunities = [
    {
      title: "AI Productivity Tools Market Gap",
      growth: "+340%",
      confidence: 94,
      description: "Significant opportunity in automated workflow solutions for remote teams"
    },
    {
      title: "Async Collaboration Demand",
      growth: "+185%",
      confidence: 87,
      description: "Growing need for seamless asynchronous communication tools"
    },
    {
      title: "Integration Platform Shortage",
      growth: "+156%",
      confidence: 91,
      description: "Market lacks comprehensive integration solutions for existing tools"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Executive Summary */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-white">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-4">Market Intelligence Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Key Finding</h4>
              <p className="text-white/90">AI productivity tools showing +340% growth trend with major market gap in async collaboration</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Market Size</h4>
              <p className="text-white/90">$2.4B addressable market with 23% annual growth rate</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Competitive Advantage</h4>
              <p className="text-white/90">85% of competitors lack integrated approach to workflow automation</p>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20" />
      </div>

      {/* Market Trends Analysis */}
      <div className="bg-gray-50/50 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Market Trends Analysis</h3>
          <Button variant="outline" size="sm">
            <TrendingUp className="w-4 h-4 mr-2" />
            Regenerate Analysis
          </Button>
        </div>
        
        <div className="h-80 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
              <Line type="monotone" dataKey="productivity" stroke="#8B5CF6" strokeWidth="3" />
              <Line type="monotone" dataKey="collaboration" stroke="#06B6D4" strokeWidth="3" />
              <Line type="monotone" dataKey="automation" stroke="#10B981" strokeWidth="3" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {opportunities.map((opportunity, index) => (
            <div key={index} className="bg-white rounded-xl p-4 border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-900">{opportunity.title}</h4>
                <span className="text-emerald-600 font-bold text-sm">{opportunity.growth}</span>
              </div>
              <p className="text-gray-600 text-sm mb-3">{opportunity.description}</p>
              <div className="flex items-center">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-500"
                    style={{ width: `${opportunity.confidence}%` }}
                  />
                </div>
                <span className="ml-2 text-xs text-gray-500">{opportunity.confidence}% confidence</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Audience Intelligence */}
      <div className="bg-gray-50/50 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Audience Intelligence</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Target Audience Breakdown</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={audienceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {audienceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Peak Engagement Times</h4>
            <div className="space-y-4">
              {[
                { day: "Monday", time: "9:00 AM - 11:00 AM", engagement: 85 },
                { day: "Tuesday", time: "2:00 PM - 4:00 PM", engagement: 92 },
                { day: "Wednesday", time: "10:00 AM - 12:00 PM", engagement: 88 },
                { day: "Thursday", time: "3:00 PM - 5:00 PM", engagement: 90 },
                { day: "Friday", time: "11:00 AM - 1:00 PM", engagement: 78 }
              ].map((slot, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100">
                  <div>
                    <p className="font-medium text-gray-900">{slot.day}</p>
                    <p className="text-sm text-gray-500">{slot.time}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${slot.engagement}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-600">{slot.engagement}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketIntelligenceTab;