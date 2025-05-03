/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useMemo } from 'react';
import {
  RegisterOptions,
  useController,
  UseControllerReturn,
} from 'react-hook-form';

import { BaseInputProps } from 'lib/components/private/BaseInput.d';
import { useEffectiveControl, useEffectiveRegister } from 'lib/hooks';

export type ValidatorOperator = 'empty' | 'exceed' | 'pattern';

export type FieldType =
  | 'text'
  | 'password'
  | 'email'
  | 'number'
  | 'checkbox'
  | 'radio';

export type ValidatorRules = {
  type: FieldType;
  required?: boolean;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  validate?:
    | ((value: any) => boolean | string)
    | Record<string, (value: any) => boolean | string>;
  customMessage?: Record<keyof RegisterOptions, string>;
  passwordRequirements?: BaseInputProps['passwordRequirements'];
};

export type ControllerConfig = {
  rules: Omit<ValidatorRules, 'type'>;
  defaultValue?: any;
};

export const useRegisterValidator = (
  config: ValidatorRules,
  fieldName: string,
): any => {
  const { register } = useEffectiveRegister() ?? {};

  const passwordValidations = useMemo(() => {
    return {
      'uppercase': (val: string) => {
        if (/[A-Z]/.test(val)) return true;
        return 'Password should contain an uppercase letter';
      },
      'lowercase': (val: string) => {
        if (/[a-z]/.test(val)) return true;
        return 'Password should contain a lowercase letter';
      },
      'special-character': (val: string) => {
        if (/[!@#$%^&*()_+{}[\]:;"'<>,.?/\\|`~-]/.test(val)) return true;
        return 'Password should contain a special character';
      },
      'alpha-numeric': (val: string) =>
        /[A-Za-z]/.test(val) && /\d/.test(val)
          ? true
          : 'Password should be alphanumeric',
    };
  }, []);

  const hasValidator = useCallback(
    (key: keyof RegisterOptions): boolean => {
      return Boolean(!!config[key] || !!config.customMessage?.[key]);
    },
    [config],
  );

  const validators = useMemo(() => {
    if (!register) return;

    const baseValidators: RegisterOptions = {
      ...(hasValidator('required') && {
        required: config.customMessage?.required ?? 'This field is required',
      }),
      ...(hasValidator('minLength') && {
        minLength: {
          value: config.minLength ?? 0,
          message:
            config.customMessage?.minLength ??
            `Min. ${config.minLength} characters`,
        },
      }),
      ...(hasValidator('maxLength') && {
        maxLength: {
          value: config.maxLength ?? Infinity,
          message:
            config.customMessage?.maxLength ??
            `Max. ${config.maxLength} characters`,
        },
      }),
      ...(hasValidator('min') && {
        min: {
          value: config.min ?? 0,
          message:
            config.customMessage?.min ??
            `Value should not lesser than ${config.min}`,
        },
      }),
      ...(hasValidator('max') && {
        max: {
          value: config.max ?? Infinity,
          message:
            config.customMessage?.max ??
            `Value should not greater than ${config.max}`,
        },
      }),
      ...(config.type === 'email' && {
        pattern: {
          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          message: config.customMessage?.pattern ?? 'Invalid email format',
        },
      }),
      ...(config.type === 'password' && {
        validate: config.passwordRequirements?.reduce(
          (acc, key) => {
            const validator = passwordValidations[key];
            if (validator) acc[key] = validator;
            return acc;
          },
          {} as Record<string, (val: string) => true | string>,
        ),
      }),
      ...(hasValidator('pattern') && {
        pattern: {
          value: config.pattern ?? /.*/,
          message: config.customMessage?.pattern ?? 'Invalid characters',
        },
      }),
      ...(config.validate ? { validate: config.validate } : {}),
    };
    return baseValidators;
  }, [config, register, hasValidator, passwordValidations]);

  if (!validators) return;
  return register(fieldName, validators);
};

export const useControllerValidator = (
  config: ControllerConfig,
  fieldName: string,
): UseControllerReturn => {
  const control = useEffectiveControl();

  return useController({
    name: fieldName,
    control,
    defaultValue: config.defaultValue,
    rules: config.rules,
  });
};
