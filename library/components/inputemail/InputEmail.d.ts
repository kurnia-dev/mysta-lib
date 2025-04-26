import { FC } from 'react';
import { BaseInputProps } from '../private/BaseInput.d';

/**
 * Props for the InputEmail component.
 *
 * @description This defines the props for the InputEmail component including its field name, label, and event handlers.
 */
export interface InputEmailProps extends Omit<BaseInputProps<string>, 'type'> {}

/**
 * InputEmail component for form input with built-in validation and custom event handling.
 *
 * @component
 * @description Renders an input field with support for labels, validation, dynamic event handling, and optional styling.
 */
export const InputEmail: FC<InputEmailProps>;
