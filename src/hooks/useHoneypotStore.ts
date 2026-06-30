'use client';

import { create } from 'zustand';
import { mockHoneypots } from '@/lib/mock-data';

export interface MockHoneypot {
  id: string;
  name: string;
  type: 'SSH' | 'API' | 'SMTP' | 'S3' | 'DATABASE';
  port: number;
  status: 'ACTIVE' | 'PAUSED' | 'ARCHIVED';
  description: string;
  totalHits: number;
  deployedAt: Date;
  config: Record<string, unknown>;
}

interface HoneypotStore {
  honeypots: MockHoneypot[];
  loading: boolean;
  addHoneypot: (honeypot: MockHoneypot) => void;
  removeHoneypot: (id: string) => void;
  updateHoneypot: (id: string, update: Partial<MockHoneypot>) => void;
  fetchHoneypots: () => Promise<void>;
}

export const useHoneypotStore = create<HoneypotStore>((set) => ({
  honeypots: mockHoneypots as MockHoneypot[],
  loading: false,

  addHoneypot: (honeypot) =>
    set((state) => ({ honeypots: [honeypot, ...state.honeypots] })),

  removeHoneypot: (id) =>
    set((state) => ({
      honeypots: state.honeypots.filter((h) => h.id !== id),
    })),

  updateHoneypot: (id, update) =>
    set((state) => ({
      honeypots: state.honeypots.map((h) =>
        h.id === id ? { ...h, ...update } : h,
      ),
    })),

  fetchHoneypots: async () => {
    set({ loading: true });
    await new Promise((r) => setTimeout(r, 400));
    set({ honeypots: mockHoneypots as MockHoneypot[], loading: false });
  },
}));
