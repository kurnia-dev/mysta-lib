import clsx from 'clsx';

import { useComponentPreset } from 'lib/hooks';

import { Icon } from '../icon/Icon';

import { StatCardProps } from './StatCard.d';

export const StatCard = (props: StatCardProps): JSX.Element => {
  const {
    value,
    label,
    icon,
    trend,
    trendUp,
    subtitle,
    severity = 'neutral',
    size = 'md',
    clickable = false,
    onClick,
    className,
    pt,
  } = props;

  const preset =
    useComponentPreset('StatCard', {
      props: { severity, size },
      context: { clickable, trendUp },
    }) ?? {};

  const Component = clickable ? 'button' : 'div';

  return (
    <Component
      className={clsx(
        preset.root?.className,
        className,
        pt?.root?.({ props: { severity, size } })?.className,
      )}
      type={clickable ? 'button' : undefined}
      onClick={clickable ? onClick : undefined}
    >
      <div
        className={clsx(
          preset.header?.className,
          pt?.header?.({ props: { severity, size } })?.className,
        )}
      >
        <span
          className={clsx(
            preset.label?.className,
            pt?.label?.({ props: { severity, size } })?.className,
          )}
        >
          {label}
        </span>
        {icon && (
          <Icon
            className={clsx(
              preset.icon?.className,
              pt?.icon?.({ props: { severity, size } })?.className,
            )}
            name={icon}
          />
        )}
      </div>

      <div
        className={clsx(
          preset.value?.className,
          pt?.value?.({ props: { severity, size } })?.className,
        )}
      >
        {value}
      </div>

      {(trend || subtitle) && (
        <div className="flex items-center gap-2 mt-2">
          {trend && (
            <span
              className={clsx(
                preset.trend?.className,
                pt?.trend?.({ props: { severity, size } })?.className,
              )}
            >
              {trendUp ? '↑' : '↓'} {trend}
            </span>
          )}
          {subtitle && (
            <span
              className={clsx(
                preset.subtitle?.className,
                pt?.subtitle?.({ props: { severity, size } })?.className,
              )}
            >
              {subtitle}
            </span>
          )}
        </div>
      )}
    </Component>
  );
};

StatCard.displayName = 'StatCard';
