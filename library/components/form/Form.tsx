import { useForm, FormProvider } from 'lib/context';
import { FormHandle, FormProps } from './Form.d';
import { Button } from '../button/Button';
import { forwardRef, Ref, useImperativeHandle } from 'react';

const FormContent = <T extends Record<string, any>>(
  { children, resetOnSubmit, onSubmit, onError }: FormProps<T>,
  ref: React.Ref<FormHandle<T>>,
) => {
  const { methods } = useForm<T>();
  const { handleSubmit, reset, resetField, getValues } = methods;

  const handleFormSubmit = (values: T) => {
    onSubmit(values);
    if (resetOnSubmit) reset();
  };

  useImperativeHandle(
    ref,
    () => ({
      resetField,
      reset,
      getValues,
    }),
    [resetField, reset, getValues],
  );

  return (
    <form onSubmit={handleSubmit(handleFormSubmit, onError)}>
      <div className="grid grid-cols-2 gap-x-2 gap-y-2">
        {children}

        <div className="col-span-2 flex justify-end w-max">
          <Button label="Submit" type="submit" />
        </div>
      </div>
    </form>
  );
};

export const FormRefWrapper = forwardRef(FormContent) as <
  T extends Record<string, any> = any,
>(
  props: FormProps<T> & { ref?: Ref<FormHandle<T>> },
) => JSX.Element;

const FormContainer = <T extends Record<string, any>>(
  {
    children,
    defaultValues,
    resetOnSubmit = true,
    onSubmit,
    onError,
  }: FormProps<T>,
  ref: Ref<FormHandle<T>>,
) => {
  return (
    <FormProvider defaultValues={defaultValues}>
      <FormRefWrapper
        ref={ref}
        resetOnSubmit={resetOnSubmit}
        onSubmit={onSubmit}
        onError={onError}
      >
        {children}
      </FormRefWrapper>
    </FormProvider>
  );
};

export const Form = forwardRef(FormContainer) as <
  T extends Record<string, any> = any,
>(
  props: FormProps<T> & { ref?: Ref<FormHandle<T>> },
) => JSX.Element;
