import { PullToRefreshPresetOptions } from 'lib/components/pulltorefresh/PullToRefresh.d';

const preset: PullToRefreshPresetOptions = {
  root: () => ({
    className: ['relative', 'w-full h-full', 'overflow-hidden'],
  }),
  indicator: () => ({
    className: [
      // Position
      'absolute top-0 left-1/2 -translate-x-1/2',
      'z-10',

      // Size
      'w-12 h-12',

      // Layout
      'flex items-center justify-center',

      // Styling
      'bg-white',
      'rounded-full',
      'shadow-md',

      // Transitions
      'transition-all duration-300 ease-out',
    ],
  }),
  spinner: () => ({
    className: [
      // Size
      'w-6 h-6',

      // Color - uses theme primary color
      'text-primary-600',

      // Animation applied conditionally in component
    ],
  }),
  content: () => ({
    className: ['w-full h-full', 'overflow-y-auto', 'overscroll-contain'],
  }),
};

export default preset;
