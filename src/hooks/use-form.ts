
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm as useReactHookForm, type DefaultValues } from "react-hook-form";
import type { z } from "zod";
import { toast } from "@/components/ui/use-toast";

interface UseFormProps<T extends z.ZodType> {
  schema: T;
  defaultValues?: DefaultValues<z.infer<T>>; // Changed type to match react-hook-form expectations
  onSubmit: (data: z.infer<T>) => Promise<void> | void;
  showSuccessToast?: boolean;
  successMessage?: string;
}

export function useForm<T extends z.ZodType>({
  schema,
  defaultValues,
  onSubmit,
  showSuccessToast = true,
  successMessage = "Changes saved successfully",
}: UseFormProps<T>) {
  const form = useReactHookForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<z.infer<T>>, // Explicitly type the defaultValues
  });

  const handleSubmit = async (data: z.infer<T>) => {
    try {
      await onSubmit(data);
      if (showSuccessToast) {
        toast({
          title: "Success",
          description: successMessage,
        });
      }
      form.reset(data);
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return {
    ...form,
    handleSubmit: form.handleSubmit(handleSubmit),
  };
}
