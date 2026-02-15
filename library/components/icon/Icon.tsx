import clsx from 'clsx';
import React, { forwardRef } from 'react';

import { getSeverity } from 'lib/utils';

import { Tooltip } from '../tooltip/Tooltip';

import { IconProps } from './Icon.d';

const IconBase = (
  {
    name,
    className,
    tooltipClassName,
    tooltip,
    tooltipPos,
    severity,
    ...rest
  }: IconProps,
  ref: React.ForwardedRef<HTMLElement>,
) => {
  const severityClass = severity
    ? getSeverity(severity, { text: 'medium' })
    : 'text-black';

  return (
    <Tooltip
      className={tooltipClassName}
      content={tooltip}
      hide={!tooltip}
      position={tooltipPos ?? 'right'}
    >
      <i
        aria-hidden="true"
        className={clsx('icon', `ic-${name}`, className || severityClass)}
        ref={ref}
        {...rest}
      />
    </Tooltip>
  );
};

export const Icon: React.FC<IconProps> = forwardRef<HTMLElement, IconProps>(
  IconBase,
);

Icon.displayName = 'Icon';
