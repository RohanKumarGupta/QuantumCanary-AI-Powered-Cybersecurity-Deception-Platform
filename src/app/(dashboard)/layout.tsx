"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Server, AlertTriangle, Radio,
  Brain, BarChart3, FileText, Settings, Users,
  LogOut, Bell, Menu, X, ChevronUp, Zap,
} from "lucide-react";
import { QuantumCanaryLogo } from "@/components/ui/Logo";
import { DarkModeToggle } from "@/components/ui/DarkModeToggle";
import { UserAvatar } from "@/components/ui/UserAvatar";

const navItems = [
  { section: "MAIN", items: [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Honeypots", href: "/honeypots", icon: Server },
    { label: "Threats", href: "/threats", icon: AlertTriangle },
    { label: "Canary Tokens", href: "/canary", icon: Radio },
  ]},
  { section: "TOOLS", items: [
    { label: "AI Analyzer", href: "/ai-analyze", icon: Brain },
    { label: "Analytics", href: "/analytics", icon: BarChart3 },
    { label: "Reports", href: "/reports", icon: FileText },
  ]},
  { section: "ACCOUNT", items: [
    { label: "Settings", href: "/settings", icon: Settings },
    { label: "Team", href: "/settings/team", icon: Users },
  ]},
];

function SidebarContent({ pathname, onClose }: { pathname: string; onClose?: () => void }) {
  return (
    <div className="flex flex-col h-full">
      <div className="p-5 border-b border-[rgba(55,138,221,0.1)]">
        <Link href="/dashboard" onClick={onClose}>
          <QuantumCanaryLogo size={28} />
        </Link>
      </div>
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        {navItems.map((section) => (
          <div key={section.section} className="mb-6">
            <p className="text-[10px] font-semibold text-muted uppercase tracking-widest px-3 mb-2">
              {section.section}
            </p>
            {section.items.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all mb-0.5 ${
                    isActive
                      ? "bg-[rgba(55,138,221,0.1)] text-honey border-l-[3px] border-honey"
                      : "text-[#94A3B8] hover:text-[#E8EDF5] hover:bg-[rgba(255,255,255,0.03)] border-l-[3px] border-transparent"
                  }`}
                >
                  <item.icon size={18} />
                  {item.label}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>
      <div className="p-4 border-t border-[rgba(55,138,221,0.1)]">
        <div className="flex items-center gap-3 mb-3">
          <UserAvatar name="Demo User" size="md" />
          <div className="min-w-0">
            <p className="text-sm font-medium truncate">Demo User</p>
            <p className="text-xs text-muted truncate">user@quantumcanary.io</p>
          </div>
        </div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-honey/10 text-honey">
            PRO
          </span>
          <Link href="/settings/billing" className="text-xs text-honey hover:underline flex items-center gap-1">
            <Zap size={12} /> Upgrade
          </Link>
        </div>
        <button className="flex items-center gap-2 text-sm text-muted hover:text-threat transition-colors w-full px-2 py-1.5 rounded-lg hover:bg-[rgba(226,75,74,0.08)]">
          <LogOut size={16} /> Sign out
        </button>
      </div>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const pageTitle = navItems
    .flatMap((s) => s.items)
    .find((item) => pathname === item.href || pathname.startsWith(item.href + "/"))?.label || "Dashboard";

  return (
    <div className="flex h-screen overflow-hidden bg-space">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-60 flex-shrink-0 flex-col bg-space-800 border-r border-[rgba(55,138,221,0.1)]">
        <SidebarContent pathname={pathname} />
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -240 }}
              animate={{ x: 0 }}
              exit={{ x: -240 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 w-60 bg-space-800 z-50 lg:hidden"
            >
              <SidebarContent pathname={pathname} onClose={() => setSidebarOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-14 bg-space border-b border-[rgba(55,138,221,0.08)] flex items-center justify-between px-4 lg:px-6 flex-shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-1.5 rounded-lg hover:bg-[rgba(55,138,221,0.08)] text-muted"
            >
              <Menu size={20} />
            </button>
            <h1 className="text-lg font-display font-semibold">{pageTitle}</h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg hover:bg-[rgba(55,138,221,0.08)] text-muted relative">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-threat rounded-full" />
            </button>
            <DarkModeToggle />
            <UserAvatar name="Demo User" size="md" />
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 xl:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
