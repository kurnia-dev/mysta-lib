import { useForm } from 'lib/context';
import { useComponentPreset, useValidator } from 'lib/hooks';
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
    value,
    fieldName = 'inputtext',
    type = 'text',

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

  const { ref, ...validator } = useValidator(
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

  useEffect(() => {
    const current = getValues()[fieldName];
    if (value && value !== current) {
      setValue(fieldName, value);
    } else if (!value) {
      setValue(fieldName, undefined);
    }
  }, [value]);

  const placeholderText =
    placeholder ?? (label ? `Input ${label.toLowerCase()}` : '');

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
    <div {...preset.root}>
      <label {...preset.labelContainer} htmlFor={fieldName}>
        <span {...preset.label}>{label}</span>
        {required && <i {...preset.required}>*</i>}
        {info && <Icon {...preset.info} name="info" tooltip={info} />}
      </label>
      <FieldWrapper
        context={{
          invalid: !!errors[fieldName],
          disabled,
          containerless: type === 'checkbox',
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
      {typeof errors[fieldName]?.message === 'string' && (
        <small {...preset.errorMessage}>{errors[fieldName]?.message}</small>
      )}
    </div>
  );
};
