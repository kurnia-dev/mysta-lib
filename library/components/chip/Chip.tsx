import clsx from 'clsx';

import { useComponentPreset } from 'lib/hooks';

import { Icon } from '../icon/Icon';

import { ChipProps } from './Chip.d';

export const Chip = (props: ChipProps): JSX.Element => {
  const {
    label,
    icon,
    removable = false,
    onRemove,
    clickable = false,
    onClick,
    severity = 'secondary',
    variant = 'filled',
    size = 'md',
    disabled = false,
    className,
    pt,
  } = props;

  const preset =
    useComponentPreset('Chip', {
      props: { severity, variant, size },
      context: { clickable, removable, disabled },
    }) ?? {};

  const Component = clickable ? 'button' : 'div';

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onRemove && !disabled) {
      onRemove();
    }
  };

  return (
    <Component
      className={clsx(
        preset.root?.className,
        className,
        pt?.root?.({ props: { severity, variant, size } })?.className,
      )}
      disabled={disabled}
      style={pt?.root?.({ props: { severity, variant, size } })?.style}
      type={clickable ? 'button' : undefined}
      onClick={clickable && !disabled ? onClick : undefined}
    >
      {/* Icon */}
      {icon && (
        <Icon
          className={clsx(
            preset.icon?.className,
            pt?.icon?.({ props: { severity, variant, size } })?.className,
          )}
          name={icon}
          style={pt?.icon?.({ props: { severity, variant, size } })?.style}
        />
      )}

      {/* Label */}
      <span
        className={clsx(
          preset.label?.className,
          pt?.label?.({ props: { severity, variant, size } })?.className,
        )}
        style={pt?.label?.({ props: { severity, variant, size } })?.style}
      >
        {label}
      </span>

      {/* Remove Button */}
      {removable && (
        <button
          aria-label={`Remove ${label}`}
          className={clsx(
            preset.removeButton?.className,
            pt?.removeButton?.({ props: { severity, variant, size } })
              ?.className,
          )}
          disabled={disabled}
          style={
            pt?.removeButton?.({ props: { severity, variant, size } })?.style
          }
          type="button"
          onClick={handleRemove}
        >
          <Icon
            className={clsx(
              preset.removeIcon?.className,
              pt?.removeIcon?.({ props: { severity, variant, size } })
                ?.className,
            )}
            name="x"
            style={
              pt?.removeIcon?.({ props: { severity, variant, size } })?.style
            }
          />
        </button>
      )}
    </Component>
  );
};

Chip.displayName = 'Chip';
