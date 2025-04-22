import { useComponentPreset, useControllerValidator } from 'lib/hooks';
import { FieldWrapper } from '../fieldwrapper/FieldWrapper';
import { RadioButtonProps } from './RadioButton.d';
import { useCallback } from 'react';

export const RadioButton: React.FC<RadioButtonProps> = (props) => {
  const {
    onChange = () => {},

    label,
    disabled,
    optionValue,
    info,
    fieldName = 'radio',
    hideRequiredMark = false,

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
          return customValidation?.(val) ?? true;
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

  const handleChange = useCallback(() => {
    const newValue: RadioButtonProps['optionValue'] = optionValue;

    formOnChange(newValue);
    onChange(newValue);
  }, [formOnChange, onChange, fieldValue, optionValue]);

  return (
    <FieldWrapper
      {...{ fieldName, required, label, info, hideRequiredMark }}
      onClick={handleChange}
      className="flex items-center gap-1"
      errors={error ? { [fieldName]: error } : {}}
      context={{
        invalid: !!error,
        disabled,
        containerless: true,
      }}
    >
      <div {...preset.box} />
      {isChecked && <div {...preset.innerBox} />}
      <input
        ref={ref}
        {...preset.input}
        checked={isChecked}
        onChange={() => {}}
        name={fieldName}
        disabled={disabled}
        type="radio"
      />
    </FieldWrapper>
  );
};
