import { ReactNode, Ref } from 'react';
import {
  DeepMap,
  DeepPartial,
  FieldErrors,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormGetValues,
  UseFormReset,
  UseFormResetField,
  UseFormSetError,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';

export interface FormProps<T extends Record<string, any>> {
  ref?: Ref<FormHandle<T>>;

  /**
   * Form children
   */
  children?: ReactNode;

  /**
   * Determine whether form should be reset to default on submit or not
   *
   * @default true
   */
  resetOnSubmit?: boolean;

  /**
   * To gives default value to form
   *
   * @default {}
   */
  defaultValues?: Record<string, any>;

  /**
   * Submit emit
   */
  onSubmit?: SubmitHandler<T>;

  /**
   * Error emit
   */
  onError?: SubmitErrorHandler<T>;
}

export interface FormHandle<T extends Record<string, any>> {
  resetField: UseFormResetField<T>;
  reset: UseFormReset<T>;
  getValues: UseFormGetValues<T>;
  errors: FieldErrors<T>;
  watch: UseFormWatch<T>;
  setValue: UseFormSetValue<T>;
  setError: UseFormSetError<T>;
  isDirty: boolean;
  dirtyFields: Partial<Readonly<DeepMap<DeepPartial<T>, boolean>>>;
}

export declare const Form: <T extends Record<string, any> = any>(
  props: FormProps<T>,
) => JSX.Element;
