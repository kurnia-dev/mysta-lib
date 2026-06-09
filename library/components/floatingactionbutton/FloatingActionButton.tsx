import clsx from 'clsx';
import { useState } from 'react';

import { useComponentPreset } from '../../hooks';

import { Icon } from '../icon/Icon';

import { FloatingActionButtonProps } from './FloatingActionButton.d';

export const FloatingActionButton = (
  props: FloatingActionButtonProps,
): JSX.Element => {
  const {
    icon,
    label,
    onClick,
    position = 'bottom-right',
    size = 'md',
    severity = 'primary',
    extendedLabel,
    disabled = false,
    className,
    pt,
  } = props;

  const [isExtended, setIsExtended] = useState(false);

  const preset =
    useComponentPreset('FloatingActionButton', {
      props: { position, size, severity },
      context: { disabled, isExtended },
    }) ?? {};

  const context = { disabled: !!disabled, isExtended };

  return (
    <button
      aria-label={label}
      className={clsx(
        preset.root?.className,
        className,
        pt?.root?.({ context, props: { position, size, severity } })?.className,
      )}
      disabled={disabled}
      style={pt?.root?.({ context, props: { position, size, severity } })?.style}
      type="button"
      onBlur={() => setIsExtended(false)}
      onClick={onClick}
      onFocus={() => extendedLabel && setIsExtended(true)}
      onMouseEnter={() => extendedLabel && setIsExtended(true)}
      onMouseLeave={() => setIsExtended(false)}
    >
      <Icon
        className={clsx(
          preset.icon?.className,
          pt?.icon?.({ context, props: { position, size, severity } })?.className,
        )}
        name={icon}
        style={pt?.icon?.({ context, props: { position, size, severity } })?.style}
      />
      {extendedLabel && isExtended && (
        <span
          className={clsx(
            preset.label?.className,
            pt?.label?.({ context, props: { position, size, severity } })?.className,
          )}
          style={pt?.label?.({ context, props: { position, size, severity } })?.style}
        >
          {extendedLabel}
        </span>
      )}
    </button>
  );
};

FloatingActionButton.displayName = 'FloatingActionButton';
