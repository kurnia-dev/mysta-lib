import { useForm, FormProvider } from 'lib/context';
import { FormHandle, FormProps } from './Form.d';
import { Button } from '../button/Button';
import { forwardRef, useImperativeHandle } from 'react';

export const Form = <T extends Record<string, any>>({
  children,
  defaultValues,
  resetOnSubmit = true,
  onSubmit,
  onError,
}: FormProps<T>) => {
  return (
    <FormProvider defaultValues={defaultValues}>
      <FormWrapper {...{ resetOnSubmit, onError, onSubmit }}>
        {children}
      </FormWrapper>
    </FormProvider>
  );
};

const FormWrapper = forwardRef(
  <T extends Record<string, any>>(
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
  },
);
