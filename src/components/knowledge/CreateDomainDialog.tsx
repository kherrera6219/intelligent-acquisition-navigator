
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import type { KnowledgeDomainType } from "@/types/knowledge";

export const CreateDomainDialog = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [domainType, setDomainType] = useState<KnowledgeDomainType>("CORE");
  const [coordinates, setCoordinates] = useState("");
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from("knowledge_domains").insert({
        name,
        description,
        domain_type: domainType,
        coordinates,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Knowledge domain created successfully",
      });
      
      // Reset form and close dialog
      setName("");
      setDescription("");
      setDomainType("CORE");
      setCoordinates("");
      setOpen(false);
      
      // Refetch domains list
      queryClient.invalidateQueries({ queryKey: ["knowledge-domains"] });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create knowledge domain",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Domain
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create Knowledge Domain</DialogTitle>
            <DialogDescription>
              Add a new domain to the knowledge framework. Fill in the details below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter domain name"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter domain description"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="type">Domain Type</Label>
              <Select
                value={domainType}
                onValueChange={(value: KnowledgeDomainType) => setDomainType(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select domain type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CORE">Core</SelectItem>
                  <SelectItem value="SPECIALIZED">Specialized</SelectItem>
                  <SelectItem value="SUPPORT">Support</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="coordinates">Coordinates (Optional)</Label>
              <Input
                id="coordinates"
                value={coordinates}
                onChange={(e) => setCoordinates(e.target.value)}
                placeholder="Enter domain coordinates"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Domain"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
