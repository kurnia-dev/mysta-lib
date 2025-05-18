import { FC } from 'react';

import {
  PresetAttributes,
  PresetMethodAttributes,
  PresetOptions,
} from 'lib/hooks/useComponentPreset';

/**
 * Props for the RadioButton component.
 *
 * @description This defines the props for the RadioButton component including its field name, label, and event handlers.
 */
export interface BaseRadioButtonProps {
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

interface StringRadioButtonProps
  extends BaseRadioButtonProps,
    RadioButtonEvent<string>,
    FieldValidation<string> {
  value?: string;

  /** The value for this checkbox, switch mode to value to use this props */
  optionValue: string;
}

interface BooleanRadioButtonProps
  extends BaseRadioButtonProps,
    RadioButtonEvent<boolean>,
    FieldValidation<boolean> {
  value?: boolean;

  /** The value for this checkbox, switch mode to value to use this props */
  optionValue?: boolean;
}

export type RadioButtonProps = BooleanRadioButtonProps | StringRadioButtonProps;

/**
 * Validation rules for an input field.
 *
 * @description Defines various validation rules for the  field, including required fields, min/max length, and custom validation.
 */
export interface FieldValidation<T = string | boolean> {
  /** Whether the input is required */
  required?: boolean;

  /** Custom validation function to validate the input value */
  customValidation?: (e: T) => boolean;

  customMessage?: string;
}

/**
 * Event handlers for the RadioButton component.
 *
 * @description Defines event handler functions related to changes and input in the RadioButton component.
 */
export interface RadioButtonEvent<T = string | boolean> {
  /** Called when the input value changes */
  onChange?: (value: T) => void;
}

export interface RadioButtonContext {
  checked?: boolean;
  disabled?: boolean;
}

export interface RadioButtonPresetOptions {
  labelContainer: PresetAttributes;
  label: PresetAttributes;
  required: PresetAttributes;
  info: PresetAttributes;
  icon: PresetMethodAttributes<PresetOptions<'RadioButton'>>;
  input: PresetMethodAttributes<PresetOptions<'RadioButton'>>;
  box: PresetMethodAttributes<PresetOptions<'RadioButton'>>;
  innerBox: PresetMethodAttributes<PresetOptions<'RadioButton'>>;
}

/**
 * RadioButton component for form input with built-in validation and custom event handling.
 *
 * @component
 * @description Renders an input field with support for labels, validation, dynamic event handling, and optional styling.
 */
export const RadioButton: FC<RadioButtonProps>;
