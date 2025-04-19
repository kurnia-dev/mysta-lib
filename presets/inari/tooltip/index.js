export default {
  root: ({ context, props }) => ({
    className: [
      // Position
      'absolute',

      {
        // Add space 8px at the bottom
        'pb-2': context?.top,
        'pt-2': context?.bottom,
        'pl-2': context?.right,
        'pr-2': context?.left,
      },

      '!transition',
    ],
  }),
  arrow: {
    className: 'hidden',
  },
  text: {
    className: [
      // Shape
      'rounded-lg',

      // Background
      'bg-primary-50',

      // Spacing
      'px-2 py-1',

      // Typography
      'text-[0.7rem] font-light leading-4 text-left',

      // Color
      'text-grayscale-900',

      // Misc
      'whitespace-pre-line',
      'break-words',
    ],
  },
};
