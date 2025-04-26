import { useForm, FormProvider } from 'lib/context';
import { FormHandle, FormProps } from './Form.d';
import { Button } from '../button/Button';
import {
  cloneElement,
  forwardRef,
  isValidElement,
  Ref,
  useImperativeHandle,
} from 'react';

const FormContent = <T extends Record<string, any>>(
  { children, resetOnSubmit, onSubmit, onError }: FormProps<T>,
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

        <div className="col-span-2 flex justify-end w-max">
          <Button onClick={() => reset()} label="Clear" type="button" />
          <Button label="Submit" type="submit" />
        </div>
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
  props: FormProps<T>,
) => JSX.Element;
