import { useRef, useState } from 'react';

export interface DragPos {
  x: number;
  y: number;
}

export interface DragState {
  pos: DragPos;
  dragging: boolean;
  handlers: {
    onPointerDown: (e: React.PointerEvent) => void;
    onPointerMove: (e: React.PointerEvent) => void;
    onPointerUp: () => void;
    onPointerCancel: () => void;
  };
}

export function useDraggable(initial: DragPos): DragState {
  const [pos, setPos] = useState<DragPos>({ x: initial.x, y: initial.y });
  const [dragging, setDragging] = useState(false);
  const offset = useRef({ x: 0, y: 0, parentLeft: 0, parentTop: 0 });

  const onDown = (e: React.PointerEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const parentEl = (e.currentTarget as HTMLElement).offsetParent;
    const parentRect = parentEl?.getBoundingClientRect() ?? { left: 0, top: 0 };
    offset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      parentLeft: parentRect.left,
      parentTop: parentRect.top,
    };
    setDragging(true);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    setPos({
      x: e.clientX - offset.current.parentLeft - offset.current.x,
      y: e.clientY - offset.current.parentTop - offset.current.y,
    });
  };

  const onUp = () => setDragging(false);

  return {
    pos,
    dragging,
    handlers: {
      onPointerDown: onDown,
      onPointerMove: onMove,
      onPointerUp: onUp,
      onPointerCancel: onUp,
    },
  };
}
