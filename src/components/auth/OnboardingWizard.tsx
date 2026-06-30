'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2,
  Server,
  Rocket,
  PartyPopper,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Check,
  ChevronDown,
} from 'lucide-react';

// ── Constants ──
const INDUSTRIES = [
  'Technology',
  'Finance & Banking',
  'Healthcare',
  'Government',
  'Education',
  'E-commerce',
  'Manufacturing',
  'Energy & Utilities',
  'Telecommunications',
  'Media & Entertainment',
  'Other',
] as const;

const TEAM_SIZES = [
  { value: '1-10', label: '1–10' },
  { value: '11-50', label: '11–50' },
  { value: '51-200', label: '51–200' },
  { value: '201-1000', label: '201–1,000' },
  { value: '1000+', label: '1,000+' },
] as const;

const INFRA_OPTIONS = [
  { value: 'aws', label: 'AWS' },
  { value: 'gcp', label: 'Google Cloud' },
  { value: 'azure', label: 'Microsoft Azure' },
  { value: 'on-premise', label: 'On-premise / Data Center' },
  { value: 'kubernetes', label: 'Kubernetes' },
  { value: 'docker', label: 'Docker' },
  { value: 'serverless', label: 'Serverless' },
  { value: 'hybrid', label: 'Hybrid Cloud' },
] as const;

const STEPS = [
  { icon: Building2, label: 'Organization' },
  { icon: Server, label: 'Infrastructure' },
  { icon: Rocket, label: 'First Honeypot' },
  { icon: PartyPopper, label: 'All Set!' },
] as const;

// ── Confetti Piece ──
function ConfettiPiece({ index }: { index: number }) {
  const colors = ['#378ADD', '#1D9E75', '#EFB927', '#E24B4A', '#BA7517'];
  const style = useMemo(() => {
    const color = colors[index % colors.length];
    const left = `${Math.random() * 100}%`;
    const delay = `${Math.random() * 2}s`;
    const duration = `${2 + Math.random() * 2}s`;
    const size = `${4 + Math.random() * 6}px`;
    return {
      position: 'absolute' as const,
      top: '-10px',
      left,
      width: size,
      height: size,
      background: color,
      borderRadius: Math.random() > 0.5 ? '50%' : '2px',
      animation: `confetti ${duration} ${delay} ease-out forwards`,
    };
  }, [index]);

  return <div style={style} />;
}

export function OnboardingWizard() {
  const router = useRouter();
  const { update } = useSession();
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form data
  const [orgName, setOrgName] = useState('');
  const [industry, setIndustry] = useState('');
  const [teamSize, setTeamSize] = useState('');
  const [infrastructure, setInfrastructure] = useState<string[]>([]);
  const [honeypotName, setHoneypotName] = useState('prod-ssh-canary-01');
  const [honeypotDeployed, setHoneypotDeployed] = useState(false);

  const toggleInfra = (value: string) => {
    setInfrastructure((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const next = () => setStep((s) => Math.min(s + 1, 3));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const deployHoneypot = async () => {
    setIsSubmitting(true);
    try {
      await fetch('/api/honeypots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: honeypotName,
          type: 'SSH',
        }),
      });
      setHoneypotDeployed(true);
      next();
    } catch {
      // Still advance on failure — honeypot can be created later
      next();
    } finally {
      setIsSubmitting(false);
    }
  };

  const finishOnboarding = async () => {
    setIsSubmitting(true);
    try {
      await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orgName,
          industry,
          teamSize,
          infrastructure,
          onboardingDone: true,
        }),
      });
      await update({ onboardingDone: true });
    } catch {
      // Non-blocking — continue to dashboard
      await update({ onboardingDone: true });
    } finally {
      setIsSubmitting(false);
      router.push('/dashboard');
    }
  };

  const skipOnboarding = async () => {
    try {
      await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ onboardingDone: true }),
      });
      await update({ onboardingDone: true });
    } catch {
      await update({ onboardingDone: true });
    }
    router.push('/dashboard');
  };

  // ── Progress Bar ──
  const progressPercent = ((step + 1) / 4) * 100;

  return (
    <div className="space-y-6">
      {/* Step Indicator */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-[#5A6A82]">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            const isActive = i === step;
            const isDone = i < step;
            return (
              <div
                key={s.label}
                className={`flex items-center gap-1.5 transition-colors duration-200 ${
                  isActive
                    ? 'text-[#378ADD] font-medium'
                    : isDone
                    ? 'text-[#1D9E75]'
                    : 'text-[#5A6A82]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{s.label}</span>
              </div>
            );
          })}
        </div>
        <div className="h-1 rounded-full bg-[rgba(255,255,255,0.06)] overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-[#378ADD] to-[#1D9E75]"
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25 }}
        >
          {/* ── Step 1: Organization ── */}
          {step === 0 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-[#E8EDF5] font-display">
                  Tell us about your organization
                </h3>
                <p className="text-sm text-[#5A6A82] mt-1">
                  We&apos;ll customize your experience based on this.
                </p>
              </div>

              {/* Org Name */}
              <div>
                <label className="label-text">Organization name</label>
                <input
                  type="text"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  placeholder="Acme Corp"
                  className="input-field"
                />
              </div>

              {/* Industry */}
              <div>
                <label className="label-text">Industry</label>
                <div className="relative">
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="input-field appearance-none pr-10 cursor-pointer"
                  >
                    <option value="">Select your industry</option>
                    {INDUSTRIES.map((ind) => (
                      <option key={ind} value={ind}>
                        {ind}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5A6A82] pointer-events-none" />
                </div>
              </div>

              {/* Team Size */}
              <div>
                <label className="label-text">Team size</label>
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                  {TEAM_SIZES.map((ts) => (
                    <button
                      key={ts.value}
                      type="button"
                      onClick={() => setTeamSize(ts.value)}
                      className={`rounded-lg p-2 text-xs font-medium transition-all border ${
                        teamSize === ts.value
                          ? 'border-[#378ADD] bg-[rgba(55,138,221,0.12)] text-[#378ADD]'
                          : 'border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] text-[#5A6A82] hover:border-[rgba(55,138,221,0.2)] hover:text-[#E8EDF5]'
                      }`}
                    >
                      {ts.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── Step 2: Infrastructure ── */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-[#E8EDF5] font-display">
                  Your infrastructure
                </h3>
                <p className="text-sm text-[#5A6A82] mt-1">
                  Select all platforms you use. This helps us suggest honeypot configurations.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {INFRA_OPTIONS.map((opt) => {
                  const isSelected = infrastructure.includes(opt.value);
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => toggleInfra(opt.value)}
                      className={`flex items-center gap-2 rounded-lg p-3 text-sm font-medium transition-all border text-left ${
                        isSelected
                          ? 'border-[#378ADD] bg-[rgba(55,138,221,0.12)] text-[#E8EDF5]'
                          : 'border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] text-[#5A6A82] hover:border-[rgba(55,138,221,0.2)] hover:text-[#E8EDF5]'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-all ${
                          isSelected
                            ? 'border-[#378ADD] bg-[#378ADD]'
                            : 'border-[rgba(255,255,255,0.2)] bg-transparent'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <span>{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── Step 3: Deploy First Honeypot ── */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-[#E8EDF5] font-display">
                  Deploy your first honeypot
                </h3>
                <p className="text-sm text-[#5A6A82] mt-1">
                  We&apos;ve pre-configured an SSH honeypot for you. You can customize it later.
                </p>
              </div>

              {/* Pre-filled honeypot card */}
              <div className="rounded-lg border border-[rgba(55,138,221,0.15)] bg-[rgba(13,21,37,0.6)] p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[rgba(55,138,221,0.12)] flex items-center justify-center">
                    <Server className="w-4 h-4 text-[#378ADD]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#5A6A82] uppercase tracking-wider font-medium">
                      SSH Honeypot
                    </p>
                    <p className="text-xs text-[#5A6A82]">Port 2222</p>
                  </div>
                </div>

                <div>
                  <label className="label-text">Honeypot name</label>
                  <input
                    type="text"
                    value={honeypotName}
                    onChange={(e) => setHoneypotName(e.target.value)}
                    className="input-field"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={deployHoneypot}
                disabled={isSubmitting || !honeypotName.trim()}
                className="btn-primary"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Deploying…
                  </>
                ) : (
                  <>
                    <Rocket className="w-4 h-4" />
                    Deploy honeypot
                  </>
                )}
              </button>
            </div>
          )}

          {/* ── Step 4: Success ── */}
          {step === 3 && (
            <div className="space-y-5 text-center relative overflow-hidden">
              {/* Confetti */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {Array.from({ length: 30 }).map((_, i) => (
                  <ConfettiPiece key={i} index={i} />
                ))}
              </div>

              <div className="relative z-10 space-y-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
                  className="flex justify-center"
                >
                  <div className="w-16 h-16 rounded-full bg-[rgba(29,158,117,0.15)] flex items-center justify-center">
                    <PartyPopper className="w-8 h-8 text-[#1D9E75]" />
                  </div>
                </motion.div>

                <h3 className="text-xl font-bold text-[#E8EDF5] font-display">
                  You&apos;re all set!
                </h3>
                <p className="text-sm text-[#5A6A82] leading-relaxed">
                  Your QuantumCanary workspace is ready.
                  {honeypotDeployed &&
                    ' Your first honeypot is being deployed and will be active within minutes.'}
                </p>

                {/* Summary */}
                <div className="rounded-lg border border-[rgba(55,138,221,0.1)] bg-[rgba(13,21,37,0.6)] p-4 text-left space-y-2 text-sm">
                  {orgName && (
                    <div className="flex justify-between">
                      <span className="text-[#5A6A82]">Organization</span>
                      <span className="text-[#E8EDF5] font-medium">{orgName}</span>
                    </div>
                  )}
                  {industry && (
                    <div className="flex justify-between">
                      <span className="text-[#5A6A82]">Industry</span>
                      <span className="text-[#E8EDF5] font-medium">{industry}</span>
                    </div>
                  )}
                  {teamSize && (
                    <div className="flex justify-between">
                      <span className="text-[#5A6A82]">Team size</span>
                      <span className="text-[#E8EDF5] font-medium">{teamSize}</span>
                    </div>
                  )}
                  {infrastructure.length > 0 && (
                    <div className="flex justify-between">
                      <span className="text-[#5A6A82]">Platforms</span>
                      <span className="text-[#E8EDF5] font-medium text-right">
                        {infrastructure.length} selected
                      </span>
                    </div>
                  )}
                  {honeypotDeployed && (
                    <div className="flex justify-between">
                      <span className="text-[#5A6A82]">Honeypot</span>
                      <span className="text-[#1D9E75] font-medium">{honeypotName}</span>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={finishOnboarding}
                  disabled={isSubmitting}
                  className="btn-primary"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      Go to dashboard
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation footer */}
      {step < 3 && (
        <div className="flex items-center justify-between pt-2 border-t border-[rgba(255,255,255,0.06)]">
          {step > 0 ? (
            <button
              type="button"
              onClick={prev}
              className="inline-flex items-center gap-1 text-sm text-[#5A6A82] hover:text-[#E8EDF5] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back
            </button>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={skipOnboarding}
              className="text-sm text-[#5A6A82] hover:text-[#E8EDF5] transition-colors"
            >
              Skip for now
            </button>
            {step < 2 && (
              <button
                type="button"
                onClick={next}
                className="inline-flex items-center gap-1 text-sm text-[#378ADD] hover:text-[#5BA4E8] transition-colors font-medium"
              >
                Next
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
