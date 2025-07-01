
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Cog, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function MLSettings() {
  const { toast } = useToast();
  const [isRetraining, setIsRetraining] = useState(false);

  const handleUploadData = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv,.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        toast({
          title: "Training Data Uploaded",
          description: `${file.name} uploaded successfully. Model will be retrained with new data.`,
        });
      }
    };
    input.click();
  };

  const handleRetrainModel = async () => {
    setIsRetraining(true);
    
    // Simulate model retraining
    toast({
      title: "Model Retraining Started",
      description: "This process may take several minutes...",
    });

    setTimeout(() => {
      setIsRetraining(false);
      toast({
        title: "Model Retrained Successfully",
        description: "The forecasting model has been updated with the latest data.",
      });
    }, 3000);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">ML Settings</h1>
      </div>

      {/* Model Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">MAPE</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">12.3%</div>
            <p className="text-xs text-muted-foreground">Mean Absolute Percentage Error</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">RMSE</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.7</div>
            <p className="text-xs text-muted-foreground">Root Mean Square Error</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Last Retrained</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Jan 15</div>
            <p className="text-xs text-muted-foreground">2024</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Next Run</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Jan 22</div>
            <p className="text-xs text-muted-foreground">Scheduled</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Model Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-medium">Current Model:</span>
            <span>Prophet</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium">Forecast Horizon:</span>
            <span>30 days</span>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleUploadData}>
              <Upload className="w-4 h-4 mr-2" />
              Upload Training Data
            </Button>
            <Button 
              variant="outline" 
              onClick={handleRetrainModel}
              disabled={isRetraining}
            >
              {isRetraining ? "Retraining..." : "Retrain Model"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="text-center py-20">
        <Cog className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-600 mb-2">Advanced ML Configuration Coming Soon</h2>
        <p className="text-gray-500">Model selection, hyperparameter tuning, and A/B testing capabilities.</p>
      </div>
    </div>
  );
}
