'use client';

import { useEffect, useRef, useState } from 'react';

/** Counts the numeric part of a value like "95%+", "<2s" or "10s" up from zero when it scrolls into view. */
export function CountUp({ value }: { value: string }) {
  const match = value.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/);
  const target = match ? parseFloat(match[2]) : NaN;
  const decimals = match?.[2].includes('.') ? match[2].split('.')[1].length : 0;
  const [shown, setShown] = useState(value);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!match || Number.isNaN(target)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = ref.current;
    if (!el) return;
    // Start from zero so the count is visible when the metric scrolls in.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShown(`${match[1]}${(0).toFixed(decimals)}${match[3]}`);
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / 1200);
        const eased = 1 - Math.pow(1 - p, 3);
        setShown(`${match[1]}${(target * eased).toFixed(decimals)}${match[3]}`);
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <span ref={ref} className="tabular-nums">
      {shown}
    </span>
  );
}
