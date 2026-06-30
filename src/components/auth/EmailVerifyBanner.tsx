'use client';

import { useState } from 'react';
import { Loader2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function EmailVerifyBanner() {
  const [visible, setVisible] = useState(true);
  const [isResending, setIsResending] = useState(false);
  const [resent, setResent] = useState(false);

  const handleResend = async () => {
    setIsResending(true);
    try {
      await fetch('/api/auth/resend-verification', { method: 'POST' });
      setResent(true);
      setTimeout(() => setResent(false), 5000);
    } catch {
      // Silent fail — user can retry
    } finally {
      setIsResending(false);
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="overflow-hidden"
        >
          <div className="sticky top-0 z-50 flex items-center justify-between gap-3 bg-[rgba(186,117,23,0.15)] border-b border-[rgba(186,117,23,0.3)] px-4 py-2.5 text-sm">
            <div className="flex items-center gap-2 text-[#EFB927]">
              <span>⚠️</span>
              <span>
                Please verify your email to unlock all features.
                {resent ? (
                  <span className="ml-2 text-[#1D9E75] font-medium">Verification email sent!</span>
                ) : (
                  <button
                    onClick={handleResend}
                    disabled={isResending}
                    className="ml-2 font-medium underline underline-offset-2 hover:text-[#E8EDF5] transition-colors disabled:opacity-50"
                  >
                    {isResending ? (
                      <span className="inline-flex items-center gap-1">
                        <Loader2 className="w-3 h-3 animate-spin" />
                        Sending…
                      </span>
                    ) : (
                      'Resend email'
                    )}
                  </button>
                )}
              </span>
            </div>
            <button
              onClick={() => setVisible(false)}
              className="text-[#5A6A82] hover:text-[#E8EDF5] transition-colors shrink-0"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
