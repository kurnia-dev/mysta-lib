import { useForm, FormProvider } from 'lib/context';
import { ButtonConfig, FormHandle, FormProps } from './Form.d';
import { Button } from '../button/Button';
import {
  cloneElement,
  forwardRef,
  isValidElement,
  Ref,
  useEffect,
  useImperativeHandle,
} from 'react';
import { Slot } from '../slot/Slot';

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

  useEffect(() => {
    console.log('buttonsConfig', buttonsConfig);
  }, [buttonsConfig]);

  const createChildren = () => {
    if (Array.isArray(children)) {
      return children.map((child, index) => {
        return isValidElement(child)
          ? cloneElement(child as React.ReactElement<any>, {
              key: child.key ?? index,
              methods,
            })
          : child;
      });
    } else if (isValidElement(children)) {
      return cloneElement(children as React.ReactElement<any>, { methods });
    }

    return children;
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
    [resetField, reset, getValues],
  );

  return (
    <form onSubmit={handleSubmit(handleFormSubmit, onError)}>
      <div className="grid grid-cols-2 gap-x-2 gap-y-2">
        {createChildren()}

        <Slot name="footer" slots={slots}>
          <div className="col-span-2 gap-1 flex justify-end w-full">
            {buttonsConfig.map(({ type, label, severity, style }) => {
              return (
                <Button
                  key={type}
                  onClick={type === 'reset' ? reset : undefined}
                  label={label}
                  severity={severity}
                  outlined={style === 'outlined'}
                  text={style === 'text'}
                  type={type === 'submit' ? 'submit' : 'button'}
                />
              );
            })}
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
        ref={ref}
        resetOnSubmit={resetOnSubmit}
        onSubmit={onSubmit}
        onError={onError}
        slots={slots}
        buttonsConfig={getButtonsTemplate()}
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
