import { IconProps } from './Icon.d';
import { Tooltip } from 'primereact/tooltip';
import React from 'react';
import clsx from 'clsx';

export const Icon: React.FC<IconProps> = ({
  name,
  className,
  tooltip,
  tooltipPos,
  ...rest
}) => {
  return (
    <>
      {tooltip && (
        <Tooltip target={`.ic-${name}`} position={tooltipPos ?? 'right'} />
      )}

      <i
        className={clsx('icon', `ic-${name}`, className)}
        aria-hidden="true"
        data-pr-tooltip={tooltip}
        {...rest}
      />
    </>
  );
};
