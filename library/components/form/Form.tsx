import { useForm, FormProvider } from 'lib/context';
import { FormProps } from './Form.d';
import { Button } from '../button/Button';

export const Form = <T extends Record<string, any>>({
  children,
  onSubmit,
  defaultValues,
}: FormProps<T>) => {
  return (
    <FormProvider defaultValues={defaultValues}>
      <FormWrapper onSubmit={onSubmit}>{children}</FormWrapper>
    </FormProvider>
  );
};

const FormWrapper = <T extends Record<string, any>>({
  children,
  onSubmit,
}: FormProps<T>) => {
  const { methods } = useForm();

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)}>
      <div className="grid grid-cols-2 gap-x-2 gap-y-2">
        {children}

        <div className="col-span-2 flex justify-end w-max">
          <Button label="Submit" type="submit" />
        </div>
      </div>
    </form>
  );
};
