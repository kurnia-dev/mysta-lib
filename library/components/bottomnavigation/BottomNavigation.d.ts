import {
  PresetMethodAttributes,
  PresetOptions,
  ResolvedPresetOptions,
} from '../../hooks/useComponentPreset';
import { Icons } from '../icon/Icon.d';

export interface BottomNavigationItem {
  /**
   * Unique identifier for the navigation item
   */
  id: string;

  /**
   * Label text to display below icon
   */
  label: string;

  /**
   * Icon name from react-icons
   */
  icon: Icons;

  /**
   * Path to navigate to when clicked
   */
  path: string;

  /**
   * Optional badge count (e.g., for notifications)
   */
  badge?: number;
}

export interface BottomNavigationProps {
  /**
   * Array of navigation items
   */
  items: BottomNavigationItem[];

  /**
   * Currently active path
   */
  activePath: string;

  /**
   * Callback when navigation item is clicked
   */
  onNavigate: (path: string) => void;

  /**
   * Optional className for custom styling
   */
  className?: string;

  /**
   * Pass through props for advanced customization
   */
  pt?: BottomNavigationPresetOptions;
}

export interface BottomNavigationPresetOptions {
  root?: PresetMethodAttributes<ResolvedPresetOptions<'BottomNavigation'>>;
  item?: PresetMethodAttributes<ResolvedPresetOptions<'BottomNavigation'>>;
  activeItem?: PresetMethodAttributes<ResolvedPresetOptions<'BottomNavigation'>>;
  icon?: PresetMethodAttributes<ResolvedPresetOptions<'BottomNavigation'>>;
  label?: PresetMethodAttributes<ResolvedPresetOptions<'BottomNavigation'>>;
  badge?: PresetMethodAttributes<ResolvedPresetOptions<'BottomNavigation'>>;
}
