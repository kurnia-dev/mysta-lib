import { DialogPresetOptions } from 'lib/components/dialog/Dialog.d';

const preset: DialogPresetOptions = {
  overlay: () => ({
    className: ['fixed inset-0 bg-black/50 backdrop-blur-sm z-40'],
  }),
  iconContainer: () => ({
    className: ['hover:bg-secondary-100 rounded-full p-1'],
  }),
  container: ({ props }) => ({
    className: [
      'fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl shadow-xl w-full',
      'flex flex-col gap-3',
      'animate-dialog',

      'transition-all duration-300', // For dialog size

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

export default preset;
