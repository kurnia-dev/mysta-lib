import type { PresetOptions } from 'lib/hooks/useComponentPreset';

const buttonBase = [
  'px-3 py-1.5 text-lg font-medium disabled:opacity-30',
  'hover:bg-secondary-100',
  'transition-all duration-200 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]',
  'active:scale-[0.97]',
];

const preset = {
  root: (_options: PresetOptions<'NumberStepper'>) => ({
    className: [
      'inline-flex items-center',
      'rounded-xl border border-secondary-200',
    ],
  }),
  decrementButton: (_options: PresetOptions<'NumberStepper'>) => ({
    className: [...buttonBase, 'rounded-l-xl'],
  }),
  value: (_options: PresetOptions<'NumberStepper'>) => ({
    className: [
      'px-4 py-1.5 min-w-[3ch] text-center tabular-nums select-none',
      'text-secondary-800',
    ],
  }),
  incrementButton: (_options: PresetOptions<'NumberStepper'>) => ({
    className: [...buttonBase, 'rounded-r-xl'],
  }),
};

export default preset;
