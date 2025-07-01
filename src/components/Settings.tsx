
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Settings as SettingsIcon, Bell, Shield, Database, Palette } from "lucide-react";

export function Settings() {
  const { toast } = useToast();
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [settings, setSettings] = useState({
    companyName: "SmartStock Inc",
    email: "admin@smartstock.com",
    notifications: true,
    emailAlerts: false,
    darkMode: false,
    language: "en",
    timezone: "UTC",
    autoBackup: true
  });

  const handleSave = (section: string) => {
    setLoading(prev => ({ ...prev, [section]: true }));
    
    setTimeout(() => {
      toast({
        title: "Settings Saved",
        description: `${section} settings have been updated successfully`,
      });
      setLoading(prev => ({ ...prev, [section]: false }));
    }, 1500);
  };

  const handleReset = (section: string) => {
    toast({
      title: "Settings Reset",
      description: `${section} settings have been reset to defaults`,
      variant: "destructive",
    });
  };

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Configuration backup is being generated",
    });
  };

  const handleImport = () => {
    toast({
      title: "Import Ready",
      description: "Select a configuration file to import settings",
    });
  };

  const handleTestConnection = () => {
    setLoading(prev => ({ ...prev, database: true }));
    
    setTimeout(() => {
      toast({
        title: "Connection Test",
        description: "Database connection is healthy",
      });
      setLoading(prev => ({ ...prev, database: false }));
    }, 2000);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExport}>Export Config</Button>
          <Button variant="outline" onClick={handleImport}>Import Config</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SettingsIcon className="w-5 h-5" />
              General Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                value={settings.companyName}
                onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="email">Admin Email</Label>
              <Input
                id="email"
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="language">Language</Label>
              <Select value={settings.language} onValueChange={(value) => setSettings({ ...settings, language: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={() => handleSave('General')}
                disabled={loading.general}
              >
                {loading.general ? 'Saving...' : 'Save Changes'}
              </Button>
              <Button 
                variant="outline" 
                onClick={() => handleReset('General')}
              >
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="notifications">Push Notifications</Label>
              <Switch
                id="notifications"
                checked={settings.notifications}
                onCheckedChange={(checked) => setSettings({ ...settings, notifications: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="emailAlerts">Email Alerts</Label>
              <Switch
                id="emailAlerts"
                checked={settings.emailAlerts}
                onCheckedChange={(checked) => setSettings({ ...settings, emailAlerts: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="autoBackup">Auto Backup</Label>
              <Switch
                id="autoBackup"
                checked={settings.autoBackup}
                onCheckedChange={(checked) => setSettings({ ...settings, autoBackup: checked })}
              />
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={() => handleSave('Notifications')}
                disabled={loading.notifications}
              >
                {loading.notifications ? 'Saving...' : 'Save Changes'}
              </Button>
              <Button 
                variant="outline" 
                onClick={() => handleReset('Notifications')}
              >
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full">Change Password</Button>
            <Button variant="outline" className="w-full">Enable 2FA</Button>
            <Button variant="outline" className="w-full">View Login History</Button>
            <div className="flex gap-2">
              <Button 
                onClick={() => handleSave('Security')}
                disabled={loading.security}
              >
                {loading.security ? 'Saving...' : 'Save Changes'}
              </Button>
              <Button 
                variant="outline" 
                onClick={() => handleReset('Security')}
              >
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Database Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              Database
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              className="w-full"
              onClick={handleTestConnection}
              disabled={loading.database}
            >
              {loading.database ? 'Testing...' : 'Test Connection'}
            </Button>
            <Button variant="outline" className="w-full">Backup Database</Button>
            <Button variant="outline" className="w-full">Restore Database</Button>
            <div className="flex gap-2">
              <Button 
                onClick={() => handleSave('Database')}
                disabled={loading.database}
              >
                {loading.database ? 'Saving...' : 'Save Changes'}
              </Button>
              <Button 
                variant="outline" 
                onClick={() => handleReset('Database')}
              >
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
