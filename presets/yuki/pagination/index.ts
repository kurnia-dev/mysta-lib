import type { ResolvedPresetOptions } from '../../../library/hooks/useComponentPreset';

type Options = ResolvedPresetOptions<'Pagination'>;

const preset = {
  root: ({ context }: Options) => ({
    className: [
      'flex items-center justify-between gap-4 pt-4 border-t border-secondary-200',
      context.isFirst && '',
      context.isLast && '',
    ],
  }),
  info: (_options: Options) => ({
    className: 'text-xs tabular-nums text-secondary-400',
  }),
  prevButton: ({ context }: Options) => ({
    className: [
      'p-1.5 rounded-lg disabled:opacity-30',
      'hover:bg-secondary-100',
      'transition-all duration-200 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]',
      'hover:scale-[1.02] active:scale-[0.97]',
      context.isFirst && '',
    ],
  }),
  nextButton: ({ context }: Options) => ({
    className: [
      'p-1.5 rounded-lg disabled:opacity-30',
      'hover:bg-secondary-100',
      'transition-all duration-200 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]',
      'hover:scale-[1.02] active:scale-[0.97]',
      context.isLast && '',
    ],
  }),
  pageButton: (_options: Options) => ({
    className: [
      'min-w-[28px] h-7 px-1.5 rounded-lg',
      'text-xs tabular-nums',
      'text-secondary-600',
      'hover:bg-secondary-100',
      'transition-all duration-200 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]',
    ],
  }),
  activePageButton: (_options: Options) => ({
    className: [
      'min-w-[28px] h-7 px-1.5 rounded-lg',
      'text-xs tabular-nums',
      'bg-primary-600 text-white font-bold',
    ],
  }),
};

export default preset;
