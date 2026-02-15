import clsx from 'clsx';

import { useComponentPreset } from 'lib/hooks';

import { Icon } from '../icon/Icon';

import { FieldWrapperProps } from './FieldWrapper.d';

export const FieldWrapper = (props: FieldWrapperProps) => {
  const {
    children,
    className,
    context,
    fieldName,
    info,
    label,
    required,
    errors,
    hideRequiredMark = false,

    pt,

    onClick,
  } = props;

  const preset =
    useComponentPreset('FieldWrapper', {
      context,
    }) ?? {};

  const createLabel = () => {
    return (
      label && (
        <label
          {...preset.labelContainer}
          className={clsx(
            preset.labelContainer.className,
            pt?.labelContainer?.({ context, props })?.className,
          )}
          htmlFor={fieldName}
        >
          <span
            {...preset.label}
            className={clsx(preset.label.className, pt?.label?.className)}
          >
            {label}
          </span>
          {required && !hideRequiredMark && (
            <span
              {...preset.required}
              className={clsx(
                preset.required.className,
                pt?.required?.className,
              )}
            >
              *
            </span>
          )}
          {info && (
            <Icon
              {...preset.info}
              className={clsx(preset.info.className, pt?.info?.className)}
              name="info"
              tooltip={info}
            />
          )}
        </label>
      )
    );
  };

  const handleKeydown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  const interactiveProps = onClick
    ? { onClick, onKeyDown: handleKeydown, role: 'button' }
    : {};

  return (
    <div
      {...preset.root}
      {...interactiveProps}
      className={clsx(
        preset.root.className,
        pt?.root?.({ context, props })?.className,
      )}
    >
      {!context?.containerless && createLabel()}
      <div
        {...preset.field}
        className={clsx([
          preset.field?.className,
          className,
          pt?.field?.({ context, props })?.className,
        ])}
      >
        {children}
        {context?.containerless && createLabel()}
      </div>
      {typeof errors[fieldName]?.message === 'string' && (
        <small
          {...preset.errorMessage}
          className={clsx(
            preset.errorMessage.className,
            pt?.errorMessage?.className,
          )}
        >
          {errors[fieldName]?.message}
        </small>
      )}
    </div>
  );
};
