import { FC } from 'react';

import { Severities } from '../../utils';
import { Icons } from '../icon/Icon.d';

/**
 * Props for the PrimaryButton component.
 *
 * @description Defines the props for the PrimaryButton, including visual customization, loading state, icon support, and click handling.
 */
export interface ButtonProps {
  /**
   * Height of the button (e.g., px, rem, %, etc.)
   * Can be specified as a number (pixels) or string (e.g., '50px', '10rem').
   *
   * @default '26px'
   */
  height?: number | string;

  /**
   * Width of the button (e.g., px, rem, %, etc.)
   * Can be specified as a number (pixels) or string (e.g., '100px', '50%').
   *
   * @default 'max-content'
   */
  width?: number | string;

  /**
   * Severity level for styling the button (e.g., "error", "warning", "success").
   * Determines the color and style applied to the button.
   *
   * @default 'primary'
   */
  severity?: Severities;

  /**
   * If true, displays a loading spinner instead of the icon or label.
   * Useful when the button is performing an asynchronous operation.
   *
   * @default false
   */
  loading?: boolean;

  /**
   * If true, applies an outlined style (typically a button with just a border).
   *
   * @default false
   */
  outlined?: boolean;

  /**
   * If true, applies a text-only style (no background, only text).
   *
   * @default false
   */
  text?: boolean;

  /**
   * If true, disables the button, preventing user interaction.
   *
   * @default false
   */
  disabled?: boolean;

  /**
   * If true, adds a shadow to indicate elevation (e.g., raised effect).
   *
   * @default false
   */
  raised?: boolean | undefined;

  /**
   * If true, applies a circular border radius to the button.
   *
   * @default false
   */
  rounded?: boolean | undefined;

  /**
   * Icon to display inside the button.
   * Should be a valid `Icons` value from the icon library.
   *
   * @default undefined
   */
  icon?: Icons;

  /**
   * Text label to display inside the button.
   * Can be used alongside or instead of the icon.
   *
   * @default undefined
   */
  label?: string;

  /**
   * Click handler for the button.
   * Called when the button is clicked.
   *
   * @default undefined
   */
  onClick?: () => void;

  /**
   * Specifies the type of the button.
   * - 'button': A generic button that does not submit a form.
   * - 'submit': A button that submits the form.
   * - 'reset': A button that resets the form fields.
   *
   * @default 'button'
   */
  type?: 'button' | 'submit' | 'reset';
}

/**
 * Primary button component with loading, severity, and preset support.
 *
 * @component
 * @description Renders a customizable button with support for loading states, severity levels, icons, and text.
 */
export const Button: FC<ButtonProps>;
