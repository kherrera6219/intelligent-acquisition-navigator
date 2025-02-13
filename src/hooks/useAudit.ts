
import { useQuery, useMutation } from '@tanstack/react-query';
import { auditLogger, type AuditLog, type AuditLogPayload } from '@/lib/audit';
import { useToast } from './use-toast';

export const useAuditLogs = (filters?: Partial<AuditLog>) => {
  return useQuery({
    queryKey: ['auditLogs', filters],
    queryFn: () => auditLogger.getAuditLogs(filters),
  });
};

export const useCreateAuditLog = () => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: (payload: AuditLogPayload) => auditLogger.log(payload),
    onError: (error) => {
      toast({
        title: 'Audit Log Error',
        description: 'Failed to create audit log entry',
        variant: 'destructive',
      });
      console.error('Audit log error:', error);
    },
  });
};
