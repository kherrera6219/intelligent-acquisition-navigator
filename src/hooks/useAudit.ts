
import { useQuery, useMutation } from '@tanstack/react-query';
import { auditLogger, type AuditLog, type AuditLogPayload } from '@/lib/audit';
import { useToast } from './use-toast';

export const useAuditLogs = (filters?: Partial<AuditLog>) => {
  return useQuery({
    queryKey: ['auditLogs', filters],
    queryFn: () => auditLogger.getAuditLogs(filters),
    // Don't show errors for missing API
    retry: false,
    useErrorBoundary: false
  });
};

export const useCreateAuditLog = () => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: (payload: AuditLogPayload) => auditLogger.log(payload),
    onError: (error) => {
      // Only show toast for unexpected errors
      if (!(error instanceof Error && error.message.includes('API not available'))) {
        toast({
          title: 'Audit Log Error',
          description: 'Failed to create audit log entry',
          variant: 'destructive',
        });
        console.error('Audit log error:', error);
      }
    },
  });
};
