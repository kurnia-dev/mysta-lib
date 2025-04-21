import { createContext, useContext, ReactNode, useMemo } from 'react';
import {
  useForm as useReactHookForm,
  FormProvider as RHFProvider,
  UseFormReturn,
  DefaultValues,
} from 'react-hook-form';

interface FormContextType<T extends Record<string, any>> {
  methods: UseFormReturn<T>; // you can type this better depending on your form schema
}

const FormContext = createContext<FormContextType<any> | null>(null);

interface FormProviderProps<T extends Record<string, any>> {
  children: ReactNode;
  defaultValues?: DefaultValues<T>;
}

export const FormProvider = <T extends Record<string, any>>({
  children,
  defaultValues = {} as DefaultValues<T>,
}: FormProviderProps<T>) => {
  const methods = useReactHookForm({ defaultValues });

  const contextValue = useMemo(() => ({ methods }), [methods]);

  return (
    <FormContext.Provider value={contextValue}>
      <RHFProvider {...methods}>{children}</RHFProvider>
    </FormContext.Provider>
  );
};

export const useForm = <T extends Record<string, any>>() => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useForm must be used within a FormProvider');
  }
  return context as FormContextType<T>;
};
