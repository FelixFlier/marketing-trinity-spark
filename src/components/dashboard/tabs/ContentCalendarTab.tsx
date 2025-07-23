import { useState } from "react";
import { Calendar, Filter, Download, Edit, Clock, Hash, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const ContentCalendarTab = () => {
  const [viewMode, setViewMode] = useState("month");
  const [selectedPlatforms, setSelectedPlatforms] = useState(["linkedin", "twitter", "blog"]);

  const platforms = [
    { id: "linkedin", name: "LinkedIn", color: "bg-blue-600", textColor: "text-blue-600" },
    { id: "twitter", name: "Twitter", color: "bg-sky-500", textColor: "text-sky-500" },
    { id: "blog", name: "Blog", color: "bg-orange-500", textColor: "text-orange-500" },
    { id: "email", name: "Email", color: "bg-emerald-500", textColor: "text-emerald-500" }
  ];

  const contentPosts = [
    {
      id: 1,
      title: "The Future of AI in Workplace Productivity",
      platform: "linkedin",
      type: "Educational",
      scheduledFor: "2024-01-15 09:00",
      status: "scheduled",
      performanceScore: 87,
      engagement: "High",
      hashtags: ["#AI", "#Productivity", "#FutureOfWork"],
      charCount: { linkedin: 280, twitter: 240 },
      optimal: true
    },
    {
      id: 2,
      title: "5 Quick Tips for Remote Team Collaboration",
      platform: "twitter",
      type: "Quick Tips",
      scheduledFor: "2024-01-15 14:30",
      status: "draft",
      performanceScore: 92,
      engagement: "Very High",
      hashtags: ["#RemoteWork", "#Collaboration", "#Tips"],
      charCount: { twitter: 220 },
      optimal: true
    },
    {
      id: 3,
      title: "Case Study: How We Automated Our Workflow",
      platform: "blog",
      type: "Case Study",
      scheduledFor: "2024-01-16 11:00",
      status: "review",
      performanceScore: 78,
      engagement: "Medium",
      hashtags: ["#CaseStudy", "#Automation", "#Workflow"],
      charCount: { blog: 1200 },
      optimal: false
    },
    {
      id: 4,
      title: "Weekly Newsletter: Industry Insights",
      platform: "email",
      type: "Newsletter",
      scheduledFor: "2024-01-17 08:00",
      status: "scheduled",
      performanceScore: 85,
      engagement: "High",
      hashtags: [],
      charCount: { email: 800 },
      optimal: true
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled": return "bg-emerald-100 text-emerald-800";
      case "draft": return "bg-yellow-100 text-yellow-800";
      case "review": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPlatformColor = (platformId: string) => {
    const platform = platforms.find(p => p.id === platformId);
    return platform ? platform.color : "bg-gray-500";
  };

  const getCharCountColor = (current: number, max: number) => {
    const percentage = (current / max) * 100;
    if (percentage <= 80) return "text-emerald-600";
    if (percentage <= 95) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      {/* Controls Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-white rounded-lg border border-gray-200 p-1">
            {["month", "week", "list"].map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  viewMode === mode 
                    ? "bg-primary text-white" 
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">Filter by:</span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button size="sm" className="btn-gradient">
            <Edit className="w-4 h-4 mr-2" />
            Create Content
          </Button>
        </div>
      </div>

      {/* Platform Filters */}
      <div className="flex flex-wrap gap-2">
        {platforms.map((platform) => (
          <button
            key={platform.id}
            onClick={() => {
              setSelectedPlatforms(prev => 
                prev.includes(platform.id) 
                  ? prev.filter(p => p !== platform.id)
                  : [...prev, platform.id]
              );
            }}
            className={`flex items-center space-x-2 px-3 py-2 rounded-full border transition-all ${
              selectedPlatforms.includes(platform.id)
                ? `${platform.color} text-white border-transparent`
                : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${
              selectedPlatforms.includes(platform.id) ? "bg-white" : platform.color
            }`} />
            <span className="text-sm font-medium">{platform.name}</span>
          </button>
        ))}
      </div>

      {/* Content Calendar View */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {viewMode === "list" && (
          <div className="divide-y divide-gray-100">
            {contentPosts
              .filter(post => selectedPlatforms.includes(post.platform))
              .map((post) => (
                <div key={post.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-start space-x-4">
                        <div className={`w-3 h-3 rounded-full mt-2 ${getPlatformColor(post.platform)}`} />
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-2">{post.title}</h4>
                          
                          <div className="flex items-center space-x-4 mb-3">
                            <Badge variant="outline" className={getStatusColor(post.status)}>
                              {post.status}
                            </Badge>
                            <span className="text-sm text-gray-500 flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {post.scheduledFor}
                            </span>
                            <span className="text-sm text-gray-500">{post.type}</span>
                          </div>

                          {/* Performance Indicators */}
                          <div className="flex items-center space-x-6 mb-3">
                            <div className="flex items-center space-x-2">
                              <TrendingUp className="w-4 h-4 text-emerald-500" />
                              <span className="text-sm font-medium text-gray-900">
                                Score: {post.performanceScore}/100
                              </span>
                            </div>
                            <div className="text-sm text-gray-600">
                              Expected: {post.engagement}
                            </div>
                            {post.optimal && (
                              <Badge variant="outline" className="bg-emerald-100 text-emerald-800">
                                ✓ Optimal Time
                              </Badge>
                            )}
                          </div>

                          {/* Character Counts */}
                          <div className="flex items-center space-x-4 mb-3">
                            {Object.entries(post.charCount).map(([platform, count]) => {
                              const maxChars = platform === "twitter" ? 280 : platform === "linkedin" ? 3000 : 1500;
                              return (
                                <div key={platform} className="text-sm">
                                  <span className="text-gray-500 capitalize">{platform}: </span>
                                  <span className={getCharCountColor(count as number, maxChars)}>
                                    {count}/{maxChars}
                                  </span>
                                </div>
                              );
                            })}
                          </div>

                          {/* Hashtags */}
                          {post.hashtags.length > 0 && (
                            <div className="flex items-center space-x-2">
                              <Hash className="w-3 h-3 text-gray-400" />
                              <div className="flex flex-wrap gap-1">
                                {post.hashtags.map((tag, index) => (
                                  <span key={index} className="text-xs text-primary">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 ml-4">
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Calendar className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}

        {viewMode === "month" && (
          <div className="p-6">
            <div className="grid grid-cols-7 gap-4 mb-4">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-4">
              {Array.from({ length: 35 }, (_, i) => {
                const dayContent = contentPosts.filter(post => {
                  const postDate = new Date(post.scheduledFor).getDate();
                  return postDate === (i % 31) + 1;
                });
                
                return (
                  <div key={i} className="h-24 border border-gray-100 rounded-lg p-2 hover:bg-gray-50 transition-colors">
                    <div className="text-sm text-gray-600 mb-1">{(i % 31) + 1}</div>
                    <div className="space-y-1">
                      {dayContent.slice(0, 2).map(post => (
                        <div key={post.id} className={`text-xs p-1 rounded ${getPlatformColor(post.platform)} text-white truncate`}>
                          {post.title.slice(0, 20)}...
                        </div>
                      ))}
                      {dayContent.length > 2 && (
                        <div className="text-xs text-gray-500">+{dayContent.length - 2} more</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Bulk Actions */}
      <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">Bulk Actions:</span>
          <Button variant="outline" size="sm">Reschedule Selected</Button>
          <Button variant="outline" size="sm">Export Selected</Button>
          <Button variant="outline" size="sm">Delete Selected</Button>
        </div>
        
        <div className="text-sm text-gray-500">
          {contentPosts.filter(post => selectedPlatforms.includes(post.platform)).length} posts in current view
        </div>
      </div>
    </div>
  );
};

export default ContentCalendarTab;