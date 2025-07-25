import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Users, Activity, Zap } from "lucide-react";

interface InteractiveAgentCardProps {
  icon: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  gradient: string;
  onTryAgent: () => void;
  isLoggedIn?: boolean;
  liveMetrics?: {
    activeUsers: number;
    reportsToday: number;
    avgProcessingTime: string;
  };
}

const InteractiveAgentCard = ({ 
  icon, 
  name, 
  tagline, 
  description, 
  features, 
  gradient, 
  onTryAgent,
  isLoggedIn = false,
  liveMetrics = {
    activeUsers: Math.floor(Math.random() * 50) + 10,
    reportsToday: Math.floor(Math.random() * 500) + 100,
    avgProcessingTime: "2.3s"
  }
}: InteractiveAgentCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="glass-card p-8 hover:scale-105 transition-all duration-300 group relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Live Status Indicator */}
      <div className="absolute top-4 right-4">
        <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></div>
          Live
        </Badge>
      </div>

      {/* Agent Icon with Animation */}
      <div className={`w-16 h-16 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center mb-6 text-3xl transition-all duration-300 ${isHovered ? 'animate-float' : ''}`}>
        {icon}
      </div>
      
      <h3 className="text-2xl font-bold text-heading mb-2">{name}</h3>
      <p className="text-primary font-semibold mb-4">{tagline}</p>
      <p className="text-body mb-6">{description}</p>
      
      {/* Features List */}
      <ul className="space-y-3 mb-6">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-center text-sm text-body">
            <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0"></div>
            {feature}
          </li>
        ))}
      </ul>

      {/* Live Metrics */}
      <div className="grid grid-cols-3 gap-2 mb-6 text-xs">
        <div className="text-center p-2 bg-white/40 rounded-lg">
          <Users className="w-3 h-3 mx-auto mb-1 text-blue-500" />
          <div className="font-semibold">{liveMetrics.activeUsers}</div>
          <div className="text-muted-foreground">active</div>
        </div>
        <div className="text-center p-2 bg-white/40 rounded-lg">
          <Activity className="w-3 h-3 mx-auto mb-1 text-green-500" />
          <div className="font-semibold">{liveMetrics.reportsToday}</div>
          <div className="text-muted-foreground">today</div>
        </div>
        <div className="text-center p-2 bg-white/40 rounded-lg">
          <Zap className="w-3 h-3 mx-auto mb-1 text-yellow-500" />
          <div className="font-semibold">{liveMetrics.avgProcessingTime}</div>
          <div className="text-muted-foreground">avg time</div>
        </div>
      </div>

      {/* Interactive CTA */}
      <Button 
        onClick={onTryAgent}
        className={`w-full transition-all duration-300 ${
          isLoggedIn 
            ? 'btn-gradient' 
            : 'bg-white/60 hover:bg-white/80 text-gray-700 border border-white/40'
        }`}
        size="lg"
      >
        <Play className="w-4 h-4 mr-2" />
        {isLoggedIn ? `Launch ${name}` : `Try ${name} Demo`}
      </Button>

      {/* Processing Animation Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`}></div>
    </div>
  );
};

export default InteractiveAgentCard;