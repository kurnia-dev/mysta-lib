import {
  PresetMethodAttributes,
  PresetOptions,
  ResolvedPresetOptions,
} from '../../hooks/useComponentPreset';
import { Severities } from '../../utils';
import { Icons } from '../icon/Icon.d';

export interface ChipProps {
  /**
   * Text content of the chip
   */
  label: string;

  /**
   * Optional icon to display before label
   */
  icon?: Icons;

  /**
   * Whether the chip shows a remove button
   * @default false
   */
  removable?: boolean;

  /**
   * Callback when remove button is clicked
   */
  onRemove?: () => void;

  /**
   * Whether the chip is interactive/clickable
   * @default false
   */
  clickable?: boolean;

  /**
   * Callback when chip is clicked
   */
  onClick?: () => void;

  /**
   * Color severity variant
   * @default 'secondary'
   */
  severity?: Severities;

  /**
   * Visual style variant
   * @default 'filled'
   */
  variant?: 'filled' | 'outlined' | 'light';

  /**
   * Size variant
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Disabled state
   * @default false
   */
  disabled?: boolean;

  /**
   * Optional href — renders the chip as an `<a>` element when provided
   */
  href?: string;

  /**
   * Optional className for custom styling
   */
  className?: string;

  /**
   * Pass through props for advanced customization
   */
  pt?: ChipPresetOptions;
}

export interface ChipContext {
  clickable: boolean;
  removable: boolean;
  disabled: boolean;
}

export interface ChipPresetOptions {
  root?: PresetMethodAttributes<ResolvedPresetOptions<'Chip'>>;
  icon?: PresetMethodAttributes<ResolvedPresetOptions<'Chip'>>;
  label?: PresetMethodAttributes<ResolvedPresetOptions<'Chip'>>;
  removeButton?: PresetMethodAttributes<ResolvedPresetOptions<'Chip'>>;
  removeIcon?: PresetMethodAttributes<ResolvedPresetOptions<'Chip'>>;
}
