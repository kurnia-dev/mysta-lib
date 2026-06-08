import { useEffect } from 'react';

/**
 * Registers a global keyboard shortcut.
 * Shortcut format: "ctrl+k", "meta+k", "shift+?", "escape", "arrowdown"
 * Keys are case-insensitive. Modifier order: ctrl / meta / shift / alt + key.
 */
export function useGlobalShortcut(
  shortcut: string,
  handler: (e: KeyboardEvent) => void,
  enabled = true,
): void {
  useEffect(() => {
    if (!enabled) return;
    const parts = shortcut.toLowerCase().split('+');
    const key = parts[parts.length - 1];
    const needsCtrl = parts.includes('ctrl');
    const needsMeta = parts.includes('meta');
    const needsShift = parts.includes('shift');
    const needsAlt = parts.includes('alt');

    const onKey = (e: KeyboardEvent) => {
      if (needsCtrl && !e.ctrlKey) return;
      if (needsMeta && !e.metaKey) return;
      if (needsShift && !e.shiftKey) return;
      if (needsAlt && !e.altKey) return;
      if (e.key.toLowerCase() !== key) return;
      handler(e);
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [shortcut, handler, enabled]);
}
