import { BaseInputPresetOptions } from '@mystaline/mysta-commons/components/private/BaseInput.d';

const preset: BaseInputPresetOptions = {
  eyetoggle: {
    className: 'absolute right-2 top-1/4 cursor-pointer text-secondary-400',
  },
  input: ({ props }) => ({
    className: [
      `text-slate flex justify-between items-center px-4 rounded-xl py-1 min-w-full border-0 md:w-auto text-sm`,

      'focus:!outline-primary-500',

      { 'pr-8': props.type === 'password' },
    ],
  }),
};

export default preset;
