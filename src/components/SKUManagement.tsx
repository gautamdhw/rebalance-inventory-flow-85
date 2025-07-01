
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Archive, Plus, Upload, Search } from "lucide-react";
import { AddSKUModal } from "./AddSKUModal";
import { useToast } from "@/hooks/use-toast";

export function SKUManagement() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingSKU, setEditingSKU] = useState<any>(null);
  const [skus, setSkus] = useState([
    {
      id: "A123",
      name: "Blue Cotton Shirt",
      category: "Apparel",
      reorderPoint: 30,
      active: true
    },
    {
      id: "B456", 
      name: "Red Hoodie",
      category: "Apparel",
      reorderPoint: 25,
      active: true
    },
    {
      id: "C789",
      name: "White Sneakers",
      category: "Footwear",
      reorderPoint: 20,
      active: true
    }
  ]);

  const filteredSKUs = skus.filter(sku => 
    sku.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sku.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sku.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddSKU = (newSKU: any) => {
    if (editingSKU) {
      setSkus(prev => prev.map(sku => 
        sku.id === editingSKU.id ? { ...newSKU } : sku
      ));
      setEditingSKU(null);
    } else {
      setSkus(prev => [...prev, newSKU]);
    }
  };

  const handleEditSKU = (sku: any) => {
    setEditingSKU(sku);
    setShowAddModal(true);
  };

  const handleArchiveSKU = (skuId: string) => {
    setSkus(prev => prev.map(sku => 
      sku.id === skuId ? { ...sku, active: false } : sku
    ));
    toast({
      title: "SKU Archived",
      description: `SKU ${skuId} has been archived successfully`,
    });
  };

  const handleUploadCSV = () => {
    // Create a file input element
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        toast({
          title: "File Selected",
          description: `${file.name} selected for upload. CSV processing would be implemented here.`,
        });
      }
    };
    input.click();
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">SKU Management</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleUploadCSV}>
            <Upload className="w-4 h-4 mr-2" />
            Upload CSV
          </Button>
          <Button onClick={() => setShowAddModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add SKU
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <CardTitle>Product Catalog</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search SKUs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full sm:w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">SKU ID</th>
                  <th className="text-left py-2">Product Name</th>
                  <th className="text-left py-2">Category</th>
                  <th className="text-left py-2">Reorder Point</th>
                  <th className="text-left py-2">Status</th>
                  <th className="text-left py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSKUs.map((sku) => (
                  <tr key={sku.id} className="border-b">
                    <td className="py-3 font-mono">{sku.id}</td>
                    <td className="py-3">{sku.name}</td>
                    <td className="py-3">{sku.category}</td>
                    <td className="py-3">{sku.reorderPoint}</td>
                    <td className="py-3">
                      <Badge className={sku.active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                        {sku.active ? "✅ Active" : "❌ Inactive"}
                      </Badge>
                    </td>
                    <td className="py-3">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleEditSKU(sku)}>
                          Edit
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleArchiveSKU(sku.id)}
                          disabled={!sku.active}
                        >
                          Archive
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="text-center py-20">
        <Archive className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-600 mb-2">Advanced SKU Management Coming Soon</h2>
        <p className="text-gray-500">Bulk operations, detailed product views, and inventory tracking per SKU.</p>
      </div>

      <AddSKUModal
        open={showAddModal}
        onOpenChange={(open) => {
          setShowAddModal(open);
          if (!open) setEditingSKU(null);
        }}
        onSKUAdded={handleAddSKU}
        editingSKU={editingSKU}
      />
    </div>
  );
}
