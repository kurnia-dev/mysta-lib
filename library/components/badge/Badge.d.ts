import { FC } from 'react';

import {
  PresetMethodAttributes,
  PresetOptions,
} from '../../hooks/useComponentPreset';
import { Severities } from '../../utils';
import { Icons } from '../icon/Icon.d';

/**
 * Props for the Badge component.
 *
 * @description Defines the props for the Badge, including visual customization, loading state, icon support, and click handling.
 */
export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;

  /**
   * Severity level for styling the button (e.g., "error", "warning", "success").
   * Determines the color and style applied to the button.
   *
   * @default 'primary'
   */
  severity?: Severities;

  /**
   * Icon to display inside the button.
   * Should be a valid `Icons` value from the icon library.
   *
   * @default undefined
   */
  icon?: Icons;

  iconPos?: 'left' | 'right';

  /**
   * Text label to display inside the button.
   * Can be used alongside or instead of the icon.
   */
  label: string;

  /**
   * Specifies the type of the badge.
   * - 'dot': A badge with solid dark color with small circle with color based on severity.
   * - 'filled': A bade that every color in it based on severity.
   *
   * @default 'dot'
   */
  type?: 'dot' | 'filled' | 'outlined';

  pt?: BadgePresetOptions;
}

export interface BadgePresetOptions {
  root?: PresetMethodAttributes<PresetOptions<'Badge'>>;
  label?: PresetMethodAttributes<PresetOptions<'Badge'>>;
  icon?: PresetMethodAttributes<PresetOptions<'Badge'>>;
  iconContainer?: PresetMethodAttributes<PresetOptions<'Badge'>>;
}

/**
 * Primary button component with loading, severity, and preset support.
 *
 * @component
 * @description Renders a customizable button with support for loading states, severity levels, icons, and text.
 */
export const Badge: FC<BadgeProps>;
