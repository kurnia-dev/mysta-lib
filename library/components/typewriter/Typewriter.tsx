import clsx from 'clsx';
import { ReactNode, useEffect, useState } from 'react';

import { useComponentPreset } from 'lib/hooks';

export interface TypewriterProps {
  lines: string[];
  speed?: number;
  deleteSpeed?: number;
  pauseMs?: number;
  loop?: boolean;
  cursorChar?: string;
  cursorElement?: ReactNode;
  className?: string;
}

export function Typewriter({
  lines,
  speed = 60,
  deleteSpeed = 20,
  pauseMs = 1600,
  loop = true,
  cursorChar = '|',
  cursorElement,
  className,
}: TypewriterProps): JSX.Element {
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [blink, setBlink] = useState(true);

  const preset = useComponentPreset('Typewriter', {
    props: { lines, speed, deleteSpeed, pauseMs, loop, cursorChar, className },
  }) ?? {};

  useEffect(() => {
    const interval = setInterval(() => setBlink((b) => !b), 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (lines.length === 0) return;
    const current = lines[lineIdx];

    // K: guard against lineIdx going out of bounds when lines prop shrinks
    if (current === undefined) {
      setLineIdx(0);
      setCharIdx(0);
      return;
    }

    if (!deleting && charIdx < current.length) {
      const t = setTimeout(
        () => setCharIdx((c) => c + 1),
        speed + Math.random() * speed * 0.6,
      );
      return () => clearTimeout(t);
    }
    if (!deleting && charIdx === current.length) {
      const t = setTimeout(() => setDeleting(true), pauseMs);
      return () => clearTimeout(t);
    }
    if (deleting && charIdx > 0) {
      const t = setTimeout(() => setCharIdx((c) => c - 1), deleteSpeed);
      return () => clearTimeout(t);
    }
    if (deleting && charIdx === 0) {
      if (!loop && lineIdx === lines.length - 1) return;
      setDeleting(false);
      setLineIdx((l) => (l + 1) % lines.length);
    }
  }, [charIdx, deleting, lineIdx, lines, speed, deleteSpeed, pauseMs, loop]);

  return (
    <span className={clsx(preset.root?.className, className)}>
      {lines[lineIdx]?.slice(0, charIdx)}
      {cursorElement ?? (
        <span
          aria-hidden
          className={clsx(preset.cursor?.className)}
          style={{ opacity: blink ? 1 : 0, transition: 'opacity 0.1s' }}
        >
          {cursorChar}
        </span>
      )}
    </span>
  );
}
