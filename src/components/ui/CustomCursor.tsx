'use client';
import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
type CursorVariant = 'default' | 'label' | 'hidden';
export default function CustomCursor() {
  const [variant, setVariant] = useState<CursorVariant>('default');
  const [label, setLabel] = useState<string | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { damping: 28, stiffness: 350, mass: 0.4 });
  const springY = useSpring(y, { damping: 28, stiffness: 350, mass: 0.4 });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(pointer: fine)');
    if (!mq.matches) return;
    setEnabled(true);
    document.documentElement.classList.add('custom-cursor-active');

    const handleMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const handleOver = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (!target || typeof target.closest !== 'function') return;
      const labelEl = target.closest('[data-cursor-label]') as HTMLElement | null;
      if (labelEl?.dataset.cursorLabel) {
        setLabel(labelEl.dataset.cursorLabel);
        setVariant('label');
        return;
      }
      // Any native-cursor-owning element (interactive or text input):
      // suppress the custom cursor so the system hand/I-beam shows alone.
      const nativeCursorEl = target.closest(
        'a, button, [role="button"], input, textarea, select, [contenteditable="true"]',
      );
      if (nativeCursorEl) {
        setLabel(null);
        setVariant('hidden');
        return;
      }
      setLabel(null);
      setVariant('default');
    };

    const handleLeave = () => setVisible(false);
    const handleEnter = () => setVisible(true);

    window.addEventListener('pointermove', handleMove, { passive: true });
    document.addEventListener('pointerover', handleOver, { passive: true });
    document.addEventListener('pointerleave', handleLeave);
    document.addEventListener('pointerenter', handleEnter);

    return () => {
      document.documentElement.classList.remove('custom-cursor-active');
      window.removeEventListener('pointermove', handleMove);
      document.removeEventListener('pointerover', handleOver);
      document.removeEventListener('pointerleave', handleLeave);
      document.removeEventListener('pointerenter', handleEnter);
    };
  }, [x, y, visible]);

  if (!enabled) return null;

  const ringSize = variant === 'label' ? 110 : 28;
  const ringOpacity = visible && variant !== 'hidden' ? 1 : 0;
  const dotOpacity = visible && variant !== 'hidden' && variant !== 'label' ? 1 : 0;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 rounded-full bg-[#915eff]"
        style={{
          x,
          y,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{ opacity: dotOpacity }}
        transition={{ duration: 0.12 }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9998] flex items-center justify-center rounded-full border border-[#915eff]"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: ringSize,
          height: ringSize,
          backgroundColor: variant === 'label' ? 'rgba(145, 94, 255, 0.22)' : 'rgba(145, 94, 255, 0.04)',
          opacity: ringOpacity,
        }}
        transition={{
          width: { duration: 0.3, ease: [0.23, 1, 0.32, 1] },
          height: { duration: 0.3, ease: [0.23, 1, 0.32, 1] },
          backgroundColor: { duration: 0.2 },
          opacity: { duration: 0.15 },
        }}
      >
        {variant === 'label' && label && (
          <motion.span
            key={label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.2em] text-white"
          >
            {label}
          </motion.span>
        )}
      </motion.div>
    </>
  );
}