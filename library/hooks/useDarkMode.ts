import { useCallback, useEffect, useState } from 'react';

type ColorScheme = 'dark' | 'light';

export function useDarkMode(): [ColorScheme, () => void] {
  const [scheme, setScheme] = useState<ColorScheme>(() => {
    try {
      const stored = window.localStorage.getItem('theme') as ColorScheme | null;
      if (stored === 'dark' || stored === 'light') return stored;
    } catch {
      /* ignore */
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', scheme === 'dark');
    try {
      window.localStorage.setItem('theme', scheme);
    } catch {
      /* ignore */
    }
  }, [scheme]);

  const toggle = useCallback(() => {
    setScheme((s) => (s === 'dark' ? 'light' : 'dark'));
  }, []);

  return [scheme, toggle];
}
