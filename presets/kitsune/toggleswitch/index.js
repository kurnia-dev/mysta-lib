export default {
  labelContainer: {
    className: 'text-sm flex gap-1 items-center',
  },
  label: {
    className: 'text-secondary-500',
  },
  required: {
    className: 'text-danger-500',
  },
  info: {
    className: 'text-xs',
  },
  iconContainer: ({ context }) => ({
    className: [
      'overflow-hidden !w-3.5 !h-3.5',
      'transition-transform duration-300 ease-in-out',
      'flex justify-center items-center !border !border-secondary-500 rounded-full',

      { 'translate-x-0': !context.checked && !context.partialChecked },
      { 'translate-x-[0.825rem]': context.partialChecked },
      { 'translate-x-[0.825rem]': context.checked && context.tristate },
      { 'translate-x-[0.825rem]': context.checked && !context.tristate },
      { '!pointer-events-none': context.disabled },
    ],
  }),
  icon: ({ context }) => ({
    className: [
      'scale-150',
      { 'text-white': !context?.disabled },
      { 'text-secondary-50': context?.disabled },
      { '!pointer-events-none': context.disabled },
    ],
  }),
  input: ({ props }) => ({
    className: [
      'absolute',
      'appearance-none',

      'focus:!outline-primary-500',

      '!w-4 !h-4',
    ],
  }),
  box: ({ props, context }) => ({
    className: [
      'transition-colors duration-300 ease-in-out',
      '!w-[30px] !h-4 flex items-center justify-start',
      'border-2 rounded-[8px]',
      'border-secondary-500',

      // Active
      {
        'bg-secondary-50':
          !context.disabled && !context.checked && !context.partialChecked,
      },
      { 'bg-danger-500': !context.disabled && context.partialChecked },
      {
        'bg-success-500':
          !context.disabled && context.checked && context.tristate,
      },
      {
        'bg-primary-500':
          !context.disabled && context.checked && !context.tristate,
      },

      // Disabled
      {
        'bg-secondary-200':
          context.disabled && !context.checked && !context.partialChecked,
      },
      { 'bg-danger-200': context.disabled && context.partialChecked },
      {
        'bg-success-200':
          context.disabled && context.checked && context.tristate,
      },
      {
        'bg-primary-200':
          context.disabled && context.checked && !context.tristate,
      },
      { '!pointer-events-none': context.disabled },
    ],
  }),
};
