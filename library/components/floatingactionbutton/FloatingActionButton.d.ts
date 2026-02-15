import {
  PresetMethodAttributes,
  PresetOptions,
} from '../../hooks/useComponentPreset';
import { Severities } from '../../utils';
import { Icons } from '../icon/Icon.d';

export interface FloatingActionButtonProps {
  /**
   * Icon to display inside the button.
   */
  icon: Icons;

  /**
   * Accessible label for the button
   */
  label: string;

  /**
   * Click handler for the button.
   */
  onClick?: () => void;

  /**
   * Position of the FAB on the screen.
   * @default 'bottom-right'
   */
  position?: 'bottom-right' | 'bottom-left' | 'bottom-center';

  /**
   * Size variant
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Color severity variant
   * @default 'primary'
   */
  severity?: Severities;

  /**
   * Label shown when extended/hovered
   */
  extendedLabel?: string;

  /**
   * Disabled state
   * @default false
   */
  disabled?: boolean;

  /**
   * Optional className for custom styling
   */
  className?: string;

  /**
   * Pass through props for advanced customization
   */
  pt?: FloatingActionButtonPresetOptions;
}

export interface FloatingActionButtonContext {
  disabled: boolean;
  isExtended: boolean;
}

export interface FloatingActionButtonPresetOptions {
  root?: PresetMethodAttributes<PresetOptions<'FloatingActionButton'>>;
  icon?: PresetMethodAttributes<PresetOptions<'FloatingActionButton'>>;
  label?: PresetMethodAttributes<PresetOptions<'FloatingActionButton'>>;
}
