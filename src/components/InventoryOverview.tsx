
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Package, TrendingUp, TrendingDown, CheckCircle, Search, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const inventoryStats = [
  { title: "Total SKUs", value: "1,247", icon: Package, color: "blue" },
  { title: "Surplus SKUs", value: "156", icon: TrendingUp, color: "green" },
  { title: "Deficit SKUs", value: "89", icon: TrendingDown, color: "red" },
  { title: "Optimal Stock Level", value: "89%", icon: CheckCircle, color: "blue" }
];

const inventoryData = [
  { sku: "A123", productName: "Blue Cotton Shirt", currentStock: 30, minThreshold: 50, maxThreshold: 100, status: "deficit", category: "Apparel" },
  { sku: "B456", productName: "Denim Jeans", currentStock: 120, minThreshold: 80, maxThreshold: 150, status: "surplus", category: "Apparel" },
  { sku: "C789", productName: "White Sneakers", currentStock: 65, minThreshold: 60, maxThreshold: 90, status: "balanced", category: "Footwear" },
  { sku: "D012", productName: "Summer Dress", currentStock: 15, minThreshold: 40, maxThreshold: 80, status: "deficit", category: "Apparel" },
  { sku: "E345", productName: "Rain Jacket", currentStock: 95, minThreshold: 70, maxThreshold: 120, status: "surplus", category: "Outerwear" },
  { sku: "F678", productName: "Leather Boots", currentStock: 55, minThreshold: 50, maxThreshold: 80, status: "balanced", category: "Footwear" },
  { sku: "G901", productName: "Polo Shirt", currentStock: 25, minThreshold: 45, maxThreshold: 75, status: "deficit", category: "Apparel" },
  { sku: "H234", productName: "Winter Coat", currentStock: 110, minThreshold: 80, maxThreshold: 140, status: "surplus", category: "Outerwear" }
];

export function InventoryOverview() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [loadingStates, setLoadingStates] = useState<Record<number, boolean>>({});
  const { toast } = useToast();

  const filteredData = inventoryData.filter(item => {
    const matchesSearch = item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusBadge = (status: string, stock: number, min: number, max: number) => {
    const difference = status === "surplus" ? stock - max : status === "deficit" ? stock - min : 0;
    
    if (status === "surplus") {
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">+{Math.abs(difference)} Surplus</Badge>;
    } else if (status === "deficit") {
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">{difference} Deficit</Badge>;
    } else {
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Balanced</Badge>;
    }
  };

  const handleDetails = (item: any, index: number) => {
    setLoadingStates(prev => ({ ...prev, [index]: true }));
    
    setTimeout(() => {
      toast({
        title: "Product Details",
        description: `Viewing details for ${item.productName} (${item.sku})`,
      });
      setLoadingStates(prev => ({ ...prev, [index]: false }));
    }, 1000);
  };

  const handleAction = (item: any, index: number) => {
    setLoadingStates(prev => ({ ...prev, [index]: true }));
    
    setTimeout(() => {
      const action = item.status === "deficit" ? "Restock Request" : "Excess Stock Alert";
      toast({
        title: `${action} Initiated`,
        description: `${action} for ${item.productName} has been submitted`,
      });
      setLoadingStates(prev => ({ ...prev, [index]: false }));
    }, 1500);
  };

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Detailed inventory report is being generated",
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {inventoryStats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-xl ${
                  stat.color === 'blue' ? 'bg-blue-50' :
                  stat.color === 'green' ? 'bg-green-50' :
                  'bg-red-50'
                }`}>
                  <stat.icon className={`w-6 h-6 ${
                    stat.color === 'blue' ? 'text-blue-600' :
                    stat.color === 'green' ? 'text-green-600' :
                    'text-red-600'
                  }`} />
                </div>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.title}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <CardTitle className="text-lg font-semibold">Inventory Details</CardTitle>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search by SKU or product..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full sm:w-64"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="surplus">Surplus</SelectItem>
                  <SelectItem value="deficit">Deficit</SelectItem>
                  <SelectItem value="balanced">Balanced</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:w-32">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Apparel">Apparel</SelectItem>
                  <SelectItem value="Footwear">Footwear</SelectItem>
                  <SelectItem value="Outerwear">Outerwear</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" className="gap-2" onClick={handleExport}>
                <Filter className="w-4 h-4" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">SKU</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Product Name</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Current Stock</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Threshold</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredData.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4">
                      <span className="font-mono text-sm font-medium text-gray-900">{item.sku}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium text-gray-900">{item.productName}</div>
                      <div className="text-sm text-gray-500">{item.category}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-semibold text-gray-900">{item.currentStock}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm text-gray-600">
                        Min: {item.minThreshold}<br />
                        Max: {item.maxThreshold}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      {getStatusBadge(item.status, item.currentStock, item.minThreshold, item.maxThreshold)}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
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
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                            onClick={() => handleAction(item, index)}
                            disabled={loadingStates[index]}
                          >
                            {loadingStates[index] ? 'Processing...' : 
                             (item.status === 'deficit' ? 'Restock' : 'Report Excess')}
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
