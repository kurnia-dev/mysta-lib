import clsx from 'clsx';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FieldErrors } from 'react-hook-form';

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

    pt,
  } = props;

  const [localValue, setLocalValue] = useState<Record<string, string | boolean | null>>({});

  const fallBackMethods = useMemo(() => {
    return {
      watchedValue: (localValue as Record<string, string | boolean | null>)[fieldName] ?? undefined,
      setValue: (name: string, value: boolean | null) => {
        setLocalValue({ [name]: value });
      },
      formState: { errors: {} as Record<string, { message?: string }> },
      trigger: (name: string) => {
        const validity = callMultiTypeFn(
          typeof optionValue,
          customValidation as unknown as ((val: RadioButtonProps['optionValue']) => boolean) | undefined,
          (localValue as Record<string, string | boolean | null>)[name] ?? undefined,
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

            return callMultiTypeFn(typeof optionValue, customValidation as unknown as ((val: RadioButtonProps['optionValue']) => boolean) | undefined, val ?? undefined);
          },
        }),
        [customValidation, optionValue, required],
      ),
      fieldName,
    ) ?? {};

  const {
    setValue,
    watchedValue,
    formState: { errors = {} as FieldErrors<Record<string, string | boolean | null>> },
  } = registeredMethods ?? fallBackMethods;

  const isChecked = watchedValue === optionValue;

  const fieldWrapperContext = useMemo(
    () => ({
      invalid: !!errors[fieldName],
      disabled,
      containerless: true,
    }),
    [disabled, errors, fieldName],
  );

  const presetContext = useMemo(
    () => ({
      checked: isChecked,
      disabled,
    }),
    [disabled, isChecked],
  );

  const preset =
    useComponentPreset('RadioButton', {
      props: { label },
      context: presetContext,
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

    if (watchedValue === undefined || value !== watchedValue) {
      setValue(fieldName, value ?? defaultValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, watchedValue]);

  const handleChange = useCallback(() => {
    const newValue: RadioButtonProps['optionValue'] = optionValue;

    setValue(fieldName, newValue);

    if (typeof optionValue === 'string') {
      return onChange
        ? (onChange as RadioButtonEvent<string>['onChange'])?.(
            newValue as string,
          )
        : true;
    } else if (typeof optionValue === 'boolean') {
      return onChange
        ? (onChange as RadioButtonEvent<boolean>['onChange'])?.(
            newValue as boolean,
          )
        : true;
    }
  }, [optionValue, setValue, fieldName, onChange]);

  return (
    <FieldWrapper
      {...{
        fieldName,
        required,
        label,
        errors,
        info,
        hideRequiredMark,
        pt: pt?.fieldWrapper,
      }}
      className="flex items-center gap-1"
      context={fieldWrapperContext}
      onClick={handleChange}
    >
      <div
        {...preset.box}
        className={clsx(
          preset.box.className,
          pt?.box?.({ context: presetContext, props })?.className,
        )}
        style={pt?.box?.({ context: presetContext, props })?.style}
      />
      {isChecked && (
        <div
          {...preset.innerBox}
          className={clsx(
            preset.innerBox.className,
            pt?.innerBox?.({ context: presetContext, props })?.className,
          )}
          style={pt?.innerBox?.({ context: presetContext, props })?.style}
        />
      )}
      <input
        {...preset.input}
        className={clsx(
          preset.input.className,
          pt?.input?.({ context: presetContext, props })?.className,
        )}
        disabled={disabled}
        name={fieldName}
        style={pt?.input?.({ context: presetContext, props })?.style}
        type="radio"
        onChange={() => {}}
      />
    </FieldWrapper>
  );
};
