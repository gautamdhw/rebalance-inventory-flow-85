
import { useState } from "react";
import { 
  BarChart3, 
  Package, 
  TrendingUp, 
  ArrowRightLeft, 
  MapPin, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Activity,
  History,
  Archive,
  Users,
  Bell,
  Cog
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const items = [
  { id: 'dashboard', title: "Dashboard", icon: BarChart3 },
  { id: 'inventory', title: "Inventory Overview", icon: Package },
  { id: 'forecasts', title: "Forecasts", icon: TrendingUp },
  { id: 'transfers', title: "Transfer Suggestions", icon: ArrowRightLeft },
  { id: 'insights', title: "Insights & Analytics", icon: Activity },
  { id: 'transfer-history', title: "Transfer History", icon: History },
  { id: 'sku-management', title: "SKU Management", icon: Archive },
  { id: 'user-management', title: "User Management", icon: Users },
  { id: 'ml-settings', title: "ML Settings", icon: Cog },
  { id: 'alerts', title: "Alerts & Notifications", icon: Bell },
  { id: 'map', title: "Map View", icon: MapPin },
  { id: 'settings', title: "Settings", icon: Settings },
];

interface AppSidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export function AppSidebar({ currentPage, onPageChange }: AppSidebarProps) {
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar className={`${isCollapsed ? "w-16" : "w-64"} transition-all duration-300 border-r border-gray-200 bg-white`}>
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-gray-900">SmartStock</span>
            </div>
          )}
          <button
            onClick={toggleSidebar}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4 text-gray-600" />
            ) : (
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      <SidebarContent className="py-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => onPageChange(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg mx-2 transition-all duration-200 ${
                      currentPage === item.id
                        ? "bg-blue-50 text-blue-700 border border-blue-200"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <item.icon className={`w-5 h-5 ${
                      currentPage === item.id ? "text-blue-600" : "text-gray-500"
                    }`} />
                    {!isCollapsed && <span className="font-medium">{item.title}</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
