
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Dashboard } from "@/components/Dashboard";
import { InventoryOverview } from "@/components/InventoryOverview";
import { Forecasts } from "@/components/Forecasts";
import { TransferSuggestions } from "@/components/TransferSuggestions";
import { MapView } from "@/components/MapView";
import { Settings } from "@/components/Settings";
import { Insights } from "@/components/Insights";
import { TransferHistory } from "@/components/TransferHistory";
import { SKUManagement } from "@/components/SKUManagement";
import { UserManagement } from "@/components/UserManagement";
import { MLSettings } from "@/components/MLSettings";
import { Alerts } from "@/components/Alerts";
import { useState } from "react";

const Index = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'inventory':
        return <InventoryOverview />;
      case 'forecasts':
        return <Forecasts />;
      case 'transfers':
        return <TransferSuggestions />;
      case 'insights':
        return <Insights />;
      case 'transfer-history':
        return <TransferHistory />;
      case 'sku-management':
        return <SKUManagement />;
      case 'user-management':
        return <UserManagement />;
      case 'ml-settings':
        return <MLSettings />;
      case 'alerts':
        return <Alerts />;
      case 'map':
        return <MapView />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar currentPage={currentPage} onPageChange={setCurrentPage} />
        <div className="flex-1 flex flex-col">
          <DashboardHeader currentPage={currentPage} />
          <main className="flex-1 overflow-auto">
            {renderPage()}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
