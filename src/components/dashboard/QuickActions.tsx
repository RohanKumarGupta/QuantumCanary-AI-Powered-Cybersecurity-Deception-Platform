"use client";

import { Crosshair, Plus, RotateCcw } from "lucide-react";

export function QuickActions() {
  return (
    <div className="flex items-center gap-2">
      <button className="btn-ghost text-xs h-9 px-3 gap-1.5">
        <Crosshair size={14} /> Simulate Attack
      </button>
      <button className="btn-ghost text-xs h-9 px-3 gap-1.5">
        <Plus size={14} /> Add Honeypot
      </button>
      <button className="btn-ghost text-xs h-9 px-3 gap-1.5">
        <RotateCcw size={14} /> Reset View
      </button>
    </div>
  );
}
