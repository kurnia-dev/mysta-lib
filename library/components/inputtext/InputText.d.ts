import { FC } from 'react';

import { BaseInputProps } from '../private/BaseInput.d';

/**
 * Props for the InputText component.
 *
 * @description This defines the props for the InputText component including its field name, label, and event handlers.
 */
export type InputTextProps = Omit<BaseInputProps<string>, 'type'>;

/**
 * InputText component for form input with built-in validation and custom event handling.
 *
 * @component
 * @description Renders an input field with support for labels, validation, dynamic event handling, and optional styling.
 */
export const InputText: FC<InputTextProps>;
