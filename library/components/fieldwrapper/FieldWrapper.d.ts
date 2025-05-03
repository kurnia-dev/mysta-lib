/* eslint-disable @typescript-eslint/no-explicit-any */
// FieldWrapper.d.ts

import { FC, ReactNode } from 'react';
import { FieldErrors } from 'react-hook-form';

export interface FieldWrapperProps extends FieldWrapperEvent {
  errors: FieldErrors<any>;

  /** The name of the field used for form submission */
  fieldName?: string;

  /**
   * FieldWrapper children
   */
  children?: ReactNode;

  className?: string;

  context?: Partial<
    Record<'invalid' | 'disabled' | 'containerless' | 'borderless', boolean>
  >;

  /** The label text to display above the input */
  label?: string;

  /** Additional information to display beside the input, typically as a tooltip */
  info?: string;

  /** Whether the input is required */
  required?: boolean;

  /**
   * To hide mark asterisk to required field
   *
   * @default false
   */
  hideRequiredMark?: boolean;
}

/**
 * Event handlers for the FieldWrapper component.
 *
 * @description Defines event handler functions related to DOM interaction in the FieldWrapper component.
 */
export interface FieldWrapperEvent {
  /** Called when the input value changes */
  onClick?: () => void;
}

/**
 * FieldWrapper component.
 */
export const FieldWrapper: FC<FieldWrapperProps>;
