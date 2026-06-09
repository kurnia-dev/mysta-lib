import clsx from 'clsx';

import { useComponentPreset } from '../../hooks';

export interface HPBarProps {
  value: number;
  max?: number;
  label?: string;
  color?: 'green' | 'yellow' | 'red' | 'blue' | 'purple';
  segments?: number;
  showValue?: boolean;
  className?: string;
}

const colorMap = {
  green: 'bg-emerald-400',
  yellow: 'bg-yellow-400',
  red: 'bg-red-500',
  blue: 'bg-blue-400',
  purple: 'bg-purple-400',
};

const glowMap = {
  green: 'shadow-emerald-400/50',
  yellow: 'shadow-yellow-400/50',
  red: 'shadow-red-500/50',
  blue: 'shadow-blue-400/50',
  purple: 'shadow-purple-400/50',
};

export function HPBar({
  value,
  max = 100,
  label,
  color = 'green',
  segments,
  showValue = false,
  className,
}: HPBarProps): JSX.Element {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const derivedColor = pct < 25 ? 'red' : pct < 50 ? 'yellow' : color;

  const preset = useComponentPreset('HPBar', { props: { value, max, label, color, segments, showValue } }) ?? {};

  return (
    <div className={clsx(preset.root?.className, className)}>
      {(label || showValue) && (
        <div className={preset.label?.className}>
          {label && (
            <span className={clsx(preset.value?.className, 'font-bold uppercase tracking-wider')}>
              {label}
            </span>
          )}
          {showValue && (
            <span className={preset.value?.className}>
              {Math.round(value)}/{max}
            </span>
          )}
        </div>
      )}
      <div
        aria-valuemax={max}
        aria-valuemin={0}
        aria-valuenow={value}
        className={preset.track?.className}
        role="progressbar"
      >
        {/* fill */}
        <div
          className={clsx(
            'h-full rounded-sm transition-all duration-500 shadow-md',
            colorMap[derivedColor],
            glowMap[derivedColor],
          )}
          style={{ width: `${pct}%` }}
        />
        {/* segment dividers */}
        {segments && segments > 1 && (
          <div className="absolute inset-0 flex pointer-events-none">
            {Array.from({ length: segments - 1 }, (_, i) => (
              <div
                className="flex-1 border-r border-black/40"
                key={i}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
