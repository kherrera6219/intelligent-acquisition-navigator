
import { supabase } from "@/integrations/supabase/client";

export interface HealthStatus {
  overall: 'ok' | 'warning' | 'error';
  api: 'ok' | 'warning' | 'error';
  database: 'ok' | 'warning' | 'error';
  auth: 'ok' | 'warning' | 'error';
  latency: number; // in ms
  lastChecked: Date;
  details?: Record<string, any>;
}

const DEFAULT_STATUS: HealthStatus = {
  overall: 'ok',
  api: 'ok',
  database: 'ok',
  auth: 'ok',
  latency: 0,
  lastChecked: new Date(),
  details: {}
};

/**
 * Comprehensive check of Supabase connection status
 */
export const checkSupabaseHealth = async (): Promise<HealthStatus> => {
  const startTime = performance.now();
  const status: HealthStatus = { ...DEFAULT_STATUS, lastChecked: new Date() };
  
  try {
    // Check database connection with health_check table
    const { data: healthData, error: healthError } = await supabase
      .from('health_check')
      .select('*')
      .limit(1)
      .maybeSingle();
      
    if (healthError) {
      status.database = 'error';
      status.details = { ...status.details, databaseError: healthError.message };
    }
    
    // Check auth service
    const { data: authData, error: authError } = await supabase.auth.getSession();
    
    if (authError) {
      status.auth = 'error';
      status.details = { ...status.details, authError: authError.message };
    } else if (!authData.session && localStorage.getItem('supabase.auth.token')) {
      // If we have a token but no session, there might be an issue
      status.auth = 'warning';
      status.details = { ...status.details, authWarning: 'Session expired or invalid' };
    }
    
    // Calculate latency
    status.latency = Math.round(performance.now() - startTime);
    
    // If latency is too high, mark API as warning
    if (status.latency > 1000) {
      status.api = 'warning';
      status.details = { ...status.details, apiWarning: 'High latency' };
    }
    
    // Determine overall status (worst case of all checks)
    if (status.database === 'error' || status.auth === 'error' || status.api === 'error') {
      status.overall = 'error';
    } else if (status.database === 'warning' || status.auth === 'warning' || status.api === 'warning') {
      status.overall = 'warning';
    }
    
    return status;
  } catch (error) {
    console.error('Error checking Supabase health:', error);
    return {
      overall: 'error',
      api: 'error',
      database: 'error',
      auth: 'error',
      latency: Math.round(performance.now() - startTime),
      lastChecked: new Date(),
      details: { unexpectedError: error instanceof Error ? error.message : String(error) }
    };
  }
};

/**
 * Log health check result to Supabase
 */
export const logHealthCheck = async (status: HealthStatus): Promise<void> => {
  try {
    const { error } = await supabase
      .from('health_check')
      .update({
        api_status: status.api,
        db_status: status.database,
        auth_status: status.auth,
        details: status.details || {}
      })
      .eq('id', 1);
      
    if (error) {
      console.error('Error logging health check:', error);
    }
  } catch (error) {
    console.error('Failed to log health check:', error);
  }
};
