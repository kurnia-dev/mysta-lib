import clsx from 'clsx';
import { memo, useCallback } from 'react';

import { useComponentPreset } from 'lib/hooks';

import { SkeletonLoaderProps } from './SkeletonLoader.d';

export const SkeletonLoader = memo(
  (props: SkeletonLoaderProps): JSX.Element => {
    const {
      width = 'w-full',
      height = 'h-4',
      rounded = 'rounded-md',
      animated = true,
      className,
      pt,
    } = props;

    const preset =
      useComponentPreset('SkeletonLoader', {
        props: { width, height, rounded, animated },
      }) ?? {};

    const createSkeleton = useCallback(
      () => (
        <div
          {...preset.root}
          className={clsx(
            width,
            height,
            rounded,
            animated && 'animate-pulse',
            preset.root.className,
            className,
            pt?.root?.({ props })?.className,
          )}
          style={pt?.root?.({ props })?.style}
        />
      ),
      [width, height, rounded, animated, preset.root, className, props, pt],
    );

    return createSkeleton();
  },
);

SkeletonLoader.displayName = 'SkeletonLoader';
