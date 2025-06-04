import { useCallback, useEffect, useMemo, useState } from 'react';

import { useComponentPreset, useValidator } from 'lib/hooks';

import { callMultiTypeFn } from '../checkbox/helper';
import { FieldWrapper } from '../fieldwrapper/FieldWrapper';
import { Icon } from '../icon/Icon';

import { ToggleSwitchProps } from './ToggleSwitch.d';

export const ToggleSwitch = (props: ToggleSwitchProps) => {
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
        const validity = customValidation?.(localValue[name]);
        return validity === true;
      },
    };
  }, [localValue, customValidation, fieldName]);

  const { methods: registeredMethods } =
    useValidator(
      useMemo(
        () => ({
          validate: (val: boolean | null) => {
            if (
              required &&
              ((mode === 'binary' && val !== true) ||
                // eslint-disable-next-line eqeqeq
                (mode === 'tristate' && val == null))
            ) {
              return 'This field is required';
            }

            return callMultiTypeFn(mode, customValidation, val);
          },
        }),
        [customValidation, mode, required],
      ),
      fieldName,
    ) ?? {};

  const {
    setValue,
    watchedValue,
    formState: { errors = {} },
  } = registeredMethods ?? fallBackMethods;

  const isChecked = watchedValue;

  const preset =
    useComponentPreset('ToggleSwitch', {
      props: { label },
      context: {
        checked: isChecked,
        partialChecked: watchedValue === false && mode === 'tristate',
        tristate: mode === 'tristate',
        disabled,
      },
    }) ?? {};

  useEffect(() => {
    const defaultValue = (() => {
      if (mode === 'tristate') return null;
      return false;
    })();

    if (watchedValue === undefined) {
      setValue(fieldName, value ?? defaultValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, watchedValue]);

  const handleChange = useCallback(() => {
    let newValue: boolean | null = watchedValue;

    if (mode === 'tristate') {
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
    onChange(newValue);
  }, [setValue, onChange, watchedValue, fieldName, mode]);

  const createToggleSwitch = () => {
    return (
      <div {...preset.iconContainer}>
        <Icon name="circle-fill" {...preset.icon} />
      </div>
    );
  };

  return (
    <FieldWrapper
      {...{ fieldName, required, label, errors, info, hideRequiredMark }}
      className="flex items-center gap-1"
      context={{
        invalid: !!errors[fieldName],
        disabled,
        borderless: true,
      }}
      onClick={handleChange}
    >
      <div {...preset.box}>{createToggleSwitch()}</div>
      <input
        {...preset.input}
        disabled={disabled}
        name={fieldName}
        type="checkbox"
        onChange={() => {}}
      />
    </FieldWrapper>
  );
};
