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
    href,
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

  const context = { clickable: !!clickable, removable: !!removable, disabled: !!disabled };
  const ptArgs = { context, props: { severity, variant, size } };

  // Pre-compute all pt slots once (N: avoid double-calling slot functions)
  const rootPt = pt?.root?.(ptArgs);
  const iconPt = pt?.icon?.(ptArgs);
  const labelPt = pt?.label?.(ptArgs);
  const removeButtonPt = pt?.removeButton?.(ptArgs);
  const removeIconPt = pt?.removeIcon?.(ptArgs);

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onRemove && !disabled) onRemove();
  };

  const rootClassName = clsx(preset.root?.className, className, rootPt?.className);
  const rootStyle = rootPt?.style;

  // L: when both href and removable are set, outer element must be div
  // (button nested inside <a> is invalid HTML)
  const isAnchorRoot = !!href && !removable;
  const Component = isAnchorRoot ? 'a' : clickable ? 'button' : 'div';
  const rootOnClick = isAnchorRoot || (clickable && !disabled) ? onClick : undefined;

  const rootProps = isAnchorRoot
    ? { href, rel: 'noopener noreferrer', className: rootClassName, style: rootStyle, onClick: rootOnClick } // M: rel for security
    : clickable
    ? { type: 'button' as const, disabled, className: rootClassName, style: rootStyle, onClick: rootOnClick }
    : { className: rootClassName, style: rootStyle };

  const iconEl = icon ? (
    <Icon
      className={clsx(preset.icon?.className, iconPt?.className)}
      name={icon}
      style={iconPt?.style}
    />
  ) : null;

  const labelEl = (
    <span
      className={clsx(preset.label?.className, labelPt?.className)}
      style={labelPt?.style}
    >
      {label}
    </span>
  );

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Component {...(rootProps as any)}>
      {/* L: when href+removable, wrap icon+label in <a> so link still works */}
      {href && removable ? (
        <a href={href} rel="noopener noreferrer">
          {iconEl}
          {labelEl}
        </a>
      ) : (
        <>
          {iconEl}
          {labelEl}
        </>
      )}
      {removable && (
        <button
          aria-label={`Remove ${label}`}
          className={clsx(preset.removeButton?.className, removeButtonPt?.className)}
          disabled={disabled}
          style={removeButtonPt?.style}
          type="button"
          onClick={handleRemove}
        >
          <Icon
            className={clsx(preset.removeIcon?.className, removeIconPt?.className)}
            name="x"
            style={removeIconPt?.style}
          />
        </button>
      )}
    </Component>
  );
};

Chip.displayName = 'Chip';
