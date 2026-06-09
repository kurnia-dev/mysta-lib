import clsx from 'clsx';
import { ReactNode, useRef, useState } from 'react';

import { useComponentPreset, useDraggable } from '../../hooks';
import { StampBadge } from '../stampbadge/StampBadge';

export interface PolaroidCardProps {
  caption: string;
  tagline?: string;
  image?: string;
  imageContent?: ReactNode;
  stampLabel?: string;
  stampClassName?: string;
  initialX?: number;
  initialY?: number;
  initialRotation?: number;
  draggable?: boolean;
  zIndex?: number;
  onBringToFront?: () => void;
  onOpen?: () => void;
  className?: string;
}

export function PolaroidCard({
  caption,
  tagline,
  image,
  imageContent,
  stampLabel,
  stampClassName,
  initialX = 0,
  initialY = 0,
  initialRotation = 0,
  draggable = true,
  zIndex = 1,
  onBringToFront,
  onOpen,
  className,
}: PolaroidCardProps): JSX.Element {
  const { pos, dragging, handlers } = useDraggable({ x: initialX, y: initialY });
  const [hinted, setHinted] = useState(false);
  const downRef = useRef({ x: 0, y: 0 });
  const hintTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const preset = useComponentPreset('PolaroidCard', {
    props: { caption, tagline, image, imageContent, stampLabel, stampClassName, initialX, initialY, initialRotation, draggable, zIndex, onBringToFront, onOpen, className },
    context: { dragging },
  }) ?? {};

  const dragProps = draggable
    ? {
        ...handlers,
        onPointerDown: (e: React.PointerEvent) => {
          downRef.current = { x: e.clientX, y: e.clientY };
          onBringToFront?.();
          handlers.onPointerDown(e);
        },
        onPointerUp: (e: React.PointerEvent) => {
          handlers.onPointerUp();
          const dx = e.clientX - downRef.current.x;
          const dy = e.clientY - downRef.current.y;
          if (Math.hypot(dx, dy) >= 5) return;
          if (onOpen) {
            if (hinted) {
              if (hintTimer.current) clearTimeout(hintTimer.current);
              setHinted(false);
              onOpen();
            } else {
              setHinted(true);
              if (hintTimer.current) clearTimeout(hintTimer.current);
              hintTimer.current = setTimeout(() => setHinted(false), 1500);
            }
          }
        },
      }
    : {};

  return (
    <div
      className={clsx(
        preset.root?.className,
        dragging && 'shadow-xl',
        draggable && 'cursor-grab',
        dragging && 'cursor-grabbing',
        className,
      )}
      style={{
        position: 'absolute',
        left: pos.x,
        top: pos.y,
        zIndex: dragging ? 9999 : zIndex,
        transform: `rotate(${initialRotation}deg)`,
        transition: dragging ? 'none' : 'box-shadow 0.2s ease',
        padding: '8px 8px 32px',
        width: 180,
      }}
      {...dragProps}
      onDoubleClick={() => { setHinted(false); onOpen?.(); }}
    >
      {/* Tape strip */}
      <div className={clsx(preset.tape?.className)} />
      {stampLabel && (
        <StampBadge
          className={clsx('absolute top-2 right-2', stampClassName)}
          label={stampLabel}
        />
      )}
      <div className={clsx(preset.photo?.className)}>
        {image ? (
          <img alt={caption} className="w-full h-full object-cover" src={image} />
        ) : imageContent ? (
          imageContent
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs text-secondary-400 font-mono">
            {caption}
          </div>
        )}
        {hinted && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white text-[0.65rem]">
            click again to open ↗
          </div>
        )}
      </div>
      <p className={clsx(preset.caption?.className)}>{caption}</p>
      {tagline && <p className={clsx(preset.tagline?.className)}>{tagline}</p>}
      {onOpen && (
        <button
          className={clsx(preset.openButton?.className)}
          type="button"
          onClick={(e) => { e.stopPropagation(); onOpen(); }}
        >
          open ↗
        </button>
      )}
    </div>
  );
}
