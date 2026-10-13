'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, FileText, Loader2, MessageCircle, ScanText, Sparkles } from 'lucide-react';

type Scenario = {
  id: string;
  tab: string;
  window: string;
  Icon: typeof Sparkles;
  question: string;
  step: string;
  answer: string;
  chips: string[];
};

// Three illustrative flows, one per offer. Content is fictional sample data.
const SCENARIOS: Scenario[] = [
  {
    id: 'rag',
    tab: 'Docs Q&A',
    window: 'Knowledge assistant',
    Icon: Sparkles,
    question: "What's the refund window for annual plans?",
    step: 'Searched 3 documents, found 2 relevant passages',
    answer: 'Annual plans can be refunded within 30 days of purchase, pro-rated after the first month.',
    chips: ['billing-policy.pdf, p.4', 'terms-2025.pdf, §7'],
  },
  {
    id: 'whatsapp',
    tab: 'WhatsApp',
    window: 'WhatsApp booking agent',
    Icon: MessageCircle,
    question: 'Can I book the Annapurna trek for 4 people in March?',
    step: 'Checked availability through the booking API',
    answer: "Yes, 4 places are open on 12 March. I've held them for 30 minutes; pay the deposit to confirm.",
    chips: ['Hold #A-1042', 'Deposit link sent'],
  },
  {
    id: 'ocr',
    tab: 'Documents',
    window: 'Invoice intake',
    Icon: ScanText,
    question: 'Process invoice_0423.pdf',
    step: 'Extracted 14 fields and validated the totals',
    answer: 'Vendor: Himal Supplies. Total: NPR 48,200. Due: 30 Apr. Ready to post to accounting.',
    chips: ['Confidence 98%', 'Posted to ERP'],
  },
];

// phase: 0 typing question, 1 working, 2 streaming answer, 3 done (chips)
type State = { index: number; phase: 0 | 1 | 2 | 3; chars: number; words: number };
const DONE = (index: number): State => ({ index, phase: 3, chars: Infinity, words: Infinity });

export function HeroDemo() {
  // Server render and reduced-motion users get the finished first scenario.
  const [s, setS] = useState<State>(DONE(0));
  const [animated, setAnimated] = useState(false);
  const visible = useRef(true);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAnimated(true);
    const io = new IntersectionObserver(([e]) => (visible.current = e.isIntersecting));
    if (root.current) io.observe(root.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!animated) return;
    const sc = SCENARIOS[s.index];
    const words = sc.answer.split(' ').length;
    let delay = 40;
    let next: State = s;

    if (s.phase === 3) {
      delay = 3600;
      next = { index: (s.index + 1) % SCENARIOS.length, phase: 0, chars: 0, words: 0 };
    } else if (s.phase === 0) {
      next = s.chars < sc.question.length ? { ...s, chars: s.chars + 1 } : { ...s, phase: 1 };
      delay = s.chars < sc.question.length ? 32 : 350;
    } else if (s.phase === 1) {
      delay = 1100;
      next = { ...s, phase: 2 };
    } else if (s.phase === 2) {
      next = s.words < words ? { ...s, words: s.words + 1 } : { ...s, phase: 3 };
      delay = 70;
    }

    const t = window.setTimeout(() => {
      // Hold still while off-screen or in a background tab.
      if (!visible.current || document.hidden) {
        setS({ ...s });
        return;
      }
      setS(next);
    }, delay);
    return () => window.clearTimeout(t);
  }, [s, animated]);

  const sc = SCENARIOS[s.index];
  const question = sc.question.slice(0, s.chars);
  const answerWords = sc.answer.split(' ');
  const answer = answerWords.slice(0, s.words).join(' ');

  return (
    <div ref={root} className="relative overflow-hidden rounded-2xl border border-fg/10 bg-tertiary shadow-lift">
      {/* Window chrome + scenario tabs */}
      <div className="flex items-center gap-2 border-b border-fg/[0.08] bg-black-100 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 truncate text-xs font-medium text-secondary">{sc.window}</span>
        <span className="ml-auto flex items-center gap-1.5 text-[11px] font-medium text-emerald-700 dark:text-emerald-400">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60 motion-reduce:hidden" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </span>
          Live
        </span>
      </div>

      <div className="flex gap-1 border-b border-fg/[0.06] px-3 py-2" role="tablist" aria-label="Example assistants">
        {SCENARIOS.map((x, i) => (
          <button
            key={x.id}
            type="button"
            role="tab"
            aria-selected={i === s.index}
            onClick={() => setS(animated ? { index: i, phase: 0, chars: 0, words: 0 } : DONE(i))}
            className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[12px] font-medium transition-colors ${
              i === s.index ? 'bg-brand/10 text-brand-fg' : 'text-secondary hover:text-fg'
            }`}
          >
            <x.Icon className="h-3.5 w-3.5" aria-hidden="true" />
            {x.tab}
          </button>
        ))}
      </div>

      <div className="min-h-[312px] space-y-4 p-5" aria-live="off">
        <div className="flex justify-end">
          <p className="max-w-[85%] rounded-2xl rounded-br-md bg-brand px-4 py-2.5 text-sm text-white">
            {question || ' '}
            {s.phase === 0 && animated && <span className="ml-0.5 inline-block h-4 w-px translate-y-0.5 animate-pulse bg-white" />}
          </p>
        </div>

        {s.phase >= 1 && (
          <div className="rise-in flex items-center gap-2 text-xs text-secondary">
            {s.phase === 1 ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin text-brand-fg" />
            ) : (
              <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            )}
            {sc.step}
          </div>
        )}

        {s.phase >= 2 && (
          <div className="flex gap-3">
            <span className="mt-0.5 flex h-7 w-7 flex-none items-center justify-center rounded-full bg-brand/10 ring-1 ring-brand/20">
              <sc.Icon className="h-3.5 w-3.5 text-brand-fg" />
            </span>
            <div className="min-w-0 rounded-2xl rounded-tl-md border border-fg/[0.08] bg-black-100 px-4 py-3 text-sm leading-6 text-white-100">
              {answer}
              {s.phase === 3 && (
                <div className="rise-in mt-3 flex flex-wrap gap-2">
                  {sc.chips.map((chip) => (
                    <span
                      key={chip}
                      className="inline-flex items-center gap-1.5 rounded-md border border-fg/10 bg-tertiary px-2 py-1 text-[11px] text-secondary"
                    >
                      <FileText className="h-3 w-3 text-brand-fg" />
                      {chip}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
