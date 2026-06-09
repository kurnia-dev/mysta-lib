import clsx from 'clsx';

import { useComponentPreset } from '../../hooks';

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
      context: context ?? {},
    }) ?? {};

  const createLabel = () => {
    return (
      label && (
        <label
          {...preset.labelContainer}
          className={clsx(
            preset.labelContainer.className,
            pt?.labelContainer?.({ context: context ?? {}, props })?.className,
          )}
          htmlFor={fieldName}
          style={{
            ...pt?.labelContainer?.({ context: context ?? {}, props })?.style,
          }}
        >
          <span
            {...preset.label}
            className={clsx(preset.label.className, pt?.label?.className)}
            style={pt?.label?.style}
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
              style={pt?.required?.style}
            >
              *
            </span>
          )}
          {info && (
            <Icon
              {...preset.info}
              className={clsx(preset.info.className, pt?.info?.className)}
              name="info"
              style={pt?.info?.style}
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
      onClick?.();
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
        pt?.root?.({ context: context ?? {}, props })?.className,
      )}
      style={pt?.root?.({ context: context ?? {}, props })?.style}
    >
      {!context?.containerless && createLabel()}
      <div
        {...preset.field}
        className={clsx([
          preset.field?.className,
          className,
          pt?.field?.({ context: context ?? {}, props })?.className,
        ])}
        style={pt?.field?.({ context: context ?? {}, props })?.style}
      >
        {children}
        {context?.containerless && createLabel()}
      </div>
      {fieldName && typeof errors[fieldName as string]?.message === 'string' && (
        <small
          {...preset.errorMessage}
          className={clsx(
            preset.errorMessage.className,
            pt?.errorMessage?.className,
          )}
          style={pt?.errorMessage?.style}
        >
          {errors[fieldName as string]?.message as string}
        </small>
      )}
    </div>
  );
};
