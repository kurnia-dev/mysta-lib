import { ListItemPresetOptions } from '@mystaline/mysta-commons/components/listitem/ListItem.d';

const preset: ListItemPresetOptions = {
  root: ({ context }) => ({
    className: [
      // Layout
      'flex items-center gap-3',
      'min-h-[56px]',
      'px-4 py-2',
      'w-full',

      // Base styling
      'bg-transparent',
      'text-secondary-900',

      // Interactive states
      context.clickable && 'cursor-pointer',
      context.clickable && 'hover:bg-secondary-50',
      context.clickable && 'active:bg-secondary-100',
      context.clickable && 'transition-all duration-150 [cubic-bezier(0.34,1.56,0.64,1)]',
      context.clickable && 'hover:scale-[1.01] active:scale-[0.99]',
      context.clickable && 'rounded-xl',

      // Selected state
      context.selected && 'bg-primary-50',
      context.selected && 'border-l-4 border-primary-600',

      // Disabled state
      context.disabled && 'opacity-50 cursor-not-allowed pointer-events-none',

      // Remove button styles if button
      context.clickable && 'text-left border-none',
      context.clickable &&
        'focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:ring-inset',
    ],
  }),
  leading: () => ({
    className: ['shrink-0'],
  }),
  icon: ({ props }) => {
    const iconColorMap = {
      primary: 'text-primary-600',
      secondary: 'text-secondary-600',
      success: 'text-success-600',
      danger: 'text-danger-600',
      warning: 'text-warning-600',
      info: 'text-info-600',
    };

    return {
      className: ['text-2xl', iconColorMap[props.severity || 'secondary']],
    };
  },
  avatar: () => ({
    className: ['w-10 h-10', 'rounded-full', 'object-cover'],
  }),
  content: () => ({
    className: [
      'flex-1',
      'min-w-0', // Allow text truncation
      'flex flex-col gap-1',
    ],
  }),
  primary: () => ({
    className: ['text-sm font-medium', 'text-secondary-900', 'truncate'],
  }),
  secondary: () => ({
    className: ['text-xs', 'text-secondary-500', 'truncate'],
  }),
  trailing: () => ({
    className: ['shrink-0', 'text-secondary-600', 'flex items-center'],
  }),
  trailingIcon: () => ({
    className: ['text-xl', 'text-secondary-400'],
  }),
  divider: () => ({
    className: [
      'h-px',
      'bg-secondary-200',
      'ml-16', // Align with content (after icon/avatar)
    ],
  }),
};

export default preset;
