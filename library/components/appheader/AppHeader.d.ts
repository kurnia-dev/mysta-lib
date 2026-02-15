import {
  PresetMethodAttributes,
  PresetOptions,
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
  root?: PresetMethodAttributes<PresetOptions<'AppHeader'>>;
  backButton?: PresetMethodAttributes<PresetOptions<'AppHeader'>>;
  titleContainer?: PresetMethodAttributes<PresetOptions<'AppHeader'>>;
  title?: PresetMethodAttributes<PresetOptions<'AppHeader'>>;
  subtitle?: PresetMethodAttributes<PresetOptions<'AppHeader'>>;
  actions?: PresetMethodAttributes<PresetOptions<'AppHeader'>>;
  actionButton?: PresetMethodAttributes<PresetOptions<'AppHeader'>>;
  badge?: PresetMethodAttributes<PresetOptions<'AppHeader'>>;
}
