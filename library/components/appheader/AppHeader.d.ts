import {
  PresetMethodAttributes,
  PresetOptions,
  ResolvedPresetOptions,
} from '../../hooks/useComponentPreset';
import { Icons } from '../icon/Icon.d';

export interface AppHeaderAction {
  id: string;
  icon: Icons;
  label: string;
  onClick: () => void;
  badge?: number;
}

export interface AppHeaderProps {
  /**
   * Main title of the header
   */
  title: string;

  /**
   * Optional subtitle
   */
  subtitle?: string;

  /**
   * Whether to show back button
   * @default false
   */
  showBackButton?: boolean;

  /**
   * Callback when back button is clicked
   */
  onBack?: () => void;

  /**
   * Array of action buttons
   * @default []
   */
  actions?: AppHeaderAction[];

  /**
   * Custom content to render in center
   */
  children?: React.ReactNode;

  /**
   * Transparent background mode
   * @default false
   */
  transparent?: boolean;

  /**
   * Optional className for custom styling
   */
  className?: string;

  /**
   * Pass through props for advanced customization
   */
  pt?: AppHeaderPresetOptions;
}

export interface AppHeaderContext {
  hasSubtitle: boolean;
  hasActions: boolean;
}

export interface AppHeaderPresetOptions {
  root?: PresetMethodAttributes<ResolvedPresetOptions<'AppHeader'>>;
  backButton?: PresetMethodAttributes<ResolvedPresetOptions<'AppHeader'>>;
  titleContainer?: PresetMethodAttributes<ResolvedPresetOptions<'AppHeader'>>;
  title?: PresetMethodAttributes<ResolvedPresetOptions<'AppHeader'>>;
  subtitle?: PresetMethodAttributes<ResolvedPresetOptions<'AppHeader'>>;
  actions?: PresetMethodAttributes<ResolvedPresetOptions<'AppHeader'>>;
  actionButton?: PresetMethodAttributes<ResolvedPresetOptions<'AppHeader'>>;
  badge?: PresetMethodAttributes<ResolvedPresetOptions<'AppHeader'>>;
}
