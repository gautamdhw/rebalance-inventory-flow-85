import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Search, Filter } from "lucide-react";

const transferData = [
  {
    id: "T001",
    sku: "A123",
    fromStore: "NYC-05",
    toStore: "LA-West",
    fromLocation: "Warehouse A",
    toLocation: "Receiving Dock",
    quantity: 50,
    priority: "high",
    status: "pending",
  },
  {
    id: "T002",
    sku: "B456",
    fromStore: "Chicago-Loop",
    toStore: "Miami-Beach",
    fromLocation: "Storage Rack 3",
    toLocation: "Backroom",
    quantity: 30,
    priority: "medium",
    status: "approved",
  },
  {
    id: "T003",
    sku: "C789",
    fromStore: "Seattle-Pike",
    toStore: "Boston-North",
    fromLocation: "Shipping Area",
    toLocation: "Front Display",
    quantity: 20,
    priority: "low",
    status: "rejected",
  },
];

export function TransferSuggestions() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedTransfers, setSelectedTransfers] = useState<number[]>([]);
  const [loadingStates, setLoadingStates] = useState<Record<number, boolean>>({});
  const [bulkLoading, setBulkLoading] = useState(false);
  const { toast } = useToast();

  const filteredData = transferData.filter(transfer => {
    const matchesSearch =
      transfer.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transfer.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transfer.fromStore.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transfer.toStore.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || transfer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleView = (transfer: any, index: number) => {
    setLoadingStates(prev => ({ ...prev, [index]: true }));
    
    setTimeout(() => {
      toast({
        title: "Transfer Details",
        description: `Viewing details for transfer ${transfer.id}: ${transfer.quantity} units of ${transfer.sku}`,
      });
      setLoadingStates(prev => ({ ...prev, [index]: false }));
    }, 1000);
  };

  const handleApprove = (transfer: any, index: number) => {
    setLoadingStates(prev => ({ ...prev, [index]: true }));
    
    setTimeout(() => {
      toast({
        title: "Transfer Approved",
        description: `Transfer ${transfer.id} has been approved and will be processed`,
      });
      setLoadingStates(prev => ({ ...prev, [index]: false }));
    }, 1500);
  };

  const handleReject = (transfer: any, index: number) => {
    setLoadingStates(prev => ({ ...prev, [index]: true }));
    
    setTimeout(() => {
      toast({
        title: "Transfer Rejected",
        description: `Transfer ${transfer.id} has been rejected`,
        variant: "destructive",
      });
      setLoadingStates(prev => ({ ...prev, [index]: false }));
    }, 1500);
  };

  const handleBulkApprove = () => {
    if (selectedTransfers.length === 0) {
      toast({
        title: "No Transfers Selected",
        description: "Please select transfers to approve",
        variant: "destructive",
      });
      return;
    }

    setBulkLoading(true);
    
    setTimeout(() => {
      toast({
        title: "Bulk Approval Complete",
        description: `${selectedTransfers.length} transfers have been approved`,
      });
      setSelectedTransfers([]);
      setBulkLoading(false);
    }, 2000);
  };

  const toggleTransferSelection = (index: number) => {
    setSelectedTransfers(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const selectAllTransfers = () => {
    if (selectedTransfers.length === filteredData.length) {
      setSelectedTransfers([]);
    } else {
      setSelectedTransfers(filteredData.map((_, index) => index));
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Transfer Suggestions</h1>
        <Button variant="outline">Generate New Suggestions</Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <CardTitle>Transfer Requests</CardTitle>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search transfers..."
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
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                onClick={handleBulkApprove}
                disabled={selectedTransfers.length === 0 || bulkLoading}
                className="bg-green-600 hover:bg-green-700"
              >
                {bulkLoading ? 'Processing...' : `Bulk Approve (${selectedTransfers.length})`}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4">
                    <Checkbox
                      checked={selectedTransfers.length === filteredData.length && filteredData.length > 0}
                      onCheckedChange={selectAllTransfers}
                    />
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Transfer ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">SKU</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">From → To</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Quantity</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Priority</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredData.map((transfer, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4">
                      <Checkbox
                        checked={selectedTransfers.includes(index)}
                        onCheckedChange={() => toggleTransferSelection(index)}
                      />
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-mono text-sm font-medium">{transfer.id}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-mono text-sm">{transfer.sku}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <div className="text-sm font-medium">{transfer.fromStore} → {transfer.toStore}</div>
                        <div className="text-xs text-gray-500">{transfer.fromLocation} → {transfer.toLocation}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-semibold">{transfer.quantity} units</span>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={
                        transfer.priority === 'high' ? 'bg-red-100 text-red-800' :
                        transfer.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }>
                        {transfer.priority}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={
                        transfer.status === 'pending' ? 'bg-blue-100 text-blue-800' :
                        transfer.status === 'approved' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }>
                        {transfer.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleView(transfer, index)}
                          disabled={loadingStates[index]}
                        >
                          {loadingStates[index] ? 'Loading...' : 'View'}
                        </Button>
                        {transfer.status === 'pending' && (
                          <>
                            <Button 
                              size="sm" 
                              className="bg-green-600 hover:bg-green-700 text-white"
                              onClick={() => handleApprove(transfer, index)}
                              disabled={loadingStates[index]}
                            >
                              Approve
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="text-red-600 border-red-200 hover:bg-red-50"
                              onClick={() => handleReject(transfer, index)}
                              disabled={loadingStates[index]}
                            >
                              Reject
                            </Button>
                          </>
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
