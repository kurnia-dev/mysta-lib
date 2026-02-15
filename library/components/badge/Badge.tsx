import clsx from 'clsx';
import { useCallback, useMemo } from 'react';

import { useComponentPreset } from 'lib/hooks';

import { Icon } from '../icon/Icon';
import { Icons } from '../icon/Icon.d';

import { BadgeProps } from './Badge.d';

export const Badge = (props: BadgeProps): JSX.Element => {
  const {
    label,
    severity = 'primary',
    className,

    icon,
    iconPos = 'right',

    type = 'dot',

    pt,
  } = props;

  const preset =
    useComponentPreset('Badge', {
      props: {
        label,
        severity,
        iconPos,
        type,
      },
    }) ?? {};

  const iconName = useMemo<Icons>(() => {
    if (type === 'dot') return 'circle-fill';
    return icon;
  }, [type, icon]);

  const createIcon = useCallback(() => {
    return (
      <div {...preset.iconContainer}>
        <Icon
          {...preset.icon}
          className={clsx(
            preset.icon?.className,
            pt?.icon?.({ props })?.className,
          )}
          name={iconName}
        />
      </div>
    );
  }, [iconName, preset.icon, preset.iconContainer, props, pt]);

  const createLabel = useCallback(
    () => (
      <span
        {...preset.label}
        className={clsx(
          preset.label.className,
          pt?.label?.({ props })?.className,
        )}
      >
        {label}
      </span>
    ),
    [label, preset.label, props, pt],
  );

  return (
    <div
      {...preset.root}
      className={clsx(
        preset.root.className,
        className,
        pt?.root?.({ props })?.className,
      )}
    >
      {createLabel()}
      {icon && createIcon()}
    </div>
  );
};
