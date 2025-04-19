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
  eyetoggle: {
    className: 'absolute right-2 top-1/4 cursor-pointer text-secondary-400',
  },
  input: ({ props }) => ({
    className: [
      `text-slate flex justify-between items-center px-4 rounded-sm py-1 min-w-full border-0 md:w-auto text-sm`,

      'focus:!outline-primary-500',

      { 'pr-8': props.type === 'password' },
    ],
  }),
  errorMessage: {
    className: 'text-danger-500 text-xs font-light w-full',
  },
};
