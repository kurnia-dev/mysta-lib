import clsx from 'clsx';
import { useComponentPreset } from 'lib/hooks';

export interface StampBadgeProps {
  /** The stamp text. Keep short — max ~8 chars. Open string: known values 'live', 'wip', 'archived' get built-in colors. */
  label: string;
  /** Rotation angle in degrees. Default: -12 */
  rotate?: number;
  className?: string;
}

const knownColors: Record<string, string> = {
  live: 'border-emerald-500 text-emerald-600',
  wip: 'border-amber-500 text-amber-600',
  archived: 'border-secondary-400 text-secondary-400',
};

export function StampBadge({ label, rotate = -12, className }: StampBadgeProps): JSX.Element {
  const preset = useComponentPreset('StampBadge', { props: { label, rotate } }) ?? {};
  const colorClass = knownColors[label.toLowerCase()] ?? 'border-primary-500 text-primary-600';

  return (
    <span
      className={clsx(
        colorClass,
        preset.root?.className,
        className,
      )}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {label}
    </span>
  );
}

StampBadge.displayName = 'StampBadge';
