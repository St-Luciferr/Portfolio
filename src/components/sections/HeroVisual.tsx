import { HeroDemo } from './HeroDemo';

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
    <div aria-hidden="true" className="absolute -left-14 -top-16 hidden w-[290px] -rotate-[4deg] rounded-xl border border-white/10 bg-[#0d1018] p-4 font-mono text-[11.5px] leading-5 text-[#9aa0b2] shadow-lift sm:block">
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
 * Hero visual: an API (code panel) behind a live assistant demo that cycles
 * through three example flows. Full-stack + AI in one picture.
 */
const HeroVisual = () => {
  return (
    <div className="relative mt-10 w-full min-w-0 max-w-[440px] sm:mt-16 xl:mt-0">
      <CodeCard />

      <HeroDemo />
    </div>
  );
};

export default HeroVisual;
