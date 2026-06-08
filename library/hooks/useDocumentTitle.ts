import { useEffect } from 'react';

export function useDocumentTitle(title: string, restoreOnUnmount = false): void {
  useEffect(() => {
    const prev = document.title;
    document.title = title;
    return () => {
      if (restoreOnUnmount) document.title = prev;
    };
  }, [title, restoreOnUnmount]);
}
