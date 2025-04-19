export default {
  root: ({ context }) => ({
    className: [
      // Position
      'relative',

      { 'min-w-full border': !context?.containerless },

      { 'border-secondary-500': !context?.invalid },
      { 'border-danger-500': context?.invalid },

      { 'text-secondary-300 bg-secondary-100': context.disabled },
    ],
  }),
};
