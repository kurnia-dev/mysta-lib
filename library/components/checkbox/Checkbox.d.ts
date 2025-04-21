import { FC } from 'react';

/**
 * Props for the Checkbox component.
 *
 * @description This defines the props for the Checkbox component including its field name, label, and event handlers.
 */
export interface CheckboxProps extends CheckboxEvent, FieldValidation {
  /** The name of the field used for form submission */
  fieldName: string;

  /** The label text to display above the input */
  label?: string;

  /** Whether the input is disabled */
  disabled?: boolean;

  /** The value for this checkbox, switch mode to value to use this props */
  optionValue?: string | number | Record<string, unknown>;

  mode?: 'value' | 'binary' | 'tristate';

  /** Additional information to display beside the input, typically as a tooltip */
  info?: string;

  /**
   * To hide mark asterisk to required field
   *
   * @default false
   */
  hideRequiredMark?: boolean;

  /**
   * Input role
   *
   * @default checkbox
   */
  role?: 'toggleswitch' | 'checkbox';
}

/**
 * Validation rules for an input field.
 *
 * @description Defines various validation rules for the input text field, including required fields, min/max length, and custom validation.
 */
export interface FieldValidation {
  /** Whether the input is required */
  required?: boolean;

  /** Custom validation function to validate the input value */
  customValidation?: (
    e: (string | number | Record<string, unknown>)[] | boolean | null,
  ) => boolean;

  customMessage?: string;
}

/**
 * Event handlers for the Checkbox component.
 *
 * @description Defines event handler functions related to changes and input in the Checkbox component.
 */
export interface CheckboxEvent {
  /** Called when the input value changes */
  onChange?: (
    value: (string | number | Record<string, unknown>)[] | boolean | null,
  ) => void;
}

/**
 * Checkbox component for form input with built-in validation and custom event handling.
 *
 * @component
 * @description Renders an input field with support for labels, validation, dynamic event handling, and optional styling.
 */
export const Checkbox: FC<CheckboxProps>;
