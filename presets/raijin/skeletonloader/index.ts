import { SkeletonLoaderPresetOptions } from '@mystaline/mysta-commons/components/skeletonloader/SkeletonLoader.d';

const preset: SkeletonLoaderPresetOptions = {
  root: () => ({
    className: ['bg-secondary-200', 'relative overflow-hidden', 'rounded-xl'],
  }),
};

export default preset;
