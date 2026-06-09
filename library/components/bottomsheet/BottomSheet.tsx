import clsx from 'clsx';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import { useComponentPreset } from '../../hooks';

import { BottomSheetProps } from './BottomSheet.d';

export const BottomSheet = (props: BottomSheetProps): JSX.Element => {
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

  const context = { visible };

  const preset =
    useComponentPreset('BottomSheet', {
      props: { size },
      context,
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

  return createPortal(
    <div
      aria-hidden={!visible}
      className={clsx(
        preset.root?.className,
        className,
        pt?.root?.({ context, props: { size } })?.className,
      )}
      style={pt?.root?.({ context, props: { size } })?.style}
    >
      {/* Backdrop */}
      <div
        className={clsx(
          preset.backdrop?.className,
          pt?.backdrop?.({ context, props: { size } })?.className,
          'transition-opacity duration-300',
          visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        )}
        role="button"
        style={pt?.backdrop?.({ context, props: { size } })?.style}
        tabIndex={0}
        onClick={() => dismissable && onHide()}
        onKeyDown={() => {}}
      />

      {/* Sheet */}
      <div
        aria-modal="true"
        className={clsx(
          preset.container?.className,
          pt?.container?.({ context, props: { size } })?.className,
          'transition-transform duration-300 ease-in-out',
          visible ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-full opacity-0 pointer-events-none',
        )}
        ref={sheetRef}
        role="dialog"
        style={pt?.container?.({ context, props: { size } })?.style}
      >
        {/* Handle */}
        {showHandle && (
          <div
            className={clsx(
              preset.handle?.className,
              pt?.handle?.({ context, props: { size } })?.className,
            )}
            style={pt?.handle?.({ context, props: { size } })?.style}
          />
        )}

        {/* Header */}
        {header && (
          <div
            className={clsx(
              preset.header?.className,
              pt?.header?.({ context, props: { size } })?.className,
            )}
            style={pt?.header?.({ context, props: { size } })?.style}
          >
            {header}
          </div>
        )}

        {/* Content */}
        <div
          className={clsx(
            preset.content?.className,
            pt?.content?.({ context, props: { size } })?.className,
          )}
          style={pt?.content?.({ context, props: { size } })?.style}
        >
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div
            className={clsx(
              preset.footer?.className,
              pt?.footer?.({ context, props: { size } })?.className,
            )}
            style={pt?.footer?.({ context, props: { size } })?.style}
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
