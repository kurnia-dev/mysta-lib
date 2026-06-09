import { DropdownPresetOptions } from '@mystaline/mysta-commons/components/dropdown/Dropdown.d';

const preset: DropdownPresetOptions = {
  trigger: {
    className: 'flex items-center w-full px-4 py-1 text-sm rounded-xl',
  },
  icon: {
    className: 'ml-auto',
  },
  content: ({ context }) => {
    return {
      className: [
        'transition-all duration-300 overflow-hidden !min-w-[210px] rounded-2xl bg-white shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]',
        '!hidden',
        '!bg-danger-500',

        { 'is-closed': !context.open, 'is-open': context.open },
      ],
    };
  },
};

export default preset;
