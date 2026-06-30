export type HoneypotType = "SSH" | "API" | "SMTP" | "S3" | "DATABASE";
export type HoneypotStatus = "ACTIVE" | "PAUSED" | "ARCHIVED";

export interface Honeypot {
  id: string;
  userId: string;
  name: string;
  type: HoneypotType;
  port: number | null;
  status: HoneypotStatus;
  description: string | null;
  generatedData: unknown;
  config: Record<string, unknown>;
  totalHits: number;
  deployedAt: Date | string;
  updatedAt: Date | string;
  events?: Event[];
}

export interface HoneypotWithStats extends Honeypot {
  recentEvents: number;
  lastActivity: Date | string | null;
}

export const HONEYPOT_TYPE_CONFIG: Record<
  HoneypotType,
  { label: string; icon: string; color: string; defaultPort: number; description: string }
> = {
  SSH: {
    label: "SSH Server",
    icon: "Terminal",
    color: "#378ADD",
    defaultPort: 22,
    description: "Mimics an SSH server to capture credential attacks",
  },
  API: {
    label: "REST API",
    icon: "Globe",
    color: "#1D9E75",
    defaultPort: 8080,
    description: "Fake API endpoints to lure reconnaissance bots",
  },
  SMTP: {
    label: "SMTP Server",
    icon: "Mail",
    color: "#EF9F27",
    defaultPort: 25,
    description: "Email relay trap to catch spam bots",
  },
  S3: {
    label: "S3 Bucket",
    icon: "Database",
    color: "#BA7517",
    defaultPort: 443,
    description: "Decoy cloud storage with synthetic data",
  },
  DATABASE: {
    label: "Database",
    icon: "HardDrive",
    color: "#E24B4A",
    defaultPort: 5432,
    description: "Fake database server with planted credentials",
  },
};
