
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const inventoryData = [
  {
    storeId: "#301",
    storeName: "NYC-5thAve",
    sku: "A12",
    stockLevel: 150,
    forecast: 80,
    status: "surplus",
    difference: 70
  },
  {
    storeId: "#107",
    storeName: "LA-Market",
    sku: "A12", 
    stockLevel: 10,
    forecast: 60,
    status: "deficit",
    difference: -50
  },
  {
    storeId: "#205",
    storeName: "Chicago-Loop",
    sku: "B34",
    stockLevel: 95,
    forecast: 90,
    status: "balanced",
    difference: 5
  },
  {
    storeId: "#143",
    storeName: "Miami-Beach",
    sku: "C56",
    stockLevel: 25,
    forecast: 75,
    status: "deficit",
    difference: -50
  },
  {
    storeId: "#089",
    storeName: "Seattle-Pike",
    sku: "D78",
    stockLevel: 180,
    forecast: 120,
    status: "surplus",
    difference: 60
  }
];

export function InventoryTable() {
  const { toast } = useToast();
  const [loadingStates, setLoadingStates] = useState<Record<number, boolean>>({});

  const handleDetails = (item: any, index: number) => {
    setLoadingStates(prev => ({ ...prev, [index]: true }));
    
    setTimeout(() => {
      toast({
        title: "Item Details",
        description: `Viewing details for ${item.sku} at ${item.storeName}`,
      });
      setLoadingStates(prev => ({ ...prev, [index]: false }));
    }, 1000);
  };

  const handleTransferAction = (item: any, index: number) => {
    setLoadingStates(prev => ({ ...prev, [index]: true }));
    
    setTimeout(() => {
      const action = item.status === 'deficit' ? 'Transfer Request' : 'Transfer Suggestion';
      toast({
        title: `${action} Created`,
        description: `${action} for ${item.sku} has been submitted for review`,
      });
      setLoadingStates(prev => ({ ...prev, [index]: false }));
    }, 1500);
  };

  const handleFilter = () => {
    toast({
      title: "Filter Applied",
      description: "Inventory filters have been updated",
    });
  };

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Inventory data is being exported to CSV",
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Inventory Overview</h3>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={handleFilter}>Filter</Button>
            <Button variant="outline" size="sm" onClick={handleExport}>Export</Button>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-700">Store</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-700">SKU</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-700">Stock Level</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-700">Forecast</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-700">Status</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {inventoryData.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6">
                  <div>
                    <div className="font-medium text-gray-900">{item.storeName}</div>
                    <div className="text-sm text-gray-500">{item.storeId}</div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className="font-mono text-sm font-medium text-gray-900">{item.sku}</span>
                </td>
                <td className="py-4 px-6">
                  <span className="font-semibold text-gray-900">{item.stockLevel}</span>
                </td>
                <td className="py-4 px-6">
                  <span className="text-gray-700">{item.forecast}</span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant={
                        item.status === 'surplus' ? 'default' :
                        item.status === 'deficit' ? 'destructive' :
                        'secondary'
                      }
                      className={
                        item.status === 'surplus' ? 'bg-green-100 text-green-800 hover:bg-green-100' :
                        item.status === 'deficit' ? 'bg-red-100 text-red-800 hover:bg-red-100' :
                        'bg-blue-100 text-blue-800 hover:bg-blue-100'
                      }
                    >
                      {item.status === 'surplus' ? `+${item.difference} Surplus` :
                       item.status === 'deficit' ? `${item.difference} Deficit` :
                       'Balanced'}
                    </Badge>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDetails(item, index)}
                      disabled={loadingStates[index]}
                    >
                      {loadingStates[index] ? 'Loading...' : 'Details'}
                    </Button>
                    {item.status !== 'balanced' && (
                      <Button 
                        size="sm"
                        className={
                          item.status === 'deficit' 
                            ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                            : 'bg-green-600 hover:bg-green-700 text-white'
                        }
                        onClick={() => handleTransferAction(item, index)}
                        disabled={loadingStates[index]}
                      >
                        {loadingStates[index] ? 'Processing...' : 
                         (item.status === 'deficit' ? 'Request Transfer' : 'Suggest Transfer')}
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
