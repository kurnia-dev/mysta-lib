import clsx from 'clsx';
import { useCallback, useMemo } from 'react';
import { BiLoaderAlt } from 'react-icons/bi';

import { useComponentPreset } from 'lib/hooks';

import { Icon } from '../icon/Icon';

import { ButtonProps } from './Button.d';

export const Button = (props: ButtonProps): JSX.Element => {
  const {
    icon,
    iconPos = 'left',
    label,
    severity = 'primary',
    onClick = () => {},
    disabled = false,
    height = 26,
    loading = false,
    outlined = false,
    raised = false,
    text = false,
    width = 'max-content',
    type = 'button',
    className,

    pt,
  } = props;

  const context = useMemo(
    () => ({ disabled: !!loading || !!disabled }),
    [loading, disabled],
  );

  const preset =
    useComponentPreset('Button', {
      context,
      props: {
        height,
        width,
        label,
        outlined,
        raised,
        text,
        severity,
      },
    }) ?? {};

  const createIcon = useCallback(() => {
    if (!icon && !loading) return <span />;
    else if (icon && !loading)
      return (
        <Icon
          {...preset.icon}
          className={clsx(
            preset.icon?.className,
            pt?.icon?.({ context, props })?.className,
          )}
          name={icon}
          style={{ ...(preset.icon?.style ?? {}), ...(pt?.icon?.({ context, props })?.style ?? {}) }}
        />
      );
    return (
      <BiLoaderAlt
        className={clsx(
          preset.loadingIcon?.className,
          pt?.loadingIcon?.({ context, props })?.className,
        )}
        style={pt?.loadingIcon?.({ context, props })?.style}
      />
    );
  }, [
    context,
    icon,
    loading,
    preset.icon,
    preset.loadingIcon?.className,
    props,
    pt,
  ]);

  const createLabel = useCallback(
    () => (
      <span
        {...preset.label}
        className={clsx(
          preset.label?.className,
          pt?.label?.({ context, props })?.className,
        )}
        style={{ ...(preset.label?.style ?? {}), ...(pt?.label?.({ context, props })?.style ?? {}) }}
      >
        {label}
      </span>
    ),
    [context, label, preset.label, props, pt],
  );

  return (
    <button
      {...preset.root}
      className={clsx(
        preset.root?.className,
        className,
        { 'flex-row-reverse': iconPos === 'right' },
        pt?.root?.({ context, props })?.className,
      )}
      style={{ ...(preset.root?.style ?? {}), ...(pt?.root?.({ context, props })?.style ?? {}) }}
      type={type}
      onClick={onClick}
    >
      {(icon || loading) && createIcon()}
      {label && createLabel()}
    </button>
  );
};
