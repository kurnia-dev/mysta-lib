import {
  PresetMethodAttributes,
  PresetOptions,
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
  root?: PresetMethodAttributes<PresetOptions<'SearchBar'>>;
  container?: PresetMethodAttributes<PresetOptions<'SearchBar'>>;
  searchIcon?: PresetMethodAttributes<PresetOptions<'SearchBar'>>;
  input?: PresetMethodAttributes<PresetOptions<'SearchBar'>>;
  clearButton?: PresetMethodAttributes<PresetOptions<'SearchBar'>>;
  clearIcon?: PresetMethodAttributes<PresetOptions<'SearchBar'>>;
  cancelButton?: PresetMethodAttributes<PresetOptions<'SearchBar'>>;
}
