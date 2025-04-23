import { FC } from 'react';

/**
 * Props for the RadioButton component.
 *
 * @description This defines the props for the RadioButton component including its field name, label, and event handlers.
 */
export interface RadioButtonProps extends RadioButtonEvent, FieldValidation {
  /** The name of the field used for form submission */
  fieldName: string;

  /** The label text to display above the input */
  label?: string;

  /** Whether the input is disabled */
  disabled?: boolean;

  value?: string | boolean;

  /** The value for this checkbox, switch mode to value to use this props */
  optionValue?: string | boolean;

  /** Additional information to display beside the input, typically as a tooltip */
  info?: string;

  /**
   * To hide mark asterisk to required field
   *
   * @default false
   */
  hideRequiredMark?: boolean;
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
  customValidation?: (e: string | boolean) => boolean;

  customMessage?: string;
}

/**
 * Event handlers for the RadioButton component.
 *
 * @description Defines event handler functions related to changes and input in the RadioButton component.
 */
export interface RadioButtonEvent {
  /** Called when the input value changes */
  onChange?: (value: string | boolean) => void;
}

/**
 * RadioButton component for form input with built-in validation and custom event handling.
 *
 * @component
 * @description Renders an input field with support for labels, validation, dynamic event handling, and optional styling.
 */
export const RadioButton: FC<RadioButtonProps>;
