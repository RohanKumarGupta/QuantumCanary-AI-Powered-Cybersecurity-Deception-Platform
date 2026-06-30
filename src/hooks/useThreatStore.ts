'use client';

import { create } from 'zustand';
import { mockThreats, mockEvents } from '@/lib/mock-data';

export interface MockThreat {
  id: string;
  ipAddress: string;
  ipPartial: string;
  firstSeen: Date;
  lastSeen: Date;
  totalEvents: number;
  threatScore: number;
  attackerType: string;
  status: 'ACTIVE' | 'LURED' | 'TRAPPED' | 'BLOCKED' | 'RESOLVED';
  osGuess: string;
  toolchain: string[];
  country: string;
  city: string;
  asn: string;
  radarScores: { persistence: number; stealth: number; sophistication: number; intent: number };
  llmAnalysis: string | null;
  rawFingerprint: Record<string, unknown>;
}

interface ThreatStore {
  threats: MockThreat[];
  events: typeof mockEvents;
  selectedThreat: MockThreat | null;
  loading: boolean;
  addThreat: (threat: MockThreat) => void;
  removeThreat: (id: string) => void;
  updateThreat: (id: string, update: Partial<MockThreat>) => void;
  setSelected: (threat: MockThreat | null) => void;
  fetchThreats: () => Promise<void>;
}

export const useThreatStore = create<ThreatStore>((set) => ({
  threats: mockThreats as MockThreat[],
  events: mockEvents,
  selectedThreat: null,
  loading: false,

  addThreat: (threat) =>
    set((state) => ({ threats: [threat, ...state.threats] })),

  removeThreat: (id) =>
    set((state) => ({
      threats: state.threats.filter((t) => t.id !== id),
      selectedThreat: state.selectedThreat?.id === id ? null : state.selectedThreat,
    })),

  updateThreat: (id, update) =>
    set((state) => ({
      threats: state.threats.map((t) => (t.id === id ? { ...t, ...update } : t)),
      selectedThreat:
        state.selectedThreat?.id === id
          ? { ...state.selectedThreat, ...update }
          : state.selectedThreat,
    })),

  setSelected: (threat) => set({ selectedThreat: threat }),

  fetchThreats: async () => {
    set({ loading: true });
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 500));
    set({ threats: mockThreats as MockThreat[], events: mockEvents, loading: false });
  },
}));
