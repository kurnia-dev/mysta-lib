import clsx from 'clsx';

import { useComponentPreset } from '../../hooks';

export interface ProgressBarProps {
  value: number;
  max?: number;
  color?: string;
  animated?: boolean;
  label?: string;
  className?: string;
}

export function ProgressBar({
  value,
  max = 100,
  color,
  animated = false,
  label,
  className,
}: ProgressBarProps): JSX.Element {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const preset = useComponentPreset('ProgressBar', { props: { value, max, color, animated, label } }) ?? {};

  return (
    <div className={clsx(preset.root?.className, className)}>
      {label && (
        <div className={preset.label?.className}>
          <span className={preset.labelText?.className}>{label}</span>
          <span className={preset.labelValue?.className}>{Math.round(pct)}%</span>
        </div>
      )}
      <div
        aria-valuemax={max}
        aria-valuemin={0}
        aria-valuenow={value}
        className={preset.track?.className}
        role="progressbar"
      >
        <div
          className={clsx(
            // When color prop is provided, skip the preset fill className (bg-primary-500)
            // to let the inline style take precedence cleanly
            !color && preset.fill?.className,
            color && 'h-full rounded-full transition-all duration-300 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]',
            animated && 'animate-pulse',
          )}
          style={{
            width: `${pct}%`,
            ...(color ? { backgroundColor: color } : {}),
          }}
        />
      </div>
    </div>
  );
}
