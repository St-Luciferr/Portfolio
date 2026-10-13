import { FileText, Search, Sparkles } from 'lucide-react';

/** Code panel behind the chat: the full-stack half of the pitch. Always dark, like an editor. */
function CodeCard() {
  const line = (indent: number, parts: [string, string][]) => (
    <div style={{ paddingLeft: indent * 14 }}>
      {parts.map(([cls, text], i) => (
        <span key={i} className={cls}>
          {text}
        </span>
      ))}
    </div>
  );
  return (
    <div className="absolute -left-14 -top-16 hidden w-[290px] -rotate-[4deg] rounded-xl border border-white/10 bg-[#0d1018] p-4 font-mono text-[11.5px] leading-5 text-[#9aa0b2] shadow-lift sm:block">
      <div className="mb-2 flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="ml-2 text-[10.5px] text-[#6b7186]">api/assistant.py</span>
      </div>
      {line(0, [['text-[#c792ea]', '@app.post'], ['', '("/ask")']])}
      {line(0, [['text-[#c792ea]', 'async def '], ['text-[#82aaff]', 'ask'], ['', '(q: Question):']])}
      {line(1, [['', 'docs = '], ['text-[#82aaff]', 'retrieve'], ['', '(q.text, k=5)']])}
      {line(1, [['', 'answer = '], ['text-[#82aaff]', 'llm'], ['', '(q.text, docs)']])}
      {line(1, [['text-[#c792ea]', 'return '], ['', '{answer, sources}']])}
    </div>
  );
}

/**
 * Illustrative product window for the hero: an API behind an AI assistant,
 * i.e. full-stack + AI, in HTML/CSS only. One staged entrance; no looping motion.
 */
const HeroVisual = () => {
  return (
    <div className="relative mt-10 w-full max-w-[420px] sm:mt-16 xl:mt-0" aria-hidden="true">
      <CodeCard />

      <div className="relative overflow-hidden rounded-2xl border border-fg/10 bg-tertiary shadow-lift">
        {/* Window chrome */}
        <div className="flex items-center gap-2 border-b border-fg/[0.08] bg-black-100 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-3 text-xs font-medium text-secondary">Knowledge assistant</span>
          <span className="ml-auto flex items-center gap-1.5 text-[11px] font-medium text-emerald-700 dark:text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Live
          </span>
        </div>

        <div className="space-y-4 p-5">
          <div className="rise-in flex justify-end" style={{ animationDelay: '0.15s' }}>
            <p className="max-w-[82%] rounded-2xl rounded-br-md bg-brand px-4 py-2.5 text-sm text-white">
              What&apos;s the refund window for annual plans?
            </p>
          </div>

          <div className="rise-in flex items-center gap-2 text-xs text-secondary" style={{ animationDelay: '0.55s' }}>
            <Search className="h-3.5 w-3.5 text-brand-fg" />
            Searched 3 documents, found 2 relevant passages
          </div>

          <div className="rise-in flex gap-3" style={{ animationDelay: '0.95s' }}>
            <span className="mt-0.5 flex h-7 w-7 flex-none items-center justify-center rounded-full bg-brand/10 ring-1 ring-brand/20">
              <Sparkles className="h-3.5 w-3.5 text-brand-fg" />
            </span>
            <div className="min-w-0 rounded-2xl rounded-tl-md border border-fg/[0.08] bg-black-100 px-4 py-3 text-sm leading-6 text-white-100">
              Annual plans can be refunded within <span className="font-semibold text-fg">30 days</span> of
              purchase, pro-rated after the first month.
              <div className="mt-3 flex flex-wrap gap-2">
                {['billing-policy.pdf, p.4', 'terms-2025.pdf, §7'].map((source) => (
                  <span
                    key={source}
                    className="inline-flex items-center gap-1.5 rounded-md border border-fg/10 bg-tertiary px-2 py-1 text-[11px] text-secondary"
                  >
                    <FileText className="h-3 w-3 text-brand-fg" />
                    {source}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroVisual;
