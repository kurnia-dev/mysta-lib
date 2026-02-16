import { SearchBarPresetOptions } from 'lib/components/searchbar/SearchBar.d';

const preset: SearchBarPresetOptions = {
  root: ({ context }) => ({
    className: [
      // Layout
      'flex items-center gap-2',
      'w-full',

      // Padding
      context.showCancel ? 'pr-0' : '',
    ],
  }),
  container: ({ props }) => {
    const sizeMap = {
      sm: 'h-9 px-3',
      md: 'h-11 px-4',
      lg: 'h-12 px-4',
    };

    return {
      className: [
        // Layout
        'flex-1',
        'flex items-center gap-2',
        sizeMap[props.size || 'md'],

        // Shape
        'rounded-full',

        // Styling
        'bg-secondary-100',
        'border border-transparent',

        // Focus-within
        'focus-within:bg-white',
        'focus-within:border-primary-500',
        'focus-within:ring-2 focus-within:ring-primary-500/20',

        // Transitions
        'transition-all duration-150',
      ],
    };
  },
  searchIcon: () => ({
    className: ['text-lg', 'text-secondary-400', 'shrink-0'],
  }),
  input: ({ props }) => {
    const textSizeMap = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    };

    return {
      className: [
        // Layout
        'flex-1',
        'min-w-0',

        // Text
        textSizeMap[props.size || 'md'],
        'text-secondary-900',
        'placeholder:text-secondary-400',

        // Reset styles
        'bg-transparent',
        'border-none',
        'outline-none',

        // Disabled
        'disabled:opacity-50 disabled:cursor-not-allowed',
      ],
    };
  },
  clearButton: () => ({
    className: [
      // Size
      'w-6 h-6',
      'shrink-0',

      // Layout
      'flex items-center justify-center',
      'rounded-full',

      // Styling
      'text-secondary-400',
      'hover:text-secondary-600',
      'hover:bg-secondary-200',
      'active:bg-secondary-300',

      // Transitions
      'transition-colors duration-150',

      // Focus
      'focus:outline-none focus:ring-2 focus:ring-primary-500/50',
    ],
  }),
  clearIcon: () => ({
    className: ['text-sm'],
  }),
  cancelButton: () => ({
    className: [
      // Text
      'text-sm font-medium',
      'text-primary-600',
      'whitespace-nowrap',
      'shrink-0',

      // Padding
      'pl-2 pr-1',

      // Styling
      'bg-transparent',
      'hover:text-primary-700',
      'active:text-primary-800',

      // Remove button styles
      'border-none',

      // Focus
      'focus:outline-none focus:ring-2 focus:ring-primary-500/50 rounded',

      // Transitions
      'transition-colors duration-150',
    ],
  }),
};

export default preset;
