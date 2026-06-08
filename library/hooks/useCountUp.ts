import { useEffect, useRef, useState } from 'react';

import { easings } from 'lib/utils';

export interface UseCountUpOptions {
  from?: number;
  to: number;
  duration?: number;
  ease?: (t: number) => number;
  enabled?: boolean;
}

export function useCountUp({
  from = 0,
  to,
  duration = 400,
  ease = easings.easeOutCubic,
  enabled = true,
}: UseCountUpOptions): number {
  const [value, setValue] = useState(from);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    const start = from;
    const diff = to - start;
    if (diff === 0) { setValue(to); return; }
    const actualDuration = Math.min(duration, Math.abs(diff) * 0.15);
    const startTime = performance.now();

    function tick(now: number) {
      const t = Math.min((now - startTime) / actualDuration, 1);
      setValue(Math.round(start + diff * ease(t)));
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);

    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [from, to, duration, ease, enabled]);

  return value;
}
