export default {
  root: ({ props }) => ({
    className: [
      'px-2 py-2 flex flex-col gap-3 bg-secondary-200 group-hover:bg-secondary-300/80 text-white text-xs rounded-md relative',

      'border border-secondary-800',

      'text-secondary-800 group-hover:scale-105 transition-all duration-300 ease-in-out',

      {
        '!bg-secondary-200 group-hover:!bg-secondary-300/80':
          props.severity === 'secondary',
      },
      {
        '!bg-success-200 group-hover:!bg-success-300/80':
          props.severity === 'success',
      },
      {
        '!bg-primary-200 group-hover:!bg-primary-300/80':
          props.severity === 'primary',
      },
      {
        '!bg-warning-200 group-hover:!bg-warning-300/80':
          props.severity === 'warning',
      },
      {
        '!bg-danger-200 group-hover:!bg-danger-300/80':
          props.severity === 'danger',
      },
      { '!bg-info-200 group-hover:!bg-info-300/80': props.severity === 'info' },

      {
        'max-w-xs': props.size === 'xs',
        'max-w-sm': props.size === 'sm',
        'max-w-md': props.size === 'md',
        'max-w-lg': props.size === 'lg',
        'max-w-xl': props.size === 'xl',
        'max-w-2xl': props.size === '2xl',
        'max-w-3xl': props.size === '3xl',
        'max-w-4xl': props.size === '4xl',
        'max-w-5xl': props.size === '5xl',
        'max-w-6xl': props.size === '6xl',
        'max-w-7xl': props.size === '7xl',
        'max-w-full': props.size === 'full',
      },
    ],
  }),
  separator: ({ props }) => ({
    className: [
      { 'h-[1px] w-full bg-secondary-800': props.orientation === 'horizontal' },
      { 'w-[1px] h-full bg-secondary-800': props.orientation === 'vertical' },
    ],
  }),
  header: {
    className: ['text-lg font-bold'],
  },
  content: {
    className: [],
  },
  footer: {
    className: [],
  },
};
