import { ChipPresetOptions } from '@mystaline/mysta-commons/components/chip/Chip.d';

const preset: ChipPresetOptions = {
  root: ({ props, context }) => {
    const sizeMap = {
      sm: 'h-6 px-2 text-xs gap-1',
      md: 'h-8 px-3 text-sm gap-1.5',
      lg: 'h-10 px-4 text-base gap-2',
    };

    const variantMap = {
      filled: {
        primary: 'bg-primary-500 text-white hover:bg-primary-600',
        secondary: 'bg-secondary-500 text-white hover:bg-secondary-600',
        success: 'bg-success-500 text-white hover:bg-success-600',
        danger: 'bg-danger-500 text-white hover:bg-danger-600',
        warning: 'bg-warning-500 text-white hover:bg-warning-600',
        info: 'bg-info-500 text-white hover:bg-info-600',
      },
      outlined: {
        primary:
          'border border-primary-500 text-primary-700 hover:bg-primary-50',
        secondary:
          'border border-secondary-500 text-secondary-700 hover:bg-secondary-50',
        success:
          'border border-success-500 text-success-700 hover:bg-success-50',
        danger: 'border border-danger-500 text-danger-700 hover:bg-danger-50',
        warning:
          'border border-warning-500 text-warning-700 hover:bg-warning-50',
        info: 'border border-info-500 text-info-700 hover:bg-info-50',
      },
      light: {
        primary: 'bg-primary-100 text-primary-700 hover:bg-primary-200',
        secondary: 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200',
        success: 'bg-success-100 text-success-700 hover:bg-success-200',
        danger: 'bg-danger-100 text-danger-700 hover:bg-danger-200',
        warning: 'bg-warning-100 text-warning-700 hover:bg-warning-200',
        info: 'bg-info-100 text-info-700 hover:bg-info-200',
      },
    };

    const severityClass =
      variantMap[props.variant || 'filled'][props.severity || 'secondary'];

    return {
      className: [
        // Layout
        'inline-flex items-center',
        sizeMap[props.size || 'md'],

        // Shape
        'rounded-full',

        // Styling
        'font-medium',
        severityClass,

        // Interactive
        context.clickable && 'cursor-pointer',
        context.clickable && 'transition-all duration-150 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]',
        context.clickable && 'hover:scale-105 active:scale-95',

        // Disabled
        context.disabled &&
          '!bg-secondary-200 !text-secondary-400 cursor-not-allowed',
        context.disabled &&
          props.variant === 'outlined' &&
          '!border-secondary-300',

        // Remove button styles if button
        context.clickable && 'border-none',
        context.clickable &&
          'focus:outline-none focus:ring-2 focus:ring-primary-500/50',
      ],
    };
  },
  icon: ({ props }) => {
    const iconSizeMap = {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    };

    return {
      className: [iconSizeMap[props.size || 'md'], 'shrink-0'],
    };
  },
  label: () => ({
    className: ['whitespace-nowrap', 'leading-none'],
  }),
  removeButton: ({ props }) => {
    const buttonSizeMap = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
    };

    return {
      className: [
        // Size
        buttonSizeMap[props.size || 'md'],
        'shrink-0',

        // Layout
        'inline-flex items-center justify-center',
        'rounded-full',
        '-mr-1',

        // Styling
        'bg-transparent',
        'hover:bg-black/10',
        'active:bg-black/20',

        // Transitions
        'transition-colors duration-150',

        // Focus
        'focus:outline-none focus:ring-2 focus:ring-white/50',
      ],
    };
  },
  removeIcon: ({ props }) => {
    const iconSizeMap = {
      sm: 'text-[10px]',
      md: 'text-xs',
      lg: 'text-sm',
    };

    return {
      className: [iconSizeMap[props.size || 'md']],
    };
  },
};

export default preset;
