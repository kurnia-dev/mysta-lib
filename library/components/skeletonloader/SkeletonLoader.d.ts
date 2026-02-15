import { FC } from 'react';

import {
  PresetMethodAttributes,
  PresetOptions,
} from 'lib/hooks/useComponentPreset';

export interface SkeletonLoaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Width of the skeleton block. Accepts Tailwind width classes.
   * @default 'w-full'
   */
  width?: string;

  /**
   * Height of the skeleton block. Accepts Tailwind height classes.
   * @default 'h-4'
   */
  height?: string;

  /**
   * Rounding style for the skeleton block. Accepts Tailwind rounded classes.
   * @default 'rounded-md'
   */
  rounded?: string;

  /**
   * Enables pulse animation for loading effect.
   * @default true
   */
  animated?: boolean;

  className?: string;

  pt?: SkeletonLoaderPresetOptions;
}

export interface SkeletonLoaderPresetOptions {
  root?: PresetMethodAttributes<PresetOptions<'SkeletonLoader'>>;
}

/**
 * SkeletonLoader component for custom section.
 *
 * @component
 */
export const SkeletonLoader: FC<SkeletonLoaderProps>;
