import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CreditCard, 
  TrendingUp, 
  Calendar, 
  Download,
  Crown,
  Zap,
  Star
} from "lucide-react";

interface BillingUsageTabProps {
  userProfile: any;
}

const BillingUsageTab = ({ userProfile }: BillingUsageTabProps) => {
  const currentPlan = userProfile?.plan_type || "starter";
  const monthlyUsage = userProfile?.monthly_usage || {
    reports: 0,
    content_pieces: 0,
    api_costs: 0
  };

  const planLimits = {
    starter: { reports: 2, content_pieces: 50 },
    professional: { reports: 10, content_pieces: 200 },
    enterprise: { reports: -1, content_pieces: -1 } // unlimited
  };

  const currentLimits = planLimits[currentPlan as keyof typeof planLimits];

  const calculateProgress = (used: number, limit: number) => {
    if (limit === -1) return 0; // unlimited
    return Math.min((used / limit) * 100, 100);
  };

  const getProgressColor = (percentage: number) => {
    if (percentage < 70) return "bg-green-500";
    if (percentage < 90) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-heading mb-2">Billing & Usage</h2>
        <p className="text-muted-foreground">
          Manage your subscription and monitor your usage
        </p>
      </div>

      {/* Current Plan Overview */}
      <Card className="glass-card border-0 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Crown className="w-5 h-5 text-primary" />
              Current Plan
            </span>
            <Badge 
              variant="default" 
              className="bg-primary text-primary-foreground capitalize"
            >
              {currentPlan}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg">
              <div className="text-2xl font-bold text-heading">
                ${currentPlan === 'starter' ? '0' : currentPlan === 'professional' ? '49' : '149'}
              </div>
              <div className="text-sm text-muted-foreground">per month</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-lg">
              <div className="text-2xl font-bold text-heading">
                {currentLimits.reports === -1 ? '∞' : currentLimits.reports}
              </div>
              <div className="text-sm text-muted-foreground">Reports/month</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg">
              <div className="text-2xl font-bold text-heading">
                {currentLimits.content_pieces === -1 ? '∞' : currentLimits.content_pieces}
              </div>
              <div className="text-sm text-muted-foreground">Content pieces</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button className="bg-primary hover:bg-primary/90 shadow-button hover:scale-105 transition-all">
              <CreditCard className="w-4 h-4 mr-2" />
              Manage Billing
            </Button>
            {currentPlan !== 'enterprise' && (
              <Button variant="outline" className="hover:scale-105 transition-transform">
                <TrendingUp className="w-4 h-4 mr-2" />
                Upgrade Plan
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Usage Statistics */}
      <Card className="glass-card border-0 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            Monthly Usage
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Reports Usage */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium">Reports Generated</span>
                <span className="text-sm text-muted-foreground">
                  {monthlyUsage.reports}/{currentLimits.reports === -1 ? '∞' : currentLimits.reports}
                </span>
              </div>
              <Progress 
                value={calculateProgress(monthlyUsage.reports, currentLimits.reports)} 
                className="h-2"
              />
              <div className="text-xs text-muted-foreground">
                {currentLimits.reports === -1 
                  ? 'Unlimited usage' 
                  : `${currentLimits.reports - monthlyUsage.reports} remaining`
                }
              </div>
            </div>

            {/* Content Pieces Usage */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium">Content Pieces</span>
                <span className="text-sm text-muted-foreground">
                  {monthlyUsage.content_pieces}/{currentLimits.content_pieces === -1 ? '∞' : currentLimits.content_pieces}
                </span>
              </div>
              <Progress 
                value={calculateProgress(monthlyUsage.content_pieces, currentLimits.content_pieces)} 
                className="h-2"
              />
              <div className="text-xs text-muted-foreground">
                {currentLimits.content_pieces === -1 
                  ? 'Unlimited usage' 
                  : `${currentLimits.content_pieces - monthlyUsage.content_pieces} remaining`
                }
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <div className="flex justify-between items-center">
              <span className="font-medium">API Costs This Month</span>
              <span className="text-lg font-bold text-primary">
                ${monthlyUsage.api_costs?.toFixed(2) || '0.00'}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Plan Comparison */}
      <Card className="glass-card border-0 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-primary" />
            Plan Comparison
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Starter Plan */}
            <div className={`p-6 rounded-lg border-2 transition-all hover:scale-105 ${
              currentPlan === 'starter' 
                ? 'border-primary bg-primary/5 shadow-button' 
                : 'border-border hover:border-primary/50'
            }`}>
              <div className="text-center">
                <h3 className="text-lg font-bold mb-2">Starter</h3>
                <div className="text-3xl font-bold mb-4">$0</div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>✓ 2 Reports/month</li>
                  <li>✓ 50 Content pieces</li>
                  <li>✓ Basic analytics</li>
                  <li>✓ Email support</li>
                </ul>
                {currentPlan === 'starter' && (
                  <Badge className="mt-4 bg-primary text-primary-foreground">Current Plan</Badge>
                )}
              </div>
            </div>

            {/* Professional Plan */}
            <div className={`p-6 rounded-lg border-2 transition-all hover:scale-105 ${
              currentPlan === 'professional' 
                ? 'border-primary bg-primary/5 shadow-button' 
                : 'border-border hover:border-primary/50'
            }`}>
              <div className="text-center">
                <h3 className="text-lg font-bold mb-2">Professional</h3>
                <div className="text-3xl font-bold mb-4">$49</div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>✓ 10 Reports/month</li>
                  <li>✓ 200 Content pieces</li>
                  <li>✓ Advanced analytics</li>
                  <li>✓ Priority support</li>
                </ul>
                {currentPlan === 'professional' ? (
                  <Badge className="mt-4 bg-primary text-primary-foreground">Current Plan</Badge>
                ) : (
                  <Button className="mt-4 w-full">Upgrade</Button>
                )}
              </div>
            </div>

            {/* Enterprise Plan */}
            <div className={`p-6 rounded-lg border-2 transition-all hover:scale-105 ${
              currentPlan === 'enterprise' 
                ? 'border-primary bg-primary/5 shadow-button' 
                : 'border-border hover:border-primary/50'
            }`}>
              <div className="text-center">
                <h3 className="text-lg font-bold mb-2">Enterprise</h3>
                <div className="text-3xl font-bold mb-4">$149</div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>✓ Unlimited reports</li>
                  <li>✓ Unlimited content</li>
                  <li>✓ Custom integrations</li>
                  <li>✓ Dedicated support</li>
                </ul>
                {currentPlan === 'enterprise' ? (
                  <Badge className="mt-4 bg-primary text-primary-foreground">Current Plan</Badge>
                ) : (
                  <Button className="mt-4 w-full">Upgrade</Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Billing History */}
      <Card className="glass-card border-0 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Billing History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div>
                <div className="font-medium">No invoices yet</div>
                <div className="text-sm text-muted-foreground">
                  Your billing history will appear here
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BillingUsageTab;