/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, ReactNode, useContext, useMemo } from 'react';
import {
  DefaultValues,
  FormProvider as RHFProvider,
  UseFormReturn,
  useForm as useReactHookForm,
} from 'react-hook-form';

interface FormContextType<T extends Record<string, any>> {
  methods: UseFormReturn<T>;
}

interface FormProviderProps<T extends Record<string, any>> {
  children: ReactNode;
  defaultValues?: DefaultValues<T>;
}

const FormContext = createContext<FormContextType<any> | null>(null);

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
