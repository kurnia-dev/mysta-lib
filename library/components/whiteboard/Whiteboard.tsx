import clsx from 'clsx';
import { CSSProperties, ReactNode, useCallback, useRef, useState } from 'react';

import { BoundsContext } from './BoundsContext';

export interface WhiteboardProps {
  width?: number | string;
  height?: number | string;
  background?: 'paper' | 'grid' | 'dots' | 'plain';
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

const bgStyles: Record<NonNullable<WhiteboardProps['background']>, string> = {
  plain: 'bg-white dark:bg-gray-900',
  paper: 'bg-amber-50 dark:bg-gray-900',
  grid: 'bg-white dark:bg-gray-900 [background-image:linear-gradient(rgba(0,0,0,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.05)_1px,transparent_1px)] [background-size:24px_24px]',
  dots: 'bg-white dark:bg-gray-900 [background-image:radial-gradient(rgba(0,0,0,.15)_1px,transparent_1px)] [background-size:20px_20px]',
};

export function Whiteboard({
  width = '100%',
  height = 600,
  background = 'paper',
  children,
  className,
  style,
}: WhiteboardProps): JSX.Element {
  const boundsRef = useRef<HTMLDivElement>(null);
  const [zStack, setZStack] = useState<string[]>([]);

  const bringToFront = useCallback((id: string) => {
    setZStack((prev) => [...prev.filter((x) => x !== id), id]);
  }, []);

  const getZIndex = useCallback(
    (id: string) => {
      const idx = zStack.indexOf(id);
      return idx === -1 ? 1 : idx + 2;
    },
    [zStack],
  );

  return (
    <BoundsContext.Provider value={{ boundsRef, bringToFront, getZIndex }}>
      <div
        className={clsx('relative overflow-hidden', bgStyles[background], className)}
        ref={boundsRef}
        style={{
          width: typeof width === 'number' ? `${width}px` : width,
          height: typeof height === 'number' ? `${height}px` : height,
          ...style,
        }}
      >
        {children}
      </div>
    </BoundsContext.Provider>
  );
}
