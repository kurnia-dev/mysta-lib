import {
  type FieldValues,
  type UseFormReturn,
  useFormContext,
} from 'react-hook-form';

export const useEffectiveRegister = <
  T extends FieldValues,
>(): UseFormReturn<T> | null => {
  try {
    return useFormContext<T>();
  } catch {
    return null;
  }
};
