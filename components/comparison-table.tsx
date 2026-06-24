import { Check, X } from 'lucide-react';

// What Manaseerz does vs. what customers too often get from the average
// electrician. Framed fairly ("many electricians") — not trashing the trade,
// just making the differentiation explicit.
const ROWS: { label: string; us: boolean; them: boolean; note?: string }[] = [
  { label: 'Licensed & insured in Texas', us: true, them: true },
  { label: 'Written 1-year labor warranty', us: true, them: false },
  { label: 'Same-day & next-day availability', us: true, them: false },
  { label: 'Transparent, upfront pricing', us: true, them: false, note: 'No surprise add-ons' },
  { label: '24/7 emergency service', us: true, them: false },
  { label: 'Clean-up after every job', us: true, them: false },
  { label: 'Text & email updates', us: true, them: false },
  { label: '5-star rated · 127+ reviews', us: true, them: false },
];

export function ComparisonTable() {
  return (
    <section className="bg-[var(--color-black-pure)] py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="font-display text-4xl font-bold text-[var(--color-text-primary)] sm:text-5xl">
            The <span className="text-[var(--color-gold-primary)]">Difference</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--color-text-secondary)]">
            Any electrician can wire a fixture. Here&apos;s what sets Manaseerz apart.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-[var(--color-surface-800)]">
          {/* Header */}
          <div className="grid grid-cols-[1.6fr_1fr_1fr] bg-[var(--color-surface-900)]">
            <div className="px-4 py-5 text-sm font-semibold text-[var(--color-text-muted)] sm:px-6">
              &nbsp;
            </div>
            <div className="border-l border-[var(--color-surface-800)] bg-[var(--color-gold-primary)]/10 px-4 py-5 text-center sm:px-6">
              <p className="font-display text-base font-bold text-[var(--color-gold-primary)] sm:text-lg">
                Manaseerz
              </p>
            </div>
            <div className="border-l border-[var(--color-surface-800)] px-4 py-5 text-center sm:px-6">
              <p className="text-base font-semibold text-[var(--color-text-muted)] sm:text-lg">
                Many others
              </p>
            </div>
          </div>

          {/* Rows */}
          {ROWS.map((row, i) => (
            <div
              key={row.label}
              className={`grid grid-cols-[1.6fr_1fr_1fr] items-center ${
                i % 2 === 0 ? 'bg-transparent' : 'bg-[var(--color-surface-900)]/40'
              }`}
            >
              <div className="px-4 py-4 text-sm font-medium text-[var(--color-text-primary)] sm:px-6 sm:text-base">
                {row.label}
                {row.note && (
                  <span className="block text-xs font-normal text-[var(--color-text-muted)]">
                    {row.note}
                  </span>
                )}
              </div>
              <Cell ok={row.us} highlight />
              <div className="border-l border-[var(--color-surface-800)]">
                <Cell ok={row.them} />
              </div>
            </div>
          ))}
        </div>

        <p className="mt-4 text-center text-xs text-[var(--color-text-muted)]">
          Based on what our customers tell us they experienced elsewhere.
        </p>
      </div>
    </section>
  );
}

function Cell({ ok, highlight = false }: { ok: boolean; highlight?: boolean }) {
  return (
    <div className="flex h-full items-center justify-center px-4 py-4 sm:px-6">
      {ok ? (
        <Check
          className={`h-5 w-5 ${highlight ? 'text-[var(--color-gold-primary)]' : 'text-[var(--color-text-muted)]'}`}
          strokeWidth={3}
        />
      ) : (
        <X className="h-5 w-5 text-[var(--color-text-muted)]/40" strokeWidth={2.5} />
      )}
    </div>
  );
}
