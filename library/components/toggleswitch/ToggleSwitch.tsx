import { useCallback, useEffect } from 'react';

import { useComponentPreset, useControllerValidator } from 'lib/hooks';

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

  const {
    field: { value: fieldValue, onChange: formOnChange, ref },
    fieldState: { error },
  } = useControllerValidator(
    {
      defaultValue: mode === 'tristate' ? null : false,
      rules: {
        validate: (val: boolean | null) => {
          if (
            required &&
            ((mode === 'binary' && val !== true) ||
              (mode === 'tristate' && val === null))
          ) {
            return 'This field is required';
          }
          return customValidation?.(val) ?? true;
        },
      },
    },
    fieldName,
  );

  const isChecked = fieldValue;

  const preset =
    useComponentPreset('toggleswitch', {
      props: { label },
      context: {
        checked: isChecked,
        partialChecked: fieldValue === false && mode === 'tristate',
        tristate: mode === 'tristate',
        disabled,
      },
    }) ?? {};

  useEffect(() => {
    if (value !== undefined) {
      formOnChange(value);
    }
  }, [value, formOnChange]);

  const handleChange = useCallback(() => {
    let newValue: boolean | null = fieldValue;

    if (mode === 'tristate') {
      if (fieldValue === null) {
        newValue = true;
      } else if (fieldValue === true) {
        newValue = false;
      } else if (fieldValue === false) {
        newValue = null;
      }
    } else if (mode === 'binary') {
      newValue = !fieldValue;
    }

    formOnChange(newValue);
    onChange(newValue);
  }, [formOnChange, onChange, fieldValue, mode]);

  const createToggleSwitch = () => {
    return (
      <div {...preset.iconContainer}>
        <Icon name="circle-fill" {...preset.icon} />
      </div>
    );
  };

  return (
    <FieldWrapper
      {...{ fieldName, required, label, info, hideRequiredMark }}
      className="flex items-center gap-1"
      context={{
        invalid: !!error,
        disabled,
        borderless: true,
      }}
      errors={error ? { [fieldName]: error } : {}}
      onClick={handleChange}
    >
      <div {...preset.box}>{createToggleSwitch()}</div>
      <input
        ref={ref}
        {...preset.input}
        checked={isChecked !== null}
        disabled={disabled}
        name={fieldName}
        type="checkbox"
        onChange={() => {}}
      />
    </FieldWrapper>
  );
};
