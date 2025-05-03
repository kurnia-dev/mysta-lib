import { UseFormReturn } from 'react-hook-form';

export interface InternalFieldProps<T> {
  methods?: UseFormReturn<T>;
}
