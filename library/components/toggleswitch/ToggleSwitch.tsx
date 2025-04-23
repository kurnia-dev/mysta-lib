import { ToggleSwitchProps } from './ToggleSwitch.d';
import { useComponentPreset, useControllerValidator } from 'lib/hooks';
import { FieldWrapper } from '../fieldwrapper/FieldWrapper';
import { Icon } from '../icon/Icon';
import { useCallback, useEffect } from 'react';

export const ToggleSwitch: React.FC<ToggleSwitchProps> = (props) => {
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
    if (value !== null) {
      formOnChange(value);
    }
  }, [value]);

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
      onClick={handleChange}
      className="flex items-center gap-1"
      errors={error ? { [fieldName]: error } : {}}
      context={{
        invalid: !!error,
        disabled,
        borderless: true,
      }}
    >
      <div {...preset.box}>{createToggleSwitch()}</div>
      <input
        ref={ref}
        {...preset.input}
        checked={isChecked !== null}
        name={fieldName}
        disabled={disabled}
        type="checkbox"
        onChange={() => {}}
      />
    </FieldWrapper>
  );
};
