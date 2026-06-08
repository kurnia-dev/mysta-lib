import {
  PresetMethodAttributes,
  PresetOptions,
  ResolvedPresetOptions,
} from '../../hooks/useComponentPreset';

export interface SearchBarProps {
  /**
   * Search value
   */
  value: string;

  /**
   * Callback on input change
   */
  onChange: (value: string) => void;

  /**
   * Placeholder text
   * @default 'Search...'
   */
  placeholder?: string;

  /**
   * Whether to show cancel button
   * @default false
   */
  showCancel?: boolean;

  /**
   * Callback when cancel button is clicked
   */
  onCancel?: () => void;

  /**
   * Whether to show clear button
   * @default true
   */
  showClear?: boolean;

  /**
   * Callback when clear button is clicked
   */
  onClear?: () => void;

  /**
   * Autofocus the input on mount
   * @default false
   */
  autoFocus?: boolean;

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
   * Optional className for custom styling
   */
  className?: string;

  /**
   * Pass through props for advanced customization
   */
  pt?: SearchBarPresetOptions;
}

export interface SearchBarContext {
  disabled: boolean;
  hasValue: boolean;
  showCancel: boolean;
}

export interface SearchBarPresetOptions {
  root?: PresetMethodAttributes<ResolvedPresetOptions<'SearchBar'>>;
  container?: PresetMethodAttributes<ResolvedPresetOptions<'SearchBar'>>;
  searchIcon?: PresetMethodAttributes<ResolvedPresetOptions<'SearchBar'>>;
  input?: PresetMethodAttributes<ResolvedPresetOptions<'SearchBar'>>;
  clearButton?: PresetMethodAttributes<ResolvedPresetOptions<'SearchBar'>>;
  clearIcon?: PresetMethodAttributes<ResolvedPresetOptions<'SearchBar'>>;
  cancelButton?: PresetMethodAttributes<ResolvedPresetOptions<'SearchBar'>>;
}
