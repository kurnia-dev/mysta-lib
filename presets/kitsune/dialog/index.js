export default {
  overlay: ({ context }) => ({
    className: [
      'fixed inset-0 bg-black/50 backdrop-blur-sm z-40',
      //   'data-[state="open"]:!opacity-50 data-[state="open"]:!scale-100 data-[state="close"]:!opacity-0 data-[state="close"]:!scale-10',
      //   { '!opacity-100 !scale-100': context.open },
      //   { '!opacity-0 !scale-50': !context.open },
    ],
  }),
  container: ({ props, context }) => ({
    className: [
      'fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl shadow-xl w-full',
      'flex flex-col gap-3',
      'animate-dialog',
      //   'data-[state="open"]:!opacity-50 data-[state="open"]:!scale-100 data-[state="close"]:!opacity-0 data-[state="close"]:!scale-10',
      //   { '!opacity-100 !scale-100': context.open },
      //   { '!opacity-0 !scale-50': !context.open },

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
  header: { className: 'flex justify-between items-center' },
  content: { className: 'flex flex-col gap-2' },
};
