/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, Ref } from 'react';
import {
  DeepMap,
  DeepPartial,
  FieldErrors,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormClearErrors,
  UseFormGetValues,
  UseFormReset,
  UseFormResetField,
  UseFormSetError,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';

import {
  PresetAttributes,
  PresetMethodAttributes,
  PresetOptions,
  ResolvedPresetOptions,
} from 'lib/hooks/useComponentPreset';

import { Severities } from '../../utils';
import { ButtonPresetOptions } from '../button/Button.d';

declare const FORM_BUTTON_TYPE: readonly [
  'back',
  'reset',
  'submit-raw',
  'submit',
];

export type ButtonConfig = {
  type: (typeof FORM_BUTTON_TYPE)[number];
  label?: string;
  severity?: Severities;
  style?: 'outlined' | 'text' | 'fill';
};

export interface FormProps<T extends Record<string, any>> {
  /**
   * Array of buttons configuration to tell form what button that should be rendered on form footer
   * Order of array's value take effect to the rendered button order
   *
   * No need to write all configurations for each type, each type has its default value that will be used unless you give your custom value
   * @default - type submit = {type: 'submit', label: 'Submit', severity: 'success', style: 'fill'}
   * @default - type submit-raw = {type: 'submit-raw', label: 'Save', severity: 'success', style: 'outlined'}
   * @default - type reset = {type: 'reset', label: 'Clear', severity: 'primary', style: 'text'}
   * @default - type back = {type: 'back', label: 'Cancel', severity: 'secondary', style: 'text'}
   *
   * Only types that exist in the given array that will be rendered
   * @example - render only button submit and back will need this array
   *    [
   *      { type: 'back', label: 'a' },
   *      { type: 'submit', label: 'b' },
   *    ]
   */
  buttonsConfig: ButtonConfig[];

  /**
   * Form children
   */
  children?: ReactNode;

  slots?: Record<keyof FormSlots, JSX.Element>;

  /**
   * Determine whether form should be reset to default on submit or not
   *
   * @default true
   */
  resetOnSubmit?: boolean;

  /**
   * @default 2
   */
  columnPerRow?: number;

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

  pt?: FormPassThroughOptions;
}

export interface FormSlots {
  footer?: JSX.Element;
}

export interface FormHandle<T extends Record<string, any>> {
  resetField: UseFormResetField<T>;
  reset: UseFormReset<T>;
  getValues: UseFormGetValues<T>;
  errors: FieldErrors<T>;
  watch: UseFormWatch<T>;
  setValue: UseFormSetValue<T>;
  setError: UseFormSetError<T>;
  clearErrors: UseFormClearErrors<T>;
  isDirty: boolean;
  dirtyFields: Partial<Readonly<DeepMap<DeepPartial<T>, boolean>>>;
}

export interface FormPassThroughOptions extends FormPresetOptions {
  button?: ButtonPresetOptions;
}

export interface FormPresetOptions {
  root?: PresetAttributes;
  wrapper?: PresetMethodAttributes<ResolvedPresetOptions<'Form'>>;
  footer?: PresetAttributes;
}

export declare const Form: <T extends Record<string, any> = any>(
  props: FormProps<T> & { ref?: Ref<FormHandle<T>> },
) => JSX.Element;
