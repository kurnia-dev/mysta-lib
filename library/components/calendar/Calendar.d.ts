import {
  PresetMethodAttributes,
  PresetOptions,
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
  root?: PresetMethodAttributes<PresetOptions<'Calendar'>>;
  header?: PresetMethodAttributes<PresetOptions<'Calendar'>>;
  navButton?: PresetMethodAttributes<PresetOptions<'Calendar'>>;
  title?: PresetMethodAttributes<PresetOptions<'Calendar'>>;
  table?: PresetMethodAttributes<PresetOptions<'Calendar'>>;
  thead?: PresetMethodAttributes<PresetOptions<'Calendar'>>;
  tbody?: PresetMethodAttributes<PresetOptions<'Calendar'>>;
  row?: PresetMethodAttributes<PresetOptions<'Calendar'>>;
  headCell?: PresetMethodAttributes<PresetOptions<'Calendar'>>;
  cell?: PresetMethodAttributes<PresetOptions<'Calendar'>>;
  day?: PresetMethodAttributes<PresetOptions<'Calendar'>>;
}
