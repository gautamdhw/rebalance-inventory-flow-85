
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Navigation } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export function MapView() {
  const { toast } = useToast();
  const [trackingStates, setTrackingStates] = useState<Record<string, boolean>>({});

  const transfers = [
    { id: "T001", from: "NYC Store", to: "Boston Store", status: "in-transit", sku: "A123", eta: "2 hours" },
    { id: "T002", from: "LA Store", to: "SF Store", status: "pending", sku: "B456", eta: "4 hours" },
    { id: "T003", from: "Chicago Store", to: "Detroit Store", status: "delivered", sku: "C789", eta: "Completed" }
  ];

  const handleTrack = (transferId: string) => {
    setTrackingStates(prev => ({ ...prev, [transferId]: true }));
    
    setTimeout(() => {
      toast({
        title: "Transfer Tracking",
        description: `Tracking details for transfer ${transferId} have been updated`,
      });
      setTrackingStates(prev => ({ ...prev, [transferId]: false }));
    }, 1500);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'in-transit':
        return <Badge className="bg-blue-100 text-blue-800">🚛 In Transit</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">⏳ Pending</Badge>;
      case 'delivered':
        return <Badge className="bg-green-100 text-green-800">✅ Delivered</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Map View</h1>
        <Button variant="outline" className="gap-2">
          <Navigation className="w-4 h-4" />
          Refresh Location
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Store Locations & Transfers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">Interactive Map Coming Soon</h3>
                <p className="text-gray-500">Real-time store locations, transfer routes, and delivery tracking</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Transfers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transfers.map((transfer) => (
                <div key={transfer.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-sm font-medium">{transfer.id}</span>
                    {getStatusBadge(transfer.status)}
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    <div>{transfer.from} → {transfer.to}</div>
                    <div>SKU: {transfer.sku}</div>
                    <div>ETA: {transfer.eta}</div>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full gap-2"
                    onClick={() => handleTrack(transfer.id)}
                    disabled={trackingStates[transfer.id]}
                  >
                    <MapPin className="w-3 h-3" />
                    {trackingStates[transfer.id] ? 'Tracking...' : 'Track'}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
