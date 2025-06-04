import clsx from 'clsx';
import React, { forwardRef } from 'react';

import { getSeverity } from 'lib/utils';

import { Tooltip } from '../tooltip/Tooltip';

import { IconProps } from './Icon.d';

const IconBase = (
  { name, className, tooltip, tooltipPos, severity, ...rest }: IconProps,
  ref: React.ForwardedRef<HTMLElement>,
) => {
  const severityClass = severity
    ? getSeverity(severity, { color: true })
    : 'text-black';

  return (
    <Tooltip
      className={className}
      content={tooltip}
      hide={!tooltip}
      position={tooltipPos ?? 'right'}
    >
      <i
        aria-hidden="true"
        className={clsx('icon', `ic-${name}`, severityClass)}
        ref={ref}
        {...rest}
      />
    </Tooltip>
  );
};

export const Icon = forwardRef<HTMLElement, IconProps>(IconBase);
Icon.displayName = 'Icon';
