import clsx from 'clsx';
import { ReactNode } from 'react';

import { useComponentPreset, useDraggable } from '../../hooks';

export interface PinnedPaperProps {
  title?: string;
  children: ReactNode;
  draggable?: boolean;
  initialX?: number;
  initialY?: number;
  initialRotation?: number;
  zIndex?: number;
  onBringToFront?: () => void;
  width?: number | string;
  className?: string;
  contentClassName?: string;
}

export function PinnedPaper({
  title,
  children,
  draggable = true,
  initialX = 0,
  initialY = 0,
  initialRotation = 0,
  zIndex = 1,
  onBringToFront,
  width = 260,
  className,
  contentClassName,
}: PinnedPaperProps): JSX.Element {
  const { pos, dragging, handlers } = useDraggable({ x: initialX, y: initialY });

  const preset = useComponentPreset('PinnedPaper', {
    props: { title, children, draggable, initialX, initialY, initialRotation, zIndex, onBringToFront, width, className },
    context: { dragging },
  }) ?? {};

  const dragProps = draggable
    ? {
        ...handlers,
        onPointerDown: (e: React.PointerEvent) => {
          onBringToFront?.();
          handlers.onPointerDown(e);
        },
      }
    : {};

  return (
    <div
      className={clsx(
        preset.root?.className,
        draggable && !dragging && 'cursor-grab',
        dragging && 'cursor-grabbing shadow-xl',
        className,
      )}
      style={{
        left: pos.x,
        top: pos.y,
        zIndex: dragging ? 9999 : zIndex,
        transform: `rotate(${initialRotation}deg)`,
        transition: dragging ? 'none' : 'box-shadow 0.2s ease',
        width: typeof width === 'number' ? `${width}px` : width,
      }}
      {...dragProps}
    >
      {/* Pin */}
      <div className={clsx(preset.pin?.className)} />
      {title && (
        <h3 className={clsx(preset.title?.className)}>{title}</h3>
      )}
      <div className={clsx(preset.content?.className, contentClassName)}>{children}</div>
    </div>
  );
}
