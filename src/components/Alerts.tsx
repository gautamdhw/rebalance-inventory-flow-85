
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, AlertTriangle, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export function Alerts() {
  const { toast } = useToast();
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: "warning",
      title: "Low Stock Alert",
      description: "Store NYC-05 has only 5 units of SKU A123",
      timestamp: "2 minutes ago",
      sku: "A123"
    },
    {
      id: 2,
      type: "info", 
      title: "Transfer Pending",
      description: "Transfer from LA-08 to SF-15 awaiting approval",
      timestamp: "1 hour ago",
      sku: "B456"
    }
  ]);

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'error':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default:
        return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  const getAlertBadge = (type: string) => {
    switch (type) {
      case 'warning':
        return <Badge className="bg-yellow-100 text-yellow-800">⚠️ Warning</Badge>;
      case 'error':
        return <Badge className="bg-red-100 text-red-800">🚨 Critical</Badge>;
      default:
        return <Badge className="bg-blue-100 text-blue-800">ℹ️ Info</Badge>;
    }
  };

  const handleView = (alert: any) => {
    toast({
      title: "Alert Details",
      description: `Viewing full details for alert: ${alert.title}`,
    });
  };

  const handleDismiss = (alertId: number) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
    toast({
      title: "Alert Dismissed",
      description: "Alert has been removed from your notifications",
    });
  };

  const handleMarkAllRead = () => {
    toast({
      title: "All Alerts Marked as Read",
      description: "All notifications have been marked as read",
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Alerts & Notifications</h1>
        <Button variant="outline" onClick={handleMarkAllRead}>Mark All Read</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div key={alert.id} className="flex items-start space-x-3 p-4 border rounded-lg">
                {getAlertIcon(alert.type)}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium">{alert.title}</h3>
                    {getAlertBadge(alert.type)}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{alert.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{alert.timestamp}</span>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleView(alert)}
                      >
                        View
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleDismiss(alert.id)}
                      >
                        Dismiss
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="text-center py-20">
        <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-600 mb-2">Advanced Alert System Coming Soon</h2>
        <p className="text-gray-500">Custom thresholds, email notifications, and alert escalation workflows.</p>
      </div>
    </div>
  );
}
