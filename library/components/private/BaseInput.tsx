import { useComponentPreset, useRegisterValidator } from 'lib/hooks';
import { Icon } from '../icon/Icon';
import { useCallback, useEffect, useState } from 'react';
import { BaseInputProps } from './BaseInput.d';
import { FieldWrapper } from '../fieldwrapper/FieldWrapper';
import { InternalFieldProps } from 'lib/types';
import { FieldValues, UseFormReturn } from 'react-hook-form';

export const BaseInput = <T = string,>(props: BaseInputProps<T>) => {
  const {
    onChange = () => {},
    onInput = () => {},
    onBlur = () => {},
    onKeydown = () => {},

    placeholder,
    label,
    disabled,
    info,
    fieldName = label ?? 'baseinput',
    type = 'text',
    hideRequiredMark = false,
    value,
    methods,

    required,
    customMessage,
    min,
    max,
    minLength,
    maxLength,
    pattern,
    passwordRequirements,
    customValidation,
    preventInputOnError,
  } = props as BaseInputProps & InternalFieldProps;

  const [localValue, setLocalValue] = useState({});
  const [localErrors, setLocalErrors] = useState({});
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const fallBackMethods = {
    getValues: () => localValue,
    setValue: (name: string, value: T) => {
      setLocalValue({ [name]: value });
    },
    formState: { errors: localErrors },
    trigger: (name: string) => {
      const validity = customValidation?.(localValue[name]);
      return validity === true;
    },
  };

  const {
    setValue,
    getValues,
    trigger,
    formState: { errors = {} },
  } = (methods as UseFormReturn<FieldValues>) ?? fallBackMethods;

  const preset =
    useComponentPreset('baseinput', {
      props: { label, type },
    }) ?? {};

  const { ref, ...validator } = useRegisterValidator(
    {
      type,
      required,
      max,
      min,
      maxLength,
      minLength,
      pattern,
      validate: customValidation,
      customMessage,
      passwordRequirements,
    },
    fieldName,
  ) ?? { ref: undefined };

  const placeholderText =
    placeholder ?? (label ? `Input ${label.toLowerCase()}` : '');

  useEffect(() => {
    if (value !== null) {
      setValue(fieldName, value);
    }
  }, [value]);

  const handleChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const currentValue = getValues()[fieldName];
      setValue(fieldName, e.target.value);
      const isValid = await trigger(fieldName);

      if (preventInputOnError && errors[fieldName]?.type !== 'required') {
        if (!isValid) {
          setValue(fieldName, currentValue);
          return;
        } else if (!methods) {
          setLocalErrors({ [fieldName]: value });
        }
      }

      onChange(e.target.value);
    },
    [getValues, setValue, trigger, preventInputOnError, onChange],
  );

  const handleBlur = useCallback(
    async (e: React.FocusEvent<HTMLInputElement>) => {
      await trigger(fieldName);
      onBlur(e.target.value);
    },
    [trigger, onBlur],
  );

  const handleKeydown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (type === 'number' && ['e', 'E', '+', '-'].includes(e.key)) {
        e.preventDefault();
      }

      onKeydown(e.key);
    },
    [type],
  );

  return (
    <FieldWrapper
      {...{ required, fieldName, info, label, errors, hideRequiredMark }}
      context={{
        invalid: !!errors[fieldName],
        disabled,
      }}
    >
      <input
        ref={ref}
        {...validator}
        {...preset.input}
        autoComplete="off"
        onBlur={handleBlur}
        onChange={handleChange}
        onInput={onInput}
        onKeyDown={handleKeydown}
        name={fieldName}
        placeholder={placeholderText}
        disabled={disabled}
        type={passwordVisibility && type === 'password' ? 'text' : type}
      />
      {type === 'password' && (
        <Icon
          {...preset.eyetoggle}
          name={passwordVisibility ? 'eye-off' : 'eye-on'}
          onClick={() => setPasswordVisibility(!passwordVisibility)}
        />
      )}
    </FieldWrapper>
  );
};
