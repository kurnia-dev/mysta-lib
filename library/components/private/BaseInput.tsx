import clsx from 'clsx';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Path } from 'react-hook-form';

import { useComponentPreset, useValidator } from 'lib/hooks';
import { UseValidatorReturn } from 'lib/hooks/useValidator';
import { FieldPathValue } from 'lib/types/internalFields.type';

import { FieldWrapper } from '../fieldwrapper/FieldWrapper';
import { Icon } from '../icon/Icon';

import { BaseInputProps } from './BaseInput.d';

export const BaseInput = <T = string,>(props: BaseInputProps<T>) => {
  const {
    onChange = () => {},
    onInput = () => {},
    onBlur = () => {},
    onKeydown = () => {},

    label,
    disabled,
    info,
    fieldName = label ?? 'baseinput',
    placeholder = label ? `Input ${label.toLowerCase()}` : '',
    type = 'text',
    hideRequiredMark = false,
    value,

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

    pt,
  } = props as BaseInputProps<T>;

  const typedFieldName = useMemo(() => {
    return fieldName as Path<Record<string, T>>;
  }, [fieldName]);

  const [localValue, setLocalValue] = useState({});
  const [localErrors, setLocalErrors] = useState({});
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const fallBackMethods = useMemo(() => {
    return {
      watchedValue: localValue[fieldName],
      setValue: (name: string, value: T) => {
        setLocalValue({ [name]: value });
      },
      formState: { errors: localErrors },
      trigger: (name: string) => {
        const validity = customValidation?.(localValue[name]);
        return validity === true;
      },
    };
  }, [localErrors, localValue, customValidation, fieldName]);

  const preset =
    useComponentPreset('BaseInput', {
      props: { label, type },
    }) ?? {};

  const {
    ref,
    methods: registeredMethods,
    ...validator
  } = useValidator<Record<string, T>>(
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
    typedFieldName,
  ) ?? { ref: undefined };

  const {
    setValue,
    watchedValue,
    trigger,
    formState: { errors = {} },
  } = registeredMethods ??
  (fallBackMethods as unknown as UseValidatorReturn<Record<string, T>>);

  useEffect(() => {
    // eslint-disable-next-line eqeqeq
    if (value != null && value !== watchedValue) {
      setValue(typedFieldName, value as FieldPathValue<T>);
    }
  }, [value, typedFieldName, setValue, watchedValue]);

  const handleChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const currentValue = watchedValue;
      setValue(typedFieldName, e.target.value as FieldPathValue<T>);
      const isValid = await trigger(typedFieldName);

      if (preventInputOnError && errors[typedFieldName]?.type !== 'required') {
        if (!isValid) {
          setValue(typedFieldName, currentValue as FieldPathValue<T>);
          return;
        } else if (!registeredMethods) {
          setLocalErrors({ [typedFieldName]: value });
        }
      }

      onChange(e.target.value as T);
    },
    [
      watchedValue,
      setValue,
      trigger,
      preventInputOnError,
      onChange,
      errors,
      typedFieldName,
      value,
      registeredMethods,
    ],
  );

  const handleBlur = useCallback(
    async (e: React.FocusEvent<HTMLInputElement>) => {
      await trigger(typedFieldName);
      onBlur(e.target.value as T);
    },
    [trigger, onBlur, typedFieldName],
  );

  const handleInput = useCallback(
    async (e: React.FormEvent<HTMLInputElement>) => {
      onInput(e.currentTarget.value as T);
    },
    [onInput],
  );

  const handleKeydown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (type === 'number' && ['e', 'E', '+', '-'].includes(e.key)) {
        e.preventDefault();
      }

      onKeydown(e.key);
    },
    [type, onKeydown],
  );

  return (
    <FieldWrapper
      {...{
        required,
        info,
        label,
        errors,
        hideRequiredMark,
        fieldName: typedFieldName,
        pt: pt?.fieldWrapper,
      }}
      context={{
        invalid: !!errors[typedFieldName],
        disabled,
      }}
    >
      <input
        ref={ref}
        {...validator}
        {...preset.input}
        autoComplete="off"
        className={clsx(
          preset.input.className,
          pt?.input?.({ props: props as Partial<BaseInputProps> })?.className,
        )}
        disabled={disabled}
        name={typedFieldName}
        placeholder={placeholder}
        type={passwordVisibility && type === 'password' ? 'text' : type}
        onBlur={handleBlur}
        onChange={handleChange}
        onInput={handleInput}
        onKeyDown={handleKeydown}
      />
      {type === 'password' && (
        <Icon
          {...preset.eyetoggle}
          className={clsx(preset.eyetoggle.className, pt?.eyetoggle?.className)}
          name={passwordVisibility ? 'eye-off' : 'eye-on'}
          onClick={() => setPasswordVisibility(!passwordVisibility)}
        />
      )}
    </FieldWrapper>
  );
};
