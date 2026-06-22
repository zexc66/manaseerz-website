'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Upload, X, Sparkles, ArrowRight, Loader2 } from 'lucide-react';

type PhotoQuoteState = 'idle' | 'uploading' | 'analyzing' | 'result' | 'error';

type PhotoQuoteResult = {
  detectedService: string;
  estimatedRange: { low: number; high: number };
  confidence: 'low' | 'medium' | 'high';
  observations: string[];
  nextStep: string;
};

const MOCK_RESULT: PhotoQuoteResult = {
  detectedService: 'Electrical Panel (200A Upgrade)',
  estimatedRange: { low: 1800, high: 2600 },
  confidence: 'medium',
  observations: [
    'Older Pushmatic-style panel (likely 1970s-80s)',
    'No main breaker visible — may need service disconnect upgrade',
    'Tight clearance — confirm 36" working space',
  ],
  nextStep:
    'Book an in-person assessment for a binding quote. We can usually complete same-week in DFW.',
};

export function PhotoQuoteStub() {
  const [state, setState] = useState<PhotoQuoteState>('idle');
  const [result, setResult] = useState<PhotoQuoteResult | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const analyze = useCallback(async (file: File) => {
    setState('uploading');

    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target?.result as string);
    reader.readAsDataURL(file);

    setState('analyzing');

    // ============================================================
    // GEMINI VISION INTEGRATION POINT
    // ------------------------------------------------------------
    // Replace this mock with the real call:
    //
    //   const formData = new FormData();
    //   formData.append('image', file);
    //   const res = await fetch('/api/photo-quote', {
    //     method: 'POST',
    //     body: formData,
    //   });
    //   const data = await res.json();
    //   setResult(data);
    //
    // Server-side handler (app/api/photo-quote/route.ts) should:
    //   1. Forward to Gemini Vision API: gemini-1.5-pro / gemini-2.0-flash
    //   2. Use prompt: "You are a master electrician. Analyze this
    //      electrical panel/outlet/fixture photo. Identify the
    //      component, estimate replacement/upgrade cost in DFW Texas,
    //      list visible issues, and recommend next steps. Return JSON."
    //   3. Cache results by image hash to control API costs
    //
    // Required env: GEMINI_API_KEY
    // ============================================================

    await new Promise((r) => setTimeout(r, 2200));

    setResult(MOCK_RESULT);
    setState('result');
  }, []);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setState('error');
      return;
    }
    analyze(file);
  };

  const reset = () => {
    setState('idle');
    setResult(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <section id="photo-quote" className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--color-black-pure)]">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--color-gold-primary)]/10 border border-[var(--color-gold-primary)]/20 rounded-full mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[var(--color-gold-primary)]" />
            <span className="text-xs uppercase tracking-wider text-[var(--color-gold-primary)] font-medium">
              AI-Powered
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-3">
            Snap a Photo. Get an Instant Estimate.
          </h2>
          <p className="text-[var(--color-text-secondary)] max-w-xl mx-auto">
            Our AI analyzes your electrical panel, outlet, or fixture and gives you a price range in seconds.
            No waiting 24 hours for a callback.
          </p>
        </motion.div>

        <div className="bg-[var(--color-surface-900)] border border-[var(--color-surface-700)] rounded-2xl p-6 sm:p-8">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="hidden"
            aria-label="Upload electrical photo"
          />

          <AnimatePresence mode="wait">
            {state === 'idle' && (
              <motion.button
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => fileInputRef.current?.click()}
                className="w-full p-8 border-2 border-dashed border-[var(--color-surface-700)] hover:border-[var(--color-gold-muted)] rounded-xl transition-colors group"
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-[var(--color-surface-800)] flex items-center justify-center group-hover:bg-[var(--color-gold-primary)]/10 transition-colors">
                    <Camera className="w-6 h-6 text-[var(--color-gold-primary)]" />
                  </div>
                  <div className="text-center">
                    <div className="font-display text-lg font-semibold text-[var(--color-text-primary)] mb-1">
                      Tap to upload a photo
                    </div>
                    <div className="text-sm text-[var(--color-text-muted)]">
                      Panel, EV outlet, chandelier, or any electrical component
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-xs text-[var(--color-text-muted)]">
                    <Upload className="w-3 h-3" />
                    JPG or PNG • ~5 second analysis
                  </div>
                </div>
              </motion.button>
            )}

            {(state === 'uploading' || state === 'analyzing') && (
              <motion.div
                key="analyzing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-4 py-8"
              >
                {imagePreview && (
                  <div className="relative w-32 h-32 rounded-xl overflow-hidden border border-[var(--color-surface-700)]">
                    <img src={imagePreview} alt="Your upload" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-[var(--color-gold-primary)]/20 backdrop-blur-[1px] flex items-center justify-center">
                      <Loader2 className="w-6 h-6 text-[var(--color-gold-primary)] animate-spin" />
                    </div>
                  </div>
                )}
                <div className="text-center">
                  <div className="font-display text-lg font-semibold text-[var(--color-text-primary)] mb-1">
                    {state === 'analyzing' ? 'Analyzing with AI...' : 'Uploading...'}
                  </div>
                  <div className="text-sm text-[var(--color-text-muted)]">
                    {state === 'analyzing' ? 'Identifying component and estimating cost' : 'Securing your photo'}
                  </div>
                </div>
              </motion.div>
            )}

            {state === 'result' && result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                {imagePreview && (
                  <div className="flex gap-4 mb-6">
                    <div className="w-24 h-24 rounded-xl overflow-hidden border border-[var(--color-surface-700)] flex-shrink-0">
                      <img src={imagePreview} alt="Analyzed" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] uppercase tracking-wider text-[var(--color-gold-primary)] font-semibold mb-1">
                        AI Identified
                      </div>
                      <h3 className="font-display text-lg font-bold text-[var(--color-text-primary)] mb-1">
                        {result.detectedService}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          result.confidence === 'high'
                            ? 'bg-[var(--color-success)]/20 text-[var(--color-success)]'
                            : result.confidence === 'medium'
                              ? 'bg-[var(--color-warning)]/20 text-[var(--color-warning)]'
                              : 'bg-[var(--color-surface-800)] text-[var(--color-text-muted)]'
                        }`}>
                          {result.confidence} confidence
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="p-5 bg-[var(--color-surface-800)] border border-[var(--color-gold-muted)]/30 rounded-xl mb-5">
                  <div className="text-xs uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
                    Estimated Range
                  </div>
                  <div className="font-display text-3xl font-bold text-[var(--color-gold-primary)]">
                    ${result.estimatedRange.low.toLocaleString()} – ${result.estimatedRange.high.toLocaleString()}
                  </div>
                  <div className="text-xs text-[var(--color-text-muted)] mt-1">
                    DFW pricing, includes labor + materials
                  </div>
                </div>

                <div className="mb-5">
                  <div className="text-xs uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
                    What we noticed
                  </div>
                  <ul className="space-y-1.5">
                    {result.observations.map((obs, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)]">
                        <span className="w-1 h-1 rounded-full bg-[var(--color-gold-primary)] mt-1.5 flex-shrink-0" />
                        {obs}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-[var(--color-surface-800)]/50 rounded-lg mb-5">
                  <div className="text-xs uppercase tracking-wider text-[var(--color-text-muted)] mb-1">
                    Recommended Next Step
                  </div>
                  <p className="text-sm text-[var(--color-text-secondary)]">{result.nextStep}</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <a
                    href="/book-appointment"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-[var(--color-gold-primary)] hover:bg-[var(--color-gold-light)] text-[var(--color-black-pure)] font-semibold rounded-lg transition-colors"
                  >
                    Book In-Person Quote
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <button
                    onClick={reset}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-[var(--color-surface-700)] hover:border-[var(--color-gold-muted)] text-[var(--color-text-secondary)] text-sm font-medium rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4" />
                    Try Another Photo
                  </button>
                </div>

                <p className="text-[10px] text-[var(--color-text-muted)] mt-4 text-center leading-relaxed">
                  AI estimates are informational only, not a binding quote. Final pricing confirmed in person.
                  Photos are processed securely and never shared.
                </p>
              </motion.div>
            )}

            {state === 'error' && (
              <motion.div
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8"
              >
                <p className="text-[var(--color-error)] mb-4">Please upload a valid image file.</p>
                <button onClick={reset} className="text-[var(--color-gold-primary)] hover:underline">
                  Try again
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
