import {
  type FieldValues,
  type UseFormReturn,
  useFormContext,
} from 'react-hook-form';

export const useEffectiveRegister = (): UseFormReturn<FieldValues | null> => {
  try {
    return useFormContext();
  } catch {
    return null;
  }
};
