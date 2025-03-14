
import { ConnectionCheckResult } from './types';

/**
 * Checks connection with server by making a HEAD request
 * @param endpoint The endpoint to ping
 * @returns Connection check result with success status and latency
 */
export async function checkServerConnection(endpoint: string): Promise<ConnectionCheckResult> {
  if (!navigator.onLine) return { success: false, latency: null };
  
  const startTime = performance.now();
  
  try {
    // Try to fetch a small resource from the server with cache busting
    const response = await fetch(`${endpoint}?_=${Date.now()}`, { 
      method: 'HEAD',
      cache: 'no-store',
      headers: { 'Cache-Control': 'no-cache' }
    });
    
    const endTime = performance.now();
    const latency = endTime - startTime;
    
    return { 
      success: response.ok, 
      latency 
    };
  } catch (error) {
    console.warn('Failed to connect to server:', error);
    return { success: false, latency: null };
  }
}

/**
 * Gets network information from Navigator API if available
 */
export function getNetworkInformation() {
  const connection = (navigator as any).connection || 
                    (navigator as any).mozConnection || 
                    (navigator as any).webkitConnection;
  
  if (connection) {
    return {
      connectionType: connection.type,
      effectiveConnectionType: connection.effectiveType,
      downlink: connection.downlink
    };
  }
  
  return {
    connectionType: null,
    effectiveConnectionType: null,
    downlink: null
  };
}
