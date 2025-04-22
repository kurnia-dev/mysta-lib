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
  icon: ({ context }) => ({
    className: [
      '!w-4 !h-4',
      { '!text-secondary-300': context?.disabled },
      { 'text-white': !context?.disabled },
    ],
  }),
  input: ({ context }) => ({
    className: [
      'absolute',
      'appearance-none',

      'focus:!outline-primary-500',

      '!w-4 !h-4',

      { '!cursor-pointer': !context?.disabled },
    ],
  }),
  box: ({ props, context }) => ({
    className: [
      '!w-4 !h-4 flex items-center justify-center bg-primary-500',
      'border-2 rounded-[4px]',
      'border-secondary-500 ',

      { 'bg-white': !context.checked && !context.partialChecked },

      {
        '!bg-secondary-100': context?.disabled,
      },
    ],
  }),
};
