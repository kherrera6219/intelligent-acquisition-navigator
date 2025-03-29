
/**
 * Development configuration settings
 * These settings should be used to make development easier
 * but should NOT be enabled in production
 */

export const devConfig = {
  /**
   * When true, authentication checks are bypassed
   * All users are treated as authenticated with admin privileges
   */
  BYPASS_AUTH: false,
  
  /**
   * When true, session timeout is disabled
   */
  DISABLE_SESSION_TIMEOUT: false,
  
  /**
   * Log level for development
   * 0 = none, 1 = errors, 2 = warnings, 3 = info, 4 = debug
   */
  LOG_LEVEL: 3,
  
  /**
   * Enable mock data for development
   */
  USE_MOCK_DATA: false,
  
  /**
   * When true, development indicators are shown in the UI
   */
  SHOW_DEV_INDICATORS: true,
};
