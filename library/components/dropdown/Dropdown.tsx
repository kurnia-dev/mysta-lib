import { Select } from 'radix-ui';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { useComponentPreset, useValidator } from 'lib/hooks';
import { PresetReturn } from 'lib/hooks/useComponentPreset';

import { FieldWrapper } from '../fieldwrapper/FieldWrapper';
import { Icon } from '../icon/Icon';

import { DropdownProps, OptionValue } from './Dropdown.d';
import { DropdownItem } from './DropdownItem';
import { callMultiTypeFn } from './helper';

export const Dropdown = (props: DropdownProps): JSX.Element => {
  const {
    onChange = () => {},

    label,
    disabled,
    options,
    placeholder = `Select ${label ?? 'item'}`,
    mode = 'single',
    info,
    value,
    fieldName = label ?? 'dropdown',
    hideRequiredMark = false,

    required,
    customValidation,
  } = props;

  const [localValue, setLocalValue] = useState<
    Record<string, OptionValue | OptionValue[]>
  >({});

  const fallBackMethods = useMemo(() => {
    return {
      watchedValue: localValue[fieldName],
      setValue: (name: string, value: OptionValue | OptionValue[]) => {
        setLocalValue((prev) => {
          if (mode === 'multi') {
            const current = prev[name];
            const currentArray = Array.isArray(current) ? current : [];

            return {
              [name]: [...currentArray, value] as OptionValue[],
            };
          }

          return { [name]: value as OptionValue };
        });
      },
      formState: { errors: {} },
      trigger: (name: string) => {
        const validity = callMultiTypeFn(
          mode,
          customValidation,
          localValue[name],
        );
        return validity === true;
      },
    };
  }, [localValue, customValidation, mode, fieldName]);

  const { methods: registeredMethods, ref } = useValidator<
    Record<string, OptionValue | OptionValue[]>
  >(
    useMemo(
      () => ({
        validate: (val: OptionValue | OptionValue[] | null) => {
          if (
            required &&
            ((mode === 'multi' && (!Array.isArray(val) || val.length === 0)) ||
              // eslint-disable-next-line eqeqeq
              (mode === 'single' && val == null))
          ) {
            return 'This field is required';
          }

          return callMultiTypeFn(mode, customValidation, val);
        },
      }),
      [customValidation, mode, required],
    ),
    fieldName,
  );

  const {
    setValue,
    watchedValue,
    trigger,
    formState: { errors = {} },
  } = registeredMethods ?? fallBackMethods;

  const preset =
    useComponentPreset('Dropdown', {
      props: { label },
    }) ?? {};

  useEffect(() => {
    const defaultValue = (() => {
      if (mode === 'multi') {
        return JSON.stringify([]);
      }
      return null;
    })();

    if (!watchedValue) {
      setValue(fieldName, value ?? defaultValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, watchedValue]);

  const normalizedOptions = useMemo(() => {
    return options.map((each) => {
      return {
        ...each,
        value: JSON.stringify(each.value),
      };
    });
  }, [options]);

  const handleChange = useCallback(
    async (val: string) => {
      const parsedValue = JSON.parse(val);

      setValue(fieldName, parsedValue);
      callMultiTypeFn(mode, onChange, parsedValue);
      await trigger(fieldName);
    },
    [setValue, fieldName, trigger, mode, onChange],
  );

  return (
    <FieldWrapper
      {...{ fieldName, required, label, info, errors, hideRequiredMark }}
      className="flex items-center gap-1"
      context={{
        invalid: !!errors?.[fieldName],
        disabled,
      }}
    >
      <Select.Root
        {...(preset.root as Pick<PresetReturn, 'className'>)}
        // eslint-disable-next-line eqeqeq
        value={watchedValue == null ? '' : JSON.stringify(watchedValue)}
        onValueChange={handleChange}
      >
        <Select.Trigger {...preset.trigger} name={fieldName}>
          <Select.Value placeholder={placeholder} />
          <Select.Icon {...preset.icon} asChild>
            <Icon name="chevron-down" />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            {...preset.content}
            position="popper"
            ref={ref}
            sideOffset={4}
          >
            <Select.ScrollUpButton asChild>
              <Icon className="w-full" name="chevron-up" />
            </Select.ScrollUpButton>
            <Select.Viewport className="p-1 w-full">
              {normalizedOptions.map((each) => {
                return <DropdownItem {...each} key={JSON.stringify(each)} />;
              })}
            </Select.Viewport>
            <Select.ScrollDownButton asChild>
              <Icon className="w-full" name="chevron-down" />
            </Select.ScrollDownButton>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </FieldWrapper>
  );
};
