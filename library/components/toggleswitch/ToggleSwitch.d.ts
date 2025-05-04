import { FC } from 'react';

/**
 * Props for the ToggleSwitch component.
 *
 * @description This defines the props for the ToggleSwitch component including its field name, label, and event handlers.
 */
export interface BaseToggleSwitchProps {
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

interface BinaryModeProps
  extends ToggleSwitchEvent<boolean>,
    FieldValidation<boolean>,
    BaseToggleSwitchProps {
  mode?: 'binary';
  value?: boolean;
}

interface TriStateModeProps
  extends ToggleSwitchEvent<boolean | null>,
    FieldValidation<boolean | null>,
    BaseToggleSwitchProps {
  mode: 'tristate';
  value?: boolean | null;
}

export type ToggleSwitchProps = BinaryModeProps | TriStateModeProps;

/**
 * Validation rules for an input field.
 *
 * @description Defines various validation rules for the  field, including required fields, min/max length, and custom validation.
 */
export interface FieldValidation<T = boolean | null> {
  /** Whether the input is required */
  required?: boolean;

  /** Custom validation function to validate the input value */
  customValidation?: (e: T) => boolean;

  customMessage?: string;
}

/**
 * Event handlers for the ToggleSwitch component.
 *
 * @description Defines event handler functions related to changes and input in the ToggleSwitch component.
 */
export interface ToggleSwitchEvent<T = boolean | null> {
  /** Called when the input value changes */
  onChange?: (value: T) => void;
}

/**
 * ToggleSwitch component for form input with built-in validation and custom event handling.
 *
 * @component
 * @description Renders an input field with support for labels, validation, dynamic event handling, and optional styling.
 */
export const ToggleSwitch: FC<ToggleSwitchProps>;
