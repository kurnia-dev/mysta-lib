import clsx from 'clsx';
import { useCallback, useMemo } from 'react';

import { useComponentPreset } from '../../hooks';

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

  const iconName = useMemo<Icons | undefined>(() => {
    if (type === 'dot') return 'circle-fill';
    return icon;
  }, [type, icon]);

  const createIcon = useCallback(() => {
    if (!iconName) return null;

    return (
      <div {...preset.iconContainer}>
        <Icon
          {...preset.icon}
          className={clsx(
            preset.icon?.className,
            pt?.icon?.({ props })?.className,
          )}
          name={iconName}
          style={pt?.icon?.({ props })?.style}
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
        style={pt?.label?.({ props })?.style}
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
      style={pt?.root?.({ props })?.style}
    >
      {createLabel()}
      {createIcon()}
    </div>
  );
};
