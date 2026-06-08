import { FieldWrapperPresetOptions } from 'lib/components/fieldwrapper/FieldWrapper.d';

const preset: FieldWrapperPresetOptions = {
  root: ({ context }) => ({
    className: [
      'flex flex-col gap-1 max-w-full items-start text-left',
      { 'w-max': context.containerless },

      'pointer-events-none',
    ],
  }),
  labelContainer: () => ({
    className: ['text-sm flex gap-1 cursor-[inherit] items-center'],
  }),
  label: {
    className: 'text-secondary-500 cursor-[inherit]',
  },
  required: {
    className: 'text-danger-500',
  },
  info: {
    className: 'text-xs !pointer-events-auto',
  },
  errorMessage: {
    className: 'text-danger-500 text-xs font-light w-full',
  },
  field: ({ context }) => ({
    className: [
      // Position
      'relative',

      { 'min-w-full border rounded-xl': !context?.containerless && !context?.borderless },

      { 'border-secondary-500': !context?.invalid },
      { 'border-danger-500': context?.invalid },

      {
        'text-secondary-300 bg-secondary-100':
          context?.disabled && !context?.containerless && !context?.borderless,
      },

      { '!cursor-default': context?.disabled },
      { '!cursor-pointer': !context?.disabled },
      { '!pointer-events-none': context?.disabled },
      { '!pointer-events-auto': !context?.disabled },
    ],
  }),
};

export default preset;
