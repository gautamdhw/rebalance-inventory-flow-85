
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { apiService } from '@/services/api';

interface FileUploadProps {
  title: string;
  description: string;
  uploadType: 'inventory' | 'sales';
  onUploadSuccess?: () => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ 
  title, 
  description, 
  uploadType,
  onUploadSuccess 
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === 'text/csv') {
      setFile(selectedFile);
    } else {
      toast({
        title: "Invalid File Type",
        description: "Please select a CSV file",
        variant: "destructive",
      });
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast({
        title: "No File Selected",
        description: "Please select a CSV file to upload",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      if (uploadType === 'inventory') {
        await apiService.uploadInventory(file);
      } else {
        await apiService.uploadSales(file);
      }

      toast({
        title: "Upload Successful",
        description: `${title} data has been uploaded successfully`,
      });

      setFile(null);
      const fileInput = document.getElementById(`file-${uploadType}`) as HTMLInputElement;
      if (fileInput) fileInput.value = '';

      onUploadSuccess?.();
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: error instanceof Error ? error.message : "Failed to upload file",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <FileText className="w-5 h-5" />
          <span>{title}</span>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor={`file-${uploadType}`}>Select CSV File</Label>
          <Input
            id={`file-${uploadType}`}
            type="file"
            accept=".csv"
            onChange={handleFileChange}
          />
        </div>
        {file && (
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <FileText className="w-4 h-4" />
            <span>{file.name}</span>
          </div>
        )}
        <Button 
          onClick={handleUpload} 
          disabled={!file || loading}
          className="w-full"
        >
          <Upload className="w-4 h-4 mr-2" />
          {loading ? 'Uploading...' : 'Upload File'}
        </Button>
      </CardContent>
    </Card>
  );
};
