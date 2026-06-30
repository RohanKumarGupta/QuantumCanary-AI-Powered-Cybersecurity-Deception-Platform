"use client";

import { HoneypotCard } from "./HoneypotCard";

interface Honeypot { id: string; name: string; type: string; port: number | null; status: string; description: string | null; totalHits: number; deployedAt: Date | string }

export function HoneypotList({ honeypots }: { honeypots: Honeypot[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {honeypots.map((hp) => <HoneypotCard key={hp.id} honeypot={hp} />)}
    </div>
  );
}
