import { CheckCircle, Download, PlayCircle, BookOpen, BarChart3, ExternalLink, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const ImplementationTab = () => {
  const milestones = [
    { 
      week: "Week 1-2", 
      title: "Foundation Setup", 
      progress: 75, 
      tasks: [
        { name: "Platform account optimization", completed: true },
        { name: "Content calendar setup", completed: true },
        { name: "Analytics tracking implementation", completed: true },
        { name: "Team onboarding", completed: false }
      ]
    },
    { 
      week: "Week 3-4", 
      title: "Content Production", 
      progress: 40, 
      tasks: [
        { name: "Create first batch of content", completed: true },
        { name: "Schedule initial posts", completed: true },
        { name: "Set up automation workflows", completed: false },
        { name: "Community engagement protocols", completed: false }
      ]
    },
    { 
      week: "Week 5-8", 
      title: "Growth & Optimization", 
      progress: 0, 
      tasks: [
        { name: "Performance analysis", completed: false },
        { name: "Content optimization", completed: false },
        { name: "Audience expansion", completed: false },
        { name: "A/B testing setup", completed: false }
      ]
    },
    { 
      week: "Week 9-12", 
      title: "Scale & Automate", 
      progress: 0, 
      tasks: [
        { name: "Advanced automation", completed: false },
        { name: "Team scaling", completed: false },
        { name: "Advanced integrations", completed: false },
        { name: "ROI optimization", completed: false }
      ]
    }
  ];

  const resources = [
    {
      category: "Templates",
      items: [
        { name: "Content Templates Library", type: "PDF", size: "2.3 MB" },
        { name: "Hashtag Research Sheet", type: "Excel", size: "1.1 MB" },
        { name: "Posting Schedule Template", type: "PDF", size: "856 KB" },
        { name: "Brand Voice Guidelines", type: "PDF", size: "1.8 MB" }
      ]
    },
    {
      category: "Guides",
      items: [
        { name: "Platform Optimization Checklist", type: "PDF", size: "3.2 MB" },
        { name: "Analytics Setup Guide", type: "PDF", size: "2.7 MB" },
        { name: "Community Management Best Practices", type: "PDF", size: "1.9 MB" },
        { name: "Crisis Communication Playbook", type: "PDF", size: "2.1 MB" }
      ]
    },
    {
      category: "Tools",
      items: [
        { name: "UTM Parameter Generator", type: "Web Tool", size: "Online" },
        { name: "ROI Calculator Worksheet", type: "Excel", size: "1.4 MB" },
        { name: "Content Performance Tracker", type: "Google Sheets", size: "Online" },
        { name: "Competitor Analysis Template", type: "PDF", size: "2.8 MB" }
      ]
    }
  ];

  const kpis = [
    { metric: "Reach", target: "+200%", current: "+87%", color: "text-blue-600" },
    { metric: "Engagement", target: "+150%", current: "+112%", color: "text-green-600" },
    { metric: "Leads", target: "+300%", current: "+45%", color: "text-purple-600" },
    { metric: "Conversions", target: "+180%", current: "+23%", color: "text-orange-600" }
  ];

  return (
    <div className="space-y-8">
      {/* Progress Tracker */}
      <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Implementation Progress</h3>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">28%</div>
            <div className="text-sm text-gray-600">Overall Progress</div>
          </div>
        </div>
        
        <div className="space-y-6">
          {milestones.map((milestone, index) => (
            <div key={index} className="bg-white rounded-xl p-4 border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-gray-900">{milestone.title}</h4>
                  <p className="text-sm text-gray-500">{milestone.week}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">{milestone.progress}%</div>
                  <div className="text-xs text-gray-500">Complete</div>
                </div>
              </div>
              
              <Progress value={milestone.progress} className="mb-3" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {milestone.tasks.map((task, taskIndex) => (
                  <div key={taskIndex} className="flex items-center space-x-2 text-sm">
                    <CheckCircle className={`w-4 h-4 ${task.completed ? 'text-emerald-500' : 'text-gray-300'}`} />
                    <span className={task.completed ? 'text-gray-900' : 'text-gray-500'}>
                      {task.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Resource Library */}
      <div className="bg-gray-50/50 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Resource Library</h3>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Download All
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {resources.map((category, index) => (
            <div key={index} className="bg-white rounded-xl p-4 border border-gray-100">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                {category.category === "Templates" && <Download className="w-4 h-4 mr-2 text-blue-500" />}
                {category.category === "Guides" && <BookOpen className="w-4 h-4 mr-2 text-green-500" />}
                {category.category === "Tools" && <BarChart3 className="w-4 h-4 mr-2 text-purple-500" />}
                {category.category}
              </h4>
              
              <div className="space-y-3">
                {category.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center justify-between group hover:bg-gray-50 p-2 rounded-lg transition-colors">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.type} • {item.size}</p>
                    </div>
                    <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Download className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Tracking Setup */}
      <div className="bg-gray-50/50 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Performance Tracking Setup</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">KPI Targets vs Current</h4>
            <div className="space-y-4">
              {kpis.map((kpi, index) => (
                <div key={index} className="bg-white rounded-lg p-4 border border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{kpi.metric}</span>
                    <div className="text-right">
                      <div className={`font-bold ${kpi.color}`}>{kpi.current}</div>
                      <div className="text-xs text-gray-500">Target: {kpi.target}</div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(parseInt(kpi.current.replace('%', '').replace('+', '')) / parseInt(kpi.target.replace('%', '').replace('+', ''))) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Analytics Setup Checklist</h4>
            <div className="space-y-3">
              {[
                { task: "Google Analytics 4 setup", completed: true },
                { task: "UTM parameter configuration", completed: true },
                { task: "Social media analytics integration", completed: false },
                { task: "Email marketing tracking", completed: false },
                { task: "ROI calculation automation", completed: false },
                { task: "Weekly reporting automation", completed: false }
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-100">
                  <CheckCircle className={`w-5 h-5 ${item.completed ? 'text-emerald-500' : 'text-gray-300'}`} />
                  <span className={`flex-1 ${item.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                    {item.task}
                  </span>
                  {!item.completed && (
                    <Button variant="ghost" size="sm">
                      <PlayCircle className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Support & Next Steps */}
      <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Support & Next Steps</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-4 border border-gray-100 text-center">
            <Calendar className="w-8 h-8 text-primary mx-auto mb-3" />
            <h4 className="font-semibold text-gray-900 mb-2">Strategy Call</h4>
            <p className="text-sm text-gray-600 mb-4">Get personalized guidance from our experts</p>
            <Button size="sm" className="w-full">
              Book Call
            </Button>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-100 text-center">
            <BookOpen className="w-8 h-8 text-green-500 mx-auto mb-3" />
            <h4 className="font-semibold text-gray-900 mb-2">Documentation</h4>
            <p className="text-sm text-gray-600 mb-4">Comprehensive guides and tutorials</p>
            <Button variant="outline" size="sm" className="w-full">
              <ExternalLink className="w-3 h-3 mr-1" />
              View Docs
            </Button>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-100 text-center">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-3">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Community</h4>
            <p className="text-sm text-gray-600 mb-4">Connect with other users and experts</p>
            <Button variant="outline" size="sm" className="w-full">
              <ExternalLink className="w-3 h-3 mr-1" />
              Join Discord
            </Button>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-100 text-center">
            <BarChart3 className="w-8 h-8 text-orange-500 mx-auto mb-3" />
            <h4 className="font-semibold text-gray-900 mb-2">Feedback</h4>
            <p className="text-sm text-gray-600 mb-4">Help us improve your experience</p>
            <Button variant="outline" size="sm" className="w-full">
              Give Feedback
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImplementationTab;