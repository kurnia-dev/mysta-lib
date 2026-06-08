import {
  PresetMethodAttributes,
  PresetOptions,
  ResolvedPresetOptions,
} from '../../hooks/useComponentPreset';

export interface BottomSheetProps {
  /**
   * Whether the sheet is visible
   */
  visible: boolean;

  /**
   * Callback to close the sheet
   */
  onHide: () => void;

  /**
   * Header content
   */
  header?: React.ReactNode;

  /**
   * Main content of the sheet
   */
  children: React.ReactNode;

  /**
   * Footer content
   */
  footer?: React.ReactNode;

  /**
   * Height size variant
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg' | 'full';

  /**
   * Whether clicking backdrop or pressing ESC closes sheet
   * @default true
   */
  dismissable?: boolean;

  /**
   * Whether to loop visual handle at top
   * @default true
   */
  showHandle?: boolean;

  /**
   * Optional className for custom styling
   */
  className?: string;

  /**
   * Pass through props for advanced customization
   */
  pt?: BottomSheetPresetOptions;
}

export interface BottomSheetContext {
  visible: boolean;
}

export interface BottomSheetPresetOptions {
  root?: PresetMethodAttributes<ResolvedPresetOptions<'BottomSheet'>>;
  backdrop?: PresetMethodAttributes<ResolvedPresetOptions<'BottomSheet'>>;
  container?: PresetMethodAttributes<ResolvedPresetOptions<'BottomSheet'>>;
  handle?: PresetMethodAttributes<ResolvedPresetOptions<'BottomSheet'>>;
  header?: PresetMethodAttributes<ResolvedPresetOptions<'BottomSheet'>>;
  content?: PresetMethodAttributes<ResolvedPresetOptions<'BottomSheet'>>;
  footer?: PresetMethodAttributes<ResolvedPresetOptions<'BottomSheet'>>;
}
