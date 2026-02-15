import clsx from 'clsx';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import { useComponentPreset } from 'lib/hooks';

import { BottomSheetProps } from './BottomSheet.d';

export const BottomSheet = (props: BottomSheetProps): JSX.Element | null => {
  const {
    visible,
    onHide,
    header,
    children,
    footer,
    size = 'md',
    dismissable = true,
    showHandle = true,
    className,
    pt,
  } = props;

  const preset =
    useComponentPreset('BottomSheet', {
      props: { size },
      context: { visible },
    }) ?? {};

  const sheetRef = useRef<HTMLDivElement>(null);

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (visible && dismissable && e.key === 'Escape') {
        onHide();
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [visible, dismissable, onHide]);

  // Lock body scroll when open
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [visible]);

  if (!visible) return null;

  return createPortal(
    <div
      className={clsx(
        preset.root?.className,
        className,
        pt?.root?.({ props: { size } })?.className,
      )}
    >
      {/* Backdrop */}
      <div
        className={clsx(
          preset.backdrop?.className,
          pt?.backdrop?.({ props: { size } })?.className,
        )}
        role="button"
        tabIndex={0}
        onClick={() => dismissable && onHide()}
        onKeyDown={() => {}}
      />

      {/* Sheet */}
      <div
        aria-modal="true"
        className={clsx(
          preset.container?.className,
          pt?.container?.({ props: { size } })?.className,
        )}
        ref={sheetRef}
        role="dialog"
      >
        {/* Handle */}
        {showHandle && (
          <div
            className={clsx(
              preset.handle?.className,
              pt?.handle?.({ props: { size } })?.className,
            )}
          />
        )}

        {/* Header */}
        {header && (
          <div
            className={clsx(
              preset.header?.className,
              pt?.header?.({ props: { size } })?.className,
            )}
          >
            {header}
          </div>
        )}

        {/* Content */}
        <div
          className={clsx(
            preset.content?.className,
            pt?.content?.({ props: { size } })?.className,
          )}
        >
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div
            className={clsx(
              preset.footer?.className,
              pt?.footer?.({ props: { size } })?.className,
            )}
          >
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
};

BottomSheet.displayName = 'BottomSheet';
