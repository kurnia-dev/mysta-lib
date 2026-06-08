import { FC } from 'react';
import { RegisterOptions } from 'react-hook-form';

import {
  PresetAttributes,
  PresetMethodAttributes,
  PresetOptions,
  ResolvedPresetOptions,
} from '../../hooks/useComponentPreset';
import { FieldWrapperPresetOptions } from '../fieldwrapper/FieldWrapper.d';

/**
 * Props for the BaseInput component.
 *
 * @description This defines the props for the BaseInput component including its field name, label, and event handlers.
 */
export interface BaseInputProps<T = string>
  extends BaseInputEvent<T>,
    FieldValidation<T> {
  /** The name of the field used for form submission */
  fieldName?: string;

  pt?: BaseInputPassThroughOptions;

  /** The label text to display above the input */
  label?: string;

  /** Whether the input is disabled */
  disabled?: boolean;

  /** Placeholder text for the input field */
  placeholder?: string;

  /** The current value of the input */
  value?: T;

  /** Additional information to display beside the input, typically as a tooltip */
  info?: string;

  /**
   * Menentukan jenis input yang ditampilkan oleh komponen input.
   * Nilai ini diteruskan ke atribut `type` dari elemen HTML `<input>`.
   * Gunakan tipe ini untuk mengontrol keyboard, validasi, dan tampilan field.
   *
   * @default 'text'
   */
  type?: 'text' | 'password' | 'email' | 'number';

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
 * @description Defines various validation rules for the  field, including required fields, min/max length, and custom validation.
 */
export interface FieldValidation<T> {
  /** Whether the input is required */
  required?: boolean;

  /** Minimum value of the input value */
  min?: number;

  /** Maximum value of the input value */
  max?: number;

  /** Minimum length of the input value */
  minLength?: number;

  /** Maximum length of the input value */
  maxLength?: number;

  /** A regular expression pattern to validate the input value */
  pattern?: RegExp;

  passwordRequirements?: (
    | 'uppercase'
    | 'lowercase'
    | 'special-character'
    | 'alpha-numeric'
  )[];

  /** Custom validation function to validate the input value */
  customValidation?: (e?: T) => boolean | string;

  /** Custom error messages for specific validation rules */
  customMessage?: Record<keyof RegisterOptions, string>;

  /** Whether to prevent the user from typing if the input is invalid */
  preventInputOnError?: boolean;
}

/**
 * Event handlers for the BaseInput component.
 *
 * @description Defines event handler functions related to changes and input in the BaseInput component.
 */
export interface BaseInputEvent<T> {
  /** Called when the input field loses focus */
  onBlur?: (value: T) => void;

  /** Called when the input value changes */
  onChange?: (value: T) => void;

  /** Called when the input value is being typed (on input) */
  onInput?: (value: T) => void;

  /** Called when the keyboard is being pressed (on keydown) */
  onKeydown?: (value: string) => void;
}

export interface BaseInputPassThroughOptions extends BaseInputPresetOptions {
  fieldWrapper?: FieldWrapperPresetOptions;
}

export interface BaseInputPresetOptions {
  eyetoggle?: PresetAttributes;
  input?: PresetMethodAttributes<ResolvedPresetOptions<'BaseInput'>>;
}

/**
 * BaseInput component for form input with built-in validation and custom event handling.
 *
 * @component
 * @description Renders an input field with support for labels, validation, dynamic event handling, and optional styling.
 */
export const BaseInput: FC<BaseInputProps>;
