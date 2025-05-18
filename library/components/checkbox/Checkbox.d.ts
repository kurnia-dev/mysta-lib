import { FC } from 'react';

import {
  PresetAttributes,
  PresetMethodAttributes,
  PresetOptions,
} from 'lib/hooks/useComponentPreset';

export type ValueModeType = (string | number | Record<string, unknown>)[];

export type CheckboxValue = ValueModeType | boolean | null;

/**
 * Props for the Checkbox component.
 *
 * @description This defines the props for the Checkbox component including its field name, label, and event handlers.
 */
export interface BaseCheckboxProps {
  /** The name of the field used for form submission */
  fieldName?: string;

  /** The label text to display above the input */
  label?: string;

  /** Whether the input is disabled */
  disabled?: boolean;

  /** Additional information to display beside the input, typically as a tooltip */
  info?: string;

  /**
   * To hide mark asterisk to required field
   *
   * @default false
   */
  hideRequiredMark?: boolean;
}

export interface ValueCheckboxProps
  extends BaseCheckboxProps,
    FieldValidation<ValueModeType>,
    CheckboxEvent<ValueModeType> {
  /** The value for this checkbox, switch mode to value to use this props */
  optionValue?: string | number | Record<string, unknown>;

  mode: 'value';

  value?: ValueModeType;
}

export interface BinaryCheckboxProps
  extends BaseCheckboxProps,
    FieldValidation<boolean>,
    CheckboxEvent<boolean> {
  mode?: 'binary';

  value?: boolean;
}

export interface TristateCheckboxProps
  extends BaseCheckboxProps,
    FieldValidation<boolean | null>,
    CheckboxEvent<boolean | null> {
  mode: 'tristate';

  value?: boolean | null;
}

export type CheckboxProps =
  | BinaryCheckboxProps
  | TristateCheckboxProps
  | ValueCheckboxProps;

/**
 * Validation rules for an input field.
 *
 * @description Defines various validation rules for the  field, including required fields, min/max length, and custom validation.
 */
export interface FieldValidation<T> {
  /** Whether the input is required */
  required?: boolean;

  /** Custom validation function to validate the input value */
  customValidation?: (e: T) => boolean;

  customMessage?: string;
}

/**
 * Event handlers for the Checkbox component.
 *
 * @description Defines event handler functions related to changes and input in the Checkbox component.
 */
export interface CheckboxEvent<T> {
  /** Called when the input value changes */
  onChange?: (value: T) => void;
}

export interface CheckboxContext {
  checked?: boolean;
  disabled?: boolean;
  partialChecked?: boolean;
  tristate?: boolean;
}

export interface CheckboxPresetOptions {
  labelContainer: PresetAttributes;
  label: PresetAttributes;
  required: PresetAttributes;
  info: PresetAttributes;
  icon: PresetMethodAttributes<PresetOptions<'Checkbox'>>;
  input: PresetMethodAttributes<PresetOptions<'Checkbox'>>;
  box: PresetMethodAttributes<PresetOptions<'Checkbox'>>;
}

/**
 * Checkbox component for form input with built-in validation and custom event handling.
 *
 * @component
 * @description Renders an input field with support for labels, validation, dynamic event handling, and optional styling.
 */
export const Checkbox: FC<CheckboxProps>;
