import { AlertTriangle, Target, TrendingUp } from "lucide-react";

const ProblemSolutionSection = () => {
  const problems = [
    {
      icon: AlertTriangle,
      title: "Generic Marketing Advice",
      description: "One-size-fits-all strategies that don't work for your specific business",
      color: "from-red-500 to-red-600"
    },
    {
      icon: Target,
      title: "Expensive Trial & Error",
      description: "Wasting thousands on campaigns without proper research and strategy",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: TrendingUp,
      title: "Slow Results",
      description: "Taking months to see what works while competitors move ahead",
      color: "from-yellow-500 to-yellow-600"
    }
  ];

  const solutions = [
    {
      icon: "🎯",
      title: "Hyper-Personalized Intelligence",
      description: "AI agents that understand your industry, audience, and unique value proposition",
      color: "from-primary to-primary-glow"
    },
    {
      icon: "⚡",
      title: "Proven Strategies First",
      description: "Research-backed recommendations that save you from costly mistakes",
      color: "from-secondary to-secondary-glow"
    },
    {
      icon: "🚀",
      title: "Rapid Implementation",
      description: "Get actionable insights and ready-to-use content in minutes, not months",
      color: "from-blue-500 to-purple-500"
    }
  ];

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-heading mb-6">
            Stop Playing Marketing Roulette
          </h2>
          <p className="text-xl text-body max-w-3xl mx-auto">
            Most businesses struggle with generic advice and expensive experiments. 
            Our AI trinity delivers personalized intelligence that actually works.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Problems Side */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-red-600 mb-6">❌ The Old Way</h3>
            {problems.map((problem, index) => (
              <div key={index} className="bg-red-50 border border-red-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${problem.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <problem.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{problem.title}</h4>
                    <p className="text-gray-600">{problem.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Solutions Side */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-secondary mb-6">✅ The Trinity Way</h3>
            {solutions.map((solution, index) => (
              <div key={index} className="glass-card p-6 hover:scale-105 hover:shadow-xl transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${solution.color} rounded-xl flex items-center justify-center flex-shrink-0 text-2xl`}>
                    {solution.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-heading mb-2">{solution.title}</h4>
                    <p className="text-body">{solution.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolutionSection;