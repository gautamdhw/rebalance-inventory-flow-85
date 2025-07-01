
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface AddSKUModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSKUAdded: (sku: any) => void;
  editingSKU?: any;
}

export function AddSKUModal({ open, onOpenChange, onSKUAdded, editingSKU }: AddSKUModalProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    id: editingSKU?.id || "",
    name: editingSKU?.name || "",
    category: editingSKU?.category || "",
    reorderPoint: editingSKU?.reorderPoint || 30,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.id || !formData.name || !formData.category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const newSKU = {
      id: formData.id,
      name: formData.name,
      category: formData.category,
      reorderPoint: formData.reorderPoint,
      active: true,
    };

    onSKUAdded(newSKU);
    
    toast({
      title: "Success",
      description: editingSKU ? "SKU updated successfully" : "SKU added successfully",
    });

    onOpenChange(false);
    setFormData({ id: "", name: "", category: "", reorderPoint: 30 });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{editingSKU ? "Edit SKU" : "Add New SKU"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="id">SKU ID *</Label>
            <Input
              id="id"
              value={formData.id}
              onChange={(e) => setFormData({ ...formData, id: e.target.value })}
              placeholder="e.g., A123"
              disabled={!!editingSKU}
            />
          </div>
          <div>
            <Label htmlFor="name">Product Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Blue Cotton Shirt"
            />
          </div>
          <div>
            <Label htmlFor="category">Category *</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Apparel">Apparel</SelectItem>
                <SelectItem value="Footwear">Footwear</SelectItem>
                <SelectItem value="Outerwear">Outerwear</SelectItem>
                <SelectItem value="Accessories">Accessories</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="reorderPoint">Reorder Point</Label>
            <Input
              id="reorderPoint"
              type="number"
              value={formData.reorderPoint}
              onChange={(e) => setFormData({ ...formData, reorderPoint: parseInt(e.target.value) })}
              min="1"
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {editingSKU ? "Update SKU" : "Add SKU"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
