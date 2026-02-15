import {
  PresetMethodAttributes,
  PresetOptions,
} from '../../hooks/useComponentPreset';
import { Severities } from '../../utils';
import { Icons } from '../icon/Icon.d';

export interface ListItemProps {
  /**
   * Primary text content
   */
  primary: React.ReactNode;

  /**
   * Optional secondary text content
   */
  secondary?: React.ReactNode;

  /**
   * Optional leading icon
   */
  icon?: Icons;

  /**
   * Optional leading avatar URL
   */
  avatar?: string;

  /**
   * Optional trailing content
   */
  trailing?: React.ReactNode;

  /**
   * Optional trailing icon
   */
  trailingIcon?: Icons;

  /**
   * Whether to show bottom divider
   * @default true
   */
  divider?: boolean;

  /**
   * Whether the item is clickable
   * @default false
   */
  clickable?: boolean;

  /**
   * Callback when item is clicked
   */
  onClick?: () => void;

  /**
   * Selected state
   * @default false
   */
  selected?: boolean;

  /**
   * Severity for styling icon colors
   * @default 'secondary'
   */
  severity?: Severities;

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
  pt?: ListItemPresetOptions;
}

export interface ListItemContext {
  clickable: boolean;
  selected: boolean;
  disabled: boolean;
}

export interface ListItemPresetOptions {
  root?: PresetMethodAttributes<PresetOptions<'ListItem'>>;
  leading?: PresetMethodAttributes<PresetOptions<'ListItem'>>;
  icon?: PresetMethodAttributes<PresetOptions<'ListItem'>>;
  avatar?: PresetMethodAttributes<PresetOptions<'ListItem'>>;
  content?: PresetMethodAttributes<PresetOptions<'ListItem'>>;
  primary?: PresetMethodAttributes<PresetOptions<'ListItem'>>;
  secondary?: PresetMethodAttributes<PresetOptions<'ListItem'>>;
  trailing?: PresetMethodAttributes<PresetOptions<'ListItem'>>;
  trailingIcon?: PresetMethodAttributes<PresetOptions<'ListItem'>>;
  divider?: PresetMethodAttributes<PresetOptions<'ListItem'>>;
}
