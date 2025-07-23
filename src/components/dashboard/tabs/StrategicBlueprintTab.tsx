import { Target, PieChart, BarChart3, Calendar, CheckCircle } from "lucide-react";
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const StrategicBlueprintTab = () => {
  const platformData = [
    { name: 'LinkedIn', value: 40, color: '#0077B5', roi: '+245%' },
    { name: 'Twitter', value: 25, color: '#1DA1F2', roi: '+189%' },
    { name: 'Blog', value: 20, color: '#FF6B35', roi: '+156%' },
    { name: 'Email', value: 15, color: '#34D399', roi: '+203%' }
  ];

  const contentPillars = [
    { name: 'Educational', percentage: 40, color: '#8B5CF6' },
    { name: 'Industry Insights', percentage: 30, color: '#06B6D4' },
    { name: 'Behind the Scenes', percentage: 20, color: '#10B981' },
    { name: 'Promotional', percentage: 10, color: '#F59E0B' }
  ];

  const roadmapPhases = [
    {
      phase: "Phase 1: Foundation",
      weeks: "Weeks 1-2",
      objectives: ["Establish thought leadership", "Build audience base", "Content framework"],
      deliverables: 8,
      completed: 0
    },
    {
      phase: "Phase 2: Growth",
      weeks: "Weeks 3-6",
      objectives: ["Scale content production", "Community engagement", "Strategic partnerships"],
      deliverables: 12,
      completed: 0
    },
    {
      phase: "Phase 3: Optimization",
      weeks: "Weeks 7-10",
      objectives: ["Performance optimization", "Conversion focus", "Advanced analytics"],
      deliverables: 10,
      completed: 0
    },
    {
      phase: "Phase 4: Scale",
      weeks: "Weeks 11-12",
      objectives: ["Automated workflows", "Team expansion", "Advanced integrations"],
      deliverables: 6,
      completed: 0
    }
  ];

  return (
    <div className="space-y-8">
      {/* Strategy Overview Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary/20 rounded-2xl p-8">
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Strategic Positioning</h2>
              <p className="text-lg text-gray-700 mb-4">
                "Become the go-to platform for AI-powered productivity solutions targeting remote-first teams and async collaboration"
              </p>
              <div className="bg-white/80 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Target Audience</h4>
                <p className="text-gray-600">Tech-savvy professionals, team leads, and productivity enthusiasts in 50-500 employee companies seeking workflow automation</p>
              </div>
            </div>
            <div className="ml-6">
              <div className="relative w-24 h-24">
                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="2"
                  />
                  <path
                    d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                    fill="none"
                    stroke="#8B5CF6"
                    strokeWidth="2"
                    strokeDasharray="87, 100"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-xl font-bold text-primary">87%</div>
                    <div className="text-xs text-gray-600">Success Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Platform Allocation */}
      <div className="bg-gray-50/50 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Platform Resource Allocation</h3>
          <Button variant="outline" size="sm">
            <PieChart className="w-4 h-4 mr-2" />
            Adjust Strategy
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={platformData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {platformData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-4">
            {platformData.map((platform, index) => (
              <div key={index} className="bg-white rounded-xl p-4 border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: platform.color }}
                    />
                    <h4 className="font-semibold text-gray-900">{platform.name}</h4>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">{platform.value}%</div>
                    <div className="text-sm text-emerald-600">{platform.roi} ROI</div>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full transition-all duration-500"
                    style={{ 
                      width: `${platform.value}%`,
                      backgroundColor: platform.color 
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content Strategy Architecture */}
      <div className="bg-gray-50/50 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Content Strategy Architecture</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {contentPillars.map((pillar, index) => (
            <div key={index} className="bg-white rounded-xl p-4 border border-gray-100 text-center">
              <div 
                className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold text-lg"
                style={{ backgroundColor: pillar.color }}
              >
                {pillar.percentage}%
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">{pillar.name}</h4>
              <div className="text-sm text-gray-600">
                Primary content focus
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { type: "How-to Guides", count: "8/week" },
            { type: "Industry Reports", count: "2/week" },
            { type: "Case Studies", count: "1/week" },
            { type: "Quick Tips", count: "5/week" }
          ].map((content, index) => (
            <div key={index} className="bg-white rounded-lg p-3 border border-gray-100">
              <div className="text-sm font-medium text-gray-900">{content.type}</div>
              <div className="text-lg font-bold text-primary">{content.count}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Campaign Roadmap */}
      <div className="bg-gray-50/50 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Campaign Roadmap</h3>
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            View Full Timeline
          </Button>
        </div>
        
        <div className="space-y-4">
          {roadmapPhases.map((phase, index) => (
            <div key={index} className="bg-white rounded-xl p-6 border border-gray-100">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-semibold text-gray-900">{phase.phase}</h4>
                    <span className="text-sm text-gray-500">{phase.weeks}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {phase.objectives.map((objective, objIndex) => (
                      <span 
                        key={objIndex}
                        className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                      >
                        {objective}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">Deliverables</div>
                  <div className="text-2xl font-bold text-gray-900">{phase.deliverables}</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Progress value={phase.completed} className="flex-1" />
                <span className="text-sm text-gray-500">{phase.completed}% Complete</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StrategicBlueprintTab;