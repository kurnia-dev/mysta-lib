import { AppHeaderPresetOptions } from '@mystaline/mysta-commons/components/appheader/AppHeader.d';

const preset: AppHeaderPresetOptions = {
  root: ({ props }) => ({
    className: [
      // Position
      'sticky top-0 z-40',

      // Layout
      'flex items-center',
      'gap-3 px-4 py-3',
      'min-h-[56px]',

      // Styling
      props.transparent ? 'bg-transparent' : 'bg-white',
      !props.transparent && 'border-b border-secondary-200',
      !props.transparent && 'shadow-sm',

      // Safe area for mobile notch
      'pt-safe',
    ],
  }),
  backButton: () => ({
    className: [
      // Size
      'w-10 h-10',
      'flex items-center justify-center',

      // Shape
      'rounded-full',

      // Styling
      'text-secondary-700',
      'bg-transparent',
      'hover:bg-secondary-100',
      'active:bg-secondary-200',

      // Transitions
      'transition-colors duration-150',

      // Focus
      'focus:outline-none focus:ring-2 focus:ring-primary-500/50',
    ],
  }),
  titleContainer: () => ({
    className: [
      'flex-1',
      'flex flex-col',
      'min-w-0', // Allow text truncation
    ],
  }),
  title: () => ({
    className: ['text-lg font-bold', 'text-secondary-900', 'truncate'],
  }),
  subtitle: () => ({
    className: ['text-xs', 'text-secondary-500', 'truncate'],
  }),
  actions: () => ({
    className: ['flex items-center gap-2', 'shrink-0'],
  }),
  actionButton: () => ({
    className: [
      // Size
      'w-10 h-10',
      'flex items-center justify-center',
      'relative',

      // Shape
      'rounded-full',

      // Styling
      'text-secondary-700',
      'bg-transparent',
      'hover:bg-secondary-100',
      'active:bg-secondary-200',

      // Transitions
      'transition-colors duration-150',

      // Focus
      'focus:outline-none focus:ring-2 focus:ring-primary-500/50',
    ],
  }),
  badge: () => ({
    className: [
      // Position
      'absolute top-0 right-0',
      'translate-x-1/4 -translate-y-1/4',

      // Size and shape
      'min-w-[16px] h-[16px]',
      'rounded-full',
      'flex items-center justify-center',
      'px-1',

      // Styling
      'bg-danger-500',
      'text-white',
      'text-[9px]',
      'font-bold',

      // Border for visibility
      'border-2 border-white',
    ],
  }),
};

export default preset;
