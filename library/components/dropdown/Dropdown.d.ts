import { FC } from 'react';

import {
  PresetAttributes,
  PresetMethodAttributes,
  PresetOptions,
  ResolvedPresetOptions,
} from '../../hooks/useComponentPreset';
import { FieldWrapperPresetOptions } from '../fieldwrapper/FieldWrapper.d';

export type OptionValue = string | number | boolean | Record<string, unknown>;

export type Option = { label?: string; value: OptionValue };

/**
 * Props for the Dropdown component.
 *
 * @description This defines the props for the Dropdown component including its field name, label, and event handlers.
 */
export interface BaseDropdownProps {
  /** The name of the field used for form submission */
  fieldName?: string;

  pt?: DropdownPassThroughOptions;

  /** The label text to display above the input */
  label?: string;

  /** The label text to display above the input */
  placeholder?: string;

  /** Whether the input is disabled */
  disabled?: boolean;

  /** Additional information to display beside the input, typically as a tooltip */
  info?: string;

  /** The value for this dropdown, switch mode to value to use this props */
  options?: Option[];

  /**
   * To hide mark asterisk to required field
   *
   * @default false
   */
  hideRequiredMark?: boolean;
}

export interface SingleDropdownProps
  extends BaseDropdownProps,
    FieldValidation<OptionValue>,
    DropdownEvent<OptionValue> {
  mode?: 'single';

  value?: OptionValue;
}

export interface MultiDropdownProps
  extends BaseDropdownProps,
    FieldValidation<OptionValue[]>,
    DropdownEvent<OptionValue[]> {
  mode: 'multi';

  value?: OptionValue[];
}

export type DropdownProps = SingleDropdownProps | MultiDropdownProps;

export interface DropdownContext {
  open?: boolean;
}

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
 * Event handlers for the Dropdown component.
 *
 * @description Defines event handler functions related to changes and input in the Dropdown component.
 */
export interface DropdownEvent<T> {
  /** Called when the input value changes */
  onChange?: (value: T) => void;
}

export interface DropdownPassThroughOptions extends DropdownPresetOptions {
  fieldWrapper?: FieldWrapperPresetOptions;
}

export interface DropdownPresetOptions {
  trigger?: PresetAttributes;
  icon?: PresetAttributes;
  content?: PresetMethodAttributes<ResolvedPresetOptions<'Dropdown'>>;
}

/**
 * Dropdown component for form input with built-in validation and custom event handling.
 *
 * @component
 * @description Renders an input field with support for labels, validation, dynamic event handling, and optional styling.
 */
export const Dropdown: FC<DropdownProps>;
