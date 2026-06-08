import { BottomNavigationPresetOptions } from 'lib/components/bottomnavigation/BottomNavigation.d';

const preset: BottomNavigationPresetOptions = {
  root: () => ({
    className: [
      // Layout
      'fixed bottom-0 left-0 right-0 z-50',
      'flex items-center justify-around',
      'w-full h-16',

      // Styling
      'bg-white border-t border-secondary-200',
      'shadow-lg',

      // Safe area for mobile
      'pb-safe',
    ],
  }),
  item: () => ({
    className: [
      // Layout
      'flex flex-col items-center justify-center',
      'flex-1 h-full',
      'gap-1',

      // Base styling
      'text-secondary-500',
      'transition-all duration-200 [cubic-bezier(0.34,1.56,0.64,1)]',
      'cursor-pointer',

      // Remove default button styles
      'bg-transparent border-none',
      'focus:outline-none',

      // Hover/Active states
      'hover:text-primary-600',
      'active:scale-95',
    ],
  }),
  activeItem: () => ({
    className: ['text-primary-600', 'font-semibold'],
  }),
  icon: () => ({
    className: ['text-2xl', 'transition-transform duration-200 [cubic-bezier(0.34,1.56,0.64,1)]', 'hover:scale-105 active:scale-95'],
  }),
  label: () => ({
    className: ['text-[10px]', 'font-medium', 'leading-none'],
  }),
  badge: () => ({
    className: [
      // Position
      'absolute top-0 right-0',
      'translate-x-1/2 -translate-y-1/2',

      // Size and shape
      'min-w-[18px] h-[18px]',
      'rounded-full',
      'flex items-center justify-center',
      'px-1',

      // Styling
      'bg-danger-500',
      'text-white',
      'text-[10px]',
      'font-bold',

      // Border for visibility
      'border-2 border-white',
    ],
  }),
};

export default preset;
