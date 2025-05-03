import clsx from 'clsx';

import { useComponentPreset } from 'lib/hooks';

import { Icon } from '../icon/Icon';

import { FieldWrapperProps } from './FieldWrapper.d';

export const FieldWrapper = ({
  children,
  className,
  context,
  fieldName,
  info,
  label,
  required,
  errors,
  hideRequiredMark = false,

  onClick,
}: FieldWrapperProps) => {
  const preset =
    useComponentPreset('fieldwrapper', {
      context,
      className,
    }) ?? {};

  const createLabel = () => {
    return (
      label && (
        <label {...preset.labelContainer} htmlFor={fieldName}>
          <span {...preset.label}>{label}</span>
          {required && !hideRequiredMark && <span {...preset.required}>*</span>}
          {info && <Icon {...preset.info} name="info" tooltip={info} />}
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
    <div {...preset.root} {...interactiveProps}>
      {!context?.containerless && createLabel()}
      <div
        {...preset.field}
        className={clsx([preset.field?.className, className])}
      >
        {children}
        {context?.containerless && createLabel()}
      </div>
      {typeof errors[fieldName]?.message === 'string' && (
        <small {...preset.errorMessage}>{errors[fieldName]?.message}</small>
      )}
    </div>
  );
};
