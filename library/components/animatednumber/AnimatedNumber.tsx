import { useCountUp } from '../../hooks';

export interface AnimatedNumberProps {
  from?: number;
  to: number;
  duration?: number;
  format?: (value: number) => string;
  className?: string;
}

export function AnimatedNumber({
  from = 0,
  to,
  duration = 400,
  format,
  className,
}: AnimatedNumberProps): JSX.Element {
  const value = useCountUp({ from, to, duration });
  const display = format ? format(value) : String(value);

  return (
    <span aria-atomic aria-live="polite" className={className}>
      {display}
    </span>
  );
}
