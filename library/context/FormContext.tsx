import { createContext, useContext, ReactNode, useMemo } from 'react';
import {
  useForm as useReactHookForm,
  FormProvider as RHFProvider,
  UseFormReturn,
} from 'react-hook-form';

interface FormContextType {
  methods: UseFormReturn<any>; // you can type this better depending on your form schema
}

const FormContext = createContext<FormContextType | null>(null);

interface FormProviderProps {
  children: ReactNode;
  defaultValues?: Record<string, any>;
}

export const FormProvider = ({
  children,
  defaultValues = {},
}: FormProviderProps) => {
  const methods = useReactHookForm({ defaultValues });

  const contextValue = useMemo(() => ({ methods }), [methods]);

  return (
    <FormContext.Provider value={contextValue}>
      <RHFProvider {...methods}>{children}</RHFProvider>
    </FormContext.Provider>
  );
};

export const useForm = (): FormContextType => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useForm must be used within a FormProvider');
  }
  return context;
};
