import { CheckboxPresetOptions } from '@mystaline/mysta-commons/components/checkbox/Checkbox.d';

const preset: CheckboxPresetOptions = {
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
      'appearance-none',

      'focus:!outline-primary-500',

      '!w-4 !h-4',

      { '!cursor-pointer': !context?.disabled },
    ],
  }),
  box: ({ context }) => {
    return {
      className: [
        '!w-4 !h-4 flex items-center justify-center',
        'border-2 rounded-md',
        'border-secondary-500 ',
        'transition-transform active:scale-90',

        { 'bg-white': !context.checked && !context.partialChecked },
        { 'bg-primary-500': !!(context.checked || context.partialChecked) },

        {
          '!bg-secondary-100': context?.disabled,
        },
      ],
    };
  },
};

export default preset;
