import { FloatingActionButtonPresetOptions } from 'lib/components/floatingactionbutton/FloatingActionButton.d';

const preset: FloatingActionButtonPresetOptions = {
  root: ({ props, context }) => {
    const positionMap = {
      'bottom-right': 'bottom-6 right-6',
      'bottom-left': 'bottom-6 left-6',
      'bottom-center': 'bottom-6 left-1/2 -translate-x-1/2',
    };

    const sizeMap = {
      sm: 'w-12 h-12',
      md: 'w-14 h-14',
      lg: 'w-16 h-16',
    };

    const severityMap = {
      primary:
        'bg-primary-600 hover:bg-primary-700 text-white shadow-primary-500/50',
      secondary:
        'bg-secondary-600 hover:bg-secondary-700 text-white shadow-secondary-500/50',
      success:
        'bg-success-600 hover:bg-success-700 text-white shadow-success-500/50',
      danger:
        'bg-danger-600 hover:bg-danger-700 text-white shadow-danger-500/50',
      warning:
        'bg-warning-600 hover:bg-warning-700 text-white shadow-warning-500/50',
      info: 'bg-info-600 hover:bg-info-700 text-white shadow-info-500/50',
    };

    return {
      className: [
        // Position
        'fixed',
        positionMap[props.position || 'bottom-right'],
        'z-50',

        // Size
        sizeMap[props.size || 'md'],
        context.isExtended && 'px-4 w-auto',

        // Shape
        'rounded-full',

        // Flex
        'flex items-center justify-center gap-2',

        // Styling
        severityMap[props.severity || 'primary'],
        'shadow-xl',

        // States
        context.disabled && '!bg-secondary-300 !shadow-none cursor-not-allowed',
        !context.disabled && 'cursor-pointer',
        !context.disabled && 'hover:scale-110',
        !context.disabled && 'active:scale-95',
        !context.disabled && 'hover:shadow-xl',

        // Transitions
        'transition-all duration-200 [cubic-bezier(0.34,1.56,0.64,1)]',

        // Focus
        'focus:outline-none focus:ring-4 focus:ring-primary-500/30',
      ],
    };
  },
  icon: ({ props }) => {
    const iconSizeMap = {
      sm: 'text-xl',
      md: 'text-2xl',
      lg: 'text-3xl',
    };

    return {
      className: [iconSizeMap[props.size || 'md'], 'shrink-0'],
    };
  },
  label: () => ({
    className: [
      'text-sm',
      'font-medium',
      'whitespace-nowrap',
      'animate-fadeIn',
    ],
  }),
};

export default preset;
