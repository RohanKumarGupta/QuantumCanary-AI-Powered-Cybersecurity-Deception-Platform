'use client';

import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import React from 'react';

interface CountUpStatProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  trend?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
}

export function CountUpStat({
  label,
  value,
  icon,
  trend,
  suffix = '',
  prefix = '',
  decimals = 0,
  className,
}: CountUpStatProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  const trendColor =
    trend === undefined || trend === 0
      ? 'text-muted'
      : trend > 0
        ? 'text-asset'
        : 'text-threat';

  const TrendIcon =
    trend === undefined || trend === 0
      ? Minus
      : trend > 0
        ? TrendingUp
        : TrendingDown;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className={cn(
        'glass-card flex items-start gap-4 hover:border-[rgba(55,138,221,0.25)] transition-colors',
        className,
      )}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-[rgba(55,138,221,0.1)] text-honey">
        {icon}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-xs text-muted font-medium uppercase tracking-wider mb-1">
          {label}
        </p>
        <p className="text-2xl font-display font-semibold text-[#E8EDF5]">
          {inView ? (
            <CountUp
              start={0}
              end={value}
              duration={2}
              decimals={decimals}
              prefix={prefix}
              suffix={suffix}
              separator=","
            />
          ) : (
            `${prefix}0${suffix}`
          )}
        </p>
        {trend !== undefined && (
          <div className={cn('flex items-center gap-1 mt-1 text-xs font-medium', trendColor)}>
            <TrendIcon className="h-3 w-3" />
            <span>{Math.abs(trend)}% vs last week</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
