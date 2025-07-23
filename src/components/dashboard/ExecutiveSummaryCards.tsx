import { TrendingUp, FileText, Edit3, BarChart3 } from "lucide-react";

const ExecutiveSummaryCards = () => {
  const cards = [
    {
      title: "Market Opportunities",
      value: "5 opportunities found",
      trend: "+23%",
      icon: TrendingUp,
      gradient: "from-emerald-500 to-teal-600",
      bgAccent: "from-emerald-50 to-emerald-100"
    },
    {
      title: "Strategy Components",
      value: "4-week roadmap created",
      trend: "Ready",
      icon: FileText,
      gradient: "from-purple-500 to-indigo-600",
      bgAccent: "from-purple-50 to-purple-100"
    },
    {
      title: "Content Generated",
      value: "24 posts ready",
      trend: "+48 ideas",
      icon: Edit3,
      gradient: "from-blue-500 to-cyan-600",
      bgAccent: "from-blue-50 to-blue-100"
    },
    {
      title: "Estimated ROI",
      value: "+340% potential reach",
      trend: "High confidence",
      icon: BarChart3,
      gradient: "from-amber-500 to-orange-600",
      bgAccent: "from-amber-50 to-amber-100"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={index}
            className={`relative overflow-hidden bg-gradient-to-br ${card.bgAccent} border border-white/20 rounded-2xl p-6 hover-scale transition-all duration-300 group cursor-pointer`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-600 mb-1">{card.title}</h3>
                <p className="text-2xl font-bold text-gray-900 mb-2">{card.value}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <TrendingUp className="w-3 h-3 mr-1 text-emerald-500" />
                  {card.trend}
                </div>
              </div>
              <div className={`w-12 h-12 bg-gradient-to-br ${card.gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
            </div>
            
            {/* Gradient overlay for hover effect */}
            <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
          </div>
        );
      })}
    </div>
  );
};

export default ExecutiveSummaryCards;