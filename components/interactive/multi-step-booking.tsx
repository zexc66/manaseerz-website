'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Zap, Lamp, Home, Plug, Hammer, Wind, ArrowRight, Check, Calendar, User, Phone, AlertTriangle, ChevronLeft } from '@/lib/icons';
import { services, contactInfo } from '@/lib/data';

type FormData = {
  service: string;
  urgency: 'emergency' | 'this-week' | 'this-month' | 'flexible';
  name: string;
  phone: string;
  email: string;
  city: string;
  description: string;
};

const URGENCY_OPTIONS = [
  { id: 'emergency', label: 'Emergency', sub: 'Within hours', icon: <AlertTriangle className="w-4 h-4" />, color: 'error' },
  { id: 'this-week', label: 'This Week', sub: '1-7 days', icon: <Calendar className="w-4 h-4" />, color: 'gold' },
  { id: 'this-month', label: 'This Month', sub: '1-4 weeks', icon: <Calendar className="w-4 h-4" />, color: 'gold' },
  { id: 'flexible', label: 'Flexible', sub: 'Just planning', icon: <Calendar className="w-4 h-4" />, color: 'muted' },
] as const;

const STEP_LABELS = ['Service', 'Timeline', 'Contact', 'Review'];

export function MultiStepBooking() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState<FormData>({
    service: '',
    urgency: 'this-week',
    name: '',
    phone: '',
    email: '',
    city: '',
    description: '',
  });
  const reduceMotion = useReducedMotion();

  const update = (key: keyof FormData, value: string) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const canProceed = () => {
    if (step === 0) return data.service !== '';
    if (step === 1) return Boolean(data.urgency);
    if (step === 2) return Boolean(data.name) && Boolean(data.phone);
    return true;
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--color-black-rich)]">
        <div className="max-w-md mx-auto text-center">
          <motion.div
            initial={reduceMotion ? false : { scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="w-16 h-16 mx-auto mb-6 rounded-full bg-[var(--color-success)] flex items-center justify-center"
          >
            <Check className="w-8 h-8 text-[var(--color-black-pure)]" />
          </motion.div>
          <h3 className="font-display text-2xl font-bold text-[var(--color-text-primary)] mb-3">
            Request received
          </h3>
          <p className="text-[var(--color-text-secondary)] mb-6">
            We&apos;ll text <span className="text-[var(--color-gold-primary)] font-semibold">{data.phone}</span> within 15 minutes during business hours (7am-7pm CT).
          </p>
          <div className="p-4 bg-[var(--color-surface-900)] border border-[var(--color-surface-700)] rounded-xl text-left text-sm space-y-2">
            <div className="flex justify-between">
              <span className="text-[var(--color-text-muted)]">Service:</span>
              <span className="text-[var(--color-text-primary)] font-medium">{services.find((s) => s.id === data.service)?.title ?? 'Other'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--color-text-muted)]">Timeline:</span>
              <span className="text-[var(--color-text-primary)] font-medium capitalize">{data.urgency.replace('-', ' ')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--color-text-muted)]">Name:</span>
              <span className="text-[var(--color-text-primary)] font-medium">{data.name}</span>
            </div>
          </div>
          <a
            href={`tel:${contactInfo.phone.replace(/\D/g, '')}`}
            className="inline-flex items-center gap-2 mt-6 text-[var(--color-gold-primary)] hover:text-[var(--color-gold-light)] font-medium transition-colors"
          >
            <Phone className="w-4 h-4" />
            Or call now: {contactInfo.phone}
          </a>
        </div>
      </section>
    );
  }

  return (
    <section id="book" className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--color-black-rich)]">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-2">
            Book in 60 Seconds
          </h2>
          <p className="text-[var(--color-text-secondary)]">This takes about 60 seconds. No obligation.</p>
        </div>

        <div className="flex items-center justify-between mb-8 px-2">
          {STEP_LABELS.map((label, i) => (
            <div key={label} className="flex-1 flex items-center">
              <div className={`flex items-center gap-2 ${i <= step ? 'text-[var(--color-gold-primary)]' : 'text-[var(--color-text-muted)]'}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold border transition-colors ${i < step ? 'bg-[var(--color-gold-primary)] text-[var(--color-black-pure)] border-[var(--color-gold-primary)]' : i === step ? 'border-[var(--color-gold-primary)]' : 'border-[var(--color-surface-700)]'}`}>
                  {i < step ? <Check className="w-3.5 h-3.5" /> : i + 1}
                </div>
                <span className="text-xs font-medium hidden sm:inline">{label}</span>
              </div>
              {i < STEP_LABELS.length - 1 && (
                <div className={`flex-1 h-px mx-2 transition-colors ${i < step ? 'bg-[var(--color-gold-primary)]' : 'bg-[var(--color-surface-700)]'}`} />
              )}
            </div>
          ))}
        </div>

        <div className="p-6 sm:p-8 bg-[var(--color-surface-900)] border border-[var(--color-surface-700)] rounded-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={reduceMotion ? false : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              {step === 0 && (
                <div>
                  <h3 className="font-display text-xl font-semibold text-[var(--color-text-primary)] mb-1">
                    What do you need?
                  </h3>
                  <p className="text-sm text-[var(--color-text-muted)] mb-5">Tap all that apply</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {services.map((s) => {
                      const selected = data.service === s.id;
                      const Icon = { lamp: Lamp, zap: Zap, home: Home, plug: Plug, hammer: Hammer, wind: Wind }[s.icon] ?? Zap;
                      return (
                        <button
                          key={s.id}
                          onClick={() => update('service', s.id)}
                          className={`p-3 rounded-lg border text-left transition-all ${selected ? 'border-[var(--color-gold-primary)] bg-[var(--color-surface-800)]' : 'border-[var(--color-surface-700)] hover:border-[var(--color-gold-muted)]'}`}
                        >
                          <Icon className={`w-4 h-4 mb-1.5 ${selected ? 'text-[var(--color-gold-primary)]' : 'text-[var(--color-text-muted)]'}`} />
                          <div className={`text-xs font-medium leading-tight ${selected ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-secondary)]'}`}>
                            {s.title}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {step === 1 && (
                <div>
                  <h3 className="font-display text-xl font-semibold text-[var(--color-text-primary)] mb-1">
                    When do you need it?
                  </h3>
                  <p className="text-sm text-[var(--color-text-muted)] mb-5">We respond fastest to emergencies</p>
                  <div className="grid grid-cols-2 gap-2">
                    {URGENCY_OPTIONS.map((opt) => {
                      const selected = data.urgency === opt.id;
                      const colorClass = opt.color === 'error' ? 'border-[var(--color-error)] bg-[var(--color-error)]/10' : opt.color === 'gold' && selected ? 'border-[var(--color-gold-primary)] bg-[var(--color-surface-800)]' : 'border-[var(--color-surface-700)] hover:border-[var(--color-gold-muted)]';
                      return (
                        <button
                          key={opt.id}
                          onClick={() => update('urgency', opt.id)}
                          className={`p-4 rounded-lg border text-left transition-all ${opt.color === 'error' ? colorClass : colorClass}`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            {opt.icon}
                            <span className={`text-sm font-semibold ${opt.color === 'error' ? 'text-[var(--color-error)]' : selected ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-secondary)]'}`}>
                              {opt.label}
                            </span>
                          </div>
                          <div className="text-xs text-[var(--color-text-muted)]">{opt.sub}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h3 className="font-display text-xl font-semibold text-[var(--color-text-primary)] mb-1">
                    Where can we reach you?
                  </h3>
                  <p className="text-sm text-[var(--color-text-muted)] mb-5">We&apos;ll text — never spam.</p>
                  <div className="space-y-4">
                    <Field label="Full Name" icon={<User className="w-4 h-4" />}>
                      <input
                        type="text"
                        value={data.name}
                        onChange={(e) => update('name', e.target.value)}
                        placeholder="Jane Smith"
                        className="input-base"
                      />
                    </Field>
                    <Field label="Mobile (for SMS)" icon={<Phone className="w-4 h-4" />}>
                      <input
                        type="tel"
                        value={data.phone}
                        onChange={(e) => update('phone', e.target.value)}
                        placeholder="(214) 555-0123"
                        className="input-base"
                      />
                    </Field>
                    <Field label="DFW City" icon={<Home className="w-4 h-4" />}>
                      <input
                        type="text"
                        value={data.city}
                        onChange={(e) => update('city', e.target.value)}
                        placeholder="Frisco, Plano, Dallas..."
                        className="input-base"
                      />
                    </Field>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <h3 className="font-display text-xl font-semibold text-[var(--color-text-primary)] mb-1">
                    Confirm your request
                  </h3>
                  <p className="text-sm text-[var(--color-text-muted)] mb-5">Review and add any details</p>
                  <div className="space-y-2 mb-4">
                    <ReviewRow label="Service" value={services.find((s) => s.id === data.service)?.title ?? '—'} />
                    <ReviewRow label="Timeline" value={URGENCY_OPTIONS.find((u) => u.id === data.urgency)?.label ?? '—'} />
                    <ReviewRow label="Name" value={data.name} />
                    <ReviewRow label="Phone" value={data.phone} />
                    {data.city && <ReviewRow label="City" value={data.city} />}
                  </div>
                  <textarea
                    value={data.description}
                    onChange={(e) => update('description', e.target.value)}
                    placeholder="Optional: tell us about your project, the problem you're seeing, or any access notes..."
                    rows={3}
                    className="input-base resize-none"
                  />
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-between mt-6 pt-6 border-t border-[var(--color-surface-700)]">
            {step > 0 ? (
              <button
                onClick={() => setStep((s) => s - 1)}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <button
                onClick={() => canProceed() && setStep((s) => s + 1)}
                disabled={!canProceed()}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[var(--color-gold-primary)] hover:bg-[var(--color-gold-light)] disabled:opacity-40 disabled:cursor-not-allowed text-[var(--color-black-pure)] text-sm font-semibold rounded-lg transition-colors"
              >
                Continue
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[var(--color-gold-primary)] hover:bg-[var(--color-gold-light)] text-[var(--color-black-pure)] text-sm font-semibold rounded-lg transition-colors"
              >
                Submit Request
                <Check className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        :global(.input-base) {
          width: 100%;
          padding: 0.625rem 0.875rem;
          background: var(--color-surface-800);
          border: 1px solid var(--color-surface-700);
          border-radius: 0.5rem;
          color: var(--color-text-primary);
          font-size: 0.875rem;
          outline: none;
          transition: border-color 0.2s;
        }
        :global(.input-base:focus) {
          border-color: var(--color-gold-primary);
        }
        :global(.input-base::placeholder) {
          color: var(--color-text-muted);
        }
      `}</style>
    </section>
  );
}

function Field({ label, icon, children }: { label: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="flex items-center gap-1.5 text-xs font-medium text-[var(--color-text-secondary)] mb-1.5 uppercase tracking-wider">
        <span className="text-[var(--color-gold-muted)]">{icon}</span>
        {label}
      </span>
      {children}
    </label>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center text-sm py-1.5 border-b border-[var(--color-surface-700)] last:border-b-0">
      <span className="text-[var(--color-text-muted)]">{label}</span>
      <span className="text-[var(--color-text-primary)] font-medium">{value}</span>
    </div>
  );
}
