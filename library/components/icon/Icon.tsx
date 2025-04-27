import { IconProps } from './Icon.d';
import React, { useRef } from 'react';
import clsx from 'clsx';
import { Tooltip } from '../tooltip/Tooltip';

export const Icon: React.FC<IconProps> = ({
  name,
  className,
  tooltip,
  tooltipPos,
  ...rest
}) => {
  const ref = useRef<HTMLElement | null>(null);
  return (
    <Tooltip
      className={className}
      hide={!tooltip}
      content={tooltip}
      position={tooltipPos ?? 'right'}
    >
      <i
        className={clsx('icon', `ic-${name}`)}
        ref={ref}
        aria-hidden="true"
        {...rest}
      />
    </Tooltip>
  );
};
