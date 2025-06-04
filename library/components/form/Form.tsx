/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  cloneElement,
  Dispatch,
  forwardRef,
  isValidElement,
  Ref,
  SetStateAction,
  useImperativeHandle,
  useState,
} from 'react';
import {
  DefaultValues,
  FormProvider as RHFProvider,
  useForm,
} from 'react-hook-form';

import { Button } from '../button/Button';
import { Slot } from '../slot/Slot';

import { ButtonConfig, FormHandle, FormProps } from './Form.d';

const FormContent = <T extends Record<string, any>>(
  props: FormProps<T> & {
    formKey: number;
    setFormKey: Dispatch<SetStateAction<number>>;
  },
  ref: Ref<FormHandle<T>>,
) => {
  const {
    children,
    resetOnSubmit,
    onSubmit,
    onError,
    buttonsConfig,
    slots,
    formKey,
    defaultValues,
    setFormKey,
  } = props;

  const methods = useForm<T>({
    defaultValues: defaultValues as DefaultValues<T>,
  });

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

  const handleReset = () => {
    reset(defaultValues as DefaultValues<T>);
    setFormKey(formKey + 1);
  };

  const createChildren = () => {
    if (Array.isArray(children)) {
      return children.map((child, index) => {
        return cloneElement(child as React.ReactElement, {
          key: child.key ?? index,
        });
      });
    } else if (isValidElement(children)) {
      return cloneElement(children as React.ReactElement);
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
          onClick={() => (type === 'reset' ? handleReset() : undefined)}
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
    <RHFProvider {...methods}>
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
    </RHFProvider>
  );
};

export const FormRefWrapper = forwardRef(FormContent) as <
  T extends Record<string, any> = any,
>(
  props: FormProps<T> & {
    formKey: number;
    setFormKey: Dispatch<SetStateAction<number>>;
    ref: Ref<FormHandle<T>>;
  },
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
  const [formKey, setFormKey] = useState(0);

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
    <FormRefWrapper
      {...{ formKey, setFormKey }}
      buttonsConfig={getButtonsTemplate()}
      defaultValues={defaultValues}
      ref={ref}
      resetOnSubmit={resetOnSubmit}
      slots={slots}
      onError={onError}
      onSubmit={onSubmit}
    >
      {children}
    </FormRefWrapper>
  );
};

export const Form = forwardRef(FormContainer) as <
  T extends Record<string, any> = any,
>(
  props: FormProps<T> & { ref?: Ref<FormHandle<T>> },
) => JSX.Element;
