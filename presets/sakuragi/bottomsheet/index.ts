import { BottomSheetPresetOptions } from 'lib/components/bottomsheet/BottomSheet.d';

const preset: BottomSheetPresetOptions = {
  root: () => ({
    className: ['fixed inset-0', 'z-[100]', 'flex items-end'],
  }),
  backdrop: () => ({
    className: [
      'absolute inset-0',
      'bg-black/50',
      'backdrop-blur-sm',
      'animate-fadeIn',
    ],
  }),
  container: ({ props, context }) => {
    const sizeMap = {
      sm: 'max-h-[30vh]',
      md: 'max-h-[50vh]',
      lg: 'max-h-[75vh]',
      full: 'h-[100vh]',
    };

    return {
      className: [
        // Position
        'relative',
        'w-full',
        sizeMap[props.size || 'md'],

        // Shape
        'rounded-t-3xl',

        // Styling
        'bg-white',
        'shadow-2xl',

        // Overflow
        'overflow-hidden',
        'flex flex-col',

        // Animation
        context.visible ? 'animate-slideUp' : 'animate-slideDown',
        'transition-transform duration-300 [cubic-bezier(0.34,1.56,0.64,1)]',
      ],
    };
  },
  handle: () => ({
    className: [
      'w-10 h-1',
      'mx-auto my-3',
      'rounded-full',
      'bg-secondary-300',
      'shrink-0',
    ],
  }),
  header: () => ({
    className: ['px-6 pb-4', 'border-b border-secondary-200', 'shrink-0'],
  }),
  content: () => ({
    className: ['flex-1', 'px-6 py-4', 'overflow-y-auto', 'overscroll-contain'],
  }),
  footer: () => ({
    className: [
      'px-6 pt-4 pb-6',
      'border-t border-secondary-200',
      'bg-secondary-50',
      'shrink-0',
    ],
  }),
};

export default preset;
