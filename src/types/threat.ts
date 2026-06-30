export type ThreatStatus = "ACTIVE" | "LURED" | "TRAPPED" | "BLOCKED" | "RESOLVED";
export type Severity = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
export type EventType = "CONNECTION" | "AUTH_ATTEMPT" | "COMMAND" | "FILE_ACCESS" | "CANARY_TRIGGER" | "EXFILTRATION";
export type TokenType = "URL" | "DNS" | "DOCUMENT" | "IMAGE";

export interface Threat {
  id: string;
  userId: string;
  ipAddress: string;
  ipPartial: string | null;
  firstSeen: Date | string;
  lastSeen: Date | string | null;
  totalEvents: number;
  threatScore: number;
  attackerType: string | null;
  status: ThreatStatus;
  osGuess: string | null;
  toolchain: string[];
  country: string | null;
  city: string | null;
  asn: string | null;
  radarScores: RadarScores | null;
  llmAnalysis: string | null;
  rawFingerprint: Record<string, unknown>;
  events?: ThreatEvent[];
}

export interface RadarScores {
  persistence: number;
  stealth: number;
  sophistication: number;
  intent: number;
}

export interface ThreatEvent {
  id: string;
  honeypotId: string | null;
  threatId: string | null;
  eventType: EventType;
  timestamp: Date | string;
  payload: Record<string, unknown>;
  severity: Severity;
  honeypotName?: string;
}

export interface CanaryToken {
  id: string;
  userId: string;
  honeypotId: string | null;
  tokenHash: string;
  tokenType: TokenType;
  label: string | null;
  triggered: boolean;
  triggeredAt: Date | string | null;
  triggeredIp: string | null;
  triggeredMeta: Record<string, unknown>;
  createdAt: Date | string;
}

export const SEVERITY_CONFIG: Record<Severity, { label: string; color: string; bgColor: string }> = {
  CRITICAL: { label: "Critical", color: "#E24B4A", bgColor: "rgba(226,75,74,0.15)" },
  HIGH: { label: "High", color: "#F09595", bgColor: "rgba(240,149,149,0.15)" },
  MEDIUM: { label: "Medium", color: "#EF9F27", bgColor: "rgba(239,159,39,0.15)" },
  LOW: { label: "Low", color: "#85B7EB", bgColor: "rgba(133,183,235,0.15)" },
};

export const THREAT_STATUS_CONFIG: Record<ThreatStatus, { label: string; color: string; bgColor: string }> = {
  ACTIVE: { label: "Active", color: "#E24B4A", bgColor: "rgba(226,75,74,0.15)" },
  LURED: { label: "Lured", color: "#EF9F27", bgColor: "rgba(239,159,39,0.15)" },
  TRAPPED: { label: "Trapped", color: "#378ADD", bgColor: "rgba(55,138,221,0.15)" },
  BLOCKED: { label: "Blocked", color: "#5A6A82", bgColor: "rgba(90,106,130,0.15)" },
  RESOLVED: { label: "Resolved", color: "#1D9E75", bgColor: "rgba(29,158,117,0.15)" },
};
