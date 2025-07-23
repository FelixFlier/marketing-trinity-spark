import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { 
  Bell, 
  Mail, 
  Smartphone, 
  Clock,
  Volume2,
  Search,
  Save,
  X
} from "lucide-react";

const NotificationsTab = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  
  const [notifications, setNotifications] = useState({
    // Email Notifications
    reportCompletion: true,
    reportFrequency: "immediate",
    weeklyPerformance: true,
    weeklyDay: "monday",
    monthlyUpdates: true,
    billingNotifications: true,
    marketingUpdates: false,
    
    // In-App Notifications
    processingUpdates: true,
    featureAnnouncements: true,
    usageLimitWarnings: true,
    usageThreshold: 80,
    performanceInsights: true,
    insightFrequency: "weekly",
    
    // Browser Notifications
    browserNotifications: false,
    notificationSound: true,
    doNotDisturbStart: "22:00",
    doNotDisturbEnd: "08:00",
    criticalOnly: false
  });

  const [notificationHistory] = useState([
    {
      id: 1,
      title: "Report Generated Successfully",
      message: "Your marketing intelligence report is ready for review",
      timestamp: "2 hours ago",
      read: false,
      type: "success"
    },
    {
      id: 2,
      title: "Usage Limit Warning",
      message: "You've used 85% of your monthly content generation limit",
      timestamp: "1 day ago",
      read: true,
      type: "warning"
    },
    {
      id: 3,
      title: "New Feature Available",
      message: "Try our new AI-powered competitor analysis tool",
      timestamp: "3 days ago",
      read: true,
      type: "info"
    }
  ]);

  const handleNotificationChange = (key: string, value: any) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const requestBrowserPermission = async () => {
    if ("Notification" in window) {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        handleNotificationChange("browserNotifications", true);
        toast({
          title: "Browser notifications enabled",
          description: "You'll now receive browser notifications for important updates.",
        });
      } else {
        toast({
          title: "Permission denied",
          description: "Please enable notifications in your browser settings.",
          variant: "destructive",
        });
      }
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setHasChanges(false);
      toast({
        title: "Notification preferences saved",
        description: "Your notification settings have been updated.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save notification preferences.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDiscard = () => {
    setHasChanges(false);
  };

  const getNotificationTypeColor = (type: string) => {
    switch (type) {
      case "success": return "bg-green-100 text-green-800 border-green-200";
      case "warning": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "info": return "bg-blue-100 text-blue-800 border-blue-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-heading mb-2">Notifications</h2>
        <p className="text-muted-foreground">
          Manage how and when you receive notifications
        </p>
      </div>

      {/* Email Notifications */}
      <Card className="glass-card border-0 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-primary" />
            Email Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Report Completion Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified when your reports are ready
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Select
                  value={notifications.reportFrequency}
                  onValueChange={(value) => handleNotificationChange("reportFrequency", value)}
                  disabled={!notifications.reportCompletion}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">Immediate</SelectItem>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                  </SelectContent>
                </Select>
                <Switch
                  checked={notifications.reportCompletion}
                  onCheckedChange={(checked) => handleNotificationChange("reportCompletion", checked)}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Weekly Performance Summaries</Label>
                <p className="text-sm text-muted-foreground">
                  Receive weekly insights and performance data
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Select
                  value={notifications.weeklyDay}
                  onValueChange={(value) => handleNotificationChange("weeklyDay", value)}
                  disabled={!notifications.weeklyPerformance}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monday">Monday</SelectItem>
                    <SelectItem value="tuesday">Tuesday</SelectItem>
                    <SelectItem value="wednesday">Wednesday</SelectItem>
                    <SelectItem value="thursday">Thursday</SelectItem>
                    <SelectItem value="friday">Friday</SelectItem>
                  </SelectContent>
                </Select>
                <Switch
                  checked={notifications.weeklyPerformance}
                  onCheckedChange={(checked) => handleNotificationChange("weeklyPerformance", checked)}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Monthly Strategy Updates</Label>
                <p className="text-sm text-muted-foreground">
                  Monthly insights and strategy recommendations
                </p>
              </div>
              <Switch
                checked={notifications.monthlyUpdates}
                onCheckedChange={(checked) => handleNotificationChange("monthlyUpdates", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Billing and Account Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Important billing and account updates
                </p>
              </div>
              <Switch
                checked={notifications.billingNotifications}
                onCheckedChange={(checked) => handleNotificationChange("billingNotifications", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Marketing and Product Updates</Label>
                <p className="text-sm text-muted-foreground">
                  News about new features and company updates
                </p>
              </div>
              <Switch
                checked={notifications.marketingUpdates}
                onCheckedChange={(checked) => handleNotificationChange("marketingUpdates", checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* In-App Notifications */}
      <Card className="glass-card border-0 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-primary" />
            In-App Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Processing Status Updates</Label>
                <p className="text-sm text-muted-foreground">
                  Real-time updates on report generation
                </p>
              </div>
              <Switch
                checked={notifications.processingUpdates}
                onCheckedChange={(checked) => handleNotificationChange("processingUpdates", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>New Feature Announcements</Label>
                <p className="text-sm text-muted-foreground">
                  Be the first to know about new features
                </p>
              </div>
              <Switch
                checked={notifications.featureAnnouncements}
                onCheckedChange={(checked) => handleNotificationChange("featureAnnouncements", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Usage Limit Warnings</Label>
                <p className="text-sm text-muted-foreground">
                  Get warned when approaching usage limits
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    value={notifications.usageThreshold}
                    onChange={(e) => handleNotificationChange("usageThreshold", parseInt(e.target.value))}
                    className="w-16"
                    min="50"
                    max="95"
                    disabled={!notifications.usageLimitWarnings}
                  />
                  <span className="text-sm text-muted-foreground">%</span>
                </div>
                <Switch
                  checked={notifications.usageLimitWarnings}
                  onCheckedChange={(checked) => handleNotificationChange("usageLimitWarnings", checked)}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Performance Insights</Label>
                <p className="text-sm text-muted-foreground">
                  Actionable insights based on your data
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Select
                  value={notifications.insightFrequency}
                  onValueChange={(value) => handleNotificationChange("insightFrequency", value)}
                  disabled={!notifications.performanceInsights}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
                <Switch
                  checked={notifications.performanceInsights}
                  onCheckedChange={(checked) => handleNotificationChange("performanceInsights", checked)}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Browser Notifications */}
      <Card className="glass-card border-0 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-primary" />
            Browser Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Enable Browser Push Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications even when the app is closed
                </p>
              </div>
              {notifications.browserNotifications ? (
                <Switch
                  checked={notifications.browserNotifications}
                  onCheckedChange={(checked) => handleNotificationChange("browserNotifications", checked)}
                />
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={requestBrowserPermission}
                  className="hover:scale-105 transition-transform"
                >
                  Enable
                </Button>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Notification Sound</Label>
                <p className="text-sm text-muted-foreground">
                  Play sound with notifications
                </p>
              </div>
              <Switch
                checked={notifications.notificationSound}
                onCheckedChange={(checked) => handleNotificationChange("notificationSound", checked)}
                disabled={!notifications.browserNotifications}
              />
            </div>

            <div className="space-y-3">
              <Label>Do Not Disturb Hours</Label>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Label className="text-sm">From</Label>
                  <Input
                    type="time"
                    value={notifications.doNotDisturbStart}
                    onChange={(e) => handleNotificationChange("doNotDisturbStart", e.target.value)}
                    className="w-24"
                    disabled={!notifications.browserNotifications}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Label className="text-sm">To</Label>
                  <Input
                    type="time"
                    value={notifications.doNotDisturbEnd}
                    onChange={(e) => handleNotificationChange("doNotDisturbEnd", e.target.value)}
                    className="w-24"
                    disabled={!notifications.browserNotifications}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Critical Notifications Only</Label>
                <p className="text-sm text-muted-foreground">
                  Only receive urgent notifications
                </p>
              </div>
              <Switch
                checked={notifications.criticalOnly}
                onCheckedChange={(checked) => handleNotificationChange("criticalOnly", checked)}
                disabled={!notifications.browserNotifications}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification History */}
      <Card className="glass-card border-0 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Notification History
            </span>
            <Button variant="outline" size="sm">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notificationHistory.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg border transition-all hover:scale-[1.02] ${
                  notification.read 
                    ? "bg-muted/30 border-border" 
                    : "bg-primary/5 border-primary/20"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className={`font-medium ${notification.read ? "text-muted-foreground" : "text-heading"}`}>
                        {notification.title}
                      </h4>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getNotificationTypeColor(notification.type)}`}
                      >
                        {notification.type}
                      </Badge>
                    </div>
                    <p className={`text-sm ${notification.read ? "text-muted-foreground" : "text-body"}`}>
                      {notification.message}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {notification.timestamp}
                    </p>
                  </div>
                  {!notification.read && (
                    <div className="w-2 h-2 bg-primary rounded-full ml-4 mt-2"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-between items-center mt-6 pt-4 border-t border-border">
            <Button variant="outline" size="sm">
              Mark All as Read
            </Button>
            <Button variant="outline" size="sm">
              Clear All Notifications
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Save Changes Bar */}
      {hasChanges && (
        <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-border p-4 z-50">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              You have unsaved changes
            </p>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={handleDiscard}
                className="hover:scale-105 transition-transform"
              >
                <X className="w-4 h-4 mr-2" />
                Discard
              </Button>
              <Button
                onClick={handleSave}
                disabled={isLoading}
                className="bg-primary hover:bg-primary/90 shadow-button hover:scale-105 transition-all"
              >
                <Save className="w-4 h-4 mr-2" />
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsTab;