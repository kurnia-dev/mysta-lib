import {
  PresetMethodAttributes,
  PresetOptions,
  ResolvedPresetOptions,
} from '../../hooks/useComponentPreset';

export interface CalendarProps {
  /**
   * Selected date value as Unix timestamp (milliseconds)
   */
  value: number | null;

  /**
   * Callback when date is selected
   */
  onChange: (value: number | null) => void;

  /**
   * Minimum selectable date (timestamp)
   */
  minDate?: number;

  /**
   * Maximum selectable date (timestamp)
   */
  maxDate?: number;

  /**
   * Default view date (timestamp) if no value is selected
   * @default Date.now()
   */
  defaultViewDate?: number;

  /**
   * Whether to show month/year navigation controls
   * @default true
   */
  showNavigation?: boolean;

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
  pt?: CalendarPresetOptions;
}

export interface CalendarPresetOptions {
  root?: PresetMethodAttributes<ResolvedPresetOptions<'Calendar'>>;
  header?: PresetMethodAttributes<ResolvedPresetOptions<'Calendar'>>;
  navButton?: PresetMethodAttributes<ResolvedPresetOptions<'Calendar'>>;
  title?: PresetMethodAttributes<ResolvedPresetOptions<'Calendar'>>;
  table?: PresetMethodAttributes<ResolvedPresetOptions<'Calendar'>>;
  thead?: PresetMethodAttributes<ResolvedPresetOptions<'Calendar'>>;
  tbody?: PresetMethodAttributes<ResolvedPresetOptions<'Calendar'>>;
  row?: PresetMethodAttributes<ResolvedPresetOptions<'Calendar'>>;
  headCell?: PresetMethodAttributes<ResolvedPresetOptions<'Calendar'>>;
  cell?: PresetMethodAttributes<ResolvedPresetOptions<'Calendar'>>;
  day?: PresetMethodAttributes<ResolvedPresetOptions<'Calendar'>>;
}
