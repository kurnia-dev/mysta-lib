import { useCallback, useEffect } from 'react';

import { useComponentPreset, useControllerValidator } from 'lib/hooks';

import { FieldWrapper } from '../fieldwrapper/FieldWrapper';

import {
  FieldValidation,
  RadioButtonEvent,
  RadioButtonProps,
} from './RadioButton.d';

export const RadioButton = (props: RadioButtonProps) => {
  const {
    onChange = () => {},

    label,
    disabled,
    optionValue,
    info,
    fieldName = label ?? 'radio',
    hideRequiredMark = false,
    value,

    required,
    customValidation,
  } = props;

  const {
    field: { value: fieldValue, onChange: formOnChange, ref },
    fieldState: { error },
  } = useControllerValidator(
    {
      rules: {
        validate: (val: RadioButtonProps['optionValue']) => {
          if (required && val === null) {
            return 'This field is required';
          }

          if (typeof optionValue === 'string') {
            return (
              (
                customValidation as FieldValidation<string>['customValidation']
              )?.(val as string) ?? true
            );
          } else if (typeof optionValue === 'boolean') {
            return (
              (
                customValidation as FieldValidation<boolean>['customValidation']
              )?.(val as boolean) ?? true
            );
          }
          return true;
        },
      },
    },
    fieldName,
  );

  const isChecked = fieldValue === optionValue;

  const preset =
    useComponentPreset('radiobutton', {
      props: { label },
      context: {
        checked: isChecked,
        disabled,
      },
    }) ?? {};

  useEffect(() => {
    if (value !== null) {
      formOnChange(value);
    }
  }, [value, formOnChange]);

  const handleChange = useCallback(() => {
    const newValue: RadioButtonProps['optionValue'] = optionValue;

    formOnChange(newValue);

    if (typeof optionValue === 'string') {
      return (
        (onChange as RadioButtonEvent<string>['onChange'])?.(
          newValue as string,
        ) ?? true
      );
    } else if (typeof optionValue === 'boolean') {
      return (
        (onChange as RadioButtonEvent<boolean>['onChange'])?.(
          newValue as boolean,
        ) ?? true
      );
    }
  }, [formOnChange, onChange, optionValue]);

  return (
    <FieldWrapper
      {...{ fieldName, required, label, info, hideRequiredMark }}
      className="flex items-center gap-1"
      context={{
        invalid: !!error,
        disabled,
        containerless: true,
      }}
      errors={error ? { [fieldName]: error } : {}}
      onClick={handleChange}
    >
      <div {...preset.box} />
      {isChecked && <div {...preset.innerBox} />}
      <input
        ref={ref}
        {...preset.input}
        checked={isChecked}
        disabled={disabled}
        name={fieldName}
        type="radio"
        onChange={() => {}}
      />
    </FieldWrapper>
  );
};
