import { RefObject, useEffect, useState } from 'react';

export interface ScrollSpyItem {
  id: string;
  ref?: RefObject<Element>;
}

export interface UseScrollSpyOptions {
  rootMargin?: string;
  threshold?: number;
}

/**
 * Tracks which section is in view using IntersectionObserver.
 * Pass element ids; the hook observes `document.getElementById(id)` for each.
 */
export function useScrollSpy(
  ids: string[],
  options: UseScrollSpyOptions = {},
): string | null {
  const { rootMargin = '-40% 0px -40% 0px', threshold = 0 } = options;
  const [active, setActive] = useState<string | null>(ids[0] ?? null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin, threshold },
    );

    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids, rootMargin, threshold]);

  return active;
}
