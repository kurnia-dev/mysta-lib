import clsx from 'clsx';
import { useEffect, useMemo, useRef, useState } from 'react';

import { useComponentPreset, useEscapeKey, useScrollLock } from 'lib/hooks';

export interface CommandItem {
  id: string;
  label: string;
  hint?: string;
  action: () => void;
}

export interface CommandPaletteProps {
  items: CommandItem[];
  open: boolean;
  onClose: () => void;
  placeholder?: string;
  className?: string;
}

export function CommandPalette({
  items,
  open,
  onClose,
  placeholder = '> search…',
  className,
}: CommandPaletteProps): JSX.Element {
  const [query, setQuery] = useState('');
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEscapeKey(onClose, open);
  useScrollLock(open);

  const preset = useComponentPreset('CommandPalette', {
    props: { items, open, onClose, placeholder, className },
    context: { open },
  }) ?? {};

  useEffect(() => {
    if (open) {
      setQuery('');
      setActiveIdx(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const filtered = useMemo(() => {
    if (!query.trim()) return items;
    const needle = query.toLowerCase();
    return items.filter(
      (it) =>
        it.label.toLowerCase().includes(needle) ||
        (it.hint ?? '').toLowerCase().includes(needle),
    );
  }, [items, query]);

  useEffect(() => { setActiveIdx(0); }, [query]);

  const execute = (item: CommandItem) => {
    item.action();
    onClose();
  };

  return (
    <>
      {/* Backdrop: aria-hidden removes from a11y tree, handles click-away */}
      <div
        aria-hidden
        className={clsx(
          preset.backdrop?.className,
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        )}
        onClick={onClose}
      />
      {/* Dialog: positioned above backdrop, no click handler */}
      <div
        aria-modal
        aria-label="Command palette"
        className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] pointer-events-none"
        role="dialog"
      >
      <div
        className={clsx(
          preset.panel?.className,
          'pointer-events-auto',
          open ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none',
          className,
        )}
      >
        <input
          className={clsx(preset.input?.className)}
          placeholder={placeholder}
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') {
              e.preventDefault();
              setActiveIdx((i) => Math.min(i + 1, filtered.length - 1));
            }
            if (e.key === 'ArrowUp') {
              e.preventDefault();
              setActiveIdx((i) => Math.max(i - 1, 0));
            }
            if (e.key === 'Enter' && filtered[activeIdx]) {
              execute(filtered[activeIdx]);
            }
          }}
        />
        <ul className={clsx(preset.results?.className)}>
          {filtered.length === 0 && (
            <li className="px-4 py-3 text-xs text-secondary-400 text-center">no matches</li>
          )}
          {filtered.map((item, i) => (
            <li
              aria-selected={i === activeIdx}
              className={clsx(
                preset.result?.className,
                'cursor-pointer',
                i === activeIdx && preset.activeResult?.className,
              )}
              key={item.id}
              role="option"
              onClick={() => execute(item)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') execute(item); }}
              onMouseEnter={() => setActiveIdx(i)}
            >
              <span>{item.label}</span>
              {item.hint && (
                <span className={clsx(preset.resultHint?.className, 'bg-secondary-100 px-1.5 py-0.5 rounded font-mono')}>
                  {item.hint}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
      </div>
    </>
  );
}
