import clsx from 'clsx';
import { ReactNode, useId } from 'react';

import { useComponentPreset, useDraggable } from 'lib/hooks';

export interface StickyNoteProps {
  text: string;
  initialX?: number;
  initialY?: number;
  initialRotation?: number;
  color?: string;
  zIndex?: number;
  onBringToFront?: () => void;
  className?: string;
  textClassName?: string;
  icon?: ReactNode;
}

const defaultColors = ['#fef08a', '#bbf7d0', '#bfdbfe', '#fecaca', '#e9d5ff'];

export function StickyNote({
  text,
  initialX = 0,
  initialY = 0,
  initialRotation = 0,
  color,
  zIndex = 1,
  onBringToFront,
  className,
  textClassName,
  icon,
}: StickyNoteProps): JSX.Element {
  const id = useId();
  const noteColor = color ?? defaultColors[Math.abs(id.charCodeAt(id.length - 2) % defaultColors.length)];
  const { pos, dragging, handlers } = useDraggable({ x: initialX, y: initialY });

  const preset = useComponentPreset('StickyNote', {
    props: { text, initialX, initialY, initialRotation, color, zIndex, onBringToFront, className },
    context: { dragging },
  }) ?? {};

  return (
    <div
      className={clsx(
        preset.root?.className,
        dragging && 'cursor-grabbing shadow-xl',
        !dragging && 'cursor-grab',
        className,
      )}
      style={{
        position: 'absolute',
        left: pos.x,
        top: pos.y,
        zIndex: dragging ? 9999 : zIndex,
        backgroundColor: noteColor,
        transform: `rotate(${initialRotation}deg)`,
        transition: dragging ? 'none' : 'box-shadow 0.2s ease',
      }}
      onPointerCancel={handlers.onPointerCancel}
      onPointerDown={(e) => {
        onBringToFront?.();
        handlers.onPointerDown(e);
      }}
      onPointerMove={handlers.onPointerMove}
      onPointerUp={handlers.onPointerUp}
    >
      {icon && <div className="mb-1.5">{icon}</div>}
      <div className={clsx(preset.text?.className, textClassName)}>
        {text}
      </div>
    </div>
  );
}
