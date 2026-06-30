'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import GlowButton from './GlowButton';
import React from 'react';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        'flex flex-col items-center justify-center py-16 px-6 text-center',
        className,
      )}
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[rgba(55,138,221,0.08)] text-muted mb-5">
        {icon}
      </div>
      <h3 className="text-lg font-display font-semibold text-[#E8EDF5] mb-2">
        {title}
      </h3>
      <p className="text-sm text-muted max-w-sm mb-6">{description}</p>
      {actionLabel && onAction && (
        <GlowButton variant="primary" size="md" onClick={onAction}>
          {actionLabel}
        </GlowButton>
      )}
    </motion.div>
  );
}
