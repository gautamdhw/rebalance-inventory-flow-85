
import { Bell, User, Menu, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";

interface DashboardHeaderProps {
  currentPage: string;
}

export function DashboardHeader({ currentPage }: DashboardHeaderProps) {
  const { toggleSidebar } = useSidebar();
  const { toast } = useToast();
  const { logout, storeId } = useAuth();
  const [notificationCount, setNotificationCount] = useState(3);

  const getPageTitle = (page: string) => {
    const titles: Record<string, string> = {
      dashboard: "Dashboard",
      inventory: "Inventory Overview",
      forecasts: "Forecasts",
      transfers: "Transfer Suggestions",
      map: "Map View",
      settings: "Settings"
    };
    return titles[page] || "Dashboard";
  };

  const getBreadcrumb = (page: string) => {
    return `Home / ${getPageTitle(page)}`;
  };

  const handleNotificationClick = () => {
    toast({
      title: "Notifications",
      description: `You have ${notificationCount} unread notifications`,
    });
    setNotificationCount(0);
  };

  const handleUserProfileClick = () => {
    toast({
      title: "User Profile",
      description: "Opening user profile settings...",
    });
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out",
      });
    } catch (error) {
      toast({
        title: "Logout Error",
        description: "Failed to logout properly",
        variant: "destructive",
      });
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className="p-2 hover:bg-gray-100"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </Button>
          
          <div>
            <nav className="text-sm text-gray-500 mb-1">
              {getBreadcrumb(currentPage)}
            </nav>
            <h1 className="text-2xl font-bold text-gray-900">
              {getPageTitle(currentPage)}
            </h1>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className="relative"
            onClick={handleNotificationClick}
          >
            <Bell className="w-5 h-5 text-gray-600" />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            )}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleUserProfileClick}
            className="flex items-center space-x-2 text-sm"
          >
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-gray-600" />
            </div>
            <span className="text-gray-700 font-medium">{storeId || 'Store Admin'}</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
