import type { ResolvedPresetOptions } from '../../../library/hooks/useComponentPreset';

type Options = ResolvedPresetOptions<'IconCard'>;

const preset = {
  root: ({ context }: Options) => ({
    className: [
      'flex items-center gap-3 px-3 py-2.5 rounded-xl',
      'bg-surface border border-secondary-200',
      'transition-all duration-200 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]',
      context.clickable && 'hover:bg-secondary-50 hover:scale-[1.02] active:scale-[0.97] cursor-pointer',
    ],
  }),
  icon: (_options: Options) => ({
    className: 'shrink-0 text-xl',
  }),
  label: (_options: Options) => ({
    className: 'text-sm font-medium text-secondary-800',
  }),
  detail: (_options: Options) => ({
    className: 'text-xs text-secondary-400',
  }),
};

export default preset;
