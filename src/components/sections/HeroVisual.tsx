import { FileText, Search, Sparkles } from 'lucide-react';

/**
 * Illustrative assistant window for the hero: shows what the main offer
 * (RAG knowledge assistants) does, in HTML/CSS only. Replaces the 3D desk
 * model (docs/SITE_REVIEW_2026-10.md F5) at near-zero runtime cost.
 */
const HeroVisual = () => {
  return (
    <div className="relative w-full max-w-[460px] xl:max-w-[420px]" aria-hidden="true">
      {/* Ambient glow */}
      <div className="glow-pulse absolute -inset-10 -z-10 rounded-full bg-[radial-gradient(closest-side,rgba(145,94,255,0.35),transparent)] blur-2xl" />

      <div className="float-slow rounded-2xl border border-white/10 bg-tertiary/80 shadow-2xl shadow-[#915eff]/10 backdrop-blur-md">
        {/* Window chrome */}
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-3 text-xs text-secondary">Knowledge Assistant</span>
          <span className="ml-auto flex items-center gap-1.5 text-[11px] text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Live
          </span>
        </div>

        <div className="space-y-4 p-5">
          {/* User question */}
          <div className="rise-in flex justify-end" style={{ animationDelay: '0.2s' }}>
            <p className="max-w-[80%] rounded-2xl rounded-br-sm bg-[#7a4fd4] px-4 py-2.5 text-sm text-white">
              What&apos;s the refund window for annual plans?
            </p>
          </div>

          {/* Retrieval step */}
          <div className="rise-in flex items-center gap-2 text-xs text-secondary" style={{ animationDelay: '0.7s' }}>
            <Search className="h-3.5 w-3.5 text-[#b48cff]" />
            Searched 3 documents · 2 relevant passages
          </div>

          {/* Assistant answer with citations */}
          <div className="rise-in flex gap-3" style={{ animationDelay: '1.2s' }}>
            <span className="mt-0.5 flex h-7 w-7 flex-none items-center justify-center rounded-full bg-gradient-to-br from-[#915eff] to-[#4f8cff]">
              <Sparkles className="h-3.5 w-3.5 text-white" />
            </span>
            <div className="min-w-0 rounded-2xl rounded-tl-sm border border-white/10 bg-black-100/80 px-4 py-3 text-sm leading-6 text-white-100">
              Annual plans can be refunded within <span className="font-semibold text-white">30 days</span> of
              purchase, pro-rated after the first month.
              <div className="mt-3 flex flex-wrap gap-2">
                {['billing-policy.pdf · p.4', 'terms-2025.pdf · §7'].map((source) => (
                  <span
                    key={source}
                    className="inline-flex items-center gap-1.5 rounded-md border border-[#915eff]/30 bg-[#915eff]/10 px-2 py-1 text-[11px] text-[#cbb5ff]"
                  >
                    <FileText className="h-3 w-3" />
                    {source}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Typing indicator */}
          <div className="rise-in flex items-center gap-1 pl-10" style={{ animationDelay: '1.8s' }}>
            {[0, 0.15, 0.3].map((delay) => (
              <span
                key={delay}
                className="typing-dot h-1.5 w-1.5 rounded-full bg-secondary"
                style={{ animationDelay: `${delay}s` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Pipeline caption */}
      <div className="rise-in mt-5 flex items-center justify-center gap-2 text-[11px] uppercase tracking-wider text-secondary" style={{ animationDelay: '2.2s' }}>
        <span>Your docs</span>
        <span className="text-[#915eff]">→</span>
        <span>Retrieval</span>
        <span className="text-[#915eff]">→</span>
        <span>Cited answer</span>
      </div>
    </div>
  );
};

export default HeroVisual;
