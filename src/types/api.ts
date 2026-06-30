export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface DashboardStats {
  activeHoneypots: number;
  threatsDetected: number;
  attackersLured: number;
  securityScore: number;
  eventsToday: number;
  criticalAlerts: number;
  canaryTokensActive: number;
  canaryTriggered: number;
}

export interface AnalyticsData {
  threatsByDay: { date: string; threats: number; events: number }[];
  threatsByType: { type: string; count: number; percentage: number }[];
  honeypotHits: { name: string; hits: number; type: string }[];
  geoData: { country: string; attacks: number }[];
  severityBreakdown: { severity: string; count: number; color: string }[];
}
