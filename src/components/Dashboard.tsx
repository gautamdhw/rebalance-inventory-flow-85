
import { MetricsCards } from "@/components/MetricsCards";
import { ForecastChart } from "@/components/ForecastChart";
import { InventoryTable } from "@/components/InventoryTable";

export function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <MetricsCards />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ForecastChart />
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Stock vs Demand</h3>
          <div className="h-64 flex items-center justify-center text-gray-500">
            Bar Chart Component (Coming Soon)
          </div>
        </div>
      </div>
      <InventoryTable />
    </div>
  );
}
