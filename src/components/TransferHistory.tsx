
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { History } from "lucide-react";

export function TransferHistory() {
  const transfers = [
    {
      id: "T001",
      date: "2024-01-20",
      fromStore: "NYC-05",
      toStore: "BOS-12", 
      sku: "A123",
      quantity: 40,
      status: "completed",
      approvedBy: "admin1"
    },
    {
      id: "T002", 
      date: "2024-01-19",
      fromStore: "LA-08",
      toStore: "SF-15",
      sku: "B456",
      quantity: 25,
      status: "in-transit",
      approvedBy: "admin2"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">✅ Completed</Badge>;
      case 'in-transit':
        return <Badge className="bg-blue-100 text-blue-800">🚚 In Transit</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800">❌ Cancelled</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">⏳ Pending</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Transfer History</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transfers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Date</th>
                  <th className="text-left py-2">From Store</th>
                  <th className="text-left py-2">To Store</th>
                  <th className="text-left py-2">SKU</th>
                  <th className="text-left py-2">Qty</th>
                  <th className="text-left py-2">Status</th>
                  <th className="text-left py-2">Approved By</th>
                </tr>
              </thead>
              <tbody>
                {transfers.map((transfer) => (
                  <tr key={transfer.id} className="border-b">
                    <td className="py-3">{transfer.date}</td>
                    <td className="py-3">{transfer.fromStore}</td>
                    <td className="py-3">{transfer.toStore}</td>
                    <td className="py-3">{transfer.sku}</td>
                    <td className="py-3">{transfer.quantity}</td>
                    <td className="py-3">{getStatusBadge(transfer.status)}</td>
                    <td className="py-3">{transfer.approvedBy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="text-center py-20">
        <History className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-600 mb-2">Full Transfer History Coming Soon</h2>
        <p className="text-gray-500">Complete audit trail with filtering, search, and export capabilities.</p>
      </div>
    </div>
  );
}
