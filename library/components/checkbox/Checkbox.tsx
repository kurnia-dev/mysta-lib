import clsx from 'clsx';
import { isEqual } from 'lodash';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { FieldErrors } from 'react-hook-form';

import { useComponentPreset, useValidator } from 'lib/hooks';

import { FieldWrapper } from '../fieldwrapper/FieldWrapper';
import { Icon } from '../icon/Icon';

import { CheckboxProps, CheckboxValue, ValueCheckboxProps } from './Checkbox.d';
import { callMultiTypeFn } from './helper';

export const Checkbox = memo((props: CheckboxProps): JSX.Element => {
  const {
    onChange = () => {},

    label,
    disabled,
    mode = 'binary',
    info,
    fieldName = label ?? 'checkbox',
    hideRequiredMark = false,
    value,

    required,
    customValidation,

    pt,
  } = props;

  const [localValue, setLocalValue] = useState<Record<string, CheckboxValue>>({});

  const optionValue =
    mode === 'value' ? (props as ValueCheckboxProps).optionValue : undefined;

  const isValueMode = !!optionValue && mode === 'value';

  const { methods: registeredMethods } =
    useValidator<Record<string, CheckboxValue>>(
      useMemo(
        () => ({
          validate: (val: CheckboxValue) => {
            if (
              required &&
              ((isValueMode && (!Array.isArray(val) || val.length === 0)) ||
                (mode === 'binary' && val !== true) ||
                // eslint-disable-next-line eqeqeq
                (mode === 'tristate' && val == null))
            ) {
              return 'This field is required';
            }
            return callMultiTypeFn(mode, customValidation as unknown as ((val: CheckboxValue) => boolean) | undefined, val);
          },
        }),
        [customValidation, mode, isValueMode, required],
      ),
      fieldName,
    ) ?? {};

  const {
    setValue = (name: string, value: CheckboxValue) => {
      setLocalValue({ [name]: value });
    },
    watchedValue = localValue[fieldName],
    trigger = (name: string) => {
      const validity = (customValidation as unknown as ((val: CheckboxValue) => boolean) | undefined)?.((localValue as Record<string, CheckboxValue>)[name]);
      return validity === true;
    },
    formState: { errors = {} as FieldErrors<Record<string, CheckboxValue>> } = {},
  } = registeredMethods ?? {};

  const isChecked = useMemo(() => {
    return isValueMode
      ? Array.isArray(watchedValue) &&
          watchedValue.some((each) => isEqual(each, optionValue))
      : watchedValue;
  }, [isValueMode, optionValue, watchedValue]);

  const context = useMemo(
    () => ({
      checked: isChecked,
      partialChecked: watchedValue === false && mode === 'tristate',
      tristate: mode === 'tristate',
      disabled,
    }),
    [disabled, isChecked, mode, watchedValue],
  );

  const preset =
    useComponentPreset('Checkbox', {
      props: { label },
      context,
    }) ?? {};

  useEffect(() => {
    const defaultValue = (() => {
      if (mode === 'value') {
        return [];
      }
      if (mode === 'tristate') {
        return null;
      }
      return false;
    })();

    if (watchedValue === undefined) {
      setValue(fieldName, value ?? defaultValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, watchedValue]);

  const handleChange = useCallback(async () => {
    let newValue: CheckboxValue = watchedValue;

    if (isValueMode) {
      if (!Array.isArray(watchedValue)) {
        newValue = [optionValue];
      } else if (
        Array.isArray(watchedValue) &&
        watchedValue.some((each) => isEqual(each, optionValue))
      ) {
        newValue = watchedValue.filter((each) => !isEqual(each, optionValue));
      } else if (watchedValue) {
        newValue = [...watchedValue, optionValue];
      }
    } else if (mode === 'tristate') {
      if (watchedValue === null) {
        newValue = true;
      } else if (watchedValue === true) {
        newValue = false;
      } else if (watchedValue === false) {
        newValue = null;
      }
    } else if (mode === 'binary') {
      newValue = !watchedValue;
    }

    setValue(fieldName, newValue);
    callMultiTypeFn(mode, onChange as unknown as ((val: CheckboxValue) => void) | undefined, newValue);
    await trigger(fieldName);
  }, [
    setValue,
    onChange,
    watchedValue,
    mode,
    trigger,
    isValueMode,
    optionValue,
    fieldName,
  ]);

  const createIconBox = useCallback(() => {
    const className = clsx(
      preset.icon.className,
      pt?.icon?.({ context, props })?.className,
    );

    const style = pt?.icon?.({ context, props })?.style;
    const commonProps = {
      ...preset.icon,
      className,
      style,
    };

    if (isChecked === true) {
      return <Icon {...commonProps} name="check-4" />;
    } else if (isChecked === false && mode === 'tristate') {
      return <Icon {...commonProps} name="minus-4" />;
    }

    return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChecked]);

  return (
    <FieldWrapper
      {...{
        fieldName,
        required,
        errors,
        label,
        info,
        hideRequiredMark,
        pt: pt?.fieldWrapper,
      }}
      className="flex items-center gap-1"
      context={{
        invalid: !!errors[fieldName],
        disabled,
        containerless: true,
        borderless: true,
      }}
      onClick={handleChange}
    >
      <div
        {...preset.box}
        className={clsx(
          preset.box.className,
          pt?.box?.({ context, props })?.className,
        )}
        style={pt?.box?.({ context, props })?.style}
      >
        {createIconBox()}
      </div>
      <input
        {...preset.input}
        className={clsx(
          preset.input.className,
          pt?.input?.({ context, props })?.className,
        )}
        disabled={disabled}
        name={fieldName}
        style={pt?.input?.({ context, props })?.style}
        type="checkbox"
      />
    </FieldWrapper>
  );
});

Checkbox.displayName = 'Checkbox';
