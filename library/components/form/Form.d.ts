// Form.d.ts

import { ReactNode, FC } from 'react';
import { UseFormGetValues } from 'react-hook-form';

export interface FormProps<T> {
  /**
   * Form children
   */
  children?: ReactNode;

  /**
   * To gives default value to form
   *
   * @default {}
   */
  defaultValues?: Record<string, any>;

  /**
   * Submit emit
   */
  onSubmit?: (values?: UseFormGetValues<T>) => any;
}

/**
 * Form component.
 */
export const Form: FC<FormProps<any>>;
