import { RefObject, useEffect, useState } from 'react';

export interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
}

export function useIntersectionObserver(
  ref: RefObject<Element>,
  options: UseIntersectionObserverOptions = {},
): IntersectionObserverEntry | undefined {
  const { threshold = 0, root = null, rootMargin = '0%', freezeOnceVisible = false } = options;
  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (freezeOnceVisible && entry?.isIntersecting) return;

    const observer = new IntersectionObserver(
      ([e]) => setEntry(e),
      { threshold, root, rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, threshold, root, rootMargin, freezeOnceVisible, entry?.isIntersecting]);

  return entry;
}
