'use client';

import { cn, getInitials } from '@/lib/utils';
import Image from 'next/image';

interface UserAvatarProps {
  name?: string | null;
  image?: string | null;
  size?: 'sm' | 'md' | 'lg';
  online?: boolean;
  className?: string;
}

const sizeMap = {
  sm: 'h-7 w-7 text-[10px]',
  md: 'h-9 w-9 text-xs',
  lg: 'h-12 w-12 text-sm',
};

const dotSizeMap = {
  sm: 'h-2 w-2',
  md: 'h-2.5 w-2.5',
  lg: 'h-3 w-3',
};

export function UserAvatar({
  name,
  image,
  size = 'md',
  online,
  className,
}: UserAvatarProps) {
  const initials = name ? getInitials(name) : '??';

  return (
    <div className={cn('relative shrink-0', className)}>
      {image ? (
        <Image
          src={image}
          alt={name ?? 'User'}
          width={48}
          height={48}
          className={cn(
            'rounded-full object-cover border border-[rgba(55,138,221,0.2)]',
            sizeMap[size],
          )}
        />
      ) : (
        <div
          className={cn(
            'rounded-full flex items-center justify-center font-semibold font-display',
            'bg-[rgba(55,138,221,0.15)] text-honey border border-[rgba(55,138,221,0.2)]',
            sizeMap[size],
          )}
        >
          {initials}
        </div>
      )}

      {online !== undefined && (
        <span
          className={cn(
            'absolute bottom-0 right-0 rounded-full border-2 border-space-800',
            dotSizeMap[size],
            online ? 'bg-asset' : 'bg-muted',
          )}
        />
      )}
    </div>
  );
}
