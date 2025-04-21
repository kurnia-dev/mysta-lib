export default {
  root: ({ context }) => ({
    className: [
      'flex flex-col gap-1 max-w-full items-start text-left',
      'pointer-events-none',
    ],
  }),
  labelContainer: ({ context }) => ({
    className: ['text-sm flex gap-1 cursor-[inherit] items-center'],
  }),
  label: {
    className: 'text-secondary-500 cursor-[inherit]',
  },
  required: {
    className: 'text-danger-500',
  },
  info: {
    className: 'text-xs',
  },
  errorMessage: {
    className: 'text-danger-500 text-xs font-light w-full',
  },
  field: ({ context }) => ({
    className: [
      // Position
      'relative',

      { 'min-w-full border': !context?.containerless && !context?.borderless },

      { 'border-secondary-500': !context?.invalid },
      { 'border-danger-500': context?.invalid },

      {
        'text-secondary-300 bg-secondary-100':
          context?.disabled && !context?.containerless && !context?.borderless,
      },

      { '!cursor-default': !context?.clickable || context?.disabled },
      { '!cursor-pointer': context?.clickable && !context?.disabled },
      { '!pointer-events-none': context?.disabled },
      { '!pointer-events-auto': !context?.disabled },
    ],
  }),
};
