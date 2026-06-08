import { useEffect, useState } from 'react';

export function useStaggerReady(delay = 100): boolean {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return ready;
}
