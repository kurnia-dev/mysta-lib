import { FC } from 'react';

import { BaseInputProps } from '../private/BaseInput.d';

/**
 * Props for the InputPassword component.
 *
 * @description This defines the props for the InputPassword component including its field name, label, and event handlers.
 */
export type InputPasswordProps = Omit<BaseInputProps<string>, 'type'>;

/**
 * InputPassword component for form input with built-in validation and custom event handling.
 *
 * @component
 * @description Renders an input field with support for labels, validation, dynamic event handling, and optional styling.
 */
export const InputPassword: FC<InputPasswordProps>;
