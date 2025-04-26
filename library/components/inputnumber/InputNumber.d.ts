import { FC } from 'react';
import { BaseInputProps } from '../private/BaseInput.d';

/**
 * Props for the InputNumber component.
 *
 * @description This defines the props for the InputNumber component including its field name, label, and event handlers.
 */
export interface InputNumberProps
  extends Omit<BaseInputProps<number>, 'type'> {}

/**
 * InputNumber component for form input with built-in validation and custom event handling.
 *
 * @component
 * @description Renders an input field with support for labels, validation, dynamic event handling, and optional styling.
 */
export const InputNumber: FC<InputNumberProps>;
