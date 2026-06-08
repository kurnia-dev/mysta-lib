import { useEffect, useRef } from 'react';

/**
 * Fires handler when a keyboard sequence is entered (Konami-style).
 * sequence: array of e.key values, e.g. ['ArrowUp','ArrowUp','ArrowDown','ArrowDown']
 */
export function useKeySequence(sequence: string[], handler: () => void): void {
  const buffer = useRef<string[]>([]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      buffer.current = [...buffer.current, e.key].slice(-sequence.length);
      if (buffer.current.join(',') === sequence.join(',')) {
        handler();
        buffer.current = [];
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [sequence, handler]);
}
