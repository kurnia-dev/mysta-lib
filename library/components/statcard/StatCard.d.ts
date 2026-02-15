import {
  PresetMethodAttributes,
  PresetOptions,
} from '../../hooks/useComponentPreset';
import { Severities } from '../../utils';
import { Icons } from '../icon/Icon.d';

export interface StatCardProps {
  /**
   * Main value to display
   */
  value: string | number;

  /**
   * Label title
   */
  label: string;

  /**
   * Optional icon name
   */
  icon?: Icons;

  /**
   * Optional trend value (e.g. "12%")
   */
  trend?: string;

  /**
   * Whether trend is positive (up) or negative (down)
   */
  trendUp?: boolean;

  /**
   * Optional subtitle
   */
  subtitle?: string;

  /**
   * Severity color variant
   * @default 'neutral'
   */
  severity?: Severities | 'neutral';

  /**
   * Padding size variant
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Whether card is clickable
   * @default false
   */
  clickable?: boolean;

  /**
   * Callback when clicked
   */
  onClick?: () => void;

  /**
   * Optional className for custom styling
   */
  className?: string;

  /**
   * Pass through props for advanced customization
   */
  pt?: StatCardPresetOptions;
}

export interface StatCardContext {
  clickable: boolean;
  trendUp?: boolean;
}

export interface StatCardPresetOptions {
  root?: PresetMethodAttributes<PresetOptions<'StatCard'>>;
  header?: PresetMethodAttributes<PresetOptions<'StatCard'>>;
  icon?: PresetMethodAttributes<PresetOptions<'StatCard'>>;
  label?: PresetMethodAttributes<PresetOptions<'StatCard'>>;
  value?: PresetMethodAttributes<PresetOptions<'StatCard'>>;
  trend?: PresetMethodAttributes<PresetOptions<'StatCard'>>;
  subtitle?: PresetMethodAttributes<PresetOptions<'StatCard'>>;
}
