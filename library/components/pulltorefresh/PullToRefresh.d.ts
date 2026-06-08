import {
  PresetMethodAttributes,
  PresetOptions,
  ResolvedPresetOptions,
} from '../../hooks/useComponentPreset';

export interface PullToRefreshProps {
  /**
   * Content to be wrapped
   */
  children: React.ReactNode;

  /**
   * Callback function for refresh action. Should return a Promise.
   */
  onRefresh: () => Promise<void>;

  /**
   * Pull distance threshold to trigger refresh (in px)
   * @default 80
   */
  threshold?: number;

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
  pt?: PullToRefreshPresetOptions;
}

export interface PullToRefreshContext {
  isPulling: boolean;
  isRefreshing: boolean;
  pullDistance: number;
  threshold: number;
}

export interface PullToRefreshPresetOptions {
  root?: PresetMethodAttributes<ResolvedPresetOptions<'PullToRefresh'>>;
  indicator?: PresetMethodAttributes<ResolvedPresetOptions<'PullToRefresh'>>;
  spinner?: PresetMethodAttributes<ResolvedPresetOptions<'PullToRefresh'>>;
  content?: PresetMethodAttributes<ResolvedPresetOptions<'PullToRefresh'>>;
}
