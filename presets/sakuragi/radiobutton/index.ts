import { RadioButtonPresetOptions } from 'lib/components/radiobutton/RadioButton.d';

const preset: RadioButtonPresetOptions = {
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
      `appearance-none`,

      'focus:!outline-primary-500',

      '!w-4 !h-4',
      { '!cursor-pointer': !context?.disabled },
    ],
  }),
  box: ({ context }) => ({
    className: [
      '!w-4 !h-4 flex items-center justify-center bg-white',
      'border-2 rounded-full',
      'border-secondary-500 ',

      { 'bg-white': !context.checked },

      {
        '!bg-secondary-100': context?.disabled,
      },
    ],
  }),
  innerBox: ({ context }) => ({
    className: [
      '!w-2 !h-2 flex items-center justify-center bg-primary-500 absolute left-1',
      'rounded-full',

      {
        '!bg-secondary-300': context?.disabled,
      },
    ],
  }),
};

export default preset;
