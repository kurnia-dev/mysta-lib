export default {
  root: {
    className: 'flex flex-col gap-1 max-w-full items-start',
  },
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
  input: ({ props }) => ({
    className: [
      'absolute',
      `appearance-none`,

      'focus:!outline-primary-500',

      '!w-4 !h-4',
    ],
  }),
  box: ({ props, context }) => ({
    className: [
      '!w-4 !h-4 flex items-center justify-center bg-black',
      'border-2 rounded-[4px]',
      'border-secondary-500 ',

      { 'bg-white': !context.checked && !context.partialChecked },
    ],
  }),
  errorMessage: {
    className: 'text-danger-500 text-xs font-light w-full',
  },
};
