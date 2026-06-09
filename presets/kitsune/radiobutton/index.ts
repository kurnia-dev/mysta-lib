import { RadioButtonPresetOptions } from '@mystaline/mysta-commons/components/radiobutton/RadioButton.d';

const preset: RadioButtonPresetOptions = {
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
