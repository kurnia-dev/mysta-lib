import { useComponentPreset, useValidator } from 'lib/hooks';
import { FieldWrapper } from '../fieldwrapper/FieldWrapper';
import { Icon } from '../icon/Icon';
import { CheckboxProps } from './Checkbox.d';
import { useCallback, useEffect } from 'react';
import { useForm } from 'lib/context';

export const Checkbox: React.FC<CheckboxProps> = (props) => {
  const {
    onChange = () => {},

    label,
    disabled,
    tristate,
    binary,
    info,
    value,
    fieldName = 'checkbox',

    required,
    customValidation,
  } = props;

  const { methods } = useForm();

  const {
    setValue,
    getValues,
    watch,
    formState: { errors = {} },
  } = methods;

  const preset =
    useComponentPreset('checkbox', {
      props: { label },
      context: {
        checked: watch(fieldName),
        partialChecked: watch(fieldName) === false && tristate,
      },
    }) ?? {};

  const { ref, ...validator } = useValidator(
    {
      type: 'checkbox',
      required,
      validate: customValidation,
    },
    fieldName,
  );

  useEffect(() => {
    // const current = getValues()[fieldName];
    // console.log('🚀 ~ useEffect ~ current:', current);
    // if (value && value !== current) {
    //   setValue(fieldName, value);
    // } else if (!value) {
    //   setValue(fieldName, '');
    // }

    console.log('🚀 ~ useEffect ~ watch(fieldName):', watch(fieldName));
  }, [value, fieldName, setValue, watch]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const current = getValues()[fieldName];
      console.log('🚀 ~ current:', current);

      let newValue: string | boolean | '' = current;

      if (tristate) {
        if (current === '') {
          newValue = true;
        } else if (current === true) {
          newValue = false;
        } else if (current === false) {
          newValue = '';
        }
      } else if (binary) {
        newValue = e.target.checked;
      }

      setValue(fieldName, newValue);
      console.log('🚀 ~ watch(fieldName):', fieldName, watch(fieldName));
      console.log('🚀 ~ watch():', watch());
    },
    [getValues, setValue, fieldName, onChange, tristate, binary, watch],
  );
  return (
    <div {...preset.root}>
      <FieldWrapper
        className="flex items-center gap-1"
        context={{
          invalid: !!errors[fieldName],
          disabled,
          containerless: true,
        }}
      >
        <div {...preset.box}>
          {watch(fieldName) === true ? (
            <Icon name="check-4" className="!w-4 !h-4 text-white" />
          ) : watch(fieldName) === false ? (
            <Icon name="minus-4" className="!w-4 !h-4 text-white" />
          ) : (
            ''
          )}
        </div>
        <input
          ref={ref}
          {...validator}
          {...preset.input}
          onChange={handleChange}
          name={fieldName}
          disabled={disabled}
          type="checkbox"
        />
        <label {...preset.labelContainer} htmlFor={fieldName}>
          {JSON.stringify(watch(fieldName))}
          <span {...preset.label}>{label}</span>
          {required && <i {...preset.required}>*</i>}
          {info && <Icon {...preset.info} name="info" tooltip={info} />}
        </label>
      </FieldWrapper>
      {typeof errors[fieldName]?.message === 'string' && (
        <small {...preset.errorMessage}>{errors[fieldName]?.message}</small>
      )}
    </div>
  );
};
