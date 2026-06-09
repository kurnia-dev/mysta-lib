import { StatCardPresetOptions } from '@mystaline/mysta-commons/components/statcard/StatCard.d';

const preset: StatCardPresetOptions = {
  root: ({ props, context }) => {
    const severityMap = {
      primary: 'bg-primary-50 border-primary-200',
      secondary: 'bg-secondary-50 border-secondary-200',
      success: 'bg-success-50 border-success-200',
      danger: 'bg-danger-50 border-danger-200',
      warning: 'bg-warning-50 border-warning-200',
      info: 'bg-info-50 border-info-200',
      neutral: 'bg-white border-secondary-200',
    };

    const sizeMap = {
      sm: 'p-3',
      md: 'p-4',
      lg: 'p-6',
    };

    return {
      className: [
        // Layout
        'flex flex-col',
        sizeMap[props.size || 'md'],

        // Shape
        'rounded-xl',
        'border',

        // Styling
        severityMap[props.severity || 'neutral'],
        'shadow-sm',

        // Always-on hover lift
        'hover:-translate-y-1 hover:shadow-lg',
        'transition-all duration-200 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]',

        // Interactive
        context.clickable && 'cursor-pointer',
        context.clickable && 'active:scale-[0.98]',

        // Focus
        context.clickable &&
          'focus:outline-none focus:ring-2 focus:ring-primary-500/50',
      ],
    };
  },
  header: () => ({
    className: ['flex items-center gap-2', 'mb-2'],
  }),
  icon: ({ props }) => {
    const iconColorMap = {
      primary: 'text-primary-600',
      secondary: 'text-secondary-600',
      success: 'text-success-600',
      danger: 'text-danger-600',
      warning: 'text-warning-600',
      info: 'text-info-600',
      neutral: 'text-secondary-500',
    };

    return {
      className: ['text-xl', iconColorMap[props.severity || 'neutral']],
    };
  },
  label: () => ({
    className: [
      'text-xs',
      'text-secondary-600',
      'font-medium',
      'uppercase',
      'tracking-wide',
    ],
  }),
  value: ({ props }) => {
    const valueSizeMap = {
      sm: 'text-xl',
      md: 'text-2xl',
      lg: 'text-3xl',
    };

    return {
      className: [
        valueSizeMap[props.size || 'md'],
        'font-bold',
        'text-secondary-900',
        'mb-1',
      ],
    };
  },
  trend: ({ context }) => ({
    className: [
      'text-xs',
      'font-semibold',
      'flex items-center gap-1',
      context.trendUp ? 'text-success-600' : 'text-danger-600',
    ],
  }),
  subtitle: () => ({
    className: ['text-xs', 'text-secondary-500', 'mt-1'],
  }),
};

export default preset;
