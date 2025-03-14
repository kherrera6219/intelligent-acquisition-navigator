
export interface ConnectionQuality {
  isOnline: boolean;
  latency: number | null;
  connectionType: string | null;
  effectiveConnectionType: string | null;
  downlink: number | null;
  lastChecked: Date;
}

export interface ConnectionCheckResult {
  success: boolean;
  latency: number | null;
}

export interface ConnectionMonitorOptions {
  pingEndpoint?: string;
  pingInterval?: number;
  showToasts?: boolean;
  onConnectionChange?: (status: ConnectionQuality) => void;
}
