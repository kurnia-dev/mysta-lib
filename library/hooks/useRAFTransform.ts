import { RefObject, useCallback, useEffect, useRef } from 'react';

export function useRAFTransform(ref: RefObject<HTMLElement>) {
  const rafRef = useRef<number>();

  const setTransform = useCallback(
    (transform: string) => {
      if (rafRef.current !== undefined) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        if (ref.current) ref.current.style.transform = transform;
      });
    },
    [ref],
  );

  const setStyle = useCallback(
    (styles: Partial<CSSStyleDeclaration>) => {
      if (rafRef.current !== undefined) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        if (!ref.current) return;
        Object.assign(ref.current.style, styles);
      });
    },
    [ref],
  );

  useEffect(() => {
    return () => {
      if (rafRef.current !== undefined) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return { setStyle, setTransform };
}
