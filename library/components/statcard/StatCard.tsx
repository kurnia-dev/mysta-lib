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
      style={pt?.root?.({ props: { severity, size } })?.style}
      type={clickable ? 'button' : undefined}
      onClick={clickable ? onClick : undefined}
    >
      <div
        className={clsx(
          preset.header?.className,
          pt?.header?.({ props: { severity, size } })?.className,
        )}
        style={pt?.header?.({ props: { severity, size } })?.style}
      >
        <span
          className={clsx(
            preset.label?.className,
            pt?.label?.({ props: { severity, size } })?.className,
          )}
          style={pt?.label?.({ props: { severity, size } })?.style}
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
            style={pt?.icon?.({ props: { severity, size } })?.style}
          />
        )}
      </div>

      <div
        className={clsx(
          preset.value?.className,
          pt?.value?.({ props: { severity, size } })?.className,
        )}
        style={pt?.value?.({ props: { severity, size } })?.style}
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
              style={pt?.trend?.({ props: { severity, size } })?.style}
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
              style={pt?.subtitle?.({ props: { severity, size } })?.style}
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
