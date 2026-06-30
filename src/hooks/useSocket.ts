'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

export interface SocketEvent {
  id: string;
  type: 'THREAT_DETECTED' | 'HONEYPOT_HIT' | 'CANARY_TRIGGERED' | 'AUTH_ATTEMPT' | 'EXFILTRATION';
  message: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  honeypotName: string;
  ip: string;
  timestamp: Date;
}

const EVENT_POOL: Omit<SocketEvent, 'id' | 'timestamp'>[] = [
  { type: 'AUTH_ATTEMPT', message: 'SSH brute-force detected', severity: 'HIGH', honeypotName: 'prod-ssh-decoy-01', ip: '185.220.101.42' },
  { type: 'THREAT_DETECTED', message: 'New threat actor identified', severity: 'CRITICAL', honeypotName: 'api-gateway-decoy', ip: '103.253.41.98' },
  { type: 'HONEYPOT_HIT', message: 'SMTP relay probe', severity: 'MEDIUM', honeypotName: 'mail-server-trap', ip: '45.33.32.156' },
  { type: 'CANARY_TRIGGERED', message: 'Canary token accessed', severity: 'CRITICAL', honeypotName: 'Canary Token', ip: '91.121.209.77' },
  { type: 'AUTH_ATTEMPT', message: 'PostgreSQL login attempt', severity: 'MEDIUM', honeypotName: 'postgres-analytics-db', ip: '192.168.10.55' },
  { type: 'EXFILTRATION', message: 'Data exfiltration detected', severity: 'CRITICAL', honeypotName: 'prod-ssh-decoy-01', ip: '91.121.209.77' },
  { type: 'HONEYPOT_HIT', message: 'S3 bucket access attempt', severity: 'HIGH', honeypotName: 'data-lake-bucket', ip: '103.253.41.98' },
  { type: 'AUTH_ATTEMPT', message: 'API key brute force', severity: 'HIGH', honeypotName: 'api-gateway-decoy', ip: '45.33.32.156' },
  { type: 'THREAT_DETECTED', message: 'Reconnaissance scan detected', severity: 'MEDIUM', honeypotName: 'prod-ssh-decoy-01', ip: '185.220.101.42' },
  { type: 'HONEYPOT_HIT', message: 'Directory traversal attempt', severity: 'HIGH', honeypotName: 'api-gateway-decoy', ip: '91.121.209.77' },
];

let counter = 0;

function generateEvent(): SocketEvent {
  const template = EVENT_POOL[Math.floor(Math.random() * EVENT_POOL.length)];
  counter++;
  return {
    ...template,
    id: `ws_evt_${Date.now()}_${counter}`,
    timestamp: new Date(),
  };
}

export function useSocket(maxEvents = 50) {
  const [events, setEvents] = useState<SocketEvent[]>([]);
  const [connected, setConnected] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const connect = useCallback(() => {
    setConnected(true);

    // Generate initial batch
    const initial = Array.from({ length: 5 }, () => generateEvent());
    setEvents(initial);

    // Simulate incoming events every 3-8 seconds
    intervalRef.current = setInterval(() => {
      const newEvent = generateEvent();
      setEvents((prev) => [newEvent, ...prev].slice(0, maxEvents));
    }, 3000 + Math.random() * 5000);
  }, [maxEvents]);

  const disconnect = useCallback(() => {
    setConnected(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    connect();
    return () => disconnect();
  }, [connect, disconnect]);

  return { events, connected, connect, disconnect };
}
