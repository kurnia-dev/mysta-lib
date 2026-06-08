import { useEffect, useRef, useState } from 'react';

export function useClock(format?: (date: Date) => string): string {
  const fmtRef = useRef(format ?? ((d: Date) => d.toLocaleTimeString()));

  const [time, setTime] = useState(() => fmtRef.current(new Date()));

  useEffect(() => {
    const id = setInterval(() => setTime(fmtRef.current(new Date())), 1000);
    return () => clearInterval(id);
  }, []);

  return time;
}
