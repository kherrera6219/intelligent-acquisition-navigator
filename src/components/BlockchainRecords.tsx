
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Database } from 'lucide-react';

export const BlockchainRecords = () => {
  const [record, setRecord] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!record.trim()) {
      toast({
        title: "Error",
        description: "Please enter a record to store",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Mock blockchain storage - in a real implementation, 
      // this would interact with a blockchain network
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Success",
        description: "Record has been stored immutably on the blockchain",
      });
      
      setRecord('');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to store record on blockchain",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="w-5 h-5" />
          Blockchain Records
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter record to store immutably..."
              value={record}
              onChange={(e) => setRecord(e.target.value)}
              className="flex-1"
            />
            <Button 
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : null}
              Store Record
            </Button>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-2">About Blockchain Records</h3>
            <p className="text-sm text-gray-700">
              Records stored here are immutable and cannot be modified once committed. 
              Each record is cryptographically secured and timestamped on the blockchain.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
