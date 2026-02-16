import { SkeletonLoaderPresetOptions } from 'lib/components/skeletonloader/SkeletonLoader.d';

const preset: SkeletonLoaderPresetOptions = {
  root: () => ({
    className: ['bg-secondary-200', 'relative overflow-hidden'],
  }),
};

export default preset;
