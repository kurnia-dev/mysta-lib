/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  cloneElement,
  forwardRef,
  isValidElement,
  Ref,
  useImperativeHandle,
} from 'react';

import { FormProvider, useForm } from 'lib/context';
import { InternalFieldProps } from 'lib/types';

import { Button } from '../button/Button';
import { Slot } from '../slot/Slot';

import { ButtonConfig, FormHandle, FormProps } from './Form.d';

const FormContent = <T extends Record<string, any>>(
  {
    children,
    resetOnSubmit,
    onSubmit,
    onError,
    buttonsConfig,
    slots,
  }: FormProps<T>,
  ref: Ref<FormHandle<T>>,
) => {
  const { methods } = useForm<T>();
  const {
    handleSubmit,
    reset,
    resetField,
    getValues,
    setValue,
    setError,
    clearErrors,
    watch,
    formState: { errors, isDirty, dirtyFields },
  } = methods;

  const handleFormSubmit = (values: T) => {
    onSubmit(values);
    if (resetOnSubmit) reset();
  };

  const createChildren = () => {
    if (Array.isArray(children)) {
      return children.map((child, index) => {
        return isValidElement(child)
          ? cloneElement(child as React.ReactElement<InternalFieldProps<T>>, {
              methods,
              key: child.key ?? index,
            })
          : child;
      });
    } else if (isValidElement(children)) {
      return cloneElement(
        children as React.ReactElement<InternalFieldProps<T>>,
        { methods },
      );
    }

    return children;
  };

  const createButton = () => {
    const uniqueButtons = new Set();

    return buttonsConfig.map(({ type, label, severity, style }) => {
      if (uniqueButtons.has(type)) return;
      uniqueButtons.add(type);
      return (
        <Button
          key={type}
          label={label}
          outlined={style === 'outlined'}
          severity={severity}
          text={style === 'text'}
          type={type === 'submit' ? 'submit' : 'button'}
          onClick={() => (type === 'reset' ? reset() : undefined)}
        />
      );
    });
  };

  useImperativeHandle(
    ref,
    () => ({
      resetField,
      reset,
      getValues,
      setValue,
      setError,
      clearErrors,
      errors,
      watch,
      isDirty,
      dirtyFields,
    }),
    [
      resetField,
      reset,
      getValues,
      setValue,
      setError,
      clearErrors,
      errors,
      watch,
      isDirty,
      dirtyFields,
    ],
  );

  return (
    <form onSubmit={handleSubmit(handleFormSubmit, onError)}>
      <div className="grid grid-cols-2 gap-x-2 gap-y-2">
        {createChildren()}

        <Slot name="footer" slots={slots}>
          <div className="col-span-2 gap-1 flex justify-end w-full">
            {createButton()}
          </div>
        </Slot>
      </div>
    </form>
  );
};

export const FormRefWrapper = forwardRef(FormContent) as <
  T extends Record<string, any> = any,
>(
  props: FormProps<T>,
) => JSX.Element;

const FormContainer = <T extends Record<string, any>>(
  {
    children,
    defaultValues,
    resetOnSubmit = true,
    onSubmit,
    onError,

    buttonsConfig = [],
    slots,
  }: FormProps<T>,
  ref: Ref<FormHandle<T>>,
) => {
  const getButtonsTemplate = (): ButtonConfig[] => {
    const defaultConfig: Record<ButtonConfig['type'], ButtonConfig> = {
      'back': {
        type: 'back',
        label: 'Cancel',
        severity: 'secondary',
        style: 'text',
      },
      'reset': {
        type: 'reset',
        label: 'Clear',
        severity: 'primary',
        style: 'text',
      },
      'submit-raw': {
        type: 'submit-raw',
        label: 'Save',
        severity: 'success',
        style: 'outlined',
      },
      'submit': {
        type: 'submit',
        label: 'Submit',
        severity: 'success',
        style: 'fill',
      },
    };

    return buttonsConfig.map(({ type, label, severity, style }) => {
      const {
        label: defaultLabel,
        severity: defaultSeverity,
        style: defaultStyle,
      } = defaultConfig[type];

      return {
        type,
        label: label ?? defaultLabel,
        severity: severity ?? defaultSeverity,
        style: style ?? defaultStyle,
      };
    }) as ButtonConfig[];
  };

  return (
    <FormProvider defaultValues={defaultValues}>
      <FormRefWrapper
        buttonsConfig={getButtonsTemplate()}
        ref={ref}
        resetOnSubmit={resetOnSubmit}
        slots={slots}
        onError={onError}
        onSubmit={onSubmit}
      >
        {children}
      </FormRefWrapper>
    </FormProvider>
  );
};

export const Form = forwardRef(FormContainer) as <
  T extends Record<string, any> = any,
>(
  props: FormProps<T>,
) => JSX.Element;
