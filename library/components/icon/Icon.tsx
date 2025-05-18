import clsx from 'clsx';
import React, { useRef } from 'react';

import { getSeverity } from 'lib/utils';

import { Tooltip } from '../tooltip/Tooltip';

import { IconProps } from './Icon.d';

export const Icon: React.FC<IconProps> = ({
  name,
  className,
  tooltip,
  tooltipPos,
  severity,
  ...rest
}) => {
  const ref = useRef<HTMLElement | null>(null);

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
