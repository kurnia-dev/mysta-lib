import type { PresetOptions } from '../../../library/hooks/useComponentPreset';

type Options = PresetOptions<'ThemeSwitcher'>;

const preset = {
  root: (_options: Options) => ({
    className: [
      'inline-flex items-center gap-3 px-3 py-2 rounded-xl',
      'bg-secondary-100 hover:bg-secondary-200',
      'transition-all duration-200 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]',
      'hover:scale-[1.02] active:scale-[0.97]',
    ],
  }),
  label: (_options: Options) => ({
    className: 'text-sm font-medium text-secondary-800',
  }),
  dots: (_options: Options) => ({
    className: 'flex items-center gap-1',
  }),
  activeDot: (_options: Options) => ({
    className: [
      'w-1.5 h-1.5 rounded-full transition-all cursor-pointer',
      'bg-secondary-700 scale-125',
    ],
  }),
  inactiveDot: (_options: Options) => ({
    className: [
      'w-1.5 h-1.5 rounded-full transition-all cursor-pointer',
      'bg-secondary-400 hover:bg-secondary-600',
    ],
  }),
  hint: (_options: Options) => ({
    className: 'text-[0.6rem] text-secondary-400 hidden sm:block',
  }),
};

export default preset;
