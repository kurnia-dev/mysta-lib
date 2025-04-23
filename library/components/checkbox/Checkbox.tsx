import { useComponentPreset, useControllerValidator } from 'lib/hooks';
import { FieldWrapper } from '../fieldwrapper/FieldWrapper';
import { Icon } from '../icon/Icon';
import { CheckboxProps } from './Checkbox.d';
import { useCallback, useEffect } from 'react';
import { isEqual } from 'lodash';

export const Checkbox: React.FC<CheckboxProps> = (props) => {
  const {
    onChange = () => {},

    label,
    disabled,
    mode = 'binary',
    optionValue,
    info,
    fieldName = label ?? 'checkbox',
    hideRequiredMark = false,
    role = 'checkbox',
    value,

    required,
    customValidation,
  } = props;

  const isValueMode = !!optionValue && mode === 'value';

  const {
    field: { value: fieldValue, onChange: formOnChange, ref },
    fieldState: { error },
  } = useControllerValidator(
    {
      defaultValue: (() => {
        if (isValueMode) return [];
        return mode === 'tristate' ? null : false;
      })(),
      rules: {
        validate: (val: CheckboxProps['optionValue'][] | boolean | null) => {
          if (
            required &&
            ((isValueMode && (!Array.isArray(val) || val.length === 0)) ||
              (mode === 'binary' && val !== true) ||
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

  const isChecked = isValueMode
    ? Array.isArray(fieldValue) &&
      fieldValue.some((each) => isEqual(each, optionValue))
    : fieldValue;

  const preset =
    useComponentPreset(role, {
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
  }, [value]);

  const handleChange = useCallback(() => {
    let newValue: CheckboxProps['optionValue'][] | boolean | null = fieldValue;

    if (isValueMode) {
      if (!Array.isArray(fieldValue)) {
        newValue = [optionValue];
      } else if (
        Array.isArray(fieldValue) &&
        fieldValue.some((each) => isEqual(each, optionValue))
      ) {
        newValue = fieldValue.filter((each) => !isEqual(each, optionValue));
      } else if (fieldValue) {
        newValue = [...fieldValue, optionValue];
      }
    } else if (mode === 'tristate') {
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
  }, [formOnChange, onChange, fieldValue, mode, isValueMode, optionValue]);

  const createToggleSwitch = () => {
    return (
      <div {...preset.iconContainer}>
        <Icon name="circle-fill" {...preset.icon} />
      </div>
    );
  };

  const createIconBox = () => {
    if (isChecked === true) {
      return <Icon {...preset.icon} name="check-4" />;
    } else if (isChecked === false && mode === 'tristate') {
      return <Icon {...preset.icon} name="minus-4" />;
    }

    return null;
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
        containerless: role === 'checkbox',
        borderless: true,
      }}
    >
      <div {...preset.box}>
        {role === 'checkbox' ? createIconBox() : createToggleSwitch()}
      </div>
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
