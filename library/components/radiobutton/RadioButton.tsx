import { useCallback, useEffect, useMemo, useState } from 'react';

import { useComponentPreset, useValidator } from 'lib/hooks';

import { FieldWrapper } from '../fieldwrapper/FieldWrapper';

import { RadioButtonEvent, RadioButtonProps } from './RadioButton.d';
import { callMultiTypeFn } from './helper';

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

  const [localValue, setLocalValue] = useState({});

  const fallBackMethods = useMemo(() => {
    return {
      watchedValue: localValue[fieldName],
      setValue: (name: string, value: boolean | null) => {
        setLocalValue({ [name]: value });
      },
      formState: { errors: {} },
      trigger: (name: string) => {
        const validity = callMultiTypeFn(
          typeof optionValue,
          customValidation,
          localValue[name],
        );
        return validity === true;
      },
    };
  }, [localValue, fieldName, optionValue, customValidation]);

  const { methods: registeredMethods } =
    useValidator(
      useMemo(
        () => ({
          validate: (val: boolean | null) => {
            // eslint-disable-next-line eqeqeq
            if (required && val == null) {
              return 'This field is required';
            }

            return callMultiTypeFn(typeof optionValue, customValidation, val);
          },
        }),
        [customValidation, optionValue, required],
      ),
      fieldName,
    ) ?? {};

  const {
    setValue,
    watchedValue,
    formState: { errors = {} },
  } = registeredMethods ?? fallBackMethods;

  const isChecked = watchedValue === optionValue;

  const preset =
    useComponentPreset('RadioButton', {
      props: { label },
      context: {
        checked: isChecked,
        disabled,
      },
    }) ?? {};

  useEffect(() => {
    const defaultValue = (() => {
      if (typeof optionValue === 'string') {
        return '';
      }
      if (typeof optionValue === 'boolean') {
        return false;
      }
      return false;
    })();

    if (!watchedValue) {
      setValue(fieldName, value ?? defaultValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, watchedValue]);

  const handleChange = useCallback(() => {
    const newValue: RadioButtonProps['optionValue'] = optionValue;

    setValue(fieldName, newValue);

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
  }, [optionValue, setValue, fieldName, onChange]);

  return (
    <FieldWrapper
      {...{ fieldName, required, label, errors, info, hideRequiredMark }}
      className="flex items-center gap-1"
      context={{
        invalid: !!errors[fieldName],
        disabled,
        containerless: true,
      }}
      onClick={handleChange}
    >
      <div {...preset.box} />
      {isChecked && <div {...preset.innerBox} />}
      <input
        {...preset.input}
        disabled={disabled}
        name={fieldName}
        type="radio"
        onChange={() => {}}
      />
    </FieldWrapper>
  );
};
