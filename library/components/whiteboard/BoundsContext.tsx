import { createContext, RefObject, useContext } from 'react';

export interface BoundsContextValue {
  boundsRef: RefObject<HTMLDivElement> | null;
  bringToFront: (id: string) => void;
  getZIndex: (id: string) => number;
}

export const BoundsContext = createContext<BoundsContextValue>({
  boundsRef: null,
  bringToFront: () => undefined,
  getZIndex: () => 1,
});

export function useBounds(): BoundsContextValue {
  return useContext(BoundsContext);
}
