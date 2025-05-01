import { IconProps } from './Icon.d';
import React, { useRef } from 'react';
import clsx from 'clsx';
import { Tooltip } from '../tooltip/Tooltip';
import { getSeverity } from 'lib/utils';

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
    : 'text-black hover:text-white';

  return (
    <Tooltip
      className={className}
      hide={!tooltip}
      content={tooltip}
      position={tooltipPos ?? 'right'}
    >
      <i
        className={clsx('icon', `ic-${name}`, severityClass)}
        ref={ref}
        aria-hidden="true"
        {...rest}
      />
    </Tooltip>
  );
};
