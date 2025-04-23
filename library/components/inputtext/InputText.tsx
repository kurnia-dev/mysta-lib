import { useForm } from 'lib/context';
import { useComponentPreset, useRegisterValidator } from 'lib/hooks';
import { Icon } from '../icon/Icon';
import { useCallback, useEffect, useState } from 'react';
import { InputTextProps } from './InputText.d';
import { FieldWrapper } from '../fieldwrapper/FieldWrapper';

export const InputText: React.FC<InputTextProps> = (props) => {
  const {
    onChange = () => {},
    onInput = () => {},
    onBlur = () => {},
    onKeydown = () => {},

    placeholder,
    label,
    disabled,
    info,
    fieldName = label ?? 'inputtext',
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
  } = props;

  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const { methods } = useForm();

  const {
    setValue,
    getValues,
    trigger,
    formState: { errors = {} },
  } = methods;

  const preset =
    useComponentPreset('inputtext', {
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
  );

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
