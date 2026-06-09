import clsx from 'clsx';
import { ReactNode, useRef } from 'react';

import { useClickOutside, useComponentPreset, useEscapeKey, useScrollLock } from '../../hooks';

export interface SlideoverProps {
  open: boolean;
  onClose: () => void;
  side?: 'left' | 'right';
  width?: number | string;
  children: ReactNode;
  className?: string;
}

export function Slideover({
  open,
  onClose,
  side = 'right',
  width = 400,
  children,
  className,
}: SlideoverProps): JSX.Element {
  const panelRef = useRef<HTMLDivElement>(null);
  useEscapeKey(onClose, open);
  useScrollLock(open);
  useClickOutside(panelRef, onClose, open);

  const preset = useComponentPreset('Slideover', {
    props: { open, onClose, side, width, children, className },
    context: { open },
  }) ?? {};

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden
        className={clsx(
          preset.backdrop?.className,
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        )}
        onClick={onClose}
      />
      {/* Panel */}
      <div
        aria-modal
        className={clsx(
          preset.panel?.className,
          side === 'right' ? 'right-0' : 'left-0',
          !open && side === 'right' && 'translate-x-full',
          !open && side === 'left' && '-translate-x-full',
          open && 'translate-x-0',
          className,
        )}
        ref={panelRef}
        role="dialog"
        style={{ width: typeof width === 'number' ? `${width}px` : width }}
      >
        <button
          aria-label="Close panel"
          className={clsx(preset.closeButton?.className)}
          type="button"
          onClick={onClose}
        >
          <svg fill="none" height="16" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" width="16">
            <line x1="18" x2="6" y1="6" y2="18" />
            <line x1="6" x2="18" y1="6" y2="18" />
          </svg>
        </button>
        <div className={clsx(preset.content?.className)}>{children}</div>
      </div>
    </>
  );
}
